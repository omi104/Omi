using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;
using Dashboard.Configuration;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportModelTransformer : ITransformer<XTable, ExportModel>
    {
        public string NavigationNameString { get; set; }
        //public string UncheckedItems { get; set; }
        public string KPI { get; set; }
        //public bool RevertAxis { get; set; }
        public string UnitValue { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string PeriodType { get; set; }
        //public string CategoryString { get; set; }
        public string MeasureType { get; set; }
        public string Country { get; set; }
        public string Product { get; set; }
        public string RegionOrCluster { get; set; }

        public string Segment { get; set; }

        public string Forms { get; set; }

        public ExportModel GetData()
        {
            var model = new ExportModel
            {
                DataTable = Input,
                Header1 = NavigationNameString,
                Header2 = ParameterList.RegionOrCluster + "-" + RegionOrCluster + "," + ParameterList.Country + "-" + Country + "," + ParameterList.Segment + "-" + Segment + "," + ParameterList.Form + "-" + Forms + "," + ParameterList.UnitOrValue + "-" + UnitValue + "," + ParameterList.TimePeriod + "-" + PeriodType + "," + ParameterList.StartDate + "-" + StartDate + "," + ParameterList.EndDate + "-" + EndDate,
                Header3 = ParameterList.Product + "-" + Product + "," + ParameterList.KPI + "-" + KPI 
            };
            return model;
        }

        public XTable Input { set; private get; }
    }
}