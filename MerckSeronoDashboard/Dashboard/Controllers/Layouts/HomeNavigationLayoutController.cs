using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class HomeNavigationLayoutController : LayoutBaseController<object>
    {
        //
        // GET: /HomeNavigationLayout/

        public override ViewResult Index()
        {
            return View();
        }
    }
}
