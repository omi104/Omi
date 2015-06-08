using System.Collections.Generic;
using Dashboard.Controllers.Filters;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Filters
{

    public class SearchableDropdownFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {
        public SearchableDropdownFilterConfiguration(FilterItem filterItem)
        {
            HasName(filterItem.Name);

            HasLabel(filterItem.Label);

            Layout.HasConfig(filterItem);
            Layout.HasController<SearchableDropdownFilterLayoutController>();

            HasConfig(filterItem);
            HasController<SearchableDropdownFilterController>();

            HasValueSelector(new Helper.SearchableDropdownFilterValueSelector());

            DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(filterItem.ViewId)
                .Transform().By<CubeDataToDictionaryTransformer>();
            //DataFlow
            //   .AddSource<StaticFilterDataSource>()
            //   .WithModule(filterItem.ViewId);

            ModifyParameter(filterItem.ModifyParam);

            if (filterItem.HasParamDependency != null)
            {
                foreach (var p in filterItem.HasParamDependency)
                    HasParameterDependency.On(p);
            }
        }

       
    }
}