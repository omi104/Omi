using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class RbRowHighlight : IRowFunctionality<Row>
    {
        public void Apply(Row rowData, TableRow row)
        {
            if (rowData.Values.Last() == "1")
            {
                row.Classes.Add("table-row-reckitt-benckiser");
            }
        }
    }
}