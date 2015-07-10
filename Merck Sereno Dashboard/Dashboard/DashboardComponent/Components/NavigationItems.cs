using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;
using DashboardFramework;

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

        #region Companies Navigation Items
        public static NavigationItem NavCompanies()
        {
            return new NavigationItem()
            {
                Name = "NavCompanies",
                Label = "Companies",
                ChildNavigations = new List<NavigationItem>()
                {
                    NavCompaniesAllLocationsAtGlance(),
                    NavCompaniesSnapshot(),
                    NavCompaniesTrend()
                }
            };
        }

        public static NavigationItem NavCompaniesAllLocationsAtGlance()
        {
            return new NavigationItem()
            {
                Id = "nav2",
                Name = "NavCompaniesAllLocations",
                Label = "Companies - All Locations at Glance",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountCompanyAtaGlance()
                    
                },                
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.CompanyExpCollapseTableWidget()
                }
            };
        }

        public static NavigationItem NavCompaniesSnapshot()
        {
            return new NavigationItem()
            {
                Id = "nav3",
                Name = "NavCompaniesSnapshot",
                Label = "Companies - Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountCompanySnapshot()
                },
                Widgets = new List<WidgetItem>()
                {
                     
                     WidgetItems.BottomCompanySnapshotTable()
                }
            };
        }

        public static NavigationItem NavCompaniesTrend()
        {
            return new NavigationItem()
            {
                Id = "nav4",
                Name = "NavCompaniesTrend",
                Label = "Trend",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountCompanyTrend()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.CompanyTrendTableChartWidget(),
                }
            };
        }
        #endregion

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


        #region Products Navigation Items
        public static NavigationItem NavProducts()
        {
            return new NavigationItem()
            {
                Name = "NavProducts",
                Label = "Products",
                ChildNavigations = new List<NavigationItem>()
                {
                    NavProductsAllLocationsAtGlance(),
                    NavProductsSnapshot(),
                    NavProductsTrend()
                }
            };
        }

        public static NavigationItem NavProductsAllLocationsAtGlance()
        {
            return new NavigationItem()
            {
                Id = "nav2",
                Name = "NavProductsAllLocations",
                Label = "Products - All Locations at Glance",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountProductAtaGlance()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.ProductsExpCollapseTableWidget()
                }
            };
        }

        public static NavigationItem NavProductsSnapshot()
        {
            return new NavigationItem()
            {
                Id = "nav3",
                Name = "NavProductsSnapshot",
                Label = "Products - Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountProductSnapshot()
                },

                Widgets = new List<WidgetItem>()
                {
                     
                     WidgetItems.BottomProductSnapshotTable()
                }
            };
        }

        public static NavigationItem NavProductsTrend()
        {
            return new NavigationItem()
            {
                Id = "nav4",
                Name = "NavProductsTrend",
                Label = "Trend",
                Filters = new List<FilterItem>()
                {
                    FilterItemsForNavigations.TopCountProductTrend()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.ProductTrendTableChartWidget()
                }
            };
        }
        #endregion

        

    }
}