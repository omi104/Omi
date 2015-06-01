using System;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class RowSpecificRankLevelFunctionality : IRowFunctionality<Row>
    {
        private long _rankOfTotal = -1;

        public void Apply(Row rowData, TableRow row)
        {
            row.Attributes.Add("level", rowData.Level.ToString());
            row.Classes.Add("Level"+rowData.Level);

            if (GetParentRank(rowData.Rank).Equals(_rankOfTotal.ToString()))
                row.Attributes.Add("id", "Row" + rowData.Rank);

            else if (GetParentRank(rowData.Rank).Equals(rowData.Rank.ToString())) //parent itself
                row.Attributes.Add("id", "Row" + GetParentRank(rowData.Rank));

            else //child (may be parent also)
            {
                row.Attributes.Add("id", "Row" + rowData.Rank);
                row.Classes.Add("Row" + GetParentRank(rowData.Rank));
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
