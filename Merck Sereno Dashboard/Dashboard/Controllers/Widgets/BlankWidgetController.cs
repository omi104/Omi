using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using Dashboard.Models.Config;
using Dashboard.Models.Data;
using Dashboard.Models.ViewModel;

namespace Dashboard.Controllers.Widgets
{
    public class BlankWidgetController : WidgetBaseController<object, object>
    {
        public override ViewResult Index()
        {
            return View();
        }
    }
}
