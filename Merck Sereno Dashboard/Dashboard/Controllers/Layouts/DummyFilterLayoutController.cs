using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using Dashboard.Models.Config;

namespace Dashboard.Controllers.Layouts
{
    public class DummyFilterLayoutController : LayoutBaseController<DummyFilterLayoutConfig>
    {
        //
        // GET: /FilterLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
