using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.Helper
{
    public class HideRowFunctionality : IRowFunctionality<Row>
    {
        public void Apply(Row rowData, TableRow row)
        {
            if ((rowData.Values[3] == null || Convert.ToDouble(rowData.Values[3]) == 0) &&
                Convert.ToDouble(rowData.Values[5]) == 0)
            {
                row.Classes.Add("rowToHide");
            }

        }
    }
}