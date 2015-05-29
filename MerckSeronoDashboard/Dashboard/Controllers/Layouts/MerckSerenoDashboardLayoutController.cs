using System.Web.Mvc;
using Dashboard.Configuration;
using DashboardFramework.Web.Controllers;
using Dashboard.Models.Config;

namespace Dashboard.Controllers.Layouts
{
    public class MerckSerenoDashboardLayoutController : LayoutBaseController<RbPoDashboardLayoutConfig>
    {
        //
        // GET: /NavigationLayout/
        public override ViewResult Index()
        {
            return View(Config);
        }
    }
}
