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
            if (filterItem.Name == FilterItems.StartDate().Name)
            {
                if ((param["@@" + ParameterList.TimePeriod + "_text"]  == "MTH" ||
                param["@@" + ParameterList.TimePeriod + "_text"] == "QTR") && param["@@" + ParameterList.KPI + "_text"] == "GROWTH")
                {
                    filterItem.IsVisible = false;
                }
                else
                    filterItem.IsVisible = true;
            }
            if (filterItem.Name == FilterItems.EndDate().Name)
            {
                if ((param["@@" + ParameterList.TimePeriod + "_text"] == "MTH" ||
                     param["@@" + ParameterList.TimePeriod + "_text"] == "QTR") &&
                    param["@@" + ParameterList.KPI + "_text"] == "GROWTH")
                {
                    filterItem.Label = "Date";
                }

                if (param["@@" + ParameterList.TimePeriod + "_text"] == "YTD" || param["@@" + ParameterList.TimePeriod + "_text"] == "MAT")
                {
                    filterItem.IsVisible = false;
                }
                else
                    filterItem.IsVisible = true;
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
            if (param["@@" + ParameterList.TimePeriod + "_text"] == "MAT" ||
                param["@@" + ParameterList.TimePeriod + "_text"] == "YTD")
            {
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.SubProductFlag, "true");
            }
            else
                DashboardContext.Current.DashboardInstance.SetParameterValue(ParameterList.SubProductFlag, "false");
            return filterItem;
        }
    }
}