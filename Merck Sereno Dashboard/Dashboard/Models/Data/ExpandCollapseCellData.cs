using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Models.Data
{
    public class ExpandCollapseCellData
    {
        public string CellData { get; set; }
        public int GeoLevel { get; set; }
        public long Rank { get; set; }
        public int Level { get; set; }
    }
}