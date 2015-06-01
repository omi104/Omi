using System.Threading;
using System.Web.Mvc;
using CubeFramework;
using Dashboard.Helper;
using Newtonsoft.Json;

namespace Dashboard.Controllers
{
    public class BusinessLogicController : Controller
    {
        public string GetHoverData(string hoverValue)
        {
            var parameters = DashboardFramework.Web.DashboardContext.Current.DashboardInstance.Parameters;
            var hoverDataEngine = new HoverDataEngine();

            var data = hoverDataEngine.GetData(hoverValue, parameters);

            var json = JsonConvert.SerializeObject(data);

            return json;
        }

    }

}
