using System.Collections.Generic;
using Dashboard.Controllers.Filters;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Filters
{
    public class OnOffFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {

        public OnOffFilterConfiguration(FilterItem filterItem)
        {
            HasName(filterItem.Name);
            Layout.HasController<OnOffFilterLayoutController>();

            HasConfig(filterItem);
            HasController<OnOffFilterController>();

            Layout.HasConfig(filterItem);

            //DataFlow.AddSource<CubeDataSourceBase>()//TimePeriodDataSource
            //   .WithModule(filterItem.ViewId)
            //   .Transform().By<CubeDataToDictionaryTransformer>();
            DataFlow.AddSource<TimePeriodDataSource>()
                .WithModule(filterItem.ViewId);

            ModifyParameter(filterItem.ModifyParam);

            if (filterItem.HasParamDependency != null)
            {
                foreach (var p in filterItem.HasParamDependency)
                    HasParameterDependency.On(p);
            }
        }
    }
}