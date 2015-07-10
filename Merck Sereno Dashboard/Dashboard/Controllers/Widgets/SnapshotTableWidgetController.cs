using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.DashboardComponent.Components;
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Widgets
{
    public class SnapshotTableWidgetController : WidgetBaseController<IReadOnlyDictionary<string, string>, HierarchyTableConfig>
    {
        //
        // GET: /SnapshotTableDisplayWidget/

        public override ViewResult Index()
        {
            bool isHoverApplicable = Config.CurrentNavigationName() == NavigationItems.NavCompaniesSnapshot().Name ||
                                     Config.CurrentNavigationName() == NavigationItems.NavProductsSnapshot().Name;
            ViewData["IsHover"] = isHoverApplicable;
            return View(Data);
        }

    }
}
