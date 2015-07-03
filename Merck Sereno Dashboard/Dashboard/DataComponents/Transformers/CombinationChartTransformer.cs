using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
using CubeFramework;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Components;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class CombinationChartTransformer : ITransformer<CubeData, SingleChartModel>
    {
        public string UncheckedItems { get; set; }
        public string WidgetName { get; set; }
        public string KPI { get; set; }
        public bool RevertAxis { get; set; }
        public string UnitValue { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PeriodType { get; set; }
        public string CategoryString { get; set; }
        public string MeasureValue { get; set; }
        public string country { get; set; }
        public string RegionOrCluster { get; set; }
        private ColorListDataSource _colorList;

        public CombinationChartTransformer()
        {
            _colorList = new ColorListDataSource();
        }
        public SingleChartModel GetData()
        {
            var model = new SingleChartModel { Chart = ""};
            if (WidgetName == WidgetItems.HomeTrendChart().Name)
            {
                if (RegionOrCluster == "-ALL-" && country == "-na-")
                {
                    model.Title = "Total Market vs Merck Sales trend in global" + "-" + PeriodType + "-" + StartDate +
                                      "-" + EndDate;    
                }
                else if (country == "ALL COUNTRIES")
                {
                    model.Title = "Total Market vs Merck Sales trend in "+RegionOrCluster + "-" + PeriodType + "-" + StartDate +
                                      "-" + EndDate; 

                    
                }
                else if(RegionOrCluster != "-ALL-" && country != "ALL COUNTRIES")
                {
                    model.Title = "Total Market vs Merck Sales trend in "+country + "-" + PeriodType + "-" + StartDate +
                                      "-" + EndDate; 
                    
                }

               
                model.Chart = new MsCombinationChart()
                {
                    WidgetName = WidgetName,
                    Input = Input,
                    UncheckedItems = UncheckedItems,
                    KPI = KPI,
                    RevertAxis = RevertAxis,
                    UnitValue = UnitValue,
                    CategoryString = CategoryString,
                    PeriodType = PeriodType,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
            else if (KPI.ToUpper() == "SALES" || KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
            {
                if (KPI.ToUpper() == "SALES")
                    model.Title = "Sales (in " + UnitValue + ")";
                if (KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
                    model.Title = "Performance vs. Competitors (in " + UnitValue + ")";
                model.Chart = new MsCombinationChart()
                {
                    Input = Input,
                    UncheckedItems = UncheckedItems,
                    KPI = KPI,
                    RevertAxis=RevertAxis,
                    UnitValue = UnitValue,
                    CategoryString = CategoryString,
                    PeriodType = PeriodType,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
            else if (KPI.ToUpper() == "MARKET SHARE" || KPI.ToUpper() == "EVOLUTION INDEX")
            {
                if (KPI.ToUpper() == "MARKET SHARE")
                    model.Title = "Market Share % (" + UnitValue +")";
                if (KPI.ToUpper() == "EVOLUTION INDEX")
                    model.Title = "Evolution Index (" + UnitValue + ")";
                model.Chart = new MsMerckLineChart()
                {
                    Input = Input,
                    UncheckedItems = UncheckedItems,
                    KPI = KPI,
                    RevertAxis = RevertAxis,
                    CategoryString = CategoryString,
                    PeriodType = PeriodType,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
            else//bubble chart
            {
                if (KPI.ToUpper() == "GROWTH")
                    model.Title = "Growth % (" + UnitValue + ")";
                model.Chart = new MsBubbleChart()
                {
                    Input = Input,
                    UncheckedItems = UncheckedItems,
                    KPI = KPI,
                    CategoryString = CategoryString,
                    PeriodType = PeriodType,
                    EndDate=EndDate,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
            return model;
        }
        public CubeData Input { set; private get; }
    }
}