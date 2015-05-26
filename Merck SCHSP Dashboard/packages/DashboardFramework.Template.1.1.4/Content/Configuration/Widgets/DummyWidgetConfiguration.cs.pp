using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using $rootnamespace$.Controllers.Widgets;
using $rootnamespace$.DataComponents.DataSources;
using $rootnamespace$.DataComponents.Transformers;
using $rootnamespace$.Models.Config;
using $rootnamespace$.Models.Data;

namespace $rootnamespace$.Configuration.Widgets
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