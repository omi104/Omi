using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework.DataComponent;
using Dashboard.Configuration;

namespace Dashboard.DataComponents.DataSources
{
    public class DummyDataSource:IDataSource<List<string>>
    {
        public List<string> GetData()
        {
            var data = new List<string>();
            var rand = new Random(DateTime.Now.Millisecond);
            var count = Int32.Parse(Parameters[ParameterList.RecordCount]);

            for (int i = 0; i < count; i++)
            {
                var s = string.Join("|", Enumerable.Range(1,4).Select(l=>rand.NextDouble()));
                data.Add(s);
            }

            return data;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}