using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Navigations
{
    public class AllRegionsNavigationConfiguration : NavigationConfiguration
    {
        public AllRegionsNavigationConfiguration(NavigationItem navItem)
        {
            HasName(navItem.Name);
            HasLabel(navItem.Label);
            Layout.HasConfig(navItem).HasController<AllRegionsLayoutController>();

            HasWidget(new CombinationChartWidgetConfiguration(navItem.Widgets.First()));
        }
    }
}