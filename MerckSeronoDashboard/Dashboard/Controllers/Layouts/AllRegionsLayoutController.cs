﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.DashboardComponent.Models;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Layouts
{
    public class AllRegionsLayoutController : LayoutBaseController<NavigationItem>
    {
        //
        // GET: /HomeNavigationLayout/

        public override ViewResult Index()
        {
            return View(Config);
        }
    }
}