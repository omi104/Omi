using System.Web.Mvc;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class UserAdminNavigationLayoutController : LayoutBaseController<object>
    {
      
        public override ViewResult Index()
        {
            return View();
        }

    }
}
