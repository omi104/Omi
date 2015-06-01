using System;
using System.Collections.Generic;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class FixedDataSource : IDataSource<Dictionary<string, string>>
    {
        public Dictionary<string, string> GetData()
        {
            throw new NotImplementedException();
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
        
    }
}