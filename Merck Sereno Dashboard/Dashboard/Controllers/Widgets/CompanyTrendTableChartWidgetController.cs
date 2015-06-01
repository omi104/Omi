using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.ViewModels;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class CompanyTrendTableChartWidgetController : WidgetBaseController<IReadOnlyDictionary<string, string>, TableChartConfig>
    {
        //
        // GET: /CompanyTrendTableChartWidget/

        public override ViewResult Index()
        {
            return View(Data);
        }

    }
}
