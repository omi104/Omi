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
        public static WidgetItem WidgetWelcomeTextnImage()
        {
            return new WidgetItem()
            {
                Name = "WidgetWelcomeTextnImage",
                ViewId = "not applicable",
                HasParamDependency = new List<string>(){ParameterList.RegionOrCluster}
            };
        }

        public static WidgetItem AllRegionCombinationChart()
        {
            return new WidgetItem()
            {
                Name = "AllRegionCombinationChart",
                ViewId = "10",
                HasParamDependency = new List<string>() { /*ParameterList.RegionUncheckedItems,*/ ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Subproduct, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.StartDate, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.KPI, ParameterList.SubProductFlag, ParameterList.PeriodTypeFlag }
            };
        }

        public static WidgetItem AllRegionTrendTableWidget()
        {
            return new WidgetItem()
            {
                Name = "AllRegionTrendTableWidget",
                ViewId = "10",
                HasParamDependency = new List<string>() { /*ParameterList.RegionUncheckedItems,*/ ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Subproduct, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.StartDate, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.KPI, ParameterList.SubProductFlag, ParameterList.PeriodTypeFlag }
            };
        }

        public static WidgetItem HomeTrendChart()
        {
            return new WidgetItem()
            {
                Name = "HomeTrendChart",
                ViewId = "15",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.Product, ParameterList.Country, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }

        public static WidgetItem Top10CompanyTables()
        {
            return new WidgetItem()
            {
                Name = "Top10CompanyTables",
                ViewId = "13",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.Product, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }

        public static WidgetItem Top10IntPrdTable()
        {
            return new WidgetItem()
            {
                Name = "Top10IntPrdTable",
                ViewId = "14",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }


        public static WidgetItem KsaCombinationChart()
        {
            return new WidgetItem()
            {
                Name = "KsaCombinationChart",
                ViewId = "10",
                HasParamDependency = new List<string>() { ParameterList.KsaUncheckedItems, ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Subproduct, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.StartDate, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.KPI, ParameterList.SubProductFlag }
            };
        }

        public static WidgetItem KsaTrendTableWidget()
        {
            return new WidgetItem()
            {
                Name = "KsaTrendTableWidget",
                ViewId = "10",
                HasParamDependency = new List<string>() { ParameterList.KsaUncheckedItems, ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Subproduct, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.StartDate, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.KPI, ParameterList.SubProductFlag }
            };
        } 


        /* User Management Navigation Widgets */
        public static WidgetItem UserList()
        {
            return new WidgetItem()
            {
                Name = "UserManagement1",
                HasParamDependency = new List<string>(),
                ViewId = "1"
            };
        }

        #region Company
        public static WidgetItem TopCompanySnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopCompanySnapShotTable",
                ViewId = "23",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }

        public static WidgetItem CompanySnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "CompanySnapshotChart",
                ViewId = "17",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.Product, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.TopCountCompanySnapshot }
            };
        }

        public static WidgetItem BottomCompanySnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomCompanySnapshotTable",
                ViewId = "17",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.TopCountCompanySnapshot, ParameterList.EndDate, }
            };
        }

        public static WidgetItem CompanyTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "CompanyTrendTableChartWidget",
                ViewId = "18",
                HasParamDependency = new List<string>() {  ParameterList.CorporationUncheckedItems, ParameterList.Country, ParameterList.Product, ParameterList.UnitOrValue, ParameterList.TimePeriod,ParameterList.TopCountCompanyTrend,ParameterList.EndDate,ParameterList.Segment,ParameterList.Form,ParameterList.TypeOfMeasure }
            };
        }

        public static WidgetItem CompanyExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CompanyExpCollapseTableWidget",
                ViewId = "16",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.TopCountCompanyAtAGlance, ParameterList.EndDate,ParameterList.IsKSA }
            };
        }
        #endregion Company

        #region International Product
        public static WidgetItem IntlProductsAllLocByProdExpCollapseWidget()
        {
            return new WidgetItem()
            {
                Name = "IntlProductsAllLocByProdExpCollapseWidget",
                //ViewId = "19", //sarah apu
                ViewId = "27", //should be
                //ViewId = "25", //for test
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.IsKSA, ParameterList.TopCountIntPrd, ParameterList.EndDate, }
            };
        }

        public static WidgetItem IntlProductsAllProdByLocExpCollapseWidget()
        {
            return new WidgetItem()
            {
                Name = "IntlProductsAllProdByLocExpCollapseWidget",
                //ViewId = "25", //sarah apu
                ViewId = "19", //should be
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.IsKSA, ParameterList.TopCountIntPrd, ParameterList.EndDate, }
            };
        }

        public static WidgetItem TopIntlProdSnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopIntlProdSnapShotTable",
                ViewId = "24",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }

        public static WidgetItem IntlProdSnapshotChart()
        {
            return new WidgetItem()
            {
                Name = "IntlProdSnapshotChart",
                ViewId = "20",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.Product, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.TopCountIntlProdSnapshot }
            };
        }

        public static WidgetItem BottomIntlProdSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomIntlProdSnapshotTable",
                ViewId = "20",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.TopCountIntlProdSnapshot, ParameterList.EndDate, }
            };
        }

        public static WidgetItem IntlProdTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "IntlProdTrendTableChartWidget",
                ViewId = "21",
                HasParamDependency = new List<string>() {ParameterList.IntProductUncheckedItems, ParameterList.Country, ParameterList.Product, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.TopCountIntlProdTrend, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.TypeOfMeasure }
            };
        }

        #endregion


        #region Product
        public static WidgetItem BottomProductSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "ProductExpCollapseTableWidget",
                ViewId = "20",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.TopCountProductSnapshot, ParameterList.EndDate, }
            };
        }

       
            public static WidgetItem ProductTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "ProductExpCollapseTableWidget",
                ViewId = "21",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod, ParameterList.TopCountProductTrend, ParameterList.EndDate, }
            };
        }

        #endregion
    }
}