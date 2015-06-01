using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportModelTransformer : ITransformer<XTable, ExportModel>
    {
        public string NavigationNameString { get; set; }
        public string GeoMaptext { get; set; }
        public string TimePeriodText { get; set; }
        public string MeasureText { get; set; }
    
        public string CategoryText { get; set; }
        public string SubCategoryText { get; set; }
        public string SegementText { get; set; }

        public string ChannelText { get; set; }
        public string SubChannelText { get; set; }

        public string TopCountValue { get; set; }

        public ExportModel GetData()
        {
            var model = new ExportModel
            {
                DataTable = Input,
                Header1 = NavigationNameString + " - " + GeoMaptext + " - " +TimePeriodText + " - " + MeasureText,
                Header2 = "Category = " + CategoryText + " | " + "Subcategory = " + SubCategoryText + " | " + " Segment = " + SegementText,
                Header3 = "Channel = " + ChannelText + " | " + "SubChannel = " + SubChannelText
            };
            return model;
        }

        public XTable Input { set; private get; }
    }
}