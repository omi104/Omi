using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToDictionaryTransformer : ITransformer<CubeData, Dictionary<string, string>>
    {
        public Dictionary<string, string> GetData()
        {

            int valueColumnIndex = 0;
            int keyColumnIndex = 1;

            if (KeyColumn != null)
                keyColumnIndex = Input.Columns.Find(c => c.Name.Equals(KeyColumn, StringComparison.OrdinalIgnoreCase)).Position;
            if (ValueColumn != null)
                valueColumnIndex = Input.Columns.Find(c => c.Name.Equals(ValueColumn, StringComparison.OrdinalIgnoreCase)).Position;

            var ret = new Dictionary<string, string>();

                foreach (var r in Input.Rows)
            {
                if (!ret.ContainsKey(r[keyColumnIndex]))
                    ret.Add(r[keyColumnIndex], r[valueColumnIndex]);
            }

            return ret;
        }

        public CubeData Input { set; private get; }

        public string KeyColumn { get; set; }
        public string ValueColumn { get; set; }
    }
}