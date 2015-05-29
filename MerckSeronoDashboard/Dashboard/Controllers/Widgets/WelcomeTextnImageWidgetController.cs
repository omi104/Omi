using System.Web.Mvc;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class WelcomeTextnImageWidgetController : WidgetBaseController<string, object>
    {
        //
        // GET: /WelcomeTextnImageWidget/
        public override ViewResult Index()
        {
            return View();
        }
    }
}
