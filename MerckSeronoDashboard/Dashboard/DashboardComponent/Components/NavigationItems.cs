using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.DashboardComponent.Models;

namespace Dashboard.DashboardComponent.Components
{
    public static class NavigationItems
    {
        public static NavigationItem NavHome()
        {
            return new NavigationItem()
            {
                Name = "NavHome",
                Label = "Home",
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.WidgetWelcomeTextnImage(),
                }
            };
        }

        public static NavigationItem NavAllRegions()
        {
            return new NavigationItem()
            {
                Name = "NavAllRegions",
                Label = "AllRegions",
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.PerformanceVsCompetitors(),
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