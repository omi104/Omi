using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Aspose.Cells;
using Component.Node;
using CubeFramework;
using DashboardFramework.DataComponent;
using ExportFramework.Common;
using WebGrease.Css.Extensions;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToXTableTrendTransformer : ITransformer<CubeData, XTable>
    {



        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };
            var headerRow = new XRow() { Cells = new List<XCell>() };
            foreach (var col in Input.Columns)
            {
                if (col.Name == "TotalMarketSales")
                    headerRow.Cells.Add(new XCell() { Data = "Total Market Sales" });
                else if (col.Name == "RBSales")
                    headerRow.Cells.Add(new XCell() { Data = "Reckitt Benckiser Sales" });
                else
                    headerRow.Cells.Add(new XCell() { Data = col.Name });
            }
            table.Rows.Add(headerRow);
            foreach (var r in Input.Rows)
            {
                var row = new XRow() { Cells = new List<XCell>() };
                foreach (string t in r.Values)
                {
                    row.Cells.Add(new XCell() { Data = t });
                }
                table.Rows.Add(row);
            }
            return table;
        }

        public CubeData Input { set; private get; }

        
        //private int MerckIndex { get; set; }
        //private bool IsMerck { get; set; }

        //public CubeData Input { set; private get; }
        //public string PeriodType { get; set; }
        //public string KPI { get; set; }
        //public string EndDate { get; set; }


        //public XTable GetData()
        //{
        //    var table = new XTable() { Rows = new List<XRow>() };
        //    var headerRow = new XRow() { Cells = new List<XCell>() };
        //    var index = default(int);
        //    Input.Columns[0].Name = "Rank";
        //    if (Input.Columns[1].Name.ToUpper().Contains("NAME"))
        //        Input.Columns[1].Name = "Product";

        //    #region Header Manipulation for Growth
        //    if (KPI.ToUpper() == "GROWTH")
        //    {
                
        //        for (int i = 3; i < Input.Columns.Count; i++)
        //        {
        //            if (Input.Columns[i].Name.ToUpper().Contains("SALES"))
        //                Input.Columns[i].Name = "Sales";
        //            string[] headers = Input.Columns[i].Name.Split('_').ToArray();
        //            if (PeriodType.ToUpper() == "MAT" || PeriodType.ToUpper() == "YTD")
        //                Input.Columns[i].Name = PeriodType + " " + headers[1];
        //            else
        //            {
        //                var monthDict = new Dictionary<string, int>()
        //                {
        //                    {"Jan", 1},
        //                    {"Feb", 2},
        //                    {"Mar", 3},
        //                    {"Apr", 4},
        //                    {"May", 5},
        //                    {"Jun", 6},
        //                    {"Jul", 7},
        //                    {"Aug", 8},
        //                    {"Sep", 9},
        //                    {"Oct", 10},
        //                    {"Nov", 11},
        //                    {"Dec", 12}
        //                };

        //                var qtrDict = new Dictionary<string, int>()
        //                {
        //                    {"QTR 1", 1},
        //                    {"QTR 2", 2},
        //                    {"QTR 3", 3},
        //                    {"QTR 4", 4}
        //                };

        //                if (i == 3)
        //                {
        //                    if (PeriodType.ToUpper() == "MTH")
        //                    {
        //                        int year;
        //                        int.TryParse(EndDate.Split(' ')[1], out year);
        //                        int prevYear = year - 1;
        //                        Input.Columns[i].Name = "Long-Term (" + EndDate + "-" + EndDate.Split(' ')[0] + " " +
        //                                                prevYear + ")";
        //                    }
        //                    if (PeriodType.ToUpper() == "QTR")
        //                    {
        //                        int year;
        //                        int.TryParse(EndDate.Split(' ')[2], out year);
        //                        int prevYear = year - 1;
        //                        Input.Columns[i].Name = "Long-Term (" + EndDate + "-" + EndDate.Split(' ')[0] + " " +
        //                                                EndDate.Split(' ')[1] + " " + prevYear + ")";
        //                    }

        //                }
        //                if (i == 4)
        //                {
        //                    if (PeriodType.ToUpper() == "MTH")
        //                    {
        //                        int monthIndex = monthDict[EndDate.Split(' ')[0]];
        //                        if (monthIndex > 3)
        //                            monthIndex = monthIndex - 3;
        //                        else
        //                            monthIndex = 12 + (monthIndex - 3);
        //                        string oldMonth = monthDict.FirstOrDefault(x => x.Value == monthIndex).Key;
        //                        Input.Columns[i].Name = "Short-Term (" + EndDate + "-" + oldMonth + " " +
        //                                                EndDate.Split(' ')[1] + ")";
        //                    }
        //                    if (PeriodType.ToUpper() == "QTR")
        //                    {
        //                        string concat = string.Concat(EndDate.Split(' ')[0] + " ", EndDate.Split(' ')[1]);
        //                        int qtrIndex = qtrDict[concat];
        //                        if (qtrIndex > 1)
        //                            qtrIndex = qtrIndex - 1;
        //                        else
        //                            qtrIndex = 4 + (qtrIndex - 1);
        //                        string oldQtr = qtrDict.FirstOrDefault(x => x.Value == qtrIndex).Key;
        //                        Input.Columns[i].Name = "Short-Term (" + EndDate + "-" + oldQtr + " " +
        //                                                EndDate.Split(' ')[2] + ")";
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    #endregion

        //    else
        //    {
        //        for (int i = 3; i < Input.Columns.Count; i++)
        //        {
        //            string[] headers = Input.Columns[i].Name.Split('_').ToArray();
        //            bool isYtdOrMat = PeriodType.ToUpper() == "MAT" || PeriodType.ToUpper() == "YTD";
        //            if (isYtdOrMat)
        //                Input.Columns[i].Name = PeriodType + " " + headers[0];
        //            else
        //                Input.Columns[i].Name = headers[0];
        //        }
        //    }
        //    foreach (var col in Input.Columns)
        //    {
        //        if (col.Name.ToUpper().Contains("IS_MERCK"))
        //        {
        //            IsMerck = true;
        //            MerckIndex = index; 
        //            headerRow.Cells.Insert(0, new XCell() { Data = col.Name });
        //        }
        //        else
        //            headerRow.Cells.Add(new XCell() { Data = col.Name });
        //        index++;
        //    }
        //    table.Rows.Add(headerRow);
        //    int rowCount = 1;
        //    foreach (var r in Input.Rows)
        //    {
        //        var row = new XRow() { Cells = new List<XCell>() };
        //        for (int i = 0; i < r.Values.Count;i++ )
        //        {
        //            if (IsMerck && i == MerckIndex)
        //            {
        //                row.Cells.Insert(0,new XCell() { Data = r.Values[i] });
        //            }
        //            else
        //            {
        //                row.Cells.Add(new XCell() { Data = r.Values[i] });
        //            }
        //        }
        //        if (KPI.ToUpper() == "SALES")
        //        {
        //            row.Cells[0].Data = rowCount;
        //            rowCount++;
        //            if (row.Cells[1].Data.ToString().Contains("--"))
        //                row.Cells[1].Data = "%PPG";
        //        }
        //        table.Rows.Add(row);
        //    }
        //    return table;
        //}
        ////protected virtual string GetFormattedValue(object value, string formatString)
        ////{
        ////    bool _isMillion = false;
        ////    bool _isBillion = false;
        ////    bool _isAsItIS = false;
        ////    bool _isThousand = false;
        ////    TextFormat _numberFormatter = new TextFormat();
        ////    string result = "";
        ////    double givenValue;
        ////    bool isNumeric = double.TryParse(value.ToString(), out givenValue);

        ////    if (!string.IsNullOrEmpty(value.ToString()))
        ////    {
        ////        if (isNumeric)
        ////        {
        ////            double number;
        ////            double.TryParse(value.ToString(), out number);
        ////            if (formatString == "Thousand")
        ////            {
        ////                if (Math.Abs(number) >= 1000000000) //greater than or equal to 1 billion
        ////                {
        ////                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,,.0" };
        ////                    _isBillion = true;
        ////                }
        ////                else if (Math.Abs(number) >= 1000000) //greater than or equal to 1 million
        ////                {
        ////                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,.0" };
        ////                    _isMillion = true;
        ////                }
        ////                else if (Math.Abs(number) >= 1000)
        ////                {
        ////                    _numberFormatter = new TextFormat() { FormatString = "#,##0" };
        ////                    _isThousand = true;
        ////                }
        ////                else if (Math.Abs(number) < 1000)
        ////                {
        ////                    _numberFormatter = new TextFormat() { FormatString = "#,###.0" };
        ////                    _isAsItIS = true;
        ////                }

        ////                var formattedValue =
        ////                    _numberFormatter.Format(Math.Abs(number).ToString(CultureInfo.InvariantCulture));
        ////                result += formattedValue;

        ////                if (_isBillion)
        ////                {
        ////                    result += "b";
        ////                }
        ////                else if (_isMillion)
        ////                {
        ////                    result += "m";
        ////                }
        ////                else if (_isAsItIS)
        ////                {
        ////                    result += "";
        ////                }
        ////                else if (_isThousand)
        ////                {
        ////                    result += "k";
        ////                }
        ////                return result;
        ////            }

        ////        }
        ////    }
        ////    return value.ToString();
        ////}

    }
}