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
        public MSCombi2D chart { get; set; }
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }

        public SingleChartModel GetData()
        {
            var model = new SingleChartModel();
            model.Title = "Chart Title";
            model.Chart = "";
            //string defaultAttributes = @"bgColor='FFFFFF' labelDisplay='Rotate' slantLabels='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' canvasBorderThickness='0' adjustDiv='0'";
            string defaultAttributes = @"palette='2' caption='Sales' subcaption='March 2006' showvalues='0' divlinedecimalprecision='1' limitsdecimalprecision='1' pyaxisname='Amount' syaxisname='Quantity' numberprefix='$' formatnumberscale='0' areaovercolumns='0' legendiconscale='4' showborder='0'";
            chart = new MSCombi2D(defaultAttributes)
            {
                Dataset = new List<DataSet>(),
            };

            if (Input == null || Input.Rows.Count == 0)
                return model;

            chart.Categories = new Categories();
            chart.Categories.Category = new List<Category>();
            chart.ControlId = "CatVsSalesTrendChart";

            foreach(var col in Input.Columns.Skip(1))
            {
                var category = new Category();
                category.Attributes.Add("label", col.Name);
                chart.Categories.Category.Add(category);
            }
            chart.Dataset.Add(AddFirstDataSet());
            foreach (var row in Input.Rows.Skip(1))
            {
                var dataSet = new DataSet();
                dataSet.Attributes.Add("seriesname", row.Values.First());
                dataSet.Attributes.Add("renderas", "Line");
                dataSet.Set = new List<Set>();

                foreach (var val in row.Values.Skip(1))
                {
                    var set1 = new Set();
                    set1.Attributes.Add("value", val);
                    dataSet.Set.Add(set1);
                }
                chart.Dataset.Add(dataSet);
            }
            
            model.Chart= chart.RenderWithScript("500", "500");
            return model;
        }

        
        private DataSet AddFirstDataSet()
        {
            var dataSet = new DataSet();
            dataSet.Attributes.Add("seriesname", Input.Rows.First().Values.First());
            dataSet.Attributes.Add("renderas", "Area");
            dataSet.Set = new List<Set>();

            foreach (var val in Input.Rows.First().Values.Skip(1))
            {
                var set1 = new Set();
                set1.Attributes.Add("value", val);
                dataSet.Set.Add(set1);
            }
            return dataSet;
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