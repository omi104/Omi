using Component.Node;
using CubeFramework;
using DashboardFramework.DataComponent;
using ExportFramework.Common;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using WebGrease.Css.Extensions;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToXTableSnapshotTransformer : ITransformer<CubeData, XTable>
    {
        public string AbsoluteThousandValue { get; set; }

        public string Formatstring { get; set; }
        public string DisplayIn { get; set; }
        public string Measure { get; set; }
        public bool IsTopTable { get; set; }
        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };

            var headerRow = new XRow() { Cells = new List<XCell>() };
            Input.Columns.Where(x => x.Name != "IS_MERCK" || x.Name != "Ranking").ForEach(x => headerRow.Cells.Add(new XCell() { Data = x.Name }));
            table.Rows.Add(headerRow);
            var columnCount = Input.Rows[1].Values.Count;
            var columnIndexValuesWithEarliestYearForTop = new List<string>() { "6", "8", "10", "12", "14", "16", "17" };
            var columnIndexValuesWithEarliestYearForBottom = new List<string>() { "2", "6", "8", "10", "12", "14", "16", "17" };
            var columnIndexValuesWithoutEarliestYearForTop = new List<string>() { "4", "6", "8", "10", "12", "14", "15" };
            var columnIndexValuesWithoutEarliestYearForBottom = new List<string>() { "2", "4", "6", "8", "10", "12", "14", "15" };
            if (IsTopTable)
            {
                var rowcount = Input.Rows.Count;
                Input.Rows.RemoveRange(6, rowcount - 6);
                var indicesAvoidedList = columnCount == 16
                                             ? columnIndexValuesWithoutEarliestYearForTop
                                             : columnIndexValuesWithEarliestYearForTop;

                foreach (var r in Input.Rows)
                {
                    var row = new XRow() { Cells = new List<XCell>() };

                    for (int i = 0; i < r.Values.Count; i++)
                    {
                        if (indicesAvoidedList.Any(s => s.Equals(i.ToString())))
                        {
                            continue;
                        }
                        else
                        {
                            row.Cells.Add(new XCell() { Data = GetFormattedValue(r.Values[i], AbsoluteThousandValue) });
                        }

                    }

                    table.Rows.Add(row);

                }
            }
            else
            {
                var indicesAvoidedList = columnCount == 16
                                             ? columnIndexValuesWithoutEarliestYearForBottom
                                             : columnIndexValuesWithEarliestYearForBottom;
                foreach (var r in Input.Rows)
                {
                    var row = new XRow() { Cells = new List<XCell>() };

                    for (int i = 0; i < r.Values.Count; i++)
                    {
                        if (indicesAvoidedList.Any(s => s.Equals(i.ToString())))
                        {
                            continue;
                        }
                        else
                        {
                            row.Cells.Add(new XCell() { Data = GetFormattedValue(r.Values[i], AbsoluteThousandValue) });
                        }

                    }

                    //if (!UncheckedItems.Contains(r.Values[0]))
                    //{
                    table.Rows.Add(row);
                    //}

                }
            }

            return table;
        }

        protected virtual string GetFormattedValue(object value, string formatString)
        {
            bool _isMillion = false;
            bool _isBillion = false;
            bool _isAsItIS = false;
            bool _isThousand = false;
            TextFormat _numberFormatter = new TextFormat();
            string result = "";
            double givenValue;
            if (value == null)
                return "0.0";
            bool isNumeric = double.TryParse(value.ToString(), out givenValue);

            if (!string.IsNullOrEmpty(value.ToString()))
            {
                if (isNumeric)
                {
                    double number;
                    double.TryParse(value.ToString(), out number);
                    if (formatString == "Thousand")
                    {
                        if (Math.Abs(number) >= 1000000000) //greater than or equal to 1 billion
                        {
                            _numberFormatter = new TextFormat() { FormatString = "#,##0,,,.0" };
                            _isBillion = true;
                        }
                        else if (Math.Abs(number) >= 1000000) //greater than or equal to 1 million
                        {
                            _numberFormatter = new TextFormat() { FormatString = "#,##0,,.0" };
                            _isMillion = true;
                        }
                        else if (Math.Abs(number) >= 1000)
                        {
                            _numberFormatter = new TextFormat() { FormatString = "#,##0" };
                            _isThousand = true;
                        }
                        else if (Math.Abs(number) < 1000)
                        {
                            _numberFormatter = new TextFormat() { FormatString = "#,###.0" };
                            _isAsItIS = true;
                        }

                        var formattedValue =
                            _numberFormatter.Format(Math.Abs(number).ToString(CultureInfo.InvariantCulture));
                        result += formattedValue;

                        if (_isBillion)
                        {
                            result += "b";
                        }
                        else if (_isMillion)
                        {
                            result += "m";
                        }
                        else if (_isAsItIS)
                        {
                            result += "";
                        }
                        else if (_isThousand)
                        {
                            result += "k";
                        }
                        return result;
                    }

                }
            }
            return value.ToString();
        }

        public CubeData Input { set; private get; }
    }
}