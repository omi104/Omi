using System;
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
            HasWidget(new WelcomeTextnImageWidgetConfiguration(WidgetItems.WidgetWelcomeTextnImage()));
            HasWidget(new CombinationChartWidgetConfiguration(WidgetItems.HomeTrendChart()));
            HasWidget(new Top10CompaniesTableConfiguration(WidgetItems.Top10CompanyTables()));
            HasWidget(new Top10IntPrdTableConfiguration(WidgetItems.Top10IntPrdTable()));

            this.HasExportController<NavExportController>();

            ExtendedProperties.Add("ExportFileName").WithValue(navItem.Label + "_" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
        }
    }
}