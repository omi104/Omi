using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Component.Chart.Fusion;
using CubeFramework;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class CombinationChartTransformer : ITransformer<CubeData, SingleChartModel>
    {
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public string CategoryString { get; set; }
        public string PeriodString { get; set; }
        public string MeasureValue { get; set; }
        private ColorListDataSource _colorList;

        public CombinationChartTransformer()
        {
            _colorList = new ColorListDataSource();
        }
        public SingleChartModel GetData()
        {
            var model = new SingleChartModel();
            model.Title = "Performance vs. Competitors (in Euros)";
            model.Chart = "";
            //string defaultAttributes = @"bgColor='FFFFFF' legendNumColumns='2' labelDisplay='Rotate' slantLabels='1' plotGradientColor='' showAlternateHGridColor='0' showPlotBorder='0' divLineColor='5b95ad' showValues='0' legendShadow='0' legendBorderAlpha='0' showBorder='0' canvasBorderColor='#FFFFFF' canvasBorderThickness='0' adjustDiv='0' setadaptiveymin='1' setadaptivesymin='1'";

            if (KPI.ToUpper() == "SALES" || KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
            {
                model.Chart = new MsCombinationChart()
                {
                    Input = Input,
                    UncheckedItems = UncheckedItems,
                    KPI = KPI,
                    CategoryString = CategoryString,
                    PeriodString = PeriodString,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
           
            return model;
        }
        public CubeData Input { set; private get; }
    }
}