using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection.Emit;
using System.Web;

namespace Dashboard.Models.Config
{
    public class RbPoDashboardLayoutConfig
    {
        public string Header { get; set; }
        public string CopyRight { get; set; }
        public string CurrentPeriod { get; set; }
        public string CurrentNavigation { get; set; }
        public string CurrentNavigationId { get; set; }
        public string CategoryText { get; set; }
        public string GeoText { get; set; }
        public string ChannelText { get; set; }
        public string SubChannelText { get; set; }
        public string PeriodText { get; set; }
        public string MeasureText { get; set; }
        public string Role { get; set; }
        public string Org { get; set; }
    }
}