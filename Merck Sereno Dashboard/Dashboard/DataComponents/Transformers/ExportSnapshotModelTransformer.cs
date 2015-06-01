using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportSnapshotModelTransformer : ITransformer<XTable, ExportSnapshptModel>
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

        public ExportSnapshptModel GetData()
        {
            var earliestPeriod = "";
            var prevPeriod = "";
            var currentPeriod = "";
            var columnCount = Input.Rows[0].Cells.Count;
            if (columnCount == 16)
            {
                prevPeriod = Input.Rows[0].Cells[4].Data.ToString().Split('_')[0];
                currentPeriod = Input.Rows[0].Cells[8].Data.ToString().Split('_')[0];
            }
            else
            {
                earliestPeriod = Input.Rows[0].Cells[3].Data.ToString().Split('_')[0];
                prevPeriod = Input.Rows[0].Cells[5].Data.ToString().Split('_')[0];
                currentPeriod = Input.Rows[0].Cells[8].Data.ToString().Split('_')[0];
            }
            Input.Rows.RemoveAt(0);
            var model = new ExportSnapshptModel
            {
                DataTable = Input,
                Header1 = NavigationNameString + " - " + GeoMaptext + " - " + TimePeriodText + " - " + MeasureText,
                Header2 = "Category = " + CategoryText + " | " + "Subcategory = " + SubCategoryText + " | " + " Segment = " + SegementText,
                Header3 = "Channel = " + ChannelText + " | " + "SubChannel = " + SubChannelText,
                EarliestPeriod = earliestPeriod,
                PreviousPeriod = prevPeriod,
                CurrentPeriod = currentPeriod,
                Measuretext = MeasureText

            };
            return model; 
        }

        public XTable Input { set; private get; }
    }
}