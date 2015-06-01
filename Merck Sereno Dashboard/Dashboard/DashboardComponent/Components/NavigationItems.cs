using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;

namespace Dashboard.DashboardComponent.Components
{
    public static class NavigationItems
    {
        public static NavigationItem NavHome()
        {
            return new NavigationItem()
            {
                Id = "nav1",
                Name = "NavHome",
                Label = "Home",
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.WidgetWelcomeTextnImage(),
                }
            };
        }

        public static NavigationItem NavCategoriesTrend()
        {
            return new NavigationItem()
            {
                Name = "NavAllRegions",
                Label = "All Regions",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountCategoriesTrend(),
                    FilterItems.MeasureType()
                },
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.CategoryTrendTableChartWidget()
                }
            };
        }

        public static NavigationItem YourAccount()
        {
            return new NavigationItem()
            {
                Name = "YourAccount",
                Label = "Your Account"
            };
        }

        

    }
}