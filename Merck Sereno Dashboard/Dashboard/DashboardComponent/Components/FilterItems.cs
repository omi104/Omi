using System.Collections.Generic;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;

namespace Dashboard.DashboardComponent.Components
{
    public class FilterItems
    {
        #region AtaGlance TopCount
        public static FilterItem TopCountCompanyAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountCompanyAtaGlance",
                Label = "",
                ControlId = "filter-TopCountCompanyAtaGlance-control",
                ModifyParam = ParameterList.TopCountCompanyAtAGlance,
                ViewId = ""
            };
        }
        public static FilterItem TopCountIntlProdAtaGlance()
            {
            return new FilterItem
            {
                Name = "TopCountIntlProdAtaGlance",
                Label = "",
                ControlId = "filter-TopCountIntlProdAtaGlance-control",
                ModifyParam = ParameterList.TopCountIntPrd,
                ViewId = ""
            };
        }
        public static FilterItem TopCountProductAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountProductAtaGlance",
                Label = "",
                ControlId = "filter-TopCountProductAtaGlance-control",
                ModifyParam = ParameterList.TopCountProductAtAGlance,
                ViewId = ""
            };
        }

        #endregion

        public static FilterItem MeasureType()
        {
            return new FilterItem
            {
                Name = "MeasureType",
                Label = "Measure Type",
                ControlId = "filter-MeasureType-control",
                ModifyParam = ParameterList.TypeOfMeasure,
                HasParamDependency = new List<string>() { },
                ViewId = "-99"
            };
        }

        #region Snapshot TopCount
        public static FilterItem TopCountCompanySnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountCompanySnapshot",
                Label = "",
                ControlId = "filter-TopCountCompanySnapshot-control",
                ModifyParam = ParameterList.TopCountCompanySnapshot,
                ViewId = ""
            };
        }

        public static FilterItem TopCountIntlProdSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountIntlProdSnapshot",
                Label = "",
                ControlId = "filter-TopCountIntlProdSnapshot-control",
                ModifyParam = ParameterList.TopCountIntlProdSnapshot,
                ViewId = ""
            };
        }

        public static FilterItem TopCountProductSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountProductSnapshot",
                Label = "",
                ControlId = "filter-TopCountProductSnapshot-control",
                ModifyParam = ParameterList.TopCountProductSnapshot,
                ViewId = ""
            };
        }

        #endregion

        #region Trend TopCount
        public static FilterItem TopCountCompanyTrend()
        {
            return new FilterItem
            {
                Name = "TopCountCompanyTrend",
                Label = "",
                ControlId = "filter-TopCountCompanyTrend-control",
                ModifyParam = ParameterList.TopCountCompanyTrend,
                ViewId = ""
            };
        }

        public static FilterItem TopCountIntlProdTrend()
        {
            return new FilterItem
            {
                Name = "TopCountIntlProdTrend",
                Label = "",
                ControlId = "filter-TopCountIntlProdTrend-control",
                ModifyParam = ParameterList.TopCountIntlProdTrend,
                ViewId = ""
            };
        }

        public static FilterItem TopCountProductTrend()
        {
            return new FilterItem
            {
                Name = "TopCountproductTrend",
                Label = "",
                ControlId = "filter-TopCountproductTrend-control",
                ModifyParam = ParameterList.TopCountProductTrend,
                ViewId = ""
            };
        }

        #endregion

        #region Common FIlter

        public static FilterItem RegionOrCluster()
        {
            return new FilterItem
            {
                Name = "RegionOrCluster",
                Label = "Region/Cluster",
                ControlId = "filter-RegionOrCluster-control",
                ModifyParam = ParameterList.RegionOrCluster,
                HasParamDependency = new List<string>() { ParameterList.NavigationName,ParameterList.IsKSA },
                ViewId = "4"
            };
        }

        public static FilterItem Country()
        {
            return new FilterItem
            {
                Name = "Country",
                Label = "Country",
                ControlId = "filter-Country-control",
                ModifyParam = ParameterList.Country,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster,ParameterList.IsKSA},
                ViewId = "5"
            };
        }

        public static FilterItem Products()
        {
            return new FilterItem
            {
                Name = ParameterList.Product,
                Label = "Products",
                ControlId = "filter-Product-control",
                ModifyParam = ParameterList.Product,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country,ParameterList.NavigationName },
                ViewId = "6"
            };
        }

        public static FilterItem SubProducts()
        {
            return new FilterItem
            {
                Name = ParameterList.Subproduct,
                Label = "Subproducts",
                ControlId = "filter-Subproduct-control",
                ModifyParam = ParameterList.Subproduct,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product },
                ViewId = "12"
            };
        }

        public static FilterItem Segment()
        {
            return new FilterItem
            {
                Name = "Segment",
                Label = "Segment",
                ControlId = "filter-Segment-control",
                ModifyParam = ParameterList.Segment,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product,ParameterList.NavigationName },
                ViewId = "22"
            };
        }

        public static FilterItem Forms()
        {
            return new FilterItem
            {
                Name = "Forms",
                Label = "Forms",
                ControlId = "filter-Forms-control",
                ModifyParam = ParameterList.Form,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.Segment },
                ViewId = "8"
            };
        }

        public static FilterItem KPI()
        {
            return new FilterItem
            {
                Name = "KPI",
                Label = "KPI",
                ControlId = "filter-KPI-control",
                ModifyParam = ParameterList.KPI,
                HasParamDependency = new List<string>() {ParameterList.NavigationName },
                ViewId = "9"
            };
        }

        public static FilterItem UnitOrValue()
        {
            return new FilterItem
            {
                Name = "UnitOrValue",
                Label = "Unit/Value",
                ControlId = "filter-UnitOrValue-control",
                ModifyParam = ParameterList.UnitOrValue,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country },
                ViewId = "1"
            };
        }

        public static FilterItem TimePeriod()
        {
            return new FilterItem
            {
                Name = "TimePeriod",
                Label = "Time Period",
                ControlId = "filter-TimePeriod-control",
                ModifyParam = ParameterList.TimePeriod,
                HasParamDependency = new List<string>() { },
                ViewId = "2"
            };
        }

        public static FilterItem StartDate()
        {

            return new FilterItem
            {
                Name = ParameterList.StartDate,
                Label = "Start Date",
                ModifyParam = ParameterList.StartDate,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.TimePeriod, ParameterList.KPI },
                ViewId = "3",
            };
        }

        public static FilterItem EndDate()
        {

            return new FilterItem
            {
                Name = ParameterList.EndDate,
                Label = "End Date",
                ModifyParam = ParameterList.EndDate,
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Product, ParameterList.TimePeriod, ParameterList.KPI },
                ViewId = "3",
            };
        }
        #endregion


    }
}