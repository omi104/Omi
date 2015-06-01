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
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }

        public SingleChartModel GetData()
        {
            var model = new SingleChartModel();
            model.Title = CategoryString+" vs. Reckitt Benckiser Sales Trend in GLOBAL - MTH - "+PeriodString;
            model.Chart = "";
            string defaultAttributes = @"bgColor='FFFFFF' labelDisplay='Rotate' slantLabels='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' canvasBorderThickness='0' adjustDiv='0'";
            chart = new MSCombiDY2D(defaultAttributes)
            {
                Dataset = new List<DataSet>(),
            };

            if (Input == null || Input.Rows.Count == 0)
                return model;

            var columnCount = Input.Columns.Count;
            double currentValue = 0;

            var totalMinValue = double.MaxValue;
            foreach (var col in Input.Rows[0].Values.GetRange(1, columnCount - 1))
            {
                currentValue = double.Parse(col);
                if (currentValue < totalMinValue)
                    totalMinValue = currentValue;
            }
            totalMinValue = Math.Floor((totalMinValue - (totalMinValue * .05)));

            var rbMinValue = double.MaxValue;
            foreach (var col in Input.Rows[1].Values.GetRange(1, columnCount - 1))
            {
                currentValue = double.Parse(col);
                if (currentValue < rbMinValue)
                    rbMinValue = currentValue;
            }
            rbMinValue = Math.Floor((rbMinValue - (rbMinValue * .05)));
            chart.Attributes.Add("pYAxisMinValue", "" + totalMinValue);
            chart.Attributes.Add("sYAxisMinValue", "" + rbMinValue);

            chart.Categories = new Categories();
            chart.Categories.Category = new List<Category>();
            chart.ControlId = "CatVsSalesTrendChart";
            AddStyles();
            foreach(var col in Input.Columns.Skip(1))
            {
                var category = new Category();
                category.Attributes.Add("label", col.Name);
                chart.Categories.Category.Add(category);
            }
            chart.Dataset.Add(AddFirstDataSet());
            chart.Dataset.Add(AddTrendLineDataSet());
            chart.Attributes.Add("pyAxisName", MeasureValue+" (Total)");
            chart.Attributes.Add("sYAXisName", MeasureValue + " (RB)");
            
            model.Chart= chart.RenderWithScript("98%", "280");
            return model;
        }

        
        private DataSet AddFirstDataSet()
        {
            //var dataSet = new DataSet("color='FF679A'");
            //var dataSet = new DataSet("color='45b29d'");
            //var dataSet = new DataSet("color='2a8fdd'");
            //var dataSet = new DataSet("color='86a0ba'");
            //var dataSet = new DataSet("color='42586d'");
            //var dataSet = new DataSet("color='008EA0'");
            //var dataSet = new DataSet("color='81b4c1'");
            //var dataSet = new DataSet("color='b1e1eb'");
            //var dataSet = new DataSet("color='0b6d99'");
            var dataSet = new DataSet("color='4d9bbc'");
            dataSet.Attributes.Add("seriesName", Input.Rows.First().Values.First());
            dataSet.Attributes.Add("parentYAxis", "P");
            dataSet.Set = new List<Set>();

            foreach (var val in Input.Rows.First().Values.Skip(1))
            {
                var set1 = new Set();
                set1.Attributes.Add("value", val);
                dataSet.Set.Add(set1);
            }
            return dataSet;
        }

        private DataSet AddTrendLineDataSet()
        {
            //var dataSet = new DataSet("renderas='Line' color='2C3F50'");
            //var dataSet = new DataSet("renderas='Line' color='FF679A'");
            var dataSet = new DataSet("renderas='Line' color='E42487'");
            dataSet.Attributes.Add("seriesName", Input.Rows[1].Values.First());
            dataSet.Attributes.Add("parentyaxis", "S");
            dataSet.Set = new List<Set>();

            foreach (var val in Input.Rows[1].Values.Skip(1))
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