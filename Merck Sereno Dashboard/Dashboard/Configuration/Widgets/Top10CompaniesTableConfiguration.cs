using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers;
using Dashboard.Controllers.Exports;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class Top10CompaniesTableConfiguration : WidgetConfiguration<SingleTableModel, object>
    {
        public Top10CompaniesTableConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig(GetBarChartFooter)
                .HasController<SimpleTableWidgetController>();
            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<SingleTableTransformer>()
                .HasProperty(t => t.CategoryText).WithValue("")
                .HasProperty(t => t.GeoText).WithValue("")
                .HasProperty(t => t.PeriodTypeText).WithValue("")
                .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                .HasProperty(t => t.Periodtext).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"]);

            Export.HasController<HomeExportController>().HasConfig("HomeTopRankTable")
                  .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                  .Transform().By<CubeDataToXTableHomeTopRankingTransformer>()
                  .Transform().By<ExportModelTransformer>()
                  .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
                  .HasProperty(t => t.Country).WithValue(p => p["@@"+ParameterList.Country+"_text"])
                  .HasProperty(t => t.Product).WithValue(p => p["@@" + ParameterList.Product + "_text"])
                 .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"]);

                 //.HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
                 //.HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
                 //.HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
                 //.HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
                 //.HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
                 //.HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"]);
            HasParameterDependency.On(widgetItem.HasParamDependency);
        }

        public string GetBarChartFooter(IReadOnlyDictionary<string, string> parameters)
        {

            
            //var periodText = "";
            //var geoText = "";
            var periodTypeText = "";
            var EndDate = "";
            
           // parameters.TryGetValue("@@Period_text", out periodText);
            parameters.TryGetValue("@@"+ParameterList.TimePeriod +"_text", out periodTypeText);
            parameters.TryGetValue("@@EndDate_text", out EndDate);
            

            return  (periodTypeText + " - "+" - "+EndDate);
            
            
        }
    }
}