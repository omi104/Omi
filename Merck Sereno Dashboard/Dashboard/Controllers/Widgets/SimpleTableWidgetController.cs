using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.Models.Data;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class SimpleTableWidgetController : WidgetBaseController<string, SingleTableModel>
    {
        //
        // GET: /SimpleChartWidget/
        public override ViewResult Index()
        {
            ViewData["Footertext"] = Config;
            return View(Data);
        }
    }
}
