using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.DataComponent;

namespace Merck_SCHSP_Dashboard.DataComponents.DataSources
{
    public class RecordCountSource:IDataSource<Dictionary<string,string>>
    {
        public Dictionary<string, string> GetData()
        {
            return new Dictionary<string, string>()
                   {
                       {"5", "Five"},
                       {"10", "Ten"},
                       {"15", "Fifteen"}
                   };
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}