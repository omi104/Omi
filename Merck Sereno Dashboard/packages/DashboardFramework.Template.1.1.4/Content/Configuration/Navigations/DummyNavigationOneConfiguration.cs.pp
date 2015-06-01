using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using $rootnamespace$.Configuration.Widgets;
using $rootnamespace$.Controllers.Layouts;
using $rootnamespace$.Models.Config;

namespace $rootnamespace$.Configuration.Navigations
{
    public class DummyNavigationOneConfiguration:NavigationConfiguration
    {
        public DummyNavigationOneConfiguration()
        {
            HasName("NavigationOne");
            Layout.HasConfig(new DummyNavigationLayoutConfig
                             {
                                 Label = "Navigation One",
                                 Footer = "End of nevigation one"
                             })
                .HasController<DummyNavigationLayoutController>();

            HasWidget(new DummyWidgetConfiguration("Nav One Table", "green"));
        }
    }
}