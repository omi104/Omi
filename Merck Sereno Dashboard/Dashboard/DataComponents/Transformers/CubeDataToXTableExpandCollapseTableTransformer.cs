using CubeFramework;
using DashboardFramework.DataComponent;
using ExportFramework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToXTableExpandCollapseTableTransformer : ITransformer<CubeData, XTable>
    {
        private List<int> SkipColumns = new List<int>();
        public string NameColumnValue { get; set; }
        public string MeasureText { get; set; }
        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };
            var headerRow = new XRow() { Cells = new List<XCell>() };
            foreach (var col in Input.Columns)
            {
                if (col.Name == "IS_Merck" || col.Name == "GeoLevel")
                {
                    SkipColumns.Add(col.Position);
                    continue;
                }
                if (col.Name == "Ranking")
                {
                    headerRow.Cells.Add(new XCell() { Data = "Rank" });
                    continue;
                }
                if (col.Name == "Name" || col.Name == "Company/Brand")
                {
                    headerRow.Cells.Add(new XCell() { Data = NameColumnValue });
                    continue;
                }
                if (col.Name == "Total Units Sales")
                {
                    headerRow.Cells.Add(new XCell() { Data = MeasureText + " Sales" });
                    continue;
                }
                headerRow.Cells.Add(new XCell() { Data = col.Name });
            }
            table.Rows.Add(headerRow);

            Input = GetProperRanking(Input);

            foreach (var r in Input.Rows)
            {
                var row = new XRow() { Cells = new List<XCell>() };
                for (int i = 0; i < r.Values.Count; i++)
                {
                    string spaces = "";
                    if (SkipColumns.Contains(i))
                        continue;
                    if (r.Level == 1)
                        spaces = " ";
                    else if (r.Level == 2)
                        spaces = "    ";
                    else if (r.Level == 3)
                        spaces = "        ";
                    else if (r.Level == 4)
                        spaces = "                ";
                    row.Cells.Add(new XCell() { Data = spaces + r.Values[i] });
                }
                if (NameColumnValue == "Market/Region")
                {
                    if (r.Level == 1 || r.Level == 2 || r.Level == 3)
                        row.Cells.Add(new XCell() { Data = "GREEN" });
                    else
                        row.Cells.Add(new XCell() { Data = "NONE" });
                }
                else if (NameColumnValue == "Market/Company")
                {
                    if (r.Level == 1 || r.Level == 2)
                        row.Cells.Add(new XCell() { Data = "GREEN" });
                    else
                        row.Cells.Add(new XCell() { Data = "NONE" });
                }
                else if (NameColumnValue == "Market/Brand")
                {
                    if (r.Level == 1 || r.Level == 2)
                        row.Cells.Add(new XCell() { Data = "GREEN" });
                    else
                        row.Cells.Add(new XCell() { Data = "NONE" });
                }
                else if (NameColumnValue == "Locations by Market")
                {
                    if (r.Level == 1 && (r.Values.Last() == "1" || r.Values.Last() == "2" || r.Values.Last() == "3"))
                        row.Cells.Add(new XCell() { Data = "GREEN" });
                    else
                        row.Cells.Add(new XCell() { Data = "NONE" });
                }
                table.Rows.Add(row);
            }
            return table;
        }

        public CubeData Input { set; private get; }

        public CubeData GetProperRanking(CubeData input)
        {

            int childRankCount = 1;
            foreach (var row in Input.Rows)
            {
                if (row.Rank <= 1000)//parent
                {
                    row.Values[0] = string.Empty;
                    childRankCount = 1;
                }
                else // child
                {
                    row.Values[0] = childRankCount.ToString();
                    childRankCount++;
                }
            }

            return input;
        }
    }
}