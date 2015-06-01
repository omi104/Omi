using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.DashboardComponent.Components;
using Dashboard.IdentityModel.Repositories;
using DashboardFramework.Configuration;
using Dashboard.Configuration.Filters;
using Dashboard.Configuration.Navigations;
using Dashboard.Controllers.Layouts;
using Dashboard.Models.Config;
using Dashboard.Common;

namespace Dashboard.Configuration
{
    using CubeFramework;

    using Dashboard.Configuration.Widgets;
    using Dashboard.DataComponents.DataSources;

    public class RbPoDashboardConfiguration:DashboardConfiguration
    {
        public RbPoDashboardConfiguration()
        {
            HasName("ReckittBenckiserDashboard");
            HasTitle("Reckitt Benckiser Dashboard");
            HasDefaultNavigation(NavigationItems.NavHome().Name);

            ConfigureParameters();
            ConfigureFilters();
            ConfigureNavigations();
     
            Layout.HasConfig(GetCurrentPeriod).HasController<RbPoDashboardLayoutController>();
            Reload.If(true);
            HasParameterDependency.On(ParameterList.RbPeriodType)
                .On(ParameterList.RbPeriod);
        }

        private void ConfigureNavigations()
        {
            HasNavigation(new HomeNavigationConfiguration(NavigationItems.NavHome()));
            HasNavigation(new AllRegionNavigationConfiguration(NavigationItems.NavCategoriesTrend()));
        }

        private void ConfigureFilters()
        {
            HasFilter(new CommonFilterConfiguration(FilterItems.MarketCategory()));
            HasFilter(new CommonFilterConfiguration(FilterItems.MarketSubCategory()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Segment()));
            HasFilter(new CommonFilterConfiguration(FilterItems.Channel()));
            HasFilter(new CommonFilterConfiguration(FilterItems.SubChannel()));
            HasFilter(new CommonFilterConfiguration(FilterItems.PeriodType()));  
            HasFilter(new CommonFilterConfiguration(FilterItems.Measure()));
        }

        private void ConfigureParameters()
        {
            RegularParameters
                .Add(ParameterList.NavigationName).WithValue(NavigationItems.NavHome().Name)
                .Add(ParameterList.RecordCount).WithValue("5")
                .Add(ParameterList.RbGeo).WithValue(Constants.RbGeo)
                .Add(ParameterList.RbGeo_text).WithValue("TOTAL ENA")
                .Add(ParameterList.RbMarketFilterParent).WithValue(Constants.RbMarketFilterParent)
                .Add(ParameterList.RbSubCategoryFilter).WithValue(Constants.RbCategoryFilter)
                .Add(ParameterList.RbSegment).WithValue("")
                .Add(ParameterList.RbChannel).WithValue(Constants.RbChannel)
                .Add(ParameterList.RbSubChannel).WithValue("")
                .Add(ParameterList.RbPeriodType).WithValue("")
                .Add(ParameterList.RbMeasure).WithValue("")
                .Add(ParameterList.RbMarket).WithValue("[Market].[Hierarchy].[All]")
                .Add(ParameterList.RbPeriod).WithValue(Constants.RbPeriod)
                .Add(ParameterList.UncheckedItems).WithValue("")
                .Add(ParameterList.RbMeasureType).WithValue(MeasureType.Sales)
                .Add(ParameterList.AbsoluteThousandFilter).WithValue("Absolute")

                .Add(ParameterList.TopCountCompanyAtAGlance).WithValue("10")
                .Add(ParameterList.TopCountBrandAtAGlance).WithValue("10")
                .Add(ParameterList.TopCountSubBrandAtAGlance).WithValue("10")
                .Add(ParameterList.TopCountSKUAtAGlance).WithValue("10")
                .Add(ParameterList.TopCountMoleculeAtaGlance).WithValue("5")

                .Add(ParameterList.TopCountCompanySnapshot).WithValue("5")
                .Add(ParameterList.TopCountBrandSnapshot).WithValue("5")
                .Add(ParameterList.TopCountSubBrandSnapshot).WithValue("5")
                .Add(ParameterList.TopCountMoleculeSnapshot).WithValue("5")
                .Add(ParameterList.TopCountSKUSnapshot).WithValue("5")

                .Add(ParameterList.TopCountCompanyTrend).WithValue("5")
                .Add(ParameterList.TopCountBrandTrend).WithValue("5")
                .Add(ParameterList.TopCountSubBrandTrend).WithValue("5")
                .Add(ParameterList.TopCountMoleculeTrend).WithValue("5")
                .Add(ParameterList.TopCountSKUTrend).WithValue("5")

                .Add(ParameterList.TopCountCategoryTrend).WithValue("5")
                .Add(ParameterList.CurrentNavigationId).WithValue("navigation1")
                .Add(ParameterList.NavigationLabel).WithValue("Home")
                .Add(ParameterList.GuideLevel).WithValue("JJV-M")

                .Add(ParameterList.EmailTemplate).WithValue("")
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
                Header = "Reckitt Benckiser Dashboard",
                CopyRight = "Copyright IMS Dhaka 2015",
                CurrentNavigation = currentNavigation,
                CurrentPeriod = currentPeriod,
                CurrentNavigationId = currentNavigationId,
                CategoryText = parameters["@@MarketCategory_text"],
                GeoText = parameters["RB_Geo_text"],
                ChannelText = parameters["@@Channel_text"],
                SubChannelText = parameters["@@SubChannel_text"],
                //PeriodText = parameters["@@Period_text"],
                MeasureText = parameters["@@Measure_text"],
                Role = user != null && user.Role != null ? user.Role : "",
                Org = user.Org ?? "",
            };
            return config;
        }
    }
}