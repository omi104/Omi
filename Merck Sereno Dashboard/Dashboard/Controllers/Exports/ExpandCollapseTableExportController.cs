using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Common;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{

    public class RbWidgetExpandCollapseTableExportBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }

    public class ExpandCollapseTableExportController : RbWidgetExpandCollapseTableExportBaseController<string, ExportModel>
    {
        private const int StartColumn = 3;
        private const int StartRow = 7;

        [ExportType("xlsx")]
        public byte[] ExcelExportRaw()
        {
            var workbook = GetExcelWorkbook();
            return workbook.GetExcelData();
        }

        [ExportType("pptx")]
        public byte[] PptExportRaw()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplateWithHeader.pptx");
            var pptx = GetPresentation(path);

            foreach (var pptTable in Data.PptTables)
            {
                var slideIdx = pptx.Slides.AddClone(pptx.Slides[0]);
                var slide = pptx.Slides[slideIdx];

                var workbook = PptGetWorkbook(pptTable);
                slide.EmbedExcelWorkbook(workbook, 0.3f, 0.9f, 9.2f, 9.0f);
            }
            pptx.Slides.RemoveAt(0);            
            return pptx.GetPowerpointData();
        }
        private Workbook PptGetWorkbook(XTable table)
        {
            string path = Server.MapPath(@"~\Content\ExportTemplate\AtAGlanceForPpt.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Name = "AtAGlance";

            if (Config.ToUpper().Contains("CATEGORIES"))
            {
                sheet.DeleteColumns(3, 1);//delete Rank Column
            }
            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "C1");
            sheet.WriteText(Data.Header2, "C2");
            sheet.WriteText(Data.Header3, "C3");

            sheet.WriteTable(table, "C4");
            sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count, 100);
            sheet.DeleteRows(4 + table.Rows.Count, 100);
            sheet.SetMargin(0, 0, 0, 0);
            return workbook;
        }
        [ExportType("pdf")]
        public byte[] PdfExportRaw()
        {
            return PptExportRaw();
        }

        public Workbook GetExcelWorkbook()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\AtAGlanceFourColumns.xlsx");
            if(Config == "Categories-SixColumns")
                path = Server.MapPath(@"~\Content\ExportTemplate\AtAGlanceSixColumns.xlsx");

            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Name = "AtAGlance";

            if (Data.DataTable.Rows.Count > 0)
            {
                if (Config == "Categories-FourColumns" && Config.ToUpper().Contains("CATEGORIES"))
                {
                    sheet.DeleteColumns(3, 1);//delete Rank Column
                }
                sheet.WriteTable(Data.DataTable, "C7");
                if (Config.ToUpper().Contains("CATEGORIES"))
                {
                    sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count+1, 100);
                    sheet.DeleteRows(StartRow + Data.DataTable.Rows.Count, 1100);
                }
                else
                {
                    sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count, 100);
                    sheet.DeleteRows(StartRow + Data.DataTable.Rows.Count, 1100);
                }

            }

            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
            sheet.WriteText(Data.Header1, "C2");
            sheet.WriteText(Data.Header2, "C3");
            sheet.WriteText(Data.Header3, "C4");

            return workbook;
        }
        public PresentationEx GetPresentation(string filePath)
        {
            AsposeLicense.SetPowerpointLicense();
            return new PresentationEx(filePath);
        }

       
    }
}
