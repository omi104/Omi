using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
using CubeFramework;
using Dashboard.DataComponents.DataSources;

namespace Dashboard.DataComponents.Transformers
{
    public class MsMerckLineChart
    {
        string defaultAttributes = @"bgColor='FFFFFF' legendNumColumns='2' labelDisplay='Rotate' slantLabels='1' legendPosition='right' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' canvasBorderThickness='0' adjustDiv='0' setadaptiveymin='1' setadaptivesymin='1'";
        public MSLineChart chart { get; set; }
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public bool RevertAxis { get; set; }
        public string UnitValue { get; set; }
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorList;
        public CubeData Input { set; private get; }

        public MsMerckLineChart()
        {
            _colorList = new ColorListDataSource();
        }

        public string GetChart()
        {
            chart = new MSLineChart(defaultAttributes)
            {
                Dataset = new List<DataSet>()
            };
            if (KPI.ToUpper() == "MARKET SHARE")
                chart.Attributes.Add("yAxisName", "In %");
            if (KPI.ToUpper() == "EVOLUTION INDEX")
                chart.Attributes.Add("yAxisName", "Index in 000");
            chart.ControlId = "interactiveTrendChart";
            AddStyles();

            if (RevertAxis && (KPI == "EVOLUTION INDEX" || KPI == "MARKET SHARE"))
            {
                foreach (Row t in Input.Rows)
                {
                    var category = new Category();
                    category.Attributes.Add("label", t.Values[1]);
                    chart.Categories.Category.Add(category);
                }
                foreach (var col in Input.Columns.Skip(3))
                {
                    var dataSet = new DataSet("renderas='Line'");
                    dataSet.Attributes.Add("seriesName", col.Name.Split('_').ToArray()[0]);
                    dataSet.Attributes.Add("parentyaxis", "S");
                    dataSet.Set = new List<Set>();

                    string color = _colorList.GetNextColor();
                    dataSet.Attributes.Add("color", "#" + color);
                    dataSet.Attributes.Add("anchorBgColor", "#" + color);

                    foreach (var row in Input.Rows)
                    {
                        var set1 = new Set();
                        set1.Attributes.Add("value", row[col.Position]);
                        dataSet.Set.Add(set1);
                    }
                    chart.Dataset.Add(dataSet);
                }
            }
            else
            {
                foreach (var col in Input.Columns.Skip(3))
                {
                    var category = new Category();
                    category.Attributes.Add("label", col.Name.Split('_').ToArray()[0]);
                    chart.Categories.Category.Add(category);
                }

                for (int i = 0; i < Input.Rows.Count; i++)
                {
                    if (!UncheckedItems.Contains(Input.Rows[i].Values[1]))
                        chart.Dataset.Add(AddTrendLineDataSet(Input.Rows[i]));
                }
            }
            
            
            return chart.RenderWithScript("98%", "360", isForceHtmlRender: true);
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

        private DataSet AddTrendLineDataSet(Row row)
        {
            var dataSet = new DataSet("renderas='Line'");
            dataSet.Attributes.Add("seriesName", row.Values[1]);
            dataSet.Attributes.Add("parentyaxis", "S");
            dataSet.Set = new List<Set>();

            if (row.Values[1].ToUpper().Contains("TOTAL"))
            {
                dataSet.Attributes.Add("color", ColorListDataSource.ColorOfTotal);
                dataSet.Attributes.Add("anchorBgColor", ColorListDataSource.ColorOfTotal);
            }
            else
            {
                string color = _colorList.GetNextColor();
                dataSet.Attributes.Add("color", "#" + color);
                dataSet.Attributes.Add("anchorBgColor", "#" + color);
            }
            

            foreach (var val in row.Values.Skip(3))
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
    }
}