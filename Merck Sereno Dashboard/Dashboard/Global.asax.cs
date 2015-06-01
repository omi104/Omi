using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Dashboard.App_Start;
using Dashboard.CommandTranslators;
using Dashboard.Configuration;
using Dashboard.Export;
using Dashboard.IdentityModel.Context;
using Dashboard.Log;
using DashboardFramework.StateManagement;
using DashboardFramework.Web;
using DashboardFramework.Web.App_Start;

namespace Dashboard
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : DashboardFramework.Web.MvcApplication
    {
        protected override void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            base.Application_Start();
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            DashboardFrameworkConfig.RegisterBuilder<MerckDashboardBuilder>();
            DashboardFrameworkConfig.CommandTranslators.Register<RbPo1LoadViewCommandTranslator>()
                                    .For(CommandType.LoadView)
                                    .WithOrder(-100);

            Database.SetInitializer<RbDbContext>(null);
            //using (var context = new RbDbContext())
            //{
            //    context.SeedAdminAccount(EnvironmentSettings.DefaultAdminAccount.UserName, EnvironmentSettings.DefaultAdminAccount.Password).Wait();
            //}
            DashboardFramework.Web.DashboardFrameworkConfig.Loggers.Add(new DashboardLogger());
            ExportFrameworkConfig.RegisterCommandTranslators();
        }
    }
}