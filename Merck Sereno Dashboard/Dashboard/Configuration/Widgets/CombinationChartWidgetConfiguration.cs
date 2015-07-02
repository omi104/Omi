using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Chart;
using Component.Chart.Fusion;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework.Configuration;
using DashboardFramework;

namespace Dashboard.Configuration.Widgets
{
    public class CombinationChartWidgetConfiguration : WidgetConfiguration<SingleChartModel, object>
    {
        public CombinationChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("")
                .HasController<CombiChartWidgetController>();

            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<CombinationChartTransformer>()
                .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"])
                .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                .HasProperty(t => t.RevertAxis).WithValue(p => p["@@TimePeriod_text"] == "MAT" || p["@@TimePeriod_text"] == "YTD")
                .HasProperty(t => t.UnitValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                .HasProperty(t => t.StartDate).WithValue(p => p["@@" + ParameterList.StartDate + "_text"])
                .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.AllRegionCombinationChart().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems]);

            Export.HasConfig(GetExportConfig).HasController<HomeExportController>()//p=>p["@@"+ParameterList.KPI+"_text"
                  .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                  .Transform().By<CubeDataToXTableTrendTransformer>()
                  .Transform().By<ExportModelTransformer>()
                  .HasProperty(t => t.NavigationNameString).WithValue(p => p.CurrentNavigationLabel())
                .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"])
                .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                .HasProperty(t => t.RevertAxis).WithValue(p => p["@@TimePeriod_text"] == "MAT" || p["@@TimePeriod_text"] == "YTD")
                .HasProperty(t => t.UnitValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                .HasProperty(t => t.StartDate).WithValue(p => p["@@" + ParameterList.StartDate + "_text"])
                .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.AllRegionCombinationChart().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems]);

            HasParameterDependency.On(widgetItem.HasParamDependency);
        }

        private CombinationChartExcelExport GetExportConfig(IReadOnlyDictionary<string, string> Param)
        {
            return new CombinationChartExcelExport()
            {
                KPI_Text = Param["@@" + ParameterList.KPI + "_text"],
                TimePeriod_Text = Param["@@" + ParameterList.TimePeriod + "_text"],
                EndDate_Text = Param["@@" + ParameterList.EndDate + "_text"],
            };
        }
    }

    public class CombinationChartExcelExport
    {
        public string KPI_Text { get; set; }
        public string TimePeriod_Text { get; set; }
        public string EndDate_Text { get; set; }
    }
}