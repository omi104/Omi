using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class CombiChartWidgetController : WidgetBaseController<string, object>
    {
        //
        // GET: /WelcomeTextnImageWidget/
        public override ViewResult Index()
        {
            return View(Data);
        }
    }
}
