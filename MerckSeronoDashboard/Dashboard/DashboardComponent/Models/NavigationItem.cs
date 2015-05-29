using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.DashboardComponent.Models
{
    public class NavigationItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string OnClick { get; set; }
        public List<FilterItem> Filters { get; set; }
        public List<WidgetItem> Widgets { get; set; }
        public List<NavigationItem> ChildNavigations { get; set; }

    }
}