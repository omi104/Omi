﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration.Widgets;
using Dashboard.Controllers;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.Export;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Navigations
{
    public class HomeNavigationConfiguration : NavigationConfiguration
    {
        public HomeNavigationConfiguration(NavigationItem navItem)
        {
            HasName(navItem.Name);
            HasLabel(navItem.Label);
            Layout.HasController<HomeNavigationLayoutController>();
            HasWidget(new WelcomeTextnImageWidgetConfiguration(navItem.Widgets.First()));
            HasWidget(new CombinationChartWidgetConfiguration(WidgetItems.PerformanceVsCompetitors()));
            this.HasExportController<NavExportController>();

            ExtendedProperties.Add("ExportFileName").WithValue(navItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}