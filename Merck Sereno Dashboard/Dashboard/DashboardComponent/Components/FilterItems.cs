using System.Collections.Generic;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;

namespace Dashboard.DashboardComponent.Components
{
    public class FilterItems
    {

        #region Common FIlter 

        public static FilterItem RegionOrCluster()
        {
            return new FilterItem
            {
                Name = "RegionOrCluster",
                Label = "Region/Cluster",
                ControlId = "filter-RegionOrCluster-control",
                ModifyParam = ParameterList.RegionOrCluster,
                HasParamDependency = new List<string>() { ParameterList.NavigationName },
                ViewId = ""
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
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster },
                ViewId = ""
            };
        }

        public static FilterItem Products()
        {
            return new FilterItem
            {
                Name = "Products",
                Label = "Products",
                ControlId = "filter-Products-control",
                ModifyParam = ParameterList.Products,
                HasParamDependency = new List<string>() { ParameterList.Country },
                ViewId = ""
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
                HasParamDependency = new List<string>() { ParameterList.RegionOrCluster, ParameterList.Country, ParameterList.Products },
                ViewId = ""
            };
        }

        public static FilterItem Forms()
        {
            return new FilterItem
            {
                Name = "Forms",
                Label = "Forms",
                ControlId = "filter-Forms-control",
                ModifyParam = ParameterList.Forms,
                HasParamDependency = new List<string>() { ParameterList.Segment },
                ViewId = ""
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
                HasParamDependency = new List<string>() {  },
                ViewId = ""
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
                HasParamDependency = new List<string>() { },
                ViewId = ""
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
                ViewId = ""
            };
        }

        public static FilterItem StartDate()
        {

            return new FilterItem
            {
                Name = ParameterList.StartDate,
                Label = "Start Date",
                ViewId = "",
                ModifyParam = ParameterList.StartDate,
                HasParamDependency = new List<string>() { }
            };
        }

        #endregion

        
    }
}