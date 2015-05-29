using Dashboard.DashboardComponent.Models;

namespace Dashboard.Models.Data
{
    public class FilterVisibilityConfig
    {
        public bool Disabled { get; set; }
        public FilterItem FilterItem { get; set; }

        public string Navigation { get; set; }
        public string ModifyParameter { get; set; }
    }
}
