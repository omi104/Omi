using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Models;


namespace Dashboard.DashboardComponent.Components
{
    public class FilterItemsForNavigations
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
    }
}