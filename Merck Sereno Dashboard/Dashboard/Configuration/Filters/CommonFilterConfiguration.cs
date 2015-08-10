using System.Collections.Generic;
using System.Web.Mvc;
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
            if (filterItem.Name == FilterItems.StartDate().Name)
            {
                return true;
            }
            return false;
        }

        private object IsVisible(IReadOnlyDictionary<string, string> param, FilterItem filterItem)
        {
            if (param.CurrentNavigationName() == NavigationItems.NavKSATerritoryLevel().Name && filterItem.Name == FilterItems.RegionOrCluster().Name)
            {
                filterItem.Label = "Area/Region";
            }
            
            if (param.CurrentNavigationName() == NavigationItems.NavKSATerritoryLevel().Name && filterItem.Name == FilterItems.Country().Name)
            {
                filterItem.Label = "Territory";
            }
            if (filterItem.Name == FilterItems.SubProducts().Name)
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
           

            //if (filterItem.Name == FilterItems.KPI().Name)
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

            // KPI is visible on Overview just...not anywhere except overview

            if (filterItem.Name == FilterItems.KPI().Name)
            {
                if (param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
                {
                    filterItem.IsVisible = true;

                }
                else
                {
                    filterItem.IsVisible = false;

                }

            }


            
            // startdate is needed to be invisibled from all navigations,but visible in overview..means navallregion

            if (filterItem.Name == FilterItems.StartDate().Name)
            {
                //filterItem.IsVisible = false;
                if (param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
                {
                    filterItem.IsVisible = true;

                }
                else
                {
                    filterItem.IsVisible = false;

                }
            }

            // enddate navigations are needed to be invisibled from navigation Home,
            //and the name will ne "Date"
            // but in overview..it will remain as Enddate

            //if (filterItem.Name == FilterItems.EndDate().Name)
            //{
            //    if (param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
            //    {
            //        //filterItem.IsVisible = true;
            //        filterItem.Label = "EndDate";

            //    }
            //    else
            //    {
            //        filterItem.Label = "Date";

            //    }

            //}

            //if (filterItem.Name == FilterItems.EndDate().Name)
            //{
            //    filterItem.Label = "Date";
                
            //}
        
            // Product Filter is to be invisibled from Navigation Home

            if (filterItem.Name == FilterItems.Products().Name)            
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
            //if (filterItem.Name == FilterItems.Segment().Name)
            //{
            //    if (param.CurrentNavigationName() == NavigationItems.NavHome().Name)
            //    {
            //        filterItem.ViewId = "22";
            //    }
            //    else
            //    {
            //        filterItem.ViewId = "7";
            //    }

            //}
            
            
            if (param["@@" + ParameterList.TimePeriod + "_text"] == "MAT" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD")
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.PeriodTypeFlag, "true");
            else
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.PeriodTypeFlag, "false");

            /*For growth or MAT or YTD startdate will be invisible, Enddate will work*/

            if (filterItem.Name == FilterItems.StartDate().Name)
            {

                if(param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
                {
                    if (param["@@" + ParameterList.KPI + "_text"] == "Growth" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD" || param["@@" + ParameterList.TimePeriod + "_text"] == "MAT")
                    {
                        filterItem.IsVisible = false;
                    }
                    else
                        filterItem.IsVisible = true;

                }
                else
                {
                    filterItem.IsVisible = false;

                }


                
            }
            if (filterItem.Name == FilterItems.EndDate().Name)
            {
                if (param.CurrentNavigationName() == NavigationItems.NavAllRegions().Name)
                {
                    if (param["@@" + ParameterList.KPI + "_text"] == "Growth" || param["@@" + ParameterList.TimePeriod + "_text"] == "YTD" || param["@@" + ParameterList.TimePeriod + "_text"] == "MAT")
                    {
                        filterItem.Label = "Date";
                    }
                    else
                    {
                        filterItem.Label = "EndDate";
                    }

                }
                else
                {
                    filterItem.Label = "Date";

                }
                
            }

            if(filterItem.Name == FilterItems.Segment().Name)
            {
                if(param.CurrentNavigationName() == NavigationItems.NavSegmentAllLocationsAtGlance().Name || param.CurrentNavigationName() == NavigationItems.NavSegmentSnapshot().Name || param.CurrentNavigationName() == NavigationItems.NavSegmentTrend().Name)
                {
                    filterItem.IsVisible = false;
                }
            }

            
            
            return filterItem;
        }
    }
}