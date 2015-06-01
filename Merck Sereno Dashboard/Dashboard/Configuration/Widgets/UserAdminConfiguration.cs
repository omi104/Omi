using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class UserAdminConfiguration : WidgetConfiguration<UserData, object>
    {
        public UserAdminConfiguration(NavigationItem navItem)
        {
            var widgetName = "RB" + navItem.Name;
            HasName(widgetName);
            View.HasController<UserAdminController>();
            View.HasConfig(widgetName);

            View.DataFlow
                .AddSource<CubeDataSourceBase>().WithModule(navItem.Widgets[0].ViewId)
                .Transform().By<CubeDataToDictionaryTransformer>()
                .Transform().By<UserAdminTransformer>();
            Export.HasController<UserAdminExportController>()
                  .DataFlow.AddSource<UserAdminDataSource>()
                  .Transform().By<UserAdminExportTransformer>();
        }
    }
}