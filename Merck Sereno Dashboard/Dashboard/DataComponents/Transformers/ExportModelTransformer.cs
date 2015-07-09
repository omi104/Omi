using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportModelTransformer : ITransformer<XTable, ExportModel>
    {
        public string NavigationNameString { get; set; }
        public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        public bool RevertAxis { get; set; }
        public string UnitValue { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PeriodType { get; set; }
        public string CategoryString { get; set; }
        public string MeasureValue { get; set; }
        public string Country { get; set; }
        public string Product { get; set; }
        public string RegionOrCluster { get; set; }

        public ExportModel GetData()
        {
            var model = new ExportModel
            {
                DataTable = Input,
                Header1 = NavigationNameString,
                Header2 = "Abc",
                Header3 = "Def"
            };
            return model;
        }

        public XTable Input { set; private get; }
    }
}