using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.ViewModels
{
    public class ExportSnapshptModel:ExportModel
    {
        public string EarliestPeriod { get; set; }
        public string PreviousPeriod { get; set; }
        public string CurrentPeriod { get; set; }

        public string Measuretext { get; set; }
    }
}