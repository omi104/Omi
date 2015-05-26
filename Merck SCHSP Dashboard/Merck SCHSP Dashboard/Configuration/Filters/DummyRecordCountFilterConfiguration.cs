using System.Collections.Generic;
using DashboardFramework.Configuration;
using DashboardFramework.DataFlow;
using Merck_SCHSP_Dashboard.Controllers.Layouts;
using Merck_SCHSP_Dashboard.DataComponents.DataSources;
using Merck_SCHSP_Dashboard.Models.Config;

namespace Merck_SCHSP_Dashboard.Configuration.Filters
{
	public class DummyRecordCountFilterConfiguration : FilterConfiguration<Dictionary<string, string>>
	{
		public DummyRecordCountFilterConfiguration()
		{
            HasName("RecordCount");
		    Layout.HasConfig(new DummyFilterLayoutConfig {Label = "RecordCount", ControlId = "filter-RecordCount-control"})
		        .HasController<DummyFilterLayoutController>();

		    DataFlow.AddSource<RecordCountSource>();
            ModifyParameter(Parameter.RecordCount);
		}
	}	
}