using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
using CubeFramework;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Data;

namespace Dashboard.DataComponents.Transformers
{
    public class CombinationTrendChartTransformer
    {
        private readonly CubeData _input;
        private readonly string _uncheckedItems;
        public string AbsoluteTousandValue { get; set; }
        public MSCombi2D chart { get; set; }
        private readonly string _controlId;
        private ColorListDataSource _colorList;
        //private const string ColorOfTotal = "FFA3D1";
        private const string ColorOfTotal = "4d9bbc";

        public CombinationTrendChartTransformer(string controlId, CubeData input, string uncheckedItems)
        {
            _input = input;
            _controlId = controlId;
            _uncheckedItems = uncheckedItems;
            _colorList = new ColorListDataSource();
        }

        public SingleChartModel GetChart()
        {
            var model = new SingleChartModel();
            model.Chart = "";
            string defaultAttributes = @"bgColor='FFFFFF' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' labelDisplay='WRAP' slantLabels='1' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='BBBBBB' canvasBorderThickness='3' canvasBgAlpha='100' canvasBgColor='FFFFFF' canvasBorderAlpha='0' adjustDiv='0' vdivlineisdashed='1' numVdivlines='5' vdivlinealpha='50' showAlternateVGridColor='1' VDivLineColor='5b95ad' anchorImageHoverScale='5'";
            chart = new MSCombi2D(defaultAttributes)
            {
                Dataset = new List<DataSet>(),
            };

            if (_input == null || _input.Rows.Count == 0)
                return model;

            chart.Categories = new Categories();
            chart.Categories.Category = new List<Category>();
            chart.ControlId =_controlId;
            if (AbsoluteTousandValue == "Absolute")
                chart.Attributes.Add("formatNumberScale", "0");
            else
            {
                chart.Attributes.Add("numberScaleValue", "1000");//
                chart.Attributes.Add("numberScaleUnit", "K");
            }
            
            foreach (var col in _input.Columns.Skip(3))
            {
                var category = new Category();
                category.Attributes.Add("label", col.Name);
                chart.Categories.Category.Add(category);
            }
            if (!_uncheckedItems.ToUpper().Contains("TOTAL"))
            {
                chart.Dataset.Add(AddFirstDataSet());
            }
            
            chart.Dataset.AddRange(AddTrendLineDataSet());

            AddStyles(chart);
            model.Chart = chart.RenderWithScript("100%", "380");
            return model;
        }

        private DataSet AddFirstDataSet()
        {

            var dataSet = new DataSet("color=" + ColorOfTotal);
            dataSet.Attributes.Add("seriesName", _input.Rows.First().Values[1]);
            dataSet.Set = new List<Set>();
            foreach(var value in _input.Rows.First().Values.Skip(3))
            {
                var set1 = new Set();
                set1.Attributes.Add("value",value);
                dataSet.Set.Add(set1);
            }
            return dataSet;
        }

        private List<DataSet> AddTrendLineDataSet()
        {
            var dataSets = new List<DataSet>();
            var count = _input.Rows.Count;
            if (count > 11)
            {
                count = 16;
            }
            for (int i = 1; i < _input.Rows.Count;i++ )
            {
                if (string.IsNullOrEmpty(_uncheckedItems) || !_uncheckedItems.Contains(_input.Rows[i].Values[1]))
                {
                    var dataSet = new DataSet("renderas='Line' parentYAxis='P'");
                    dataSet.Attributes.Add("seriesName", _input.Rows[i].Values[1]);
                    //dataSet.Attributes.Add("color", colorList[i % 15]);
                    dataSet.Set = new List<Set>();

                    for (int j = 3; j < _input.Columns.Count; j++)
                    {
                        var set1 = new Set();
                        set1.Attributes.Add("value", _input.Rows[i].Values[j]);
                        dataSet.Set.Add(set1);
                    }
                    if (_input.Rows[i].Values[1].ToUpper().Contains("RECKITT BENCKISER"))
                    {
                        dataSet.Attributes.Add("color", "#de2588");
                        dataSet.Attributes.Add("anchorBgColor", "#de2588");
                    }
                    else
                    {
                        string color = _colorList.GetNextColor();
                        dataSet.Attributes.Add("color", "#" + color);
                        dataSet.Attributes.Add("anchorBgColor", "#" + color);
                    }
                    dataSets.Add(dataSet);
                }
            }
            return dataSets;
        }
        public void AddStyles(MSCombi2D chart)
        {
            chart.Styles = new Styles {Definition = new List<Definition>()};
            var style = new Style();
            style.Attributes.Add("name", "Shadow_0");
            style.Attributes.Add("type", "Shadow");
            style.Attributes.Add("Angle", "130");
            style.Attributes.Add("Color", "#202020");
            style.Attributes.Add("Alpha", "30");
            style.Attributes.Add("blurX", "0");
            style.Attributes.Add("blurY", "0");
            style.Attributes.Add("Strength", "5");
            var definition = new Definition {Style = style};
            chart.Styles.Definition.Add(definition);
            var apply = new Apply();
            apply.Attributes.Add("toObject", "CANVAS");
            apply.Attributes.Add("styles", "Shadow_0");
            var application = new Application {Apply = apply};
            chart.Styles.Application.Add(application);
        }
    }
}