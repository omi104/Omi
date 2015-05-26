

using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using DashboardFramework.StateManagement;
using DashboardFramework.Web;
using Merck_SCHSP_Dashboard.CommandTranslators;
using Merck_SCHSP_Dashboard.Configuration;

namespace Merck_SCHSP_Dashboard
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : DashboardFramework.Web.MvcApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            base.Application_Start();
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            DashboardFrameworkConfig.RegisterBuilder<MerckDashboardBuilder>();
            DashboardFrameworkConfig.CommandTranslators.Register<CommandTranslator>()
                                    .For(CommandType.LoadView)
                                    .WithOrder(-100);
        }
    }
}