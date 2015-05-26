using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using Merck_SCHSP_Dashboard.Models.Config;

namespace Merck_SCHSP_Dashboard.Controllers.Layouts
{
	public class MerckDashboardLayoutController : LayoutBaseController<MerckDashboardLayoutConfig>
    {
        //
        // GET: /NavigationLayout/
        public override ViewResult Index()
        {
            return View(Config);
        }
    }
}
