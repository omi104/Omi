using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class ExpandCollTableAlternateColorFunctionality : IRowFunctionality<Row>
    {
        public static bool IsOddRow = false;
        public int ChildLevel { get; set; }
        //public long RankForLastLevelChild { get; set; }

        public ExpandCollTableAlternateColorFunctionality()
        {
            ChildLevel = -1;
        }
        public void Apply(Row rowData, TableRow row)
        {
            if (rowData.Values[0] == null || string.IsNullOrEmpty(rowData.Values[0]))//reset counter
                IsOddRow = true;
            if (rowData.Level < ChildLevel)
                IsOddRow = true;
            else if (IsOddRow)
            {
                row.Classes.Add("Odd-Child");
                IsOddRow = false;
            }
            else if (!IsOddRow)
            {
                row.Classes.Add("Even-Child");
                IsOddRow = true;
            }
        }

        //public static bool IsOddRow = false;
        //public int ChildLevel { get; set; }
        ////public long RankForLastLevelChild { get; set; }

        //public ExpandCollTableAlternateColorFunctionality()
        //{
        //    ChildLevel = -1;
        //}
        //public void Apply(Row rowData, TableRow row)
        //{
        //    if (rowData.Values[0] == null || string.IsNullOrEmpty(rowData.Values[0]))//reset counter
        //        IsOddRow = true;
        //    if (rowData.Level < ChildLevel)
        //        IsOddRow = true;
        //    else if (IsOddRow)
        //    {
        //        row.Classes.Add("Odd-Child");
        //        IsOddRow = false;
        //    }
        //    else if (!IsOddRow)
        //    {
        //        row.Classes.Add("Even-Child");
        //        IsOddRow = true;
        //    }
        //}
    }
}