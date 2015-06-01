using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Models;

namespace Dashboard.DashboardComponent.Components
{
    public static class WidgetItems
    {
        #region Home Navigation widgets
        public static WidgetItem WidgetWelcomeTextnImage()
        {
            return new WidgetItem()
            {
                Name = "WidgetWelcomeTextnImage",
                ViewId = "not applicable",
                HasParamDependency = new List<string>(){}
            };
        }

        public static WidgetItem RbCatVsRbSalesTrendChart()
        {
            return new WidgetItem()
            {
                Name = "RbCatVsRbSalesTrendChart",
                ViewId = "103",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType }
            };
        }

        public static WidgetItem Top10CompanyTables()
        {
            return new WidgetItem()
            {
                Name = "Top10CompanyTables",
                ViewId = "101",
                HasParamDependency = new List<string>() { ParameterList.RbMarket, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasure, ParameterList.RbGeo, ParameterList.RbChannel, ParameterList.RbSubChannel }
            };
        }

        public static WidgetItem CategoryVsRbMarketShare()
        {
            return new WidgetItem()
            {
                Name = "CategoryVsRbMarketShare",
                ViewId = "102",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType }
            };
        }

        public static WidgetItem WidgetLatestFavouriteViewAtHome()
        {
            return new WidgetItem()
            {
                Name = "WidgetLatestFavouriteViewAtHome",
                ViewId = "not applicable",
                HasParamDependency = new List<string>() { }
            };
        }

        #endregion

        #region Brand Navigation

        public static WidgetItem BrandExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "BrandExpCollapseTableWidget",
                ViewId = "303",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.TopCountBrandAtAGlance , ParameterList.AbsoluteThousandFilter}
            };
        }

        public static WidgetItem TopBrandSnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopBrandSnapShotTable",
                ViewId = "301",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem BrandSnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "BrandSnapshotChart",
                ViewId = "302",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountBrandSnapshot }
            };
        }

        public static WidgetItem BottomBrandSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomBrandSnapshotTable",
                ViewId = "302",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountBrandSnapshot, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem BrandTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "BrandTrendTableChartWidget",
                ViewId = "304",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountBrandTrend, ParameterList.AbsoluteThousandFilter }
            };
        }
        #endregion


        #region SubBrand Navigation
        
        public static WidgetItem SubBrandExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "SubBrandExpCollapseTableWidget",
                ViewId = "601",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.TopCountSubBrandAtAGlance, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem TopSubBrandSnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopSubBrandSnapShotTable",
                ViewId = "602",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem SubBrandSnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "SubBrandSnapshotChart",
                ViewId = "603",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountSubBrandSnapshot }
            };
        }

        public static WidgetItem BottomSubBrandSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomSubBrandSnapshotTable",
                ViewId = "603",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountSubBrandSnapshot, ParameterList.AbsoluteThousandFilter }
            };
        }
        public static WidgetItem SubBrandTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "SubBrandTrendTableChartWidget",
                ViewId = "604",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountSubBrandTrend, ParameterList.AbsoluteThousandFilter }
            };
        }

        #endregion


        #region SKU Navigation

        public static WidgetItem SKUExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "SKUExpCollapseTableWidget",
                ViewId = "703",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.TopCountSKUAtAGlance, ParameterList.AbsoluteThousandFilter }
            };
        }


        public static WidgetItem TopSKUSnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopSKUSnapShotTable",
                ViewId = "701",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem SKUSnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "SKUSnapshotChart",
                ViewId = "702",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountSKUSnapshot }
            };
        }

        public static WidgetItem BottomSKUSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomSKUSnapshotTable",
                ViewId = "702",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountSKUSnapshot, ParameterList.AbsoluteThousandFilter }
            };
        }
        public static WidgetItem SKUTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "SKUTrendTableChartWidget",
                ViewId = "704",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountSKUTrend, ParameterList.AbsoluteThousandFilter }
            };
        }

        #endregion

        public static WidgetItem TopCompanySnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopCompanySnapShotTable",
                ViewId = "201",
                HasParamDependency = new List<string>() { ParameterList.RbGeo,ParameterList.RbMarket,ParameterList.RbChannel,ParameterList.RbSubChannel,ParameterList.RbMeasure,ParameterList.RbPeriod,ParameterList.RbPeriodType,ParameterList.AbsoluteThousandFilter}
            };
        }

        public static WidgetItem CompanySnapshotChart()
        {
            return new WidgetItem()
                {
                    Name = "CompanySnapshotChart",
                    ViewId ="202",
                    HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountCompanySnapshot }
                };
        }

        public static WidgetItem BottomCompanySnapshotTable()
        {
            return new WidgetItem()
                {
                    Name = "BottomCompanySnapshotTable",
                    ViewId = "202",
                    HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountCompanySnapshot, ParameterList.AbsoluteThousandFilter }
                };
        }

        public static WidgetItem CompanyTrendTableChartWidget()
        {
            return new WidgetItem()
                {
                    Name = "CompanyTrendTableChartWidget",
                    ViewId = "203",
                    HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountCompanyTrend, ParameterList.AbsoluteThousandFilter }
                };
        }

        public static WidgetItem TopMoleculeSnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopMoleculeSnapShotTable",
                ViewId = "402",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem MoleculeSnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "MoleculeSnapshotChart",
                ViewId = "401",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountMoleculeSnapshot }
            };
        }

        public static WidgetItem BottomMoleculeSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomMoleculeSnapshotTable",
                ViewId = "401",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.TopCountMoleculeSnapshot, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem MoleculeTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "MoleculeTrendTableChartWidget",
                ViewId = "404",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountMoleculeTrend }
            };
        }
        
        public static WidgetItem CategoryTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "CategoryTrendTableChartWidget",
                ViewId = "505",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriodType, ParameterList.RbPeriod, ParameterList.RbMeasureType, ParameterList.UncheckedItems, ParameterList.TopCountCategoryTrend, ParameterList.AbsoluteThousandFilter }
            };
        } 


        #region ExpandCollapse widgets
        public static WidgetItem CompanyExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CompanyExpCollapseTableWidget",
                ViewId = "204",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.TopCountCompanyAtAGlance, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem MoleculesExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "MoleculesExpCollapseTableWidget",
                ViewId = "403",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.TopCountMoleculeAtaGlance, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem CategoryAllCatByLocExpColpTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CategoryAllCatByLocExpColpTableWidget",
                ViewId = "501",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem CategoryAllCatByCompaniesExpColpTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CategoryAllCatByCompaniesExpColpTableWidget",
                ViewId = "502",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem CategoryAllCatByBrandsExpColpTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CategoryAllCatByBrandsExpColpTableWidget",
                ViewId = "503",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }

        public static WidgetItem CategoryAllLocByMarkExpColpTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CategoryAllLocByMarkExpColpTableWidget",
                ViewId = "504",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType, ParameterList.AbsoluteThousandFilter }
            };
        }
        #endregion ExpandCollapse widgets


        /* User Management Navigation Widgets */
        public static WidgetItem UserList()
        {
            return new WidgetItem()
            {
                Name = "UserManagement1",
                HasParamDependency = new List<string>() {  },
                ViewId = "1"
            };
        }

    }
}