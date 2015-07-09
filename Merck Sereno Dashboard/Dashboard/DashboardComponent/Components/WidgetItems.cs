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

        public static WidgetItem AllRegionTrendTableWidget()
        {
            return new WidgetItem()
            {
                Name = "AllRegionTrendTableWidget",
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
                HasParamDependency = new List<string>() {  },
                ViewId = "1"
            };
        }

    }
}