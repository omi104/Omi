using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using Merck_SCHSP_Dashboard.Models.Config;
using Merck_SCHSP_Dashboard.Models.Data;
using Merck_SCHSP_Dashboard.Models.ViewModel;

namespace Merck_SCHSP_Dashboard.Controllers.Widgets
{
    public class DummyWidgetController : WidgetBaseController<DummyWidgetConfig, List<DummyWidgetData>>
    {
        public override ViewResult Index()
        {
            var vm = new DummyWidgetViewModel
                     {
                         Config = Config,
                         List = Data
                     };
            return View(vm);
        }
    }
}
