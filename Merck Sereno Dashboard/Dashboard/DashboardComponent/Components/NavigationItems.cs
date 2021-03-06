﻿using System;
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
                    WidgetItems.AllRegionTrendTableWidget()
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
                Name = "NavCompaniesAllLocations",
                Label = "All Locations at Glance",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountCompanyAtaGlance()
                    
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
                Name = "NavCompaniesSnapshot",
                Label = "Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountCompanySnapshot()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.TopCompanySnapShotTable(),
                     WidgetItems.CompanySnapshotChart(),
                     WidgetItems.BottomCompanySnapshotTable()
                }
            };
        }

        public static NavigationItem NavCompaniesTrend()
        {
            return new NavigationItem()
            {
                Name = "NavCompaniesTrend",
                Label = "Trend",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountCompanyTrend(),
                    FilterItems.MeasureType()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.CompanyTrendTableChartWidget(),
                }
            };
        }
        #endregion //resolved




        #region Segment Navigation Items
        public static NavigationItem NavSegment()
        {
            return new NavigationItem()
            {
                Name = "NavSegment",
                Label = "Segment",
                ChildNavigations = new List<NavigationItem>()
                {
                    NavSegmentAllLocationsAtGlance(),
                    NavSegmentSnapshot(),
                    NavSegmentTrend()
                }
            };
        }

        public static NavigationItem NavSegmentAllLocationsAtGlance()
        {
            return new NavigationItem()
            {
                Name = "NavSegmentAllLocations",
                Label = "All Locations at Glance",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountSegmentAtaGlance()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.SegmentExpCollapseTableWidget()
                }
            };
        }

        public static NavigationItem NavSegmentSnapshot()
        {
            return new NavigationItem()
            {
                Name = "NavSegmentSnapshot",
                Label = "Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountSegmentSnapshot()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.TopSegmentSnapShotTable(),
                     WidgetItems.SegmentSnapshotChart(),
                     WidgetItems.BottomSegmentSnapshotTable()
                }
            };
        }

        public static NavigationItem NavSegmentTrend()
        {
            return new NavigationItem()
            {
                Name = "NavSegmentTrend",
                Label = "Trend",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountSegmentTrend(),
                    FilterItems.MeasureType()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.SegmentTrendTableChartWidget(),
                }
            };
        }
        #endregion //resolved




        #region International Product
        public static NavigationItem NavIntlProduct()
        {
            return new NavigationItem()
            {
                Name = "NavIntlProduct",
                Label = "International Products",
                ChildNavigations = new List<NavigationItem>()
                {
                    NavIntlProdAllIntlProdByLoc(),
                    NavIntlProdAllLocByIntlProd(),
                    NavIntlProdSnapshot(),
                    NavIntlProdTrend()
                }
            };
        }

        public static NavigationItem NavIntlProdAllIntlProdByLoc()
        {
            return new NavigationItem()
            {
                Name = "NavIntlProdAllIntlProdByLoc",
                Label = "All Intl Products By Location",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountIntlProdAtaGlance()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.IntlProductsAllProdByLocExpCollapseWidget()
                }
            };
        }

        public static NavigationItem NavIntlProdAllLocByIntlProd()
        {
            return new NavigationItem()
            {
                Name = "NavIntlProdAllLocByIntlProd",
                Label = "All Locations By Intl Product",
                Filters = new List<FilterItem>()
                {
                    //FilterItems.TopCountIntlProdAtaGlance()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.IntlProductsAllLocByProdExpCollapseWidget()
                }
            };
        }

        public static NavigationItem NavIntlProdSnapshot()
        {
            return new NavigationItem()
            {
                Name = "NavIntlProdSnapshot",
                Label = "Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountIntlProdSnapshot()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.TopIntlProdSnapShotTable(),
                     WidgetItems.IntlProdSnapshotChart(),
                     WidgetItems.BottomIntlProdSnapshotTable()
                }
            };
        }

        public static NavigationItem NavIntlProdTrend()
        {
            return new NavigationItem()
            {
                Name = "NavIntlProdTrend",
                Label = "Trend",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountIntlProdTrend(),
                    FilterItems.MeasureType()
                    
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.IntlProdTrendTableChartWidget(),
                }
            };
        }
        #endregion


        //#region  Products
        //public static NavigationItem NavProduct()
        //{
        //    return new NavigationItem()
        //    {
        //        Name = "NavProduct",
        //        Label = "Products",
        //        ChildNavigations = new List<NavigationItem>()
        //        {
        //            NavProdAllProdByLoc(),
        //            NavProdAllLocByProd(),
        //            NavProdSnapshot(),
        //            NavProductsTrend()
        //        }
        //    };
        //}

        //public static NavigationItem NavProdAllProdByLoc()
        //{
        //    return new NavigationItem()
        //    {
        //        Name = "NavProdAllProdByLoc",
        //        Label = "All Product By Location",
        //        Filters = new List<FilterItem>()
        //        {
        //            FilterItems.TopCountProductAtaGlance()
                    
        //        },
        //        Widgets = new List<WidgetItem>()
        //        {
        //             WidgetItems.ProductsAllProdByLocExpCollapseWidget()
        //        }
        //    };
        //}

        //public static NavigationItem NavProdAllLocByProd()
        //{
        //    return new NavigationItem()
        //    {
        //        Name = "NavProdAllLocByIntlProd",
        //        Label = "All Location By Product",
        //        Filters = new List<FilterItem>()
        //        {
        //            //FilterItems.TopCountIntlProdAtaGlance()
                    
        //        },
        //        Widgets = new List<WidgetItem>()
        //        {
        //             WidgetItems.ProductsAllLocByProdExpCollapseWidget()
        //        }
        //    };
        //}

        //public static NavigationItem NavProdSnapshot()
        //{
        //    return new NavigationItem()
        //    {
        //        Name = "NavProdSnapshot",
        //        Label = "Snapshot",
        //        Filters = new List<FilterItem>()
        //        {
        //            FilterItems.TopCountProductSnapshot()
        //        },
        //        Widgets = new List<WidgetItem>()
        //        {
        //             WidgetItems.TopProdSnapShotTable(),
        //             WidgetItems.ProdSnapshotChart(),
        //             WidgetItems.BottomProductSnapshotTable()
        //        }
        //    };
        //}


        //public static NavigationItem NavProductsTrend()
        //{
        //    return new NavigationItem()
        //    {
        //        Id = "nav4",
        //        Name = "NavProductsTrend",
        //        Label = "Trend",
        //        Filters = new List<FilterItem>()
        //        {
        //            FilterItems.TopCountProductTrend(),
        //            FilterItems.MeasureType()
        //        },
        //        Widgets = new List<WidgetItem>()
        //        {
        //             WidgetItems.ProductTrendTableChartWidget()
        //        }
        //    };
        //}

       
        //#endregion

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
                    NavProdAllProdByLoc(),
                    NavProductsSnapshot(),
                    NavProductsTrend()
                }
            };
        }

        public static NavigationItem NavProdAllProdByLoc()
        {
            return new NavigationItem()
            {
                Id = "nav2",
                Name = "NavProductsAllLocations",
                Label = "All Products by Location",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountProductAtaGlance()
                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.ProductsAllProdByLocExpCollapseWidget()
                }
            };
        }

        //NavProdAllProdByLoc
        public static NavigationItem NavProdAllLocByProd()
        {
            return new NavigationItem()
            {
                Name = "NavProdAllLocByIntlProd",
                Label = "All Locations By Product",
                Filters = new List<FilterItem>()
                {
                    //FilterItems.TopCountIntlProdAtaGlance()

                },
                Widgets = new List<WidgetItem>()
                {
                     WidgetItems.ProductsAllLocByProdExpCollapseWidget()
                }
            };
        }

        
        public static NavigationItem NavProductsSnapshot()
        {
            return new NavigationItem()
            {
                Id = "nav3",
                Name = "NavProductsSnapshot",
                Label = "Snapshot",
                Filters = new List<FilterItem>()
                {
                    FilterItems.TopCountProductSnapshot()
                },

                Widgets = new List<WidgetItem>()
                {
                     
                     WidgetItems.TopProdSnapShotTable(),
                     WidgetItems.ProdSnapshotChart(),
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
                    FilterItems.TopCountProductTrend(),
                    FilterItems.MeasureType()
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