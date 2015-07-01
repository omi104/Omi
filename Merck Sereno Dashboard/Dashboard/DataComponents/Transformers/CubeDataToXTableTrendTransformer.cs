using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Component.Node;
using CubeFramework;
using DashboardFramework.DataComponent;
using ExportFramework.Common;
using WebGrease.Css.Extensions;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToXTableTrendTransformer : ITransformer<CubeData, XTable>
    {
        //public string AbsoluteThousandValue { get; set; }
        private int MerckIndex { get; set; }
        private bool IsMerck { get; set; }

        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };
            var headerRow = new XRow() { Cells = new List<XCell>() };
            var index = default(int);
            foreach (var col in Input.Columns)
            {
                if (col.Name.ToUpper().Contains("IS_MERCK"))
                {
                    IsMerck = true;
                    MerckIndex = index; 
                    headerRow.Cells.Insert(0, new XCell() { Data = col.Name });
                }
                else
                    headerRow.Cells.Add(new XCell() { Data = col.Name });
                index++;
            }
            table.Rows.Add(headerRow);

            foreach (var r in Input.Rows)
            {
                var row = new XRow() { Cells = new List<XCell>() };
                for (int i = 0; i < r.Values.Count;i++ )
                {
                    if (IsMerck && i == MerckIndex)
                    {
                        row.Cells.Insert(0,new XCell() { Data = r.Values[i] });
                    }
                    else
                    {
                        row.Cells.Add(new XCell() { Data = r.Values[i] });
                    }
                }
                table.Rows.Add(row);
            }
            return table;
        }
        //protected virtual string GetFormattedValue(object value, string formatString)
        //{
        //    bool _isMillion = false;
        //    bool _isBillion = false;
        //    bool _isAsItIS = false;
        //    bool _isThousand = false;
        //    TextFormat _numberFormatter = new TextFormat();
        //    string result = "";
        //    double givenValue;
        //    bool isNumeric = double.TryParse(value.ToString(), out givenValue);

        //    if (!string.IsNullOrEmpty(value.ToString()))
        //    {
        //        if (isNumeric)
        //        {
        //            double number;
        //            double.TryParse(value.ToString(), out number);
        //            if (formatString == "Thousand")
        //            {
        //                if (Math.Abs(number) >= 1000000000) //greater than or equal to 1 billion
        //                {
        //                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,,.0" };
        //                    _isBillion = true;
        //                }
        //                else if (Math.Abs(number) >= 1000000) //greater than or equal to 1 million
        //                {
        //                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,.0" };
        //                    _isMillion = true;
        //                }
        //                else if (Math.Abs(number) >= 1000)
        //                {
        //                    _numberFormatter = new TextFormat() { FormatString = "#,##0" };
        //                    _isThousand = true;
        //                }
        //                else if (Math.Abs(number) < 1000)
        //                {
        //                    _numberFormatter = new TextFormat() { FormatString = "#,###.0" };
        //                    _isAsItIS = true;
        //                }

        //                var formattedValue =
        //                    _numberFormatter.Format(Math.Abs(number).ToString(CultureInfo.InvariantCulture));
        //                result += formattedValue;

        //                if (_isBillion)
        //                {
        //                    result += "b";
        //                }
        //                else if (_isMillion)
        //                {
        //                    result += "m";
        //                }
        //                else if (_isAsItIS)
        //                {
        //                    result += "";
        //                }
        //                else if (_isThousand)
        //                {
        //                    result += "k";
        //                }
        //                return result;
        //            }

        //        }
        //    }
        //    return value.ToString();
        //}

        public CubeData Input { set; private get; }
    }
}