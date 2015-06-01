using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Filters;
using Dashboard.DataComponents.DataSources;
using Dashboard.ViewModels;

namespace Dashboard.Configuration.Filters
{
    public class MeasureTypeFilterConfiguration : FilterConfigurationBase
    {
        private FilterItem _filterItem;
        public MeasureTypeFilterConfiguration(FilterItem filterItem) : base(filterItem)
        {
            _filterItem = filterItem;
        }

        protected override void AddDataFlow(FilterItem filterItem)
        {
            DataFlow
                .AddSource<MeasureTypeDataLabelSource>();

        }

        protected override void AddControllerAndValueSelector()
        {
            Layout.HasController<RadioFilterLayoutController>();
            HasController<RadioFilterController>();
            HasConfig(p => GetFilterVisibilityConfiguration(p, _filterItem));

        }
    }
}