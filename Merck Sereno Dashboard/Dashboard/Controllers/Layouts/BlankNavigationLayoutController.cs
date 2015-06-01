using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class BlankNavigationLayoutController : LayoutBaseController<object>
    {
        //
        // GET: /SnapshotNavigationLayout/

        public override ViewResult Index()
        {
            return View();
        }
    }
}
