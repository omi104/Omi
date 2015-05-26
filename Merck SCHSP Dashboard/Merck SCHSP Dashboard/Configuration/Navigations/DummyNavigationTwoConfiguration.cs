using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.Configuration;
using Merck_SCHSP_Dashboard.Configuration.Widgets;
using Merck_SCHSP_Dashboard.Controllers.Layouts;
using Merck_SCHSP_Dashboard.Models.Config;

namespace Merck_SCHSP_Dashboard.Configuration.Navigations
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