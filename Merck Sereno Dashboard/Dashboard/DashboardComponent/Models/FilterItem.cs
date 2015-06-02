using System.Collections.Generic;

namespace Dashboard.DashboardComponent.Models
{
    public class FilterItem
    {
        public string Name { get; set; }
        public string Label { get; set; }
        public string ControlId { get; set; }
        public string ViewId { get; set; }
        public string ModifyParam { get; set; }
        public List<string> HasParamDependency { get; set; }
    }
}