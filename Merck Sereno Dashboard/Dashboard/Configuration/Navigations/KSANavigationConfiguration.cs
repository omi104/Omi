using System;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using Dashboard.Export;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Navigations
{
    public class KSANavigationConfiguration : NavigationConfiguration
    {
        public KSANavigationConfiguration(NavigationItem navigationItem)
        {
            HasName(navigationItem.Name);
            Layout.HasConfig(navigationItem)
                .HasController<AllRegionNavigationLayoutController>();

            HasWidget(new CombinationChartWidgetConfiguration(navigationItem.Widgets[0]));
            HasWidget(new TrendTableWidgetConfiguration(navigationItem.Widgets[1]));

            this.HasExportController<NavExportController>();

            ExtendedProperties.Add("ExportFileName").WithValue(navigationItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}