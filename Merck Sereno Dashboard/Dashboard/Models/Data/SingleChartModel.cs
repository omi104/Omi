using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.DataComponents.Transformers;

namespace Dashboard.Models.Data
{
    public class SingleChartModel
    {
        public string Title { get; set; }
        public string Chart { get; set; }
        public string HomeChartFooter { get; set; }
    }
}