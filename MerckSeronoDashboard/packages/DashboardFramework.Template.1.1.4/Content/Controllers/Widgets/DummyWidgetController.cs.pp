using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;
using DashboardFramework.Web.Controllers;
using $rootnamespace$.Models.Config;
using $rootnamespace$.Models.Data;
using $rootnamespace$.Models.ViewModel;

namespace $rootnamespace$.Controllers.Widgets
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
