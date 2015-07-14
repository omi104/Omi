using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Table;
using CubeFramework;

namespace Dashboard.Helper
{
    public class LevelWiseRowColorFunctionaility : IRowFunctionality<Row>
    {
        public bool _isTopTable;
        public LevelWiseRowColorFunctionaility(bool IsTopTable)
        {
            _isTopTable = IsTopTable;
        }

        public void Apply(Row rowData, TableRow node)
        {
            if (!string.IsNullOrEmpty(rowData.Values[0]) && !_isTopTable && rowData.Values[1] == "Merck CH")
            {
                node.Classes.Add("RBRow");
            }
            else if (string.IsNullOrEmpty(rowData.Values[0]) && !string.IsNullOrEmpty(rowData.Values[2]))
            {
                node.Classes.Add("topRow");

            }
            else if (!string.IsNullOrEmpty(rowData.Values[0]) && _isTopTable && rowData.Values[1] == "Merck CH")
            {
                node.Classes.Add("highlight-row-merck");
            }

            

        }
    }
}