using System.Web.Mvc;
using Dashboard.Configuration.Widgets;
using Dashboard.Models.Data;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class UserAdminController : WidgetBaseController<string, UserData>
    {
        public override ViewResult Index()
        {
            ViewData["Config"] = Config;
            ViewData["Data"] = Data;
            return View();
        }

    }
}
