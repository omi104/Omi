using System.Collections.Generic;
using System.Linq;
using Aspose.Cells;
using Aspose.Cells.Charts;
using Aspose.Slides.Pptx;
using Dashboard.Configuration.Widgets;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Common;
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

        public Workbook GetExcelWorkbook(bool isPpt = false)
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


    //public class RbWidgetHomeTopTableBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    //{
    //    public byte[] GetData(string widgetName, string exportType, string authToken)
    //    {
    //        return GetWidgetData(widgetName, exportType, authToken);
    //    }
    //}

    //public class HomeExportController : RbWidgetHomeTopTableBaseController<ExcelExportConfig, ExportModel>
    //{
    //    private const int StartColumn = 2;
    //    private const int StartRow = 8;

    //    [ExportType("xlsx")]
    //    public byte[] ExcelExportRaw()
    //    {
    //        var workbook = GetExcelWorkbook();
    //        return workbook.GetExcelData();
    //    }

    //    [ExportType("pptx")]
    //    public byte[] PptExportRaw()
    //    {
    //        var path = Server.MapPath(@"~\Content\ExportTemplate\pptxTemplate.pptx");
    //        var pptx = GetPresentation(path);

    //        var workbook = GetExcelWorkbook(true);
    //        workbook.Worksheets[0].SetMargin(0, 0, 0, 0);
    //        pptx.Slides[0].EmbedExcelWorkbook(workbook, .25f, .20f, 9.5f, 9.5f);
    //        return pptx.GetPowerpointData();
    //    }

    //    [ExportType("pdf")]
    //    public byte[] PdfExportRaw()
    //    {
    //        return PptExportRaw();
    //    }

    //    public Workbook GetExcelWorkbook(bool isPpt=false)
    //    {
    //        var path = Server.MapPath(@"~\Content\ExportTemplate\CombinationBarChart.xlsx");
    //        if(Config.KPI_Text.ToUpper() == "SALES PERFORMANCE VS COMPETITORS")
    //            path = Server.MapPath(@"~\Content\ExportTemplate\CombinationAreaChart.xlsx");
    //        if (Config.KPI_Text.ToUpper() == "MARKET SHARE" || Config.KPI_Text.ToUpper() == "EVOLUTION INDEX")
    //            path = Server.MapPath(@"~\Content\ExportTemplate\MSLineChart.xlsx");
    //        if (Config.KPI_Text.ToUpper() == "GROWTH")
    //            path = Server.MapPath(@"~\Content\ExportTemplate\BubbleChart.xlsx");

    //        var workbook = ExportHelper.GetWorkbook(path);
    //        var sheet = workbook.Worksheets["Sheet1"];
    //        sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;

    //        if (Config.KPI_Text.ToUpper() == "SALES" && Data.DataTable.Rows.Count > 1)
    //        {
    //            for (int i=1; i<Data.DataTable.Rows.Count;i++)
    //            {
    //                Data.DataTable.Rows[i].Cells[0].Data = i.ToString();
    //            }
    //            var data = Data.DataTable.Rows[0].Cells[0].Data;
    //            if (data != null && data.ToString() == "RankName")
    //                Data.DataTable.Rows[0].Cells[0].Data = "Rank";
    //            data = Data.DataTable.Rows[0].Cells[1].Data;
    //            if (data != null && data.ToString() == "CustomMeasureName")
    //                Data.DataTable.Rows[0].Cells[1].Data = "Product";
    //            if (Data.DataTable.Rows[2].Cells[1].Data != null && Data.DataTable.Rows[2].Cells[1].Data.ToString().Trim() == "--")
    //                Data.DataTable.Rows[2].Cells[1].Data = "%PPG";

    //            sheet.WriteTable(Data.DataTable, "B29");
    //            sheet.DeleteRows(Data.DataTable.Rows.Count+29, 100);
    //            if (isPpt)
    //                sheet.HideRows(29, Data.DataTable.Rows.Count);
    //            sheet.DeleteColumns(Data.DataTable.Rows[0].Cells.Count+2,100);
    //        }

    //        else if (Config.KPI_Text.ToUpper() == "GROWTH" && Data.DataTable.Rows.Count > 1)
    //        {
    //            //draw 2 column table for IS_MERCK and Rank
    //            var data = Data.DataTable.Rows[0].Cells[1].Data;
    //            if (data != null && data.ToString().Contains("INTPRDRank"))
    //                Data.DataTable.Rows[0].Cells[1].Data = "Rank";
    //            for (int i = 0; i < Data.DataTable.Rows.Count; i++)
    //            {
    //                int cellNo = i + 30;
    //                sheet.WriteText(Data.DataTable.Rows[i].Cells[0].Data, "A" + cellNo);
    //                sheet.WriteText(Data.DataTable.Rows[i].Cells[1].Data, "B" + cellNo);
    //            }

    //            data = Data.DataTable.Rows[0].Cells[2].Data;
    //            if (data != null && data.ToString().Contains("INTPRDName"))
    //                Data.DataTable.Rows[0].Cells[2].Data = "Product";

    //            data = Data.DataTable.Rows[0].Cells[5].Data;
    //            if (data != null && data.ToString().Contains("Sales"))
    //                Data.DataTable.Rows[0].Cells[5].Data = "Sales";

    //            var monthDict = new Dictionary<string, int>()
    //                    {
    //                        {"Jan",1},
    //                        {"Feb",2},
    //                        {"Mar",3},
    //                        {"Apr",4},
    //                        {"May",5},
    //                        {"Jun",6},
    //                        {"Jul",7},
    //                        {"Aug",8},
    //                        {"Sep",9},
    //                        {"Oct",10},
    //                        {"Nov",11},
    //                        {"Dec",12}
    //                    };

    //            var qtrDict = new Dictionary<string, int>()
    //                    {
    //                        {"QTR 1",1},
    //                        {"QTR 2",2},
    //                        {"QTR 3",3},
    //                        {"QTR 4",4}
    //                    };

    //            for (int i = 3; (Config.TimePeriod_Text.ToUpper() == "MTH" || Config.TimePeriod_Text.ToUpper() == "QTR") && i < Data.DataTable.Rows[0].Cells.Count-1; i++)
    //            {
    //                if (Config.TimePeriod_Text.ToUpper() == "MTH")
    //                {
    //                    int year;
    //                    int.TryParse(Config.EndDate_Text.Split(' ')[1], out year);
    //                    int prevYear = year - 1;
    //                    Data.DataTable.Rows[0].Cells[3].Data = "Long-Term (" + Config.EndDate_Text + "-" + Config.EndDate_Text.Split(' ')[0] + " " + prevYear + ")";

    //                    int monthIndex = monthDict[Config.EndDate_Text.Split(' ')[0]];
    //                    if (monthIndex > 3)
    //                        monthIndex = monthIndex - 3;
    //                    else
    //                        monthIndex = 12 + (monthIndex - 3);
    //                    string oldMonth = monthDict.FirstOrDefault(x => x.Value == monthIndex).Key;
    //                    Data.DataTable.Rows[0].Cells[4].Data = "Short-Term (" + Config.EndDate_Text + "-" + oldMonth + " " + Config.EndDate_Text.Split(' ')[1] + ")";
    //                }
    //                if (Config.TimePeriod_Text.ToUpper() == "QTR")
    //                {
    //                    int year;
    //                    int.TryParse(Config.EndDate_Text.Split(' ')[2], out year);
    //                    int prevYear = year - 1;
    //                    Data.DataTable.Rows[0].Cells[3].Data = "Long-Term (" + Config.EndDate_Text + "-" + Config.EndDate_Text.Split(' ')[0] + " " + Config.EndDate_Text.Split(' ')[1] + " " + prevYear + ")";

    //                    string concat = string.Concat(Config.EndDate_Text.Split(' ')[0] + " ", Config.EndDate_Text.Split(' ')[1]);
    //                    int qtrIndex = qtrDict[concat];
    //                    if (qtrIndex > 1)
    //                        qtrIndex = qtrIndex - 1;
    //                    else
    //                        qtrIndex = 4 + (qtrIndex - 1);
    //                    string oldQtr = qtrDict.FirstOrDefault(x => x.Value == qtrIndex).Key;
    //                    Data.DataTable.Rows[0].Cells[4].Data = "Short-Term (" + Config.EndDate_Text + "-" + oldQtr + " " +
    //                                                           Config.EndDate_Text.Split(' ')[2] + ")";
    //                }

    //            }
    //            if (Config.TimePeriod_Text.ToUpper() == "MAT" || Config.TimePeriod_Text.ToUpper() == "YTD")
    //            {
    //                for (int i = 3; i < Data.DataTable.Rows[0].Cells.Count; i++)
    //                {
    //                    string[] headers = Data.DataTable.Rows[0].Cells[i].Data.ToString().Split('_').ToArray();
    //                    Data.DataTable.Rows[0].Cells[i].Data = Config.TimePeriod_Text.ToUpper() + " " + headers[0];
    //                }
    //            }
    //            for (int i = 0; i < Data.DataTable.Rows.Count; i++)
    //            {
    //                Data.DataTable.Rows[i].Cells.RemoveRange(0,2);
    //            }
    //            sheet = workbook.Worksheets["Sheet1"];
    //            sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
    //            WriteBubbleChart(sheet.Charts[0],sheet,Data.DataTable,"C30");

    //            if (isPpt)
    //                sheet.HideRows(30, Data.DataTable.Rows.Count);

    //        }

    //        else if (Config.KPI_Text.ToUpper() == "MARKET SHARE" || Config.KPI_Text.ToUpper() == "EVOLUTION INDEX" ||
    //                 Config.KPI_Text.ToUpper() == "SALES PERFORMANCE VS COMPETITORS" && Data.DataTable.Rows.Count > 1)
    //        {
    //            var data = Data.DataTable.Rows[0].Cells[1].Data;
    //            if (data != null && data.ToString().Contains("INTPRDRank"))
    //                Data.DataTable.Rows[0].Cells[1].Data = "Rank";
    //            data = Data.DataTable.Rows[0].Cells[2].Data;
    //            if (data != null && data.ToString().Contains("INTPRDName"))
    //                Data.DataTable.Rows[0].Cells[2].Data = "Product";
    //            for (int i = 3; i < Data.DataTable.Rows[0].Cells.Count; i++)
    //                Data.DataTable.Rows[0].Cells[i].Data =
    //                    Data.DataTable.Rows[0].Cells[i].Data.ToString().Split('_')[0];
    //            if (Config.KPI_Text.ToUpper() == "MARKET SHARE" &&
    //                Data.DataTable.Rows[1].Cells[2].Data.ToString().ToUpper().Contains("TOTAL"))
    //            {
    //                Data.DataTable.Rows.RemoveAt(1); //Remove Total when market share
    //            }
    //            if (Config.TimePeriod_Text == "MAT" || Config.TimePeriod_Text == "YTD")
    //            {
    //                foreach (XCell t in Data.DataTable.Rows[0].Cells)
    //                {
    //                    t.Data = Config.TimePeriod_Text + " " + t.Data;
    //                }
    //                sheet = workbook.Worksheets["Sheet2"];
    //                sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;
    //                sheet.WriteTable(Data.DataTable, "A29");
    //                sheet.DeleteRows(Data.DataTable.Rows.Count + 29, 100);
    //                workbook.Worksheets.RemoveAt(0);
    //            }
    //            else
    //            {
    //                sheet.WriteTable(Data.DataTable, "A29");
    //                sheet.DeleteRows(Data.DataTable.Rows.Count + 29, 100);
    //                sheet.DeleteColumns(Data.DataTable.Rows[0].Cells.Count + 1, 100);
    //                workbook.Worksheets.RemoveAt(1);
    //            }

    //            if (isPpt)
    //                sheet.HideRows(29, Data.DataTable.Rows.Count);
    //        }
    //        sheet.Name = "Sales chart";
    //        return workbook;
    //    }


    //    public static string GetNextCellPosition(string cellPosition, Direction direction)
    //    {
    //        var colNo = ExportHelper.GetColumnNumber(cellPosition);
    //        var rowNo = ExportHelper.GetRowNumber(cellPosition);
    //        if (direction == Direction.Right) colNo++;
    //        if (direction == Direction.Bottom) rowNo++;

    //        return ExportHelper.GetColumnName(colNo) + rowNo;
    //    }

    //    public enum Direction
    //    {
    //        Right,
    //        Bottom
    //    }


    //    public static void WriteBubbleChart(Chart chart, Worksheet dataSheet, XTable data, string cellAddress)
    //    {
    //        dataSheet.WriteTable(data, cellAddress);

    //        var series = chart.NSeries;
    //        series.Clear();
    //        cellAddress = GetNextCellPosition(cellAddress, Direction.Bottom);
    //        for (var row = 1; row < data.Rows.Count; row++)
    //        {
    //            var seriesCellPosition = cellAddress;
    //            var index = series.Add("=" + seriesCellPosition, true);
    //            series[index].Name = "=" + seriesCellPosition;

    //            seriesCellPosition = GetNextCellPosition(seriesCellPosition, Direction.Right);
    //            series[index].XValues = "=" + seriesCellPosition;
    //            seriesCellPosition = GetNextCellPosition(seriesCellPosition, Direction.Right);
    //            series[index].Values = "=" + seriesCellPosition;
    //            seriesCellPosition = GetNextCellPosition(seriesCellPosition, Direction.Right);
    //            series[index].BubbleSizes = "=" + seriesCellPosition;

    //            cellAddress = GetNextCellPosition(cellAddress, Direction.Bottom);
    //        }
    //    }


    //    public PresentationEx GetPresentation(string filePath)
    //    {
    //        AsposeLicense.SetPowerpointLicense();
    //        return new PresentationEx(filePath);
    //    }
    //}
}