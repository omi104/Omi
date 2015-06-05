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
                ViewId = "",
                HasParamDependency = new List<string>() { ParameterList.RegionUncheckedItems}
            };
        }

        public static WidgetItem AllRegionTrendTableWidget()
        {
            return new WidgetItem()
            {
                Name = "AllRegionTrendTableWidget",
                ViewId = "",
                HasParamDependency = new List<string>() { ParameterList.RegionUncheckedItems }
            };
        }


        public static WidgetItem KsaCombinationChart()
        {
            return new WidgetItem()
            {
                Name = "KsaCombinationChart",
                ViewId = "",
                HasParamDependency = new List<string>() { ParameterList.KsaUncheckedItems }
            };
        }

        public static WidgetItem KsaTrendTableWidget()
        {
            return new WidgetItem()
            {
                Name = "KsaTrendTableWidget",
                ViewId = "",
                HasParamDependency = new List<string>() { ParameterList.KsaUncheckedItems }
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