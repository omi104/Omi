using System.Web.Mvc;
using Dashboard.Models.Data;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class FilterLayoutController : LayoutBaseController<FilterVisibilityConfig>
    {
        //
        // GET: /FilterLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
