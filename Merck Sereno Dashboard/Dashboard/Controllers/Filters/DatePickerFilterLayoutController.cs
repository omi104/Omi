using System.Web.Mvc;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class DatePickerFilterLayoutController : LayoutBaseController<FilterItem>
    {

        public override ViewResult Index()
        {
            return View(Config);
        }

    }
}
