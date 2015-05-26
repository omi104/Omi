using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using Merck_SCHSP_Dashboard.Models.Config;

namespace Merck_SCHSP_Dashboard.Controllers.Layouts
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
