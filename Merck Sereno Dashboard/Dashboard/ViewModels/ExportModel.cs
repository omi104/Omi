using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ExportFramework.Common;

namespace Dashboard.ViewModels
{
    public class ExportModel
    {
        public string Header1 { get; set; }
        public string Header2 { get; set; }
        public string Header3 { get; set; }

        public XTable DataTable { get; set; }
        public List<XTable> PptTables { get; set; }

        public string MarketShareColumnHeader { get; set; }
        public string ColumnHeader1 { get; set; }
        public string ColumnHeader2 { get; set; }
    }
}