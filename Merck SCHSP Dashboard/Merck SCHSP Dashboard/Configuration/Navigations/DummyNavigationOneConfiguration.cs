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