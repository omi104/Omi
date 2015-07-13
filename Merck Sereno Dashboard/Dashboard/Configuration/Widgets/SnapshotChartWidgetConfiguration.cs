using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class SnapshotChartWidgetConfiguration : WidgetConfiguration<SingleChartModel, object>
    {
        public SnapshotChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            HasTitle(widgetItem.Name);

            View.HasController<CombiHomeChartWidgetController>();

            View.HasConfig("");

            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<CompanySnapshotChartDataTransformer>()
                .HasProperty(t => t.PeriodString).WithValue(p => p["@@"+ParameterList.TimePeriod+"_text"])
                .HasProperty(t => t.MeasureValue).WithValue(p => p["@@"+ParameterList.UnitOrValue+"_text"]);
            HasParameterDependency.On(widgetItem.HasParamDependency);
        }
    }
}