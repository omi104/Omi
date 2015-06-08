using System.Collections.Generic;
using DashboardFramework.Web.Convensions;

namespace Dashboard.DashboardComponent.Models
{
    public class FilterItem
    {
        private readonly HtmlContainerIdConvention _convetion = new HtmlContainerIdConvention();

        public string Name { get; set; }
        public string Label { get; set; }

        public bool ChangeOnSubmit { get; set; }
        public string ViewId { get; set; }
        public string ModifyParam { get; set; }
        public List<string> HasParamDependency { get; set; }

        private string _controlId;
        public string ControlId
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_controlId))
                {
                    return string.Format(_convetion.GetFilterControlId(Name));
                }
                return _controlId;
            }
            set { _controlId = value; }
        }
    }
}