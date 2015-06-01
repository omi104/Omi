using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DashboardFramework;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    using Dashboard.Configuration.Widgets;

    public class GeoMapController : WidgetBaseController<string, GeoMapData>
    {
        //
        // GET: /EsrGeoMap/

        public override ViewResult Index()
        {
            var parameters = DashboardFramework.Web.DashboardContext.Current.DashboardInstance.Parameters;

            ViewData["navigationName"] = parameters.CurrentNavigationName();
            ViewData["ParamName"] = Config;

            return View(Data);
        }

    }
}
