using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.DashboardComponent.Models;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class CompanyTrendNavigationLayoutController : LayoutBaseController<NavigationItem>
    {
        //
        // GET: /CompanyTrendNavigationLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
