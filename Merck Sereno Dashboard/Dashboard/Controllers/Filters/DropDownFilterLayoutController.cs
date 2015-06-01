using System.Web.Mvc;
using Dashboard.ViewModels;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class RadioFilterLayoutController : LayoutBaseController<FilterVisibilityConfig>
    {

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
