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
    public class DummyNavigationTwoConfiguration:NavigationConfiguration
    {
        public DummyNavigationTwoConfiguration()
        {
            HasName("NavigationTwo");
            Layout.HasConfig(new DummyNavigationLayoutConfig
                             {
                                 Label = "Navigation two",
                                 Footer = "End of nevigation two"
                             })
                .HasController<DummyNavigationLayoutController>();

            HasWidget(new DummyWidgetConfiguration("Nav two Table", "grey"));
        }
    }
}