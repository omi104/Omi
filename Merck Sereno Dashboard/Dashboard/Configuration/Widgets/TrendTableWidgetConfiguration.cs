using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration.Filters;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class TrendTableWidgetConfiguration : WidgetConfiguration<TableChartConfig, object>
    {
        public TrendTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig(p => p)
                .HasController<TrendTableWidgetController>();

            View.DataFlow.AddSource<CubeDataSourceBase>()//DummyTableDataSource
                .WithModule(widgetItem.ViewId)
                .Transform().By<TableChartTransformer>()
                .HasProperty(t => t.ShowFullLength).WithValue(true)
                .HasProperty(t => t.NavigationName).WithValue(p => p.CurrentNavigationName())
                .HasProperty(t => t.MeasureType).WithValue(p => p["@@KPI_text"])
                .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                .HasProperty(t => t.Date).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                 .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.Top10IntPrdTable().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems])
                 .HasProperty(t => t.ParamName).WithValue(p => widgetItem.Name == WidgetItems.Top10IntPrdTable().Name ? ParameterList.RegionUncheckedItems : ParameterList.KsaUncheckedItems)
                 .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"]);

            Export.HasConfig(GetExportConfig).HasController<TableExportController>()
            .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
            .Transform().By<CubeDataToXTableTrendTransformer>()
            .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"])
            .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
            .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
            .Transform().By<ExportModelTransformer>()
            .HasProperty(t => t.NavigationNameString).WithValue(p => p.CurrentNavigationLabel())
            .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"])
            .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
            .HasProperty(t => t.RevertAxis).WithValue(p => p["@@TimePeriod_text"] == "MAT" || p["@@TimePeriod_text"] == "YTD")
            .HasProperty(t => t.UnitValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
            .HasProperty(t => t.StartDate).WithValue(p => p["@@" + ParameterList.StartDate + "_text"])
            .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
            .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.AllRegionCombinationChart().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems])
            .Transform().By<ExportTableSplitTrasformerForPpt>()
            .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"]);

            if (widgetItem.HasParamDependency != null && widgetItem.HasParamDependency.Count > 0)
            {
                HasParameterDependency.On(widgetItem.HasParamDependency);
            }
        }
        private ExcelExportConfig GetExportConfig(IReadOnlyDictionary<string, string> Param)
        {
            return new ExcelExportConfig()
            {
                KPI_Text = Param["@@" + ParameterList.KPI + "_text"],
                TimePeriod_Text = Param["@@" + ParameterList.TimePeriod + "_text"],
                EndDate_Text = Param["@@" + ParameterList.EndDate + "_text"],
                IsTable = true
            };
        }
    }
}