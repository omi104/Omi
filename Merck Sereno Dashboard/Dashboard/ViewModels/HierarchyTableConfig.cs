using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;

namespace Dashboard.ViewModels
{
    public class HierarchyTableConfig
    {
        public bool IsLowerTable { get; set; }
        public bool IsTopTable { get; set; }
        public Table Table { get; set; }
        public string Chart { get; set; }

        public Dictionary<string, double> VarianceColumns { get; set; }

        public HierarchyTableConfig()
        {
            VarianceColumns = new Dictionary<string, double>();
        }

        public int ParentLevel { get; set; }
    }
}