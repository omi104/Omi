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

    public class RbWidgetSnapshotExportBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }
    public class SnapshotTopTableExportController : RbWidgetSnapshotExportBaseController<string, ExportSnapshptModel>
    {
        //
        // GET: /SnapshotTopTableExport/

        private const int StartColumn = 3;
        private const int StartRow = 8;

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

            var workbook = GetExcelWorkbook();
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
            var sheet = workbook.Worksheets["Sheet1"];
            workbook.Worksheets.RemoveAt(1);

            sheet.Name = "Dataview";

            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "C2");
            sheet.WriteText(Data.Header2, "C3");
            sheet.WriteText(Data.Header3, "C4");

            if (Data.DataTable.Rows.Count > 1)
            {
                if (!string.IsNullOrEmpty(Data.EarliestPeriod))
                {
                    sheet.WriteText(Data.EarliestPeriod,"F6");
                    sheet.WriteText(Data.PreviousPeriod, "H6");
                    sheet.WriteText(Data.CurrentPeriod, "K6");

                    sheet.WriteText(Data.Measuretext, "F7");
                    sheet.WriteText(Data.Measuretext, "H7");
                    sheet.WriteText(Data.Measuretext, "K7");

                }
                else
                {
                    sheet.DeleteColumns(6,2);
                    sheet.WriteText(Data.PreviousPeriod, "F6");
                    sheet.WriteText(Data.CurrentPeriod, "I6");

                    sheet.WriteText(Data.Measuretext, "F7");
                    sheet.WriteText(Data.Measuretext, "I7");
                }
                sheet.WriteTable(Data.DataTable, "C8");
                sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count, 100);
                sheet.DeleteRows(StartRow + Data.DataTable.Rows.Count, 100);

                //if (Data.DataTable.Rows[1].Cells[0].Data.Equals("TOTAL N2A MARKET") ||
                //    Data.DataTable.Rows[1].Cells[0].Data.Equals("N2A SLOW RELEASE") ||
                //    Data.DataTable.Rows[1].Cells[0].Data.Equals("N2A OTHER"))
                //{
                //    chart.NSeries.RemoveAt(0);
                //}

            }
            return workbook;
        }
        public PresentationEx GetPresentation(string filePath)
        {
            AsposeLicense.SetPowerpointLicense();
            return new PresentationEx(filePath);
        }

    }
}
