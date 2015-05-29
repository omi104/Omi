using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.DashboardComponent.Models
{
    public class WidgetItem
    {
        public string Name { get; set; }
        //public string Header { get; set; }
        public string ViewId { get; set; }
        public List<string> HasParamDependency { get; set; }
    }
}