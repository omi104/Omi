using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class RecordCountSource:IDataSource<Dictionary<string,string>>
    {
        public Dictionary<string, string> GetData()
        {
            return new Dictionary<string, string>()
                   {
                       {"5", "Top 5"},
                       {"10", "Top 10"},
                       {"15", "Top 15"},
                       {"50", "Top 50"}
                   };
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}