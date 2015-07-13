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
            HasName("MerckSeronoDashboard");
            HasTitle("Merck Serono CH Sales Performance Dashboard");
            HasDefaultNavigation(NavigationItems.NavHome().Name);

            ConfigureParameters();
            ConfigureFilters();
            ConfigureNavigations();
     
            Layout.HasConfig(GetCurrentPeriod).HasController<MerckDashboardLayoutController>();
        }

        private void ConfigureNavigations()
        {
            HasNavigation(new HomeNavigationConfiguration(NavigationItems.NavHome()));

            HasNavigation(new AtAGlanceNavigationConfiguration(NavigationItems.NavCompaniesAllLocationsAtGlance()));
            HasNavigation(new SnapshotNavigationConfiguration(NavigationItems.NavCompaniesSnapshot()));
            HasNavigation(new TrendNavigationConfiguration(NavigationItems.NavCompaniesTrend()));

            HasNavigation(new AllRegionNavigationConfiguration(NavigationItems.NavAllRegions()));
            HasNavigation(new KSANavigationConfiguration(NavigationItems.NavKSATerritoryLevel()));
        }

        private void ConfigureFilters()
        {
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.RegionOrCluster()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.Country()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.Products()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.SubProducts()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.Segment()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.Forms()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.KPI()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.UnitOrValue()));
            HasFilter(new OnOffFilterConfiguration(FilterItemsForDashboard.TimePeriod()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.StartDate()));
            HasFilter(new CommonFilterConfiguration(FilterItemsForDashboard.EndDate()));
        }

        private void ConfigureParameters()
        {
            RegularParameters
                .Add(ParameterList.NavigationName).WithValue(NavigationItems.NavHome().Name)
                .Add(ParameterList.RegionOrCluster).WithValue("")
                .Add(ParameterList.Country).WithValue("")
                .Add(ParameterList.Product).WithValue("[Product].[Hierarchy].[PRD].&[NEUROBION]")
                 .Add(ParameterList.Subproduct).WithValue("")//[Product].[Hierarchy].[PRD].&[FEMIBION].&[FEMIBION]
                 .Add(ParameterList.SubProductFlag).WithValue("false")
                 .Add(ParameterList.PeriodTypeFlag).WithValue("false")
                 .Add(ParameterList.Is_KSA).WithValue("false")//wrong boolean logic
                .Add(ParameterList.Segment).WithValue("")
                .Add(ParameterList.Form).WithValue("")
                .Add(ParameterList.KPI).WithValue("")
                .Add(ParameterList.UnitOrValue).WithValue("")
                .Add(ParameterList.TimePeriod).WithValue("")
                .Add(ParameterList.StartDate).WithValue("")
                .Add(ParameterList.EndDate).WithValue("")
                //.Add("TopCountCorporation").WithValue("5")
                .Add(ParameterList.TopCountProductSnapshot).WithValue("5")
                .Add(ParameterList.TopCountCompanyAtAGlance).WithValue("5")
                .Add(ParameterList.TopCountProductTrend).WithValue("5")
                .Add(ParameterList.TopCountProductAtAGlance).WithValue("5")
                 .Add(ParameterList.TopCountCompanySnapshot).WithValue("5")
                 .Add(ParameterList.TopCountCompanyTrend).WithValue("5")

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
                Header = "Merck Serono CH Sales Performance Dashboard",
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