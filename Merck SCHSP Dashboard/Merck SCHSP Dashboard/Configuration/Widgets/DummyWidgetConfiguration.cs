using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using Merck_SCHSP_Dashboard.Controllers.Widgets;
using Merck_SCHSP_Dashboard.DataComponents.DataSources;
using Merck_SCHSP_Dashboard.DataComponents.Transformers;
using Merck_SCHSP_Dashboard.Models.Config;
using Merck_SCHSP_Dashboard.Models.Data;

namespace Merck_SCHSP_Dashboard.Configuration.Widgets
{
    public class DummyWidgetConfiguration:WidgetConfiguration<List<DummyWidgetData>,object>
    {
        public DummyWidgetConfiguration(string tableName, string width)
        {
            HasName("Dummy");
            View.HasConfig(new DummyWidgetConfig {TableName = tableName, Background = width})
                .HasController<DummyWidgetController>();

            HasParameterDependency.On(Parameter.RecordCount);

            View.DataFlow
                .AddSource<DummyDataSource>()
                .Transform().By<DummyTransformer>();
        }
    }
}