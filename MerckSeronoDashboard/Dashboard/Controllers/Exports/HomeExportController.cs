using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.Export;
using Dashboard.Models.Data;
using ExportFramework;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{
    public class RbWidgetHomeTopTableBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }

    public class HomeExportController : RbWidgetHomeTopTableBaseController<string, ExportModel>
    {
        private const int StartColumn = 2;
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
            var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplateWithHeader.pptx");
            var pptx = GetPresentation(path);

            var workbook = GetExcelWorkbook(true);
            workbook.Worksheets[0].SetMargin(0, 0, 0, 0);
            pptx.Slides[0].EmbedExcelWorkbook(workbook, 0.3f, 0.9f, 9.2f, 9.0f);

            return pptx.GetPowerpointData();
        }

        [ExportType("pdf")]
        public byte[] PdfExportRaw()
        {
            return PptExportRaw();
        }

        public Workbook GetExcelWorkbook(bool isPpt=false)
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\Home.xlsx");
            if (isPpt)
            {
                path = Server.MapPath(@"~\Content\ExportTemplate\HomeForPpt.xlsx");
            }
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];

            if (Config == "HomeTrend")
            {
                sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
                if (isPpt)
                {
                    sheet.WriteText(Data.Header1, "B1");
                    sheet.WriteText(Data.Header2, "B2");
                    sheet.WriteText(Data.Header3, "B3");
                }
                else
                {
                    sheet.WriteText(Data.Header1, "B2");
                    sheet.WriteText(Data.Header2, "B3");
                    sheet.WriteText(Data.Header3, "B4");
                }

                if (Data.DataTable.Rows.Count > 1)
                {
                    if (isPpt)
                    {
                        sheet.WriteTable(Data.DataTable, "B34");
                        sheet.HideRows(34, 4);
                    }
                    else
                    {
                        sheet.WriteTable(Data.DataTable, "B35");
                        sheet.HideRows(35, 4);
                    }                    
                    workbook.Worksheets.RemoveAt(1);
                    workbook.Worksheets.RemoveAt(1);
                }
                sheet.Name = "Category vs. RB Sales Trend";
            }

            else if (Config == "HomeTopRankTable")
            {
                sheet = workbook.Worksheets["Sheet2"];
                sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;

                if (isPpt)
                {
                    sheet.WriteText(Data.Header1, "B1");
                    sheet.WriteText(Data.Header2, "B2");
                    sheet.WriteText(Data.Header3, "B3");
                }
                else
                {
                    sheet.WriteText(Data.Header1, "B2");
                    sheet.WriteText(Data.Header2, "B3");
                    sheet.WriteText(Data.Header3, "B4");
                }
                if (Data.DataTable.Rows.Count > 1)
                {
                    if (isPpt)
                    {
                        sheet.WriteTable(Data.DataTable, "B5");
                        sheet.DeleteRows(5 + Data.DataTable.Rows.Count, 100);
                    }
                    else
                    {
                        sheet.WriteTable(Data.DataTable, "B8");
                        sheet.DeleteRows(8 + Data.DataTable.Rows.Count, 100);
                    }
                    sheet.DeleteColumns(StartColumn + Data.DataTable.Rows[0].Cells.Count - 1, 100);
                }
                sheet.Name = "Top 10 Companies by Sales";
                workbook.Worksheets.RemoveAt(0);
                workbook.Worksheets.RemoveAt(1);
            }
            else if (Config == "HomeBarChart")
            {
                sheet = workbook.Worksheets["Sheet3"];
                sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;

                if (isPpt)
                {
                    sheet.WriteText(Data.Header1, "B1");
                    sheet.WriteText(Data.Header2, "B2");
                    sheet.WriteText(Data.Header3, "B3");
                }
                else
                {
                    sheet.WriteText(Data.Header1, "B2");
                    sheet.WriteText(Data.Header2, "B3");
                    sheet.WriteText(Data.Header3, "B4");
                }
                if (Data.DataTable.Rows.Count > 1)
                {
                    if (isPpt)
                    {
                        sheet.WriteTable(Data.DataTable, "B32");
                        sheet.HideRows(32, Data.DataTable.Rows.Count);
                        sheet.DeleteRows(32 + Data.DataTable.Rows.Count, 100);
                    }
                    else
                    {
                        sheet.WriteTable(Data.DataTable, "B33");
                        sheet.HideRows(33, Data.DataTable.Rows.Count);
                        sheet.DeleteRows(33 + Data.DataTable.Rows.Count, 100);
                    }
                    sheet.DeleteColumns(2 + Data.DataTable.Rows[0].Cells.Count, 100);
                }
                sheet.Name = "Category vs. RB MS Snapshot";
                workbook.Worksheets.RemoveAt(0);
                workbook.Worksheets.RemoveAt(0);
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