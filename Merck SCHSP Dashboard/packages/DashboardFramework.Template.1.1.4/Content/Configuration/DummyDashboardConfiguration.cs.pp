using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using $rootnamespace$.Configuration.Filters;
using $rootnamespace$.Configuration.Navigations;
using $rootnamespace$.Controllers.Layouts;
using $rootnamespace$.Models.Config;

namespace $rootnamespace$.Configuration
{
    public class DummyDashboardConfiguration:DashboardConfiguration
    {
        public DummyDashboardConfiguration()
        {
            HasName("DummyDashboard");
            HasTitle("This is dummy");
            Layout.HasConfig(new DummyDashboardLayoutConfig
                             {
                                 Header = "Dummy Dashboard",
                                 CopyRight = "Copyright IMS Dhaka 2013"
                             });
            Layout.HasController<DummyDashboardLayoutController>();

            RegularParameters
                .Add(Parameter.RecordCount).WithValue("5");

            HasFilter(new DummyRecordCountFilterConfiguration());

            HasNavigation(new DummyNavigationOneConfiguration());
            HasNavigation(new DummyNavigationTwoConfiguration());

            HasDefaultNavigation("NavigationOne");
        }
    }
}