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
                HasParamDependency = new List<string>() { ParameterList.RegionUncheckedItems, ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Subproduct, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.StartDate, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form, ParameterList.KPI, ParameterList.SubProductFlag, ParameterList.PeriodTypeFlag }
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

        public static WidgetItem TopCompanySnapShotTable()
        {
            return new WidgetItem()
            {
                Name = "TopCompanySnapShotTable",
                ViewId = "23",
                HasParamDependency = new List<string>() { ParameterList.Country, ParameterList.UnitOrValue, ParameterList.TimePeriod, ParameterList.EndDate, ParameterList.Segment, ParameterList.Form }
            };
        }

        public static WidgetItem BottomCompanySnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "BottomCompanySnapshotTable",
                ViewId = "17",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountCompanySnapshot }
            };
        }

        public static WidgetItem CompanyTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "CompanyTrendTableChartWidget",
                ViewId = "18",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountCompanyTrend }
            };
        }

        public static WidgetItem CompanyExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "CompanyExpCollapseTableWidget",
                ViewId = "16",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountCompanyAtAGlance }
            };
        }


        public static WidgetItem ProductsExpCollapseTableWidget()
        {
            return new WidgetItem()
            {
                Name = "ProductExpCollapseTableWidget",
                ViewId = "19",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountProductAtAGlance }
            };
        }

        public static WidgetItem BottomProductSnapshotTable()
        {
            return new WidgetItem()
            {
                Name = "ProductExpCollapseTableWidget",
                ViewId = "20",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountProductSnapshot }
            };
        }

       
            public static WidgetItem ProductTrendTableChartWidget()
        {
            return new WidgetItem()
            {
                Name = "ProductExpCollapseTableWidget",
                ViewId = "21",
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.KPI, ParameterList.TimePeriod,ParameterList.TopCountProductTrend }
            };
        }

    }
}