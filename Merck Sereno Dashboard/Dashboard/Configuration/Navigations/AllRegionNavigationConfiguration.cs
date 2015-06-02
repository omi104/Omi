using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.Configuration.Filters;
using Dashboard.Controllers;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.Export;
using DashboardFramework.Configuration;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers.Layouts;
using Dashboard.Models.Config;

namespace Dashboard.Configuration.Navigations
{
    public class AllRegionNavigationConfiguration:NavigationConfiguration
    {
        public AllRegionNavigationConfiguration(NavigationItem navigationItem)
        {
            HasName(navigationItem.Name);
            Layout.HasConfig(navigationItem)
                .HasController<AllRegionNavigationLayoutController>();

            HasWidget(new CombinationChartWidgetConfiguration(WidgetItems.AllRegionCombinationChart()));
            HasWidget(new TrendTableWidgetConfiguration(navigationItem.Widgets.First()));

            this.HasExportController<NavExportController>();

            ExtendedProperties.Add("ExportFileName").WithValue(navigationItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}