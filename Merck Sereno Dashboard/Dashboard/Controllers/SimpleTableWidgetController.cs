using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.Models.Data;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers
{
    public class SimpleTableWidgetController : WidgetBaseController<string, SingleTableModel>
    {
        //
        // GET: /SimpleTableWidget/

        public override ViewResult Index()
        {
            ViewData["Footertext"] = Config;
            return View(Data);
        }

    }
}
