namespace Dashboard.Configuration.Widgets
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Xml.Linq;

    using CubeFramework;

    using Dashboard.Controllers.Widgets;
    using Dashboard.Helper;
    using Dashboard.Helper.FusionComponents;

    using DashboardFramework;
    using DashboardFramework.Configuration;
    using DashboardFramework.DataComponent;

    //using Parameter = Dashboard.Configuration.Parameter;

    public class GeoMapWidgetConfiguration<TDataSource> : WidgetConfiguration<GeoMapData, object> where TDataSource : class, IDataSource
    {
        public GeoMapWidgetConfiguration(string name, string paramName, int geoFilterViewId, int mapFilterViewId)
        {
            this.HasName(name);
            this.View.HasController<GeoMapController>();
            this.View.DataFlow.AddSource<TDataSource>().HasName("GeoData") //Input 2 for merger
                    .WithModule(geoFilterViewId.ToString()).AddSource<TDataSource>().HasName("MapData") //Input 1 for merger
                    .WithModule(mapFilterViewId.ToString())
                //    .MapParameter(ParameterList.RbGeo).WithValue("[Geo].[Hierarchy].[Market].&[TOTAL ENA]")
                //.MapParameter(ParameterList.RbMarket).WithValue("[Market].[Hierarchy].[Category].&[FOOTCARE]")
                //.MapParameter(ParameterList.RbChannel).WithValue("[Channel].[Channel].&[PTR]")
                //.MapParameter(ParameterList.RbSubChannel).WithValue("[Channel].[SubChannel].&[Pharmacy]")
                //.MapParameter(ParameterList.RbPeriodType).WithValue("[Period].[PeriodTypeName].&[Monthly]")
                .Merge()
                    .WithPrevious()
                    .By<GeoMapDataMerger>()
                        .HasProperty(p => p.Dashboard)
                            .WithValue(p => DashboardFramework.Web.DashboardContext.Current.DashboardInstance)
                        .HasProperty(p => p.SelectedGeo)
                            .WithValue(p => p[ParameterList.RbGeo])
                        .HasProperty(p => p.ParamName)
                            .WithValue(ParameterList.RbGeo);
            this.View.HasConfig(paramName);
            this.HasParameterDependency.On(paramName);
            //.On(Params.Market.IsPack)
            //.On(Params.Market.IsRegulated);

        }


    }

    public class GeoMapData
    {
        public string ParamName { get; set; }
        public string SelectedGeo { get; set; }
        public CubeData GeoFilterData { get; set; }
        public string MapFilterData { get; set; }

        public string Label { get; set; }
    }


    public class GeoMapDataMerger : IMerger<CubeData, CubeData, GeoMapData>
    {
        
        public GeoMapData GetData()
        {

            const string width = "100%";
            const string height = "100%";

            var selectedGeoInfo = GetSelectedGeoInfo(this.Input2, this.Input1, this.SelectedGeo);
            //var selectedChildLevelName = selectedGeoInfo[0].Trim();
            //var selectedChildReportGroupName = selectedGeoInfo[1].Trim();
            //var selectedGeoName = selectedGeoInfo[2].Trim();

            var fusionMapPath = FusionMapPathBase;
            //if (selectedChildLevelName == "")
            //    selectedChildReportGroupName = "Country";

            //var selectedGeoNameFormated = selectedGeoName.Replace(".", "_");
            //fusionMapPath += "Total ENA.swf";
            fusionMapPath += selectedGeoInfo + ".swf"; 

           
            var stringData = GetMapFormatedData(this.Input1, this.ParamName);

            var mapHtml = FusionMaps.RenderMapHTML(fusionMapPath, "", stringData, Guid.NewGuid().ToString().Replace("-", ""), width, height, false, true);

            this.LoadParameterValues();

            return new GeoMapData()
            {
                ParamName = this.ParamName,
                MapFilterData = mapHtml,
                GeoFilterData = this.Input2,
                SelectedGeo = this.SelectedGeo,
                Label ="Geo"
            };
        }

        private void LoadParameterValues()
        {
            var exists = this.Input2.Rows.Any(r => r[1] == this.SelectedGeo);
            if (!exists)
            {
                this.SelectedGeo = this.Input2.Rows.First()[1];
                this.Dashboard.SetParameterValue(this.ParamName, this.SelectedGeo);
            }
        }

        private static string GetSelectedGeoInfo(CubeData geofilterData, CubeData mapdata, string selectedGeoValue)
        {
            var result = geofilterData.Rows.FirstOrDefault(t => t.Values[1] == selectedGeoValue);
            if (result != null)
            {
                return result.Values[0].Trim();
            }
            return geofilterData.Rows.FirstOrDefault().Values[0].Trim();
        }

        private static string GetMapFormatedData(CubeData cubeData, string paramName)
        {
            var formatedData = new XElement("map");
            formatedData.Add(new XAttribute("showShadow", "0"));
            formatedData.Add(new XAttribute("showBevel", "0"));
            formatedData.Add(new XAttribute("showLabels", "0"));
            formatedData.Add(new XAttribute("borderAlpha", "0"));
            formatedData.Add(new XAttribute("useHoverColor", "0"));
            formatedData.Add(new XAttribute("fillColor", "C0D2F8"));
            formatedData.Add(new XAttribute("hoverColor", "#f78db8"));

            const int ColorIndex = 3;
            const int MapId = 2;
            const int TooltextIndex = 0;
            
            var dataTag = new XElement("data");
            foreach (var row in cubeData.Rows)
            {
                var entityTag = new XElement("entity");
                //entityTag.Add(new XAttribute("link", "j-changeGeoESRNew-EMERGING MARKETS"));
                entityTag.Add(new XAttribute("toolText", row[TooltextIndex]));

                entityTag.Add(new XAttribute("id", row[MapId]));
                entityTag.Add(new XAttribute("color", row[ColorIndex]));

                var link = string.Format("j-{0}-{1}", "GeoMap.changeGeoFromFusionMap", row.Values[1] + "|" + paramName);

                entityTag.Add(new XAttribute("link", link));
                entityTag.Add(new XAttribute("useHoverColor", "1"));
                //entityTag.Add(new XAttribute("hoverColor", "#f78db8"));
                //entityTag.Add(new XAttribute("toolText", cubeData.Rows[i].Values[0]));
                //entityTag.Add(new XAttribute("id", cubeData.Rows[i].Values[2]));
                //entityTag.Add(new XAttribute("color", cubeData.Rows[i].Values[3]));
                dataTag.Add(entityTag);
            }

            formatedData.Add(dataTag);

            return formatedData.ToString().Replace("\"", "'").Replace("&amp;", "%26");
        }

        public CubeData Input1 { set; private get; }
        public CubeData Input2 { set; private get; }

        public string ParamName { get; set; }

        public IDashboard Dashboard { get; set; }

        private const string FusionMapPathBase = "Content/FusionMapsSWF/Country/";
        public string SelectedGeo { get; set; }
    }

}