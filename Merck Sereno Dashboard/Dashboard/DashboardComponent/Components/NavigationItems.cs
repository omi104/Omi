﻿using System;
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
                    WidgetItems.HomeTrendChart(),
                }
            };
        }

        public static NavigationItem NavAllRegions()
        {
            return new NavigationItem()
            {
                Name = "NavAllRegions",
                Label = "All Regions",
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.AllRegionCombinationChart(),
                    WidgetItems.Top10IntPrdTable()
                }
            };
        }

        public static NavigationItem NavKSATerritoryLevel()
        {
            return new NavigationItem()
            {
                Name = "NavKSATerritoryLevel",
                Label = "KSA Territory Level",
                Widgets = new List<WidgetItem>()
                {
                    WidgetItems.KsaCombinationChart(),
                    WidgetItems.KsaTrendTableWidget()
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