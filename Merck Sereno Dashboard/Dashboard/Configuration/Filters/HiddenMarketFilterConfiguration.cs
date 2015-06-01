using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Layouts;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Config;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Filters
{
    public class HiddenMarketFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {
        public HiddenMarketFilterConfiguration(FilterItem filterItem)
        {
            HasName(filterItem.Name);
            HasLabel(filterItem.Label);
            Reload.If(true);
            Layout.HasConfig(new FilterLayoutConfig { Name = filterItem.Name, ControlId = filterItem.ControlId })
                .HasController<DropdownFilterLayoutController>();

            DataFlow.AddSource<HiddenMarketFilterDataSource>();

            ModifyParameter(filterItem.ModifyParam);
            if (filterItem.HasParamDependency != null && filterItem.HasParamDependency.Count != 0)
                HasParameterDependency.On(filterItem.HasParamDependency);
        }
    }
}