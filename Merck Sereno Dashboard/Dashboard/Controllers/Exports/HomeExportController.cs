using System.Linq;
using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.Configuration.Widgets;
using Dashboard.Export;
using Dashboard.ViewModels;
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

    public class HomeExportController : RbWidgetHomeTopTableBaseController<CombinationChartExcelExport, ExportModel>
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
            var path = Server.MapPath(@"~\Content\ExportTemplate\CombinationBarChart.xlsx");
            if(Config.KPI_Text.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
                path = Server.MapPath(@"~\Content\ExportTemplate\CombinationAreaChart.xlsx");
            if (Config.KPI_Text.ToUpper() == "MARKET SHARE" || Config.KPI_Text.ToUpper() == "EVOLUTION INDEX")
                path = Server.MapPath(@"~\Content\ExportTemplate\MSLineChart.xlsx");
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;

            if (Config.KPI_Text.ToUpper() == "SALES" && Data.DataTable.Rows.Count > 1)
            {
                for (int i=1; i<Data.DataTable.Rows.Count;i++)
                {
                    Data.DataTable.Rows[i].Cells[0].Data = i.ToString();
                }
                var data = Data.DataTable.Rows[0].Cells[0].Data;
                if (data != null && data.ToString() == "RankName")
                    Data.DataTable.Rows[0].Cells[0].Data = "Rank";
                data = Data.DataTable.Rows[0].Cells[1].Data;
                if (data != null && data.ToString() == "CustomMeasureName")
                    Data.DataTable.Rows[0].Cells[1].Data = "Product";
                if (Data.DataTable.Rows[2].Cells[1].Data != null && Data.DataTable.Rows[2].Cells[1].Data.ToString().Trim() == "--")
                    Data.DataTable.Rows[2].Cells[1].Data = "%PPG";

                sheet.WriteTable(Data.DataTable, "B29");
                sheet.DeleteRows(Data.DataTable.Rows.Count+29, 100);
                sheet.DeleteColumns(Data.DataTable.Rows[0].Cells.Count+2,100);
            }
            else if (Config.KPI_Text.ToUpper() == "MARKET SHARE" || Config.KPI_Text.ToUpper() == "EVOLUTION INDEX" || Config.KPI_Text.ToUpper() == "SALES PERFORMANCE VS COMPETITORS" && Data.DataTable.Rows.Count > 1)
            {
                var data = Data.DataTable.Rows[0].Cells[1].Data;
                if (data != null && data.ToString().Contains("INTPRDRank"))
                    Data.DataTable.Rows[0].Cells[1].Data = "Rank";
                data = Data.DataTable.Rows[0].Cells[2].Data;
                if (data != null && data.ToString().Contains("INTPRDName"))
                    Data.DataTable.Rows[0].Cells[2].Data = "Product";
                for(int i=3;i<Data.DataTable.Rows[0].Cells.Count;i++)
                    Data.DataTable.Rows[0].Cells[i].Data = Data.DataTable.Rows[0].Cells[i].Data.ToString().Split('_')[0];

                if (Config.TimePeriod_Text == "MAT" || Config.TimePeriod_Text == "YTD")
                {
                    sheet = workbook.Worksheets["Sheet2"];
                    sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
                    sheet.WriteTable(Data.DataTable, "A29");
                    sheet.DeleteRows(Data.DataTable.Rows.Count + 29, 100);
                    //sheet.DeleteRows(29, 1);//Delete TOTAL
                    workbook.Worksheets.RemoveAt(0);
                }
                else
                {
                    sheet.WriteTable(Data.DataTable, "A29");
                    sheet.DeleteRows(Data.DataTable.Rows.Count + 29, 100);
                    sheet.DeleteColumns(Data.DataTable.Rows[0].Cells.Count + 1, 100);
                    workbook.Worksheets.RemoveAt(1);
                }

            }
            sheet.Name = "Sales chart";
            return workbook;
        }
        public PresentationEx GetPresentation(string filePath)
        {
            AsposeLicense.SetPowerpointLicense();
            return new PresentationEx(filePath);
        }
    }
}