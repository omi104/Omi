using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Common;
using Dashboard.Configuration;
using DashboardFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class HiddenMarketFilterDataSource : IDataSource<Dictionary<string, string>>
    {
        public Dictionary<string, string> GetData()
        {
            string RbMarketValue = "";

            if (!Parameters.FilterText(FilterItems.Segment().Name).Contains("All") && !Parameters.FilterText(FilterItems.Segment().Name).Contains("-na-"))
            {
                RbMarketValue = Parameters[ParameterList.RbSegment];
            }
            else if (!Parameters.FilterText(FilterItems.MarketSubCategory().Name).Contains("All") && !Parameters.FilterText(FilterItems.MarketSubCategory().Name).Contains("-na-"))
            {
                RbMarketValue = Parameters[ParameterList.RbSubCategoryFilter];
            }
            else
            {
                RbMarketValue = Parameters[ParameterList.RbMarketFilterParent];
            }
            return new Dictionary<string, string>()
                   {
                       {RbMarketValue, RbMarketValue}
                   };
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}