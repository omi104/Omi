using System.Collections.Generic;
using Dashboard.Controllers.Filters;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.ViewModels;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Filters
{
    public class DatePickerFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {

        public DatePickerFilterConfiguration(FilterItem filterItem)
        {
            HasName(filterItem.Name);
            HasLabel(filterItem.Label);

            Layout.HasConfig(filterItem);
            Layout.HasController<DatePickerFilterLayoutController>();

            HasConfig(filterItem);
            HasController<DatePickerFilterController>();

            DataFlow.AddSource<DateFilterDataSource>()
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