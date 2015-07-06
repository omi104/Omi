using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Aspose.Cells;
using Dashboard.Configuration.Widgets;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Common;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{
    public class MerckWidgetTableBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }

    public class TableExportController : MerckWidgetTableBaseController<ExcelExportConfig, ExportModel>
    {
        [ExportType("pptx")]
        public byte[] PptExportRaw()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplate.pptx");
            var pptx = ExportHelper.GetPresentation(path);
            int position = 0;
            foreach (var pptTable in Data.PptTables)
            {
                var slideIdx = pptx.Slides.AddClone(pptx.Slides[0]);
                var slide = pptx.Slides[slideIdx];

                var workbook = PptGetWorkbook(pptTable, position);
                slide.EmbedExcelWorkbook(workbook, .25f, .20f, 9.5f, 9.5f);//pptx.Slides[0].EmbedExcelWorkbook(workbook, .25f, .20f, 9.5f, 9.5f);
                position++;
            }
            pptx.Slides.RemoveAt(0);
            return pptx.GetPowerpointData();
        }


        private Workbook PptGetWorkbook(XTable table, int position)
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\SingleTableForPPT.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            if (Config.KPI_Text.ToUpper() == "SALES")
            {
                sheet.WriteTable(table, "B7");
                sheet.DeleteColumns(table.Rows[0].Cells.Count+1,100);
            }
            else
            {
                sheet.WriteTable(table, "A7");
                sheet.DeleteColumns(table.Rows[0].Cells.Count, 100);
            }
            sheet.DeleteRows(7+table.Rows.Count,100);
            
            sheet.SetMargin(0, 0, 0, 0);
            return workbook;
        }

    }
}
