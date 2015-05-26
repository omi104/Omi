using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using $rootnamespace$.Models.Config;

namespace $rootnamespace$.Controllers.Layouts
{
	public class DummyNavigationLayoutController : LayoutBaseController<DummyNavigationLayoutConfig>
    {
        //
        // GET: /NavigationLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }
    }
}
