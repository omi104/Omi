using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Layouts;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Config;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Filters
{
    public class TopCountFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
    {
        public TopCountFilterConfiguration(FilterItem filterItem)
        {
            HasName(filterItem.Name);
            Layout.HasConfig(new FilterItem { Name = filterItem.Name, ControlId = filterItem.ControlId, Label = "",IsVisible = true})
                .HasController<DropdownFilterLayoutController>();

            DataFlow.AddSource<RecordCountSource>();
            ModifyParameter(filterItem.ModifyParam);
        }
    }
}