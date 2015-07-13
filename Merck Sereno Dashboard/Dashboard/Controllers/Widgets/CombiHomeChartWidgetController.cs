﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.Models.Data;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class CombiHomeChartWidgetController : WidgetBaseController<string, SingleChartModel>
    {
        //
        // GET: /SimpleChartWidget/
        public override ViewResult Index()
        {
            return View(Data);
        }
    }
}
