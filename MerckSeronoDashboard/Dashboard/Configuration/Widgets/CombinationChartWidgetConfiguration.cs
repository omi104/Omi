using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class CombinationChartWidgetConfiguration : WidgetConfiguration<object, object>
    {
        public CombinationChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("")
                .HasController<CombiChartWidgetController>();
            View.DataFlow.AddSource<CubeDataSourceBase>()//CubeDataSourceBase
                .WithModule(widgetItem.ViewId)
                .Transform().By<CombinationChartTransformer>();

            HasParameterDependency.On(widgetItem.HasParamDependency);
        }
    }
}