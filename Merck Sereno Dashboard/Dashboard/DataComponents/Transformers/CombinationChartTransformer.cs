﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Component.Chart.Fusion;
using Component.Chart.Fusion.Implementation;
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
        public string UnitValue { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
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
            var model = new SingleChartModel { Chart = ""};

            if (KPI.ToUpper() == "SALES" || KPI.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
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
                    UnitValue = UnitValue,
                    CategoryString = CategoryString,
                    PeriodString = PeriodString,
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
                    CategoryString = CategoryString,
                    PeriodString = PeriodString,
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
                    PeriodString = PeriodString,
                    MeasureValue = MeasureValue,
                }.GetChart();
            }
            return model;
        }
        public CubeData Input { set; private get; }
    }
}