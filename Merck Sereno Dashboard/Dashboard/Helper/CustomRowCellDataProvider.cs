using System.Collections.Generic;
using Component.Table;
using CubeFramework;

namespace Dashboard.Helper
{
    public class CustomRowCellDataProvider : IRowCellDataProvider<Row, string>
    {
        public string Get(Row row, List<string> columns)
        {
            return row[int.Parse(columns[0])];
        }
    }
}
