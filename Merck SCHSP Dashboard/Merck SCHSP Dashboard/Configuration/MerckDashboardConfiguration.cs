using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using Merck_SCHSP_Dashboard.Configuration.Filters;
using Merck_SCHSP_Dashboard.Configuration.Navigations;
using Merck_SCHSP_Dashboard.Controllers.Layouts;
using Merck_SCHSP_Dashboard.Models.Config;

namespace Merck_SCHSP_Dashboard.Configuration
{
    public class MerckDashboardConfiguration:DashboardConfiguration
    {
        public MerckDashboardConfiguration()
        {
            HasName("Merck_SCHSP_Dashboard");
            HasTitle("This is dummy");
            Layout.HasConfig(new MerckDashboardLayoutConfig
                             {
                                 Header = "Dummy Dashboard",
                                 CopyRight = "Copyright IMS Dhaka 2013"
                             });
            Layout.HasController<MerckDashboardLayoutController>();

            RegularParameters
                .Add(Parameter.RecordCount).WithValue("5");

            HasFilter(new DummyRecordCountFilterConfiguration());

            HasNavigation(new DummyNavigationOneConfiguration());
            HasNavigation(new DummyNavigationTwoConfiguration());

            HasDefaultNavigation("NavigationOne");
        }
    }
}