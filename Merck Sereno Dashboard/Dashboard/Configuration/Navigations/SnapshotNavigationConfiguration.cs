using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration.Filters;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using Dashboard.Export;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Navigations
{
    public class SnapshotNavigationConfiguration : NavigationConfiguration
    {
        public SnapshotNavigationConfiguration(NavigationItem navigationItem)
        {
            HasName(navigationItem.Name);

            Layout.HasConfig(navigationItem)
                .HasController<CompanySnapshotNavigationLayoutController>();

            HasFilter(new TopCountFilterConfiguration(navigationItem.Filters[0]));

            
            HasWidget(new SnapshotBottomTableWidgetConfiguration(navigationItem.Widgets[0]));

            this.HasExportController<NavExportController>();

            ExtendedProperties.Add("ExportFileName").WithValue(navigationItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}