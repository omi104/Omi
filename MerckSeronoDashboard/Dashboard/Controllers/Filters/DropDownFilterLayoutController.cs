using System.Web.Mvc;
using Dashboard.Models.Config;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class DropDownFilterLayoutController : LayoutBaseController<FilterLayoutConfig>
    {

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
