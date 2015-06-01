using System.Collections.Generic;
using DashboardFramework.Configuration;
using DashboardFramework.DataFlow;
using Dashboard.Controllers.Layouts;
using Dashboard.DataComponents.DataSources;
using Dashboard.Models.Config;

namespace Dashboard.Configuration.Filters
{
	public class RecordCountFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
	{
		public RecordCountFilterConfiguration()
		{
            HasName("RecordCount");
		    Layout.HasConfig(new DummyFilterLayoutConfig {Label = "Selected Market", ControlId = "filter-RecordCount-control"})
		        .HasController<DummyFilterLayoutController>();

		    DataFlow.AddSource<RecordCountSource>();
            ModifyParameter(ParameterList.RecordCount);
		}
	}	
}