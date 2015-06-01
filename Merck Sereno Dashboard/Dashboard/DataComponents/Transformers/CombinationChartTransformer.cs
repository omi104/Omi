using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services.Description;
using Component.Chart;
using Component.Chart.Core;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
using CubeFramework;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class CombinationChartTransformer : ITransformer<CubeData, SingleChartModel>
    {
        public MSCombiDY2D chart { get; set; }
        public string UncheckedItems { get; set; }
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }

        public SingleChartModel GetData()
        {
            var model = new SingleChartModel();
            model.Title = "Performance vs. Competitors (in Euros)";
            model.Chart = "";
            string defaultAttributes = @"bgColor='FFFFFF' labelDisplay='Rotate' slantLabels='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' canvasBorderThickness='0' adjustDiv='0' setadaptiveymin='1' setadaptivesymin='1'";

            chart = new MSCombiDY2D(defaultAttributes)
            {
                Dataset = new List<DataSet>(),
            };
            chart.Attributes.Add("pyAxisName", "PY axis Label");
            chart.Attributes.Add("sYAXisName", "SY axis Label");
            chart.ControlId = "interactiveTrendChart";
            AddStyles();
            foreach(var col in Input.Columns.Skip(2))
            {
                var category = new Category();
                category.Attributes.Add("label", col.Name);
                chart.Categories.Category.Add(category);
            }

            if (!UncheckedItems.ToUpper().Contains("TOTAL")) 
                chart.Dataset.Add(AddFirstDataSetForTotal());

            for(int i=0; i<= Input.Rows.Count - 2;i++)
            {
                if (!UncheckedItems.Contains(Input.Rows[i].Values[1])) 
                    chart.Dataset.Add(AddTrendLineDataSet(Input.Rows[i]));
            }
            model.Chart= chart.RenderWithScript("100%", "360");
            return model;
        }

        private DataSet AddFirstDataSetForTotal()
        {
            var dataSet = new DataSet("color='4d9bbc' renderas='Area'");
            dataSet.Attributes.Add("seriesName", Input.Rows.Last().Values[1]);
            dataSet.Attributes.Add("parentYAxis", "P");
            dataSet.Set = new List<Set>();

            foreach (var val in Input.Rows.First().Values.Skip(2))
            {
                var set1 = new Set();
                set1.Attributes.Add("value", val);
                dataSet.Set.Add(set1);
            }
            return dataSet;
        }

        private DataSet AddTrendLineDataSet(Row row)
        {
            var dataSet = new DataSet("renderas='Line'");
            dataSet.Attributes.Add("seriesName", row.Values[1]);
            dataSet.Attributes.Add("parentyaxis", "S");
            dataSet.Set = new List<Set>();

            foreach (var val in row.Values.Skip(2))
            {
                var set1 = new Set();
                set1.Attributes.Add("value", val);
                dataSet.Set.Add(set1);
            }
            return dataSet;
        }

        protected void AddStyles()
        {
            chart.Styles = new Styles { Definition = new List<Definition>() };
            var style = new Style();

            style.Attributes.Add("name", "Shadow_1");
            style.Attributes.Add("type", "Shadow");
            style.Attributes.Add("Angle", "270");
            style.Attributes.Add("Color", "#CCCCCC");
            style.Attributes.Add("Alpha", "100");
            style.Attributes.Add("blurX", "0");
            style.Attributes.Add("blurY", "0");
            style.Attributes.Add("Strength", "2");
            style.Attributes.Add("distance", "1");
            var definition = new Definition { Style = style };
            chart.Styles.Definition.Add(definition);

            style = new Style();
            style.Attributes.Add("name", "Shadow_2");
            style.Attributes.Add("type", "Shadow");
            style.Attributes.Add("Angle", "90");
            style.Attributes.Add("Color", "#CCCCCC");
            style.Attributes.Add("Alpha", "100");
            style.Attributes.Add("blurX", "0");
            style.Attributes.Add("blurY", "0");
            style.Attributes.Add("Strength", "2");
            style.Attributes.Add("distance", "1");

            definition = new Definition { Style = style };
            chart.Styles.Definition.Add(definition);

            var apply = new Apply();
            apply.Attributes.Add("toObject", "CANVAS");
            apply.Attributes.Add("styles", "Shadow_1,Shadow_2");

            var application = new Component.Chart.Fusion.Application { Apply = apply };
            chart.Styles.Application = new List<Component.Chart.Fusion.Application> { application };
        }

        public string GetEmbeddedRender(string width, string height)
        {
            return RenderChart(chart.ControlId, ((object)chart.ToXml()).ToString().Replace(Environment.NewLine, "").Replace("  ", "").Replace("&amp;", "&"), "MSCombi2D.swf", width, height);
        }

        public string RenderChart(string controlId, string xmlData, string chartType, string width, string height)
        {
            string str1 = controlId;
            string str2 = str1;
            string str3 = width;
            string str4 = height;
            string str5 = "../Content/FusionChartsSWF/";
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("<div id=\"" + str2 + "\" align=\"center\"></div>");
            stringBuilder.AppendLine("<script type=\"text/javascript\">");
            stringBuilder.AppendLine("var " + str1 + " = (function() {");
            stringBuilder.AppendLine("    return {");
            stringBuilder.AppendLine("        containerId: '" + str2 + "',");
            stringBuilder.AppendLine("        xmlData: '',");
            stringBuilder.AppendLine("        chartType: '',");
            stringBuilder.AppendLine("        showChart: function() {");
            stringBuilder.AppendLine("            IMSChart.Render(" + str1 + "," + str3 + "," + str4 + " );");
            stringBuilder.AppendLine("        }");
            stringBuilder.AppendLine("    }");
            stringBuilder.AppendLine("})();");
            stringBuilder.AppendLine("setTimeout(function(){");
            stringBuilder.AppendLine("    " + str1 + ".xmlData = \"" + xmlData.Replace("\"", "'") + "\";");
            stringBuilder.AppendLine("    " + str1 + ".chartType = \"" + chartType + "\";");
            stringBuilder.AppendLine("    " + str1 + ".swfRoot = \"" + str5 + "\";");
            stringBuilder.AppendLine("    " + str1 + ".showChart();");
            stringBuilder.AppendLine("},0);");
            stringBuilder.AppendLine("</script>");
            return ((object)stringBuilder).ToString();
        }
        public CubeData Input { set; private get; }
    }
}