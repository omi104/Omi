using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Component.Chart.Fusion;
using CubeFramework;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Data;

namespace Dashboard.DataComponents.Transformers
{
    public class MsCombinationChart
    {
        string defaultAttributes = @"chartLeftMargin='0' chartRightMargin='0' chartBottomMargin='0' bgColor='FFFFFF' legendNumColumns='2' labelDisplay='Rotate' slantLabels='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' legendPosition='right' canvasBorderThickness='0' adjustDiv='0'";
        public MSCombiDY2D chart { get; set; }
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public string PeriodType { get; set; }
        public string WidgetName { get; set; }
        public bool RevertAxis { get; set; }
        public string UnitValue { get; set; }
        public string CategoryString { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorList;
        public CubeData Input { set; private get; }

        public MsCombinationChart()
        {
            _colorList = new ColorListDataSource();
        }
        public string GetChart()
        {
            chart = new MSCombiDY2D(defaultAttributes)
            {
                Dataset = new List<DataSet>(),
            };
            if (KPI.ToUpper() == "SALES")
            {
                chart.Attributes.Add("pyAxisName", "In " + UnitValue + " 000");
                chart.Attributes.Add("sYAXisName", "In %");
            }
            
            chart.ControlId = "interactiveTrendChart";

            if (KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
            {
                chart.Attributes.Add("pyAxisName", "");
                chart.Attributes.Add("sYAXisName", "In " + UnitValue + " 000");
            }

            AddStyles();

            if (RevertAxis && KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
            {
                foreach (Row t in Input.Rows.Skip(1))
                {
                    var category = new Category();
                    category.Attributes.Add("label", t.Values[1]);
                    chart.Categories.Category.Add(category);
                }

                foreach (var col in Input.Columns.Skip(3))
                {
                    var dataSet = new DataSet("renderas='Line'");
                    if(PeriodType == "MAT" || PeriodType == "YTD")
                        dataSet.Attributes.Add("seriesName", PeriodType+" "+col.Name.Split('_').ToArray()[0]);
                    else
                        dataSet.Attributes.Add("seriesName", col.Name.Split('_').ToArray()[0]);
                    dataSet.Attributes.Add("parentyaxis", "S");
                    dataSet.Set = new List<Set>();
                    string color = _colorList.GetNextColor();
                    dataSet.Attributes.Add("color", "#" + color);
                    dataSet.Attributes.Add("anchorBgColor", "#" + color);

                    foreach (var row in Input.Rows.Skip(1))
                    {
                        var set1 = new Set();
                        set1.Attributes.Add("value", row[col.Position] == "--" ? "0" : row[col.Position]);
                        dataSet.Set.Add(set1);
                    }
                    chart.Dataset.Add(dataSet);
                }
                
            }
            else
            {
                foreach (var col in KPI.ToUpper() == "SALES" ? Input.Columns.Skip(2) : Input.Columns.Skip(3))
                {
                    var category = new Category();
                    if(PeriodType == "MAT" || PeriodType == "YTD")
                        category.Attributes.Add("label", PeriodType+" "+col.Name.Split('_').ToArray()[0]);
                    else
                        category.Attributes.Add("label", col.Name.Split('_').ToArray()[0]);
                    chart.Categories.Category.Add(category);
                }
                if (!UncheckedItems.Contains(Input.Rows[0].Values[1]))
                    chart.Dataset.Add(AddFirstDataSet());

                for (var i = 1; i < Input.Rows.Count; i++)
                {
                    if (!UncheckedItems.Contains(Input.Rows[i].Values[1]))
                        chart.Dataset.Add(AddTrendLineDataSet(Input.Rows[i]));
                }
            }
            
            return chart.RenderWithScript("98%", "360",isForceHtmlRender:true);
        }

        private DataSet AddFirstDataSet()
        {
            var dataSet = new DataSet();
            if (KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
                dataSet.Attributes.Add("renderas", "Area");
            dataSet.Attributes.Add("seriesName", WidgetName=="HomeTrendChart"?Input.Rows.First().Values[0]:Input.Rows.First().Values[1]);
            dataSet.Attributes.Add("parentYAxis", "P");

            if (!UncheckedItems.ToUpper().Contains("TOTAL"))
            {
                dataSet.Attributes.Add("color", ColorListDataSource.ColorOfTotal);
            }
            dataSet.Set = new List<Set>();

            foreach (var val in KPI.ToUpper() == "SALES" ? Input.Rows.First().Values.Skip(2) : Input.Rows.First().Values.Skip(3))
            {
                var set1 = new Set();
                set1.Attributes.Add("value", val == "--" ? "0" : val);
                dataSet.Set.Add(set1);
            }
            return dataSet;
        }

        private DataSet AddTrendLineDataSet(Row row)
        {
            var dataSet = new DataSet("renderas='Line'");
            if (row.Values[1] == "--")
                row.Values[1] = "%PPG";
            dataSet.Attributes.Add("seriesName", WidgetName=="HomeTrendChart"?row.Values[0]:row.Values[1]);
            dataSet.Attributes.Add("parentyaxis", "S");
            dataSet.Set = new List<Set>();
            string color = _colorList.GetNextColor();
            dataSet.Attributes.Add("color", "#" + color);
            dataSet.Attributes.Add("anchorBgColor", "#" + color);
            if (WidgetName == "HomeTrendChart")
            {
                foreach (var val in row.Values.Skip(1))
                {
                    var set1 = new Set();
                    set1.Attributes.Add("value", val == "--" ? "0" : val);
                    dataSet.Set.Add(set1);
                }
            }
            else
            {
                foreach (var val in KPI == "SALES" ? row.Values.Skip(2) : row.Values.Skip(3))
                {
                    var set1 = new Set();
                    set1.Attributes.Add("value", val == "--" ? "0" : val);
                    dataSet.Set.Add(set1);
                }
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
    }
}