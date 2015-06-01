using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using Dashboard.Controllers.Widgets;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Config;
using Dashboard.Models.Data;

namespace Dashboard.Configuration.Widgets
{
    public class BlankWidgetConfiguration:WidgetConfiguration<List<DummyWidgetData>,object>
    {
        public BlankWidgetConfiguration()
        {
            HasName("BlankWidget");
            View.HasConfig("").HasController<BlankWidgetController>();
        }
    }
}