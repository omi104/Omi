using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.Helper
{
    public class RowSpecificRankLevelFunctionality : IRowFunctionality<Row>
    {
        private long _rankOfTotal = -1;

        public void Apply(Row rowData, TableRow row)
        {
            row.Attributes.Add("level", rowData.Level.ToString());
            if (rowData.Level == Int32.MaxValue)
                _rankOfTotal = rowData.Rank;

            if (GetParentRank(rowData.Rank).Equals(_rankOfTotal.ToString()))
                row.Attributes.Add("id", "Row" + rowData.Rank);

            else if (GetParentRank(rowData.Rank).Equals(rowData.Rank.ToString())) //parent itself
                row.Attributes.Add("id", "Row" + GetParentRank(rowData.Rank));

            else //child (may be parent also)
            {
                row.Attributes.Add("id", "Row" + rowData.Rank);
                row.Classes.Add("Row" + GetParentRank(rowData.Rank));
            }


            if (rowData.Rank == 1)
            {
                row.Classes.Add("TopRow");
            }

        }
        private string GetParentRank(long rowRank)
        {
            if (string.IsNullOrEmpty(rowRank.ToString())) return "0";

            var rank = rowRank.ToString();
            if (rank.Length > 3)
            {
                rank = rank.Substring(0, rank.Length - 3);
            }
            return rank;
        }
    }
}