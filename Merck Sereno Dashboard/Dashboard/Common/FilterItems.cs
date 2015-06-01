using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;
using Dashboard.ViewModels;

/*
 * CAUTION :: DONT CHANGE DEPENDENCY WITHOUT BEING 100% SURE AND TESTING.
 * MARKET, SUBMARKET AND SEGEMENT MUST BE DEPENDENT ON GEO
 */

namespace Dashboard.Common
{
    public class FilterItems
    {

        #region Common FIlter 
        public static FilterItem Geography()
        {
            return new FilterItem
            {
                Name = "Geography",
                Label = "Geography",
                ControlId = "filter-Geography-control",
                ModifyParam = ParameterList.RbGeo,
                HasParamDependency = new List<string>() {  },
                ViewId = "1"
            };
        }

        public static FilterItem MarketCategory()
        {
            return new FilterItem
            {
                Name = "MarketCategory",
                Label = "Market Category",
                ControlId = "filter-MarketCategory-control",
                ModifyParam = ParameterList.RbMarketFilterParent,
                HasParamDependency = new List<string>() { ParameterList.NavigationName, ParameterList.RbGeo },
                ViewId = "3"
            };
        }

        public static FilterItem MarketSubCategory()
        {
            return new FilterItem
            {
                Name = "MarketSubCategory",
                Label = "Market Sub Category",
                ControlId = "filter-MarketSubCategory-control",
                ModifyParam = ParameterList.RbSubCategoryFilter,
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarketFilterParent },
                ViewId = "4"
            };
        }

        public static FilterItem Segment()
        {
            return new FilterItem
            {
                Name = "Segment",
                Label = "Segment",
                ControlId = "filter-Segment-control",
                ModifyParam = ParameterList.RbSegment,
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbSubCategoryFilter },
                ViewId = "10"
            };
        }

        public static FilterItem HiddenMarketFilter()
        {
            return new FilterItem
            {
                Name = "HiddenMarket",
                Label = "HiddenMarket",
                ControlId = "filter-HiddenMarket-control",
                ModifyParam = ParameterList.RbMarket,
                HasParamDependency = new List<string>() { ParameterList.RbGeo,ParameterList.RbMarketFilterParent, ParameterList.RbSubCategoryFilter, ParameterList.RbSegment },//ParameterList.RbMarketFilterParent, ParameterList.RbSubCategoryFilter, 
                ViewId = ""
            };
        }

        public static FilterItem Channel()
        {
            return new FilterItem
            {
                Name = "Channel",
                Label = "Channel",
                ControlId = "filter-Channel-control",
                ModifyParam = ParameterList.RbChannel,
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket },
                ViewId = "5"
            };
        }

        public static FilterItem SubChannel()
        {
            return new FilterItem
            {
                Name = "SubChannel",
                Label = "Sub Channel",
                ControlId = "filter-SubChannel-control",
                ModifyParam = ParameterList.RbSubChannel,
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbChannel },
                ViewId = "6"
            };
        }

        public static FilterItem PeriodType()
        {
            return new FilterItem
            {
                Name = "PeriodType",
                Label = "Period Type",
                ControlId = "filter-PeriodType-control",
                ModifyParam = ParameterList.RbPeriodType,
                HasParamDependency = new List<string>() {  },
                ViewId = "8"
            };
        }

        public static FilterItem Period()
        {
            return new FilterItem
            {
                Name = "Period",
                Label = "",
                ControlId = "filter-Period-control",
                ModifyParam = ParameterList.RbPeriod,
                HasParamDependency = new List<string>() { ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbPeriodType },
                ViewId = "9"
            };
        }

        public static FilterItem Measure()
        {
            return new FilterItem
            {
                Name = "Measure",
                Label = "Measure",
                ControlId = "filter-Measure-control",
                ModifyParam = ParameterList.RbMeasure,
                HasParamDependency = new List<string>() {ParameterList.RbGeo },
                ViewId = "7"
            };
        }

        public static FilterItem MeasureType()
        {
            return new FilterItem
            {
                Name = "MeasureType",
                Label = "Measure Type",
                ControlId = "filter-MeasureType-control",
                ModifyParam = ParameterList.RbMeasureType,
                HasParamDependency = new List<string>() { },
                ViewId = "-99"
            };
        }

        public static FilterItem EmailTemplate()
        {

            return new FilterItem
            {
                Name = "EmailTemplate",
                ControlId = "filter-EmailTemplate-control",
                Label = string.Empty,
                HasParamDependency = new List<string>() { ParameterList.EmailTemplate }
            };
        }
        #endregion

        #region AtaGlance TopCount
        public static FilterItem TopCountCompanyAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountCompanyAtaGlance",
                ControlId = "filter-TopCountCompanyAtaGlance-control",
                ModifyParam = ParameterList.TopCountCompanyAtAGlance,
            };
        }

        public static FilterItem TopCountBrandAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountBrandAtaGlance",
                ControlId = "filter-TopCountBrandAtaGlance-control",
                ModifyParam = ParameterList.TopCountBrandAtAGlance,
            };
        }
        public static FilterItem TopCountSubBrandAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountSubBrandAtaGlance",
                ControlId = "filter-TopCountSubBrandAtaGlance-control",
                ModifyParam = ParameterList.TopCountSubBrandAtAGlance,
            };
        }
        public static FilterItem TopCountSKUAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountSKUAtaGlance",
                ControlId = "filter-TopCountSKUAtaGlance-control",
                ModifyParam = ParameterList.TopCountSKUAtAGlance,
            };
        }
        public static FilterItem TopCountMoleculeAtaGlance()
        {
            return new FilterItem
            {
                Name = "TopCountMoleculeAtaGlance",
                ControlId = "filter-TopCountMoleculeAtaGlance-control",
                ModifyParam = ParameterList.TopCountMoleculeAtaGlance,
            };
        }
        #endregion


        #region Snapshot TopCount
        public static FilterItem TopCountCompanySnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountCompanySnapshot",
                ControlId = "filter-TopCountCompanySnapshot-control",
                ModifyParam = ParameterList.TopCountCompanySnapshot,
            };
        }

        public static FilterItem TopCountBrandSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountBrandSnapshot",
                Label = "",
                ControlId = "filter-TopCountBrandSnapshot-control",
                ModifyParam = ParameterList.TopCountBrandSnapshot,
                ViewId = ""
            };
        }

        public static FilterItem TopCountSubBrandSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountSubBrandSnapshot",
                Label = "",
                ControlId = "filter-TopCountSubBrandSnapshot-control",
                ModifyParam = ParameterList.TopCountSubBrandSnapshot,
                ViewId = ""
            };
        }
        public static FilterItem TopCountSKUSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountSKUSnapshot",
                Label = "",
                ControlId = "filter-TopCountSKUSnapshot-control",
                ModifyParam = ParameterList.TopCountSKUSnapshot,
                ViewId = ""
            };
        }
        public static FilterItem TopCountMoleculeSnapshot()
        {
            return new FilterItem
            {
                Name = "TopCountMoleculeSnapshot",
                Label = "",
                ControlId = "filter-TopCountMoleculeSnapshot-control",
                ModifyParam = ParameterList.TopCountMoleculeSnapshot,
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

        public static FilterItem TopCountBrandTrend()
        {
            return new FilterItem
            {
                Name = "TopCountBrandTrend",
                Label = "",
                ControlId = "filter-TopCountBrandTrend-control",
                ModifyParam = ParameterList.TopCountBrandTrend,
                ViewId = ""
            };
        }

        public static FilterItem TopCountSubBrandTrend()
        {
            return new FilterItem
            {
                Name = "TopCountSubBrandTrend",
                Label = "",
                ControlId = "filter-TopCountSubBrandTrend-control",
                ModifyParam = ParameterList.TopCountSubBrandTrend,
                ViewId = ""
            };
        }
        public static FilterItem TopCountSKUTrend()
        {
            return new FilterItem
            {
                Name = "TopCountSKUTrend",
                Label = "",
                ControlId = "filter-TopCountSKUTrend-control",
                ModifyParam = ParameterList.TopCountSKUTrend,
                ViewId = ""
            };
        }

        public static FilterItem TopCountMoleculeTrend()
        {
            return new FilterItem
            {
                Name = "TopCountMoleculeTrend",
                Label = "",
                ControlId = "filter-TopCountMoleculeTrend-control",
                ModifyParam = ParameterList.TopCountMoleculeTrend,
                ViewId = ""
            };
        }

        public static FilterItem TopCountCategoriesTrend()
        {
            return new FilterItem
            {
                Name = "TopCountCategoriesTrend",
                Label = "",
                ControlId = "filter-TopCountCategoriesTrend-control",
                ModifyParam = ParameterList.TopCountCategoryTrend,
                ViewId = ""
            };
        }
        #endregion

    }
}