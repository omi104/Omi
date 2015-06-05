using System.Collections.Generic;
using System.Web;
using Dashboard.DashboardComponent.Components;
using Dashboard.IdentityModel.Repositories;
using DashboardFramework.Configuration;
using Dashboard.Configuration.Filters;
using Dashboard.Configuration.Navigations;
using Dashboard.Controllers.Layouts;
using Dashboard.Models.Config;

namespace Dashboard.Configuration
{
    public class MerckDashboardConfiguration:DashboardConfiguration
    {
        public MerckDashboardConfiguration()
        {
            HasName("MerckSerenoDashboard");
            HasTitle("Merck Sereno CH Sales Performance Dashboard");
            HasDefaultNavigation(NavigationItems.NavHome().Name);

            ConfigureParameters();
            ConfigureFilters();
            ConfigureNavigations();
     
            Layout.HasConfig(GetCurrentPeriod).HasController<MerckDashboardLayoutController>();
        }

        private void ConfigureNavigations()
        {
            HasNavigation(new HomeNavigationConfiguration(NavigationItems.NavHome()));
            HasNavigation(new AllRegionNavigationConfiguration(NavigationItems.NavAllRegions()));
            HasNavigation(new KSANavigationConfiguration(NavigationItems.NavKSATerritoryLevel()));
        }

        private void ConfigureFilters()
        {
            HasFilter(new CommonFilterConfiguration(FilterItems.RegionOrCluster()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Country()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Products()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Segment()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Forms()));
            HasFilter(new CommonFilterConfiguration(FilterItems.KPI()));  
            HasFilter(new CommonFilterConfiguration(FilterItems.UnitOrValue()));
            HasFilter(new OnOffFilterConfiguration(FilterItems.TimePeriod()));
            HasFilter(new DatePickerFilterConfiguration(FilterItems.StartDate()));
        }

        private void ConfigureParameters()
        {
            RegularParameters
                .Add(ParameterList.NavigationName).WithValue(NavigationItems.NavHome().Name)
                .Add(ParameterList.RegionOrCluster).WithValue("")
                .Add(ParameterList.Country).WithValue("")
                .Add(ParameterList.Products).WithValue("")
                .Add(ParameterList.Segment).WithValue("")
                .Add(ParameterList.Forms).WithValue("")
                .Add(ParameterList.KPI).WithValue("")
                .Add(ParameterList.UnitOrValue).WithValue("")
                .Add(ParameterList.TimePeriod).WithValue("")
                .Add(ParameterList.StartDate).WithValue("")



                .Add(ParameterList.RecordCount).WithValue("5")
                .Add(ParameterList.RegionUncheckedItems).WithValue("")
                .Add(ParameterList.KsaUncheckedItems).WithValue("")
                .Add(ParameterList.CurrentNavigationId).WithValue("navigation1")
                .Add(ParameterList.NavigationLabel).WithValue("Home")
                .Add(ParameterList.IsIMSUser).WithValue("false");
        }

        private RbPoDashboardLayoutConfig GetCurrentPeriod(IReadOnlyDictionary<string, string> parameters)
        {
            var user = new UserAdminRepository().GetActiveUser(HttpContext.Current.User.Identity.Name);
            if (user.Org != null && !string.IsNullOrEmpty(user.Org))
            {
                DashboardFramework.Web.DashboardContext.Current.DashboardInstance.SetParameterValue(
                    ParameterList.IsIMSUser, user.Org.ToLower() == "ims" ? "true" : "false");
            }
            var currentPeriod = "";
            string currentNavigation;
            string currentNavigationId;
            parameters.TryGetValue("@@navigation", out currentNavigation);
            parameters.TryGetValue("@@Period_text", out currentPeriod);
            parameters.TryGetValue("CurrentNavigationId", out currentNavigationId);
            var config = new RbPoDashboardLayoutConfig
            {
                Header = "Merck Sereno CH Sales Performance Dashboard",
                CopyRight = "Copyright IMS Dhaka 2015",
                CurrentNavigation = currentNavigation,
                CurrentPeriod = currentPeriod,
                CurrentNavigationId = currentNavigationId,
                Role = user != null && user.Role != null ? user.Role : "",
                Org = user.Org ?? "",
            };
            return config;
        }
    }
}