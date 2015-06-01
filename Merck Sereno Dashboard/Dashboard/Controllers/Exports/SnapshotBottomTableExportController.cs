using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{
    public class RbWidgetSnapshotBottomExportBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }
    public class SnapshotBottomTableExportController : RbWidgetSnapshotBottomExportBaseController<string, ExportSnapshptModel>
    {
        //
        // GET: /SnapshotTopTableExport/

        private const int StartColumn = 6;
        private const int StartRow = 27;

        [ExportType("xlsx")]
        public byte[] ExcelExportRaw()
        {
            var workbook = GetExcelWorkbook();
            return workbook.GetExcelData();
        }

        [ExportType("pptx")]
        public byte[] PptExportRaw()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplate.pptx");
            var pptx = GetPresentation(path);

            var workbook = GetPptWorkbook();
            workbook.Worksheets[0].SetMargin(0, 0, 0, 0);
            pptx.Slides[0].EmbedExcelWorkbook(workbook, .25f, .20f, 9.5f, 6.5f);

            return pptx.GetPowerpointData();
        }

        [ExportType("pdf")]
        public byte[] PdfExportRaw()
        {
            return PptExportRaw();
        }

        public Workbook GetExcelWorkbook()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\Snapshot.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet2"];
            workbook.Worksheets.RemoveAt(0);

            sheet.Name = "Selected Market";

            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "F2");
            sheet.WriteText(Data.Header2, "F3");
            sheet.WriteText(Data.Header3, "F4");

            if (Data.DataTable.Rows.Count > 1)
            {
                sheet.WriteTable(Data.DataTable, "F27");
                var rowcount = Data.DataTable.Rows.Count + StartRow;

                if (!string.IsNullOrEmpty(Data.EarliestPeriod))
                {
                    sheet.WriteText(Data.EarliestPeriod, "H25");
                    sheet.WriteText(Data.PreviousPeriod, "J25");
                    sheet.WriteText(Data.CurrentPeriod, "M25");

                    sheet.WriteText(Data.Measuretext, "H26");
                    sheet.WriteText(Data.Measuretext, "J26");
                    sheet.WriteText(Data.Measuretext, "M26");

                    sheet.Charts["Chart 2"].NSeries[0].Values = "='Selected Market'!$N$28:$N$" + rowcount;
                    sheet.Charts["Chart 2"].NSeries[0].Name = "";
                    sheet.Charts["Chart 2"].NSeries.CategoryData = "='Selected Market'!$G$28:$G$" + rowcount;

                }
                else
                {
                    sheet.DeleteColumns(8, 2);
                    sheet.WriteText(Data.PreviousPeriod, "H25");
                    sheet.WriteText(Data.CurrentPeriod, "K25");

                    sheet.WriteText(Data.Measuretext, "H26");
                    sheet.WriteText(Data.Measuretext, "K26");

                    sheet.Charts["Chart 2"].NSeries[0].Values = "='Selected Market'!$L$28:$L$" + rowcount;
                    sheet.Charts["Chart 2"].NSeries[0].Name = "";
                    sheet.Charts["Chart 2"].NSeries.CategoryData = "='Selected Market'!$G$28:$G$" + rowcount;
                }

            }
            sheet.Charts["Chart 2"].Title.Text = "";
            return workbook;
        }

        public Workbook GetPptWorkbook()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\Snapshot.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet2"];
            workbook.Worksheets.RemoveAt(0);

            sheet.Name = "Selected Market";

            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "F2");
            sheet.WriteText(Data.Header2, "F3");
            sheet.WriteText(Data.Header3, "F4");



            if (Data.DataTable.Rows.Count > 1)
            {
                var numberOfRowsInDataTable = Data.DataTable.Rows.Count;
                if (Data.DataTable.Rows.Count > 16)
                    Data.DataTable.Rows.RemoveRange(16, numberOfRowsInDataTable - 16);
                sheet.WriteTable(Data.DataTable, "F27");
                var rowcount = Data.DataTable.Rows.Count + StartRow;

                if (!string.IsNullOrEmpty(Data.EarliestPeriod))
                {
                    sheet.WriteText(Data.EarliestPeriod, "H25");
                    sheet.WriteText(Data.PreviousPeriod, "J25");
                    sheet.WriteText(Data.CurrentPeriod, "M25");

                    sheet.WriteText(Data.Measuretext, "H26");
                    sheet.WriteText(Data.Measuretext, "J26");
                    sheet.WriteText(Data.Measuretext, "M26");

                    sheet.Charts["Chart 2"].NSeries[0].Values = "='Selected Market'!$N$28:$N$" + rowcount;
                    sheet.Charts["Chart 2"].NSeries[0].Name = "";
                    sheet.Charts["Chart 2"].NSeries.CategoryData = "='Selected Market'!$G$28:$G$" + rowcount;

                }
                else
                {
                    sheet.DeleteColumns(8, 2);
                    sheet.WriteText(Data.PreviousPeriod, "H25");
                    sheet.WriteText(Data.CurrentPeriod, "K25");

                    sheet.WriteText(Data.Measuretext, "H26");
                    sheet.WriteText(Data.Measuretext, "K26");

                    sheet.Charts["Chart 2"].NSeries[0].Values = "='Selected Market'!$L$28:$L$" + rowcount;
                    sheet.Charts["Chart 2"].NSeries[0].Name = "";
                    sheet.Charts["Chart 2"].NSeries.CategoryData = "='Selected Market'!$G$28:$G$" + rowcount;
                }

            }
            sheet.Charts["Chart 2"].Title.Text = "";
            return workbook;
        }
        public PresentationEx GetPresentation(string filePath)
        {
            AsposeLicense.SetPowerpointLicense();
            return new PresentationEx(filePath);
        }

       

    }
}
