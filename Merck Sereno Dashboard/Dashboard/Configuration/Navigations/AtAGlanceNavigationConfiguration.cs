using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.Configuration.Filters;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using Dashboard.Export;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Navigations
{
    public class AtAGlanceNavigationConfiguration : NavigationConfiguration
    {
        public AtAGlanceNavigationConfiguration(NavigationItem navigationItem)
        {
            HasName(navigationItem.Name);
            HasLabel(navigationItem.Label);
            if (navigationItem.Filters.Count > 0)
                HasFilter(new TopCountFilterConfiguration(navigationItem.Filters[0]));
            Layout.HasConfig(navigationItem).HasController<AtAGlanceNavigationLayoutController>();
            HasWidget(new ExpandCollapseTableWidgetConfiguration(navigationItem.Widgets[0]));

            this.HasExportController<NavExportController>();
            

            ExtendedProperties.Add("ExportFileName").WithValue(navigationItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}