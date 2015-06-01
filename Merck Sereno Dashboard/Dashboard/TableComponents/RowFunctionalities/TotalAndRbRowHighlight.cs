using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class TotalRowHighlight : IRowFunctionality<Row>
    {
        public int colIndex { get; set; }

        public void Apply(Row rowData, TableRow row)
        {
            if (rowData.Values[colIndex].ToUpper().Contains("TOTAL"))
            {
                row.Classes.Add("highlight-row-total");
            }
        }
    }
}