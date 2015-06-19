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
        string defaultAttributes = @"showToolTip='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#000000' canvasBorderThickness='0' adjustDiv='0' bgColor='FFFFFF' numdivlines='2' showvalues='1' showtrendlinelabels='0'";
        public BubbleChartData chart { get; set; }
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorList;
        public CubeData Input { set; private get; }
        public MsBubbleChart()
        {
            _colorList = new ColorListDataSource();
            
        }

        public string GetChart()
        {
            var columns = new List<Column>();
            var rows = new List<Row>();

            columns = new List<Column>
            {
                new Column("Rank", 0),
                new Column("Product", 1),
                new Column("Aaa", 2),
                new Column("Bbb", 3),
                new Column("Ccc", 4),
            };

            rows = new List<Row>
            {
                new Row(new List<string>() {"0","NEUROBION","80","15000","24"}),
                new Row(new List<string>() {"1","SEVEN SEAS","60","18500","26"}),
                new Row(new List<string>() {"2","DICLO ","50","19450","19"}),
            };
            Input = new CubeData(columns, rows);

            chart = new BubbleChartData(defaultAttributes);

            var xMax = float.MinValue;
            var xMin = float.MaxValue;
            var yMax = float.MinValue;
            var yMin = float.MaxValue;

            for (int i = 0; i < Input.Rows.Count; i++)
            {
                if (Input.Rows[i].Values[2] != null || Input.Rows[i].Values[3] != null)
                {
                    xMax = GetMax(Input.Rows[i].Values[2], xMax);
                    xMin = GetMin(Input.Rows[i].Values[2], xMin);
                    yMax = GetMax(Input.Rows[i].Values[3], yMax);
                    yMin = GetMin(Input.Rows[i].Values[3], yMin);
                }
            }

            chart.Attributes.Add("xaxisminvalue", (xMin - 15).ToString());
            chart.Attributes.Add("xaxismaxvalue", (xMax + 15).ToString());
            chart.Attributes.Add("yaxisminvalue", (yMin - 1000).ToString());
            chart.Attributes.Add("yaxismaxvalue", (yMax + 1000).ToString());
            if (KPI.ToUpper() == "GROWTH")
            {
                chart.Attributes.Add("xaxisname", "Long-Term (Feb-15 - Feb-14)");
                chart.Attributes.Add("yaxisname", "Short-Term(Feb15-Nov14)");
            }
            else
            {
                chart.Attributes.Add("xaxisname", "");
                chart.Attributes.Add("yaxisname", "Index in 000");    
            }
            
            var diffBetXInterval = Convert.ToInt16(Math.Floor((xMax - xMin)/5));

            for (var i = 0; i < xMax; i += diffBetXInterval)
            {
                var category = new Category();
                category.Attributes.Add("label", i.ToString());
                chart.Categories.Category.Add(category);
            }
            
            var dataset = new DataSet();
            foreach (var row in Input.Rows)
            {
                string toolText = "Series-" + row.Values[1] + ", Point: " + row.Values[2] + ", (" + row.Values[2] + "%," + row.Values[4] + "%), Size: " + row.Values[3];
                var set = new Set()
                {
                    Attributes = new Dictionary<string, string>()
                    {
                        { "x", row.Values[2] }, 
                        { "y", row.Values[3] }, 
                        { "z", row.Values[4] }, 
                        { "name", row.Values[1] },
                        { "color", _colorList.GetNextColor()},
                        {"tooltext",toolText}
                    }
                };
                dataset.Add(set);
            }                       
            chart.Dataset.Add(dataset);
            return chart.RenderWithScript("98%", "280");
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

    public class BubbleChartData: MultiSeriesChart
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