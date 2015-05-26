using System.Collections.Generic;
using DashboardFramework.Configuration;
using DashboardFramework.DataFlow;
using $rootnamespace$.Controllers.Layouts;
using $rootnamespace$.DataComponents.DataSources;
using $rootnamespace$.Models.Config;

namespace $rootnamespace$.Configuration.Filters
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