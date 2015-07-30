using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.DataComponents.DataSources;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{
    public class RbWidgetExportBaseController<TCon,TData> :  WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }

    public class TrendTableChartExportController : RbWidgetExportBaseController<string, ExportModel>
    {
        private const int StartColumn = 2;
        private const int StartRow = 31;

        [ExportType("xlsx")]
        public byte[] ExcelExportRaw()
        {
            var workbook = GetExcelWorkbook();
            return workbook.GetExcelData();
        }

        //[ExportType("pptx")]
        //public byte[] PptExportRaw()
        //{
        //    var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplate.pptx");
        //    var pptx = GetPresentation(path);

        //    var workbook = GetPptWorkbook();
        //    workbook.Worksheets[0].SetMargin(0,0,0,0);
        //    pptx.Slides[0].EmbedExcelWorkbook(workbook, .25f, .20f, 9.5f, 6.5f);


        //    return pptx.GetPowerpointData();
        //}

        //[ExportType("pdf")]
        //public byte[] PdfExportRaw()
        //{
        //    return PptExportRaw();
        //}

        public Workbook GetExcelWorkbook()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\Trend.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Name = "Trend";
            var chart = sheet.Charts[0];
            //chart.ApplyYAxisNumberFormat("#,##0,",false);
            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "B2");
            sheet.WriteText(Data.Header2, "B3");
            sheet.WriteText(Data.Header3, "B4");

            if (Data.DataTable.Rows.Count > 1)
            {
                var data = Data.DataTable.Rows[0].Cells[0].Data;
                if (data != null && data.ToString() == "IS_RB")
                {
                    sheet.WriteTable(Data.DataTable, "A31");
                }
                else
                {
                    sheet.WriteTable(Data.DataTable, "B31");
                }

                sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count, 100);
                sheet.HideRows(StartRow + Data.DataTable.Rows.Count, 100);
            }

            return workbook;
        }

        //public Workbook GetPptWorkbook()
        //{
        //    var path = Server.MapPath(@"~\Content\ExportTemplate\Trend.xlsx");
        //    var workbook = ExportHelper.GetWorkbook(path);
        //    var sheet = workbook.Worksheets["Sheet1"];
        //    sheet.Name = "Trend";
        //    var chart = sheet.Charts[0];
        //    sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
        //    sheet.WriteText(Data.Header1, "B2");
        //    sheet.WriteText(Data.Header2, "B3");
        //    sheet.WriteText(Data.Header3, "B4");

        //    if (Data.DataTable.Rows.Count > 1)
        //    {
        //        var numberOfRowsInDataTable = Data.DataTable.Rows.Count;
        //        if (Data.DataTable.Rows.Count > 16)
        //            Data.DataTable.Rows.RemoveRange(17, numberOfRowsInDataTable - 17);
        //        //sheet.WriteTable(Data.DataTable, "B31");
        //        var data = Data.DataTable.Rows[0].Cells[0].Data;
        //        if (data != null && data.ToString() == "IS_RB") {
        //            sheet.WriteTable(Data.DataTable, "A31");
        //        }
        //        else {
        //            sheet.WriteTable(Data.DataTable, "B31");
        //        }
        //        sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count, 100);
        //        sheet.HideRows(StartRow + Data.DataTable.Rows.Count, 100);
        //    }

        //    return workbook;
        //}
        public PresentationEx GetPresentation(string filePath)
        {
            AsposeLicense.SetPowerpointLicense();
            return new PresentationEx(filePath);
        }

    }
}
