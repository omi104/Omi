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

namespace Dashboard.Configuration.Filters
{
    public class CommonFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {
        public CommonFilterConfiguration(FilterItem filterItem)
		{
            HasName(filterItem.Name);
            HasLabel(filterItem.Label);
            Reload.If(true);
            Layout.HasConfig(new FilterLayoutConfig { Name = filterItem.Name, ControlId = filterItem.ControlId })
                .HasController<DropdownFilterLayoutController>();

            DataFlow.AddSource<RecordCountSource>();
                //.WithModule(filterItem.ViewId)
                //.Transform().By<CubeDataToDictionaryTransformer>();
            ModifyParameter(filterItem.ModifyParam);
            if (filterItem.HasParamDependency != null && filterItem.HasParamDependency.Count != 0)
                HasParameterDependency.On(filterItem.HasParamDependency);
		}
    }
}