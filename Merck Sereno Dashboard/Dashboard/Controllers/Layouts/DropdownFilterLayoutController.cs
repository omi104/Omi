using System.Web.Mvc;
using Dashboard.Models.Config;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class DropdownFilterLayoutController : LayoutBaseController<FilterLayoutConfig>
    {
        //
        // GET: /DropdownFilterLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
