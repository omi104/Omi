using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;

namespace Dashboard.Models.Data
{
    public class SingleTableModel
    {
        public string Title { get; set; }
        public Table _Table { get; set; }
    }
}