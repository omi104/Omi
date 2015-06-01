using System.Collections.Generic;
using Dashboard.Controllers.Filters;
using Dashboard.DashboardComponent.Components;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;
using DashboardFramework;
namespace Dashboard.Configuration.Filters
{
    public class FilterConfigurationBase:FilterConfiguration<Dictionary<string,string>>
    {
        public FilterConfigurationBase(FilterItem filterItem)
        {
            HasName(filterItem.Name);
            HasLabel(filterItem.Label);
            Layout.HasConfig(p => GetFilterVisibilityConfiguration(p, filterItem));

            AddControllerAndValueSelector();

            Reload.If(true);

            //if (filterItem.Name == FilterItems.CountryFilter().Name)
            //{
            //    HasController<CustomFilterController>();
            //    HasValueSelector(new CustomFilterValueSelector());
            //}
            AddDataFlow(filterItem);

           
            ModifyParameter(filterItem.ModifyParam);
            if (filterItem.HasParamDependency != null && filterItem.HasParamDependency.Count != 0)
                HasParameterDependency.On(filterItem.HasParamDependency);
        }

        //protected virtual string GetViewId(IReadOnlyDictionary<string, string> parameters, string filterName, string viewId)
        //{
        //    if(filterName == FilterItems.MarketFilter().Name)
        //        return parameters[ParameterList.IsGeography] == "0" ? viewId : FilterViewId.BrandFilterForGeo;

        //    if (filterName == FilterItems.MeasurementFilter().Name)
        //        return parameters.CurrentNavigationName() == NavigationItems.PONavigation().Name ? "32" : viewId;

        //    return viewId;
        //}

        protected virtual FilterVisibilityConfig GetFilterVisibilityConfiguration(IReadOnlyDictionary<string, string> parameters, FilterItem filterItem)
        {
            var config = new FilterVisibilityConfig
                {
                    Disabled = false, 
                    FilterItem = filterItem,
                    Navigation = parameters["@@navigation"],
                    ModifyParameter = filterItem.ModifyParam
                };            
            return config;
        }

        protected virtual void AddDataFlow(FilterItem filterItem)
        {
            DataFlow
               .AddSource<CubeDataSourceBase>()
               .WithModule(filterItem.ViewId)
               .Transform().By<CubeDataToDictionaryTransformer>();

        }

        protected virtual void AddControllerAndValueSelector()
        {
            Layout.HasController<FilterLayoutController>();

        }
    }
}