using System.Web.Mvc;
using Dashboard.DashboardComponent.Models;
using Dashboard.Models.Config;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class DropdownFilterLayoutController : LayoutBaseController<FilterItem>
    {
        //
        // GET: /DropdownFilterLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
