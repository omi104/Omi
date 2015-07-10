using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class HighlightRowIfRb : IRowFunctionality<Row>
    {
        public int colIndex { get; set; }

        public void Apply(Row rowData, TableRow row)
        {
            if (colIndex >= 0 && rowData.Values[colIndex] == "1")
            {
                row.Classes.Add("highlight-row-reckitt-benckiser");
            }
        }
    }
}