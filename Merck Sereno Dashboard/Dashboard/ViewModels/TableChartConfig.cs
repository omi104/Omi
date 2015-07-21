using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using Dashboard.Models.Data;

namespace Dashboard.ViewModels
{
    public class TableChartConfig
    {
        public Table Table { get; set; }
        public int TableWidth { get; set; }
        public SingleChartModel Chart { get; set; }
    }
}