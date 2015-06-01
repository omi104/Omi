using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using $rootnamespace$.Models.Config;

namespace $rootnamespace$.Controllers.Layouts
{
	public class DummyDashboardLayoutController : LayoutBaseController<DummyDashboardLayoutConfig>
    {
        //
        // GET: /NavigationLayout/
        public override ViewResult Index()
        {
            return View(Config);
        }
    }
}
