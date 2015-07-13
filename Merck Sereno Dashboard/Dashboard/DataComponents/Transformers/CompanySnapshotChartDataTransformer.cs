using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
using CubeFramework;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class CompanySnapshotChartDataTransformer : ITransformer<CubeData, SingleChartModel>
    {
        public Pie2D Chart { get; set; }
        public string TopCountValue { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorSource;

        public CompanySnapshotChartDataTransformer()
        {
            _colorSource = new ColorListDataSource();
        }

        public SingleChartModel GetData()
        {
            const string defaultChartAttributes = @"numberprefix='$' legendPadding='25' chartRightMargin='-6' bgcolor='FFFFFF' baseFontSize='9' showalternatehgridcolor='0' showplotborder='0' divlinecolor='CCCCCC' showvalues='1' showcanvasborder='0' canvasbordercolor='CCCCCC' canvasborderthickness='1' yaxismaxvalue='30000' captionpadding='30' linethickness='3' sshowanchors='0' yaxisvaluespadding='15' showlegend='1' legendPosition='BOTTOM' use3dlighting='0' showshadow='0' legendshadow='0' legendborderalpha='0' showborder='0'";
            Chart = new Pie2D(defaultChartAttributes)
            {
                Set = new List<Set>()
            };
            Chart.Attributes.Add("pieRadius", "80%");
            Chart.Attributes.Add("Caption", "Selected market - Top " + TopCountValue + " Companies");
            Chart.Attributes.Add("SubCaption", PeriodString + " - " + MeasureValue);
            Input.Rows.RemoveAt(0);
            AddStyles(Chart);
            var palettecolors = "";
            for (int i = 0; i < Input.Rows.Count; i++)
            {
                palettecolors += _colorSource.GetNextColor() + ",";
                //if (Input.Rows[i].Values[1].ToUpper() == "RECKITT BENCKISER")
                //{
                //    palettecolors += "#de2588" + ",";
                //}
                //else
                //{
                //    palettecolors += _colorSource.GetNextColor() + ",";
                //}
            }
            Chart.Attributes.Add("palettecolors", palettecolors);
            AddSet(Chart);

            var model = new SingleChartModel();
            model.Chart = Chart.RenderWithScript("100%", "430");
            return model;
        }

        public void AddSet(Pie2D pie2DChart)
        {
            int shareValIndex = -1;
            foreach (var col in Input.Columns)
            {
                if (col.Name.Contains("Market Share %"))
                    shareValIndex = col.Position;
            }
            foreach (var row in Input.Rows)
            {
                var set = new Set();
                set.Attributes.Add("label", row.Values[1]);
                set.Attributes.Add("value", row.Values[shareValIndex]);

                //if (row.Values[1].ToUpper() == "RECKITT BENCKISER")
                //{
                //    set.Attributes.Add("issliced", "1");
                //}
                pie2DChart.Set.Add(set);
            }

        }

        protected void AddStyles(Pie2D chart)
        {
            chart.Styles = new Styles { Definition = new List<Definition>() };
            var style = new Style();

            style.Attributes.Add("name", "myCaptionFont");
            style.Attributes.Add("type", "font");
            style.Attributes.Add("align", "left");
            var definition = new Definition { Style = style };
            chart.Styles.Definition.Add(definition);

            var apply = new Apply();
            apply.Attributes.Add("toObject", "Caption");
            apply.Attributes.Add("styles", "myCaptionFont");

            var application = new Application { Apply = apply };
            chart.Styles.Application = new List<Application> { application };

            apply = new Apply();
            apply.Attributes.Add("toObject", "SubCaption");
            apply.Attributes.Add("styles", "myCaptionFont");

            application = new Application { Apply = apply };
            chart.Styles.Application.Add(application);
        }
        public CubeData Input { set; private get; }
    }
}