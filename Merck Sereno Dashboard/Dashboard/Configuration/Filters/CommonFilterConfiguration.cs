using System.Collections.Generic;
using Dashboard.Common;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Config;
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Configuration;
using DashboardFramework.Web;

namespace Dashboard.Configuration.Filters
{
    public class CommonFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {
        public CommonFilterConfiguration(FilterItem filterItem)
		{
            HasName(filterItem.Name);
            HasLabel(filterItem.Label);
            Reload.If(true);
            Layout.HasConfig(p=>IsVisible(p,filterItem))
                .HasController<DropdownFilterLayoutController>();

            DataFlow.AddSource<CubeDataSourceBase>()
            .WithModule(filterItem.ViewId)
            .Transform().By<CubeDataToDictionaryTransformer>()
            .HasProperty(t=>t.isReverse).WithValue(p=>IsReverse(p,filterItem));
            ModifyParameter(filterItem.ModifyParam);
            if (filterItem.HasParamDependency != null && filterItem.HasParamDependency.Count != 0)
                HasParameterDependency.On(filterItem.HasParamDependency);
		}

        private bool IsReverse(IReadOnlyDictionary<string, string> param, FilterItem filterItem)
        {
            if (filterItem.Name == FilterItemsForDashboard.StartDate().Name)
            {
                return true;
            }
            return false;
        }

        private object IsVisible(IReadOnlyDictionary<string, string> param, FilterItem filterItem)
        {
            if (param.CurrentNavigationName() == NavigationItems.NavKSATerritoryLevel().Name && filterItem.Name == FilterItemsForDashboard.RegionOrCluster().Name)
            {
                filterItem.Label = "Area/Region";
            }
            
            if (param.CurrentNavigationName() == NavigationItems.NavKSATerritoryLevel().Name && filterItem.Name == FilterItemsForDashboard.Country().Name)
            {
                filterItem.Label = "Territory";
            }
            if (filterItem.Name == FilterItemsForDashboard.SubProducts().Name)
            {
                if (param["@@" + ParameterList.Product + "_text"] == "FEMIBION")
                {
                    filterItem.IsVisible = true;
                    DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.SubProductFlag, "true");
                }
                else
                {
                    filterItem.IsVisible = false;
                    DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.SubProductFlag, "false");
                }
            }

            // KPI Filter is to be invisibled from Navigation Home

            if (filterItem.Name == FilterItemsForDashboard.KPI().Name)
            {
                if (param.CurrentNavigationName() == NavigationItems.NavHome().Name)
                {
                    filterItem.IsVisible = false;

                }
                else
                {
                    filterItem.IsVisible = true;

                }
                
            }
            
        
            // Product Filter is to be invisibled from Navigation Home

            //if (filterItem.Name == FilterItemsForDashboard.Products().Name)
            //{
            //    if (param.CurrentNavigationName() == NavigationItems.NavHome().Name)
            //    {
            //        filterItem.IsVisible = false;

            //    }
            //    else
            //    {
            //        filterItem.IsVisible = true;

            //    }

            //}

            // product filter will be visible only in navigation ksa and all region
            if (filterItem.Name == FilterItemsForDashboard.Products().Name)
            {
                if (param.CurrentNavigationName() == NavigationItems.NavKSATerritoryLevel().Name || param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
                {
                    filterItem.IsVisible = true;

                }
                else
                {
                    filterItem.IsVisible = false;

                }

            }

            // In home navigation, load segment from 22(ViewId), else load from 7
            if (filterItem.Name == FilterItemsForDashboard.Segment().Name)
            {
                if (param.CurrentNavigationName() == NavigationItems.NavHome().Name)
                {
                    filterItem.ViewId = "22";
                }
                else
                {
                    filterItem.ViewId = "7";
                }

            }
            
            
            if (param["@@" + ParameterList.TimePeriod + "_text"] == "MAT" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD")
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.PeriodTypeFlag, "true");
            else
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.PeriodTypeFlag, "false");

            /*For growth or MAT or YTD startdate will be invisible, Enddate will work*/
            if (filterItem.Name == FilterItemsForDashboard.StartDate().Name)
            {
                if (param["@@" + ParameterList.KPI + "_text"] == "GROWTH" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD" || param["@@" + ParameterList.TimePeriod + "_text"] == "MAT")
                {
                    filterItem.IsVisible = false;
                }
                else
                    filterItem.IsVisible = true;
            }
            if (filterItem.Name == FilterItemsForDashboard.EndDate().Name)
            {
                if (param["@@" + ParameterList.KPI + "_text"] == "GROWTH" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD" || param["@@" + ParameterList.TimePeriod + "_text"] == "MAT")
                {
                    filterItem.Label = "Date";
                }
            }
            
            return filterItem;
        }
    }
}