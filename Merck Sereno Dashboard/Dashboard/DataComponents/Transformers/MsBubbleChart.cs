using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Component.Chart.Fusion;
using CubeFramework;
using Dashboard.DataComponents.DataSources;

namespace Dashboard.DataComponents.Transformers
{
    public class MsBubbleChart
    {
        string defaultAttributes = @"showToolTip='1' palette='1' plotFillHoverColor='#4BACC6' numberSuffix='%' showXAxisValues='1' xAxisLabelMode='auto' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#000000' canvasBorderThickness='1' adjustDiv='0' bgColor='FFFFFF' numdivlines='0' showvalues='1' showtrendlinelabels='0' theme='fint'";
        public BubbleChartData chart { get; set; }
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public string CategoryString { get; set; }
        public string EndDate { get; set; }
        public string PeriodType { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorList;
        public CubeData Input { set; private get; }
        public MsBubbleChart()
        {
            _colorList = new ColorListDataSource();

        }

        public string GetChart()
        {
            chart = new BubbleChartData(defaultAttributes);
            var xMax = float.MinValue;
            var xMin = float.MaxValue;
            var yMax = float.MinValue;
            var yMin = float.MaxValue;

            for (int i = 0; i < Input.Rows.Count; i++)
            {
                if (Input.Rows[i].Values[3] != null || Input.Rows[i].Values[5] != null)
                {
                    xMax = GetMax(Input.Rows[i].Values[3] != "--" ? Input.Rows[i].Values[3]:"0", xMax);
                    xMin = GetMin(Input.Rows[i].Values[3] != "--" ? Input.Rows[i].Values[3] : "0", xMin);
                    yMax = GetMax(Input.Rows[i].Values[4] != "--" ? Input.Rows[i].Values[4] : "0", yMax);
                    yMin = GetMin(Input.Rows[i].Values[4] != "--" ? Input.Rows[i].Values[4] : "0", yMin);
                }
            }

            chart.Attributes.Add("xaxisminvalue", (xMin - 15).ToString());
            chart.Attributes.Add("xaxismaxvalue", (xMax + 15).ToString());
            chart.Attributes.Add("yaxisminvalue", (yMin - 50).ToString());
            chart.Attributes.Add("yaxismaxvalue", (yMax + 50).ToString());
            if (KPI.ToUpper() == "GROWTH")
            {
                chart.Attributes.Add("xaxisname", "Long-Term (Feb-15 - Feb-14)");
                chart.Attributes.Add("yaxisname", "Short-Term (Feb-15 - Nov-14)");
            }
            else
            {
                chart.Attributes.Add("xaxisname", "");
                chart.Attributes.Add("yaxisname", "Index in 000");
            }

            var diffBetXInterval = Convert.ToInt16(Math.Floor((xMax - xMin) / 5));

            for (var i = 0; i < xMax; i += diffBetXInterval)
            {
                var category = new Category();
                category.Attributes.Add("label", i.ToString());
                chart.Categories.Category.Add(category);
            }

            var dataset = new DataSet();
            foreach (var row in Input.Rows)
            {
                string toolText = "Series-" + row.Values[1] + ", Point: " + row.Values[3] != "--" ? row.Values[3] : "0" + ", (" + row.Values[3] != "--" ? row.Values[3] : "0" + "%," + row.Values[4] != "--" ? row.Values[4] : "0" + "%), Size: " + row.Values[5] != "--" ? row.Values[5] : "0";
                Set set = new Set()
                {
                    Attributes = new Dictionary<string, string>()
                        {
                            { "x", row.Values[3] != "--" ? row.Values[3]:"0" }, 
                            { "y", row.Values[4] != "--" ? row.Values[4]:"0"}, 
                            { "z", row.Values[5] != "--" ? row.Values[5]:"0"}, 
                            { "name", row.Values[1] },
                            { "color", _colorList.GetNextColor()},
                            {"tooltext",toolText}
                        }
                };
                //if (row.Values[1].ToUpper().Contains("TOTAL"))
                //{
                //    set = new Set()
                //    {
                //        Attributes = new Dictionary<string, string>()
                //        {
                //            { "x", row.Values[3] }, 
                //            { "y", row.Values[4] }, 
                //            { "z", row.Values[5] }, 
                //            { "name", row.Values[1] },
                //            { "color", ColorListDataSource.ColorOfTotal},
                //            {"tooltext",toolText}
                //        }
                //    };
                //}
                //else
                //{
                //    set = new Set()
                //    {
                //        Attributes = new Dictionary<string, string>()
                //        {
                //            { "x", row.Values[3] }, 
                //            { "y", row.Values[4] }, 
                //            { "z", row.Values[5] }, 
                //            { "name", row.Values[1] },
                //            { "color", _colorList.GetNextColor()},
                //            {"tooltext",toolText}
                //        }
                //    };
                //}

                dataset.Add(set);
            }
            chart.Dataset.Add(dataset);

            double yAxisDiff = (yMax - yMin)/3;
            chart.TrendLines.Add(new Line()
            {
                Attributes = new Dictionary<string, string>()
                {
                    {"startValue",(yMax + 50 - yAxisDiff).ToString()},
                    {"endValue",(yMax + 50).ToString()},
                    {"isTrendZone","1"},
                    {"color","#aaaaaa"},
                    {"alpha","14"},
                }
            });
            chart.TrendLines.Add(new Line()
            {
                Attributes = new Dictionary<string, string>()
                {
                    {"startValue",(yMin - 50 + yAxisDiff).ToString()},
                    {"endValue",(yMin - 50 + 2*yAxisDiff).ToString()},
                    {"isTrendZone","1"},
                    {"color","#aaaaaa"},
                    {"alpha","14"},
                }
            });
            return chart.RenderWithScript("98%", "360");
        }


        private float GetMax(string value, float max)
        {
            if (!string.IsNullOrEmpty(value))
            {
                var temp = float.Parse(value);
                if (temp > max)
                {
                    max = temp;
                }
            }
            return max;
        }

        private float GetMin(string value, float min)
        {
            if (!string.IsNullOrEmpty(value))
            {
                var temp = float.Parse(value);
                if (temp < min)
                {
                    min = temp;
                }
            }
            return min;
        }
    }

    public class BubbleChartData : MultiSeriesChart
    {
        public float XMax;
        public float XMin;

        public float YMax;
        public float YMin;
        public float ZMax;

        public BubbleChartData()
        {
            this.ChartType = "Bubble.swf";
        }

        public BubbleChartData(string chartAttributes)
            : base(chartAttributes)
        {
            this.ChartType = "Bubble.swf";
        }

        public BubbleChartData(Dictionary<string, string> chartAttributes)
            : base(chartAttributes)
        {
            this.ChartType = "Bubble.swf";
        }
    }
}