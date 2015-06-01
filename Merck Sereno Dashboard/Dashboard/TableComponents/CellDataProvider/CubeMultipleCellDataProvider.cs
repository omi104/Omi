using System.Collections.Generic;
using System.Linq;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.CellDataProvider
{
    public class CubeMultipleColumnDataProvider : CubeCellDataProviderBase<List<string>>
    {
        public CubeMultipleColumnDataProvider(IEnumerable<Column> columns) : base(columns)
        {
        }

        public override List<string> Get(Row row, List<string> columns)
        {
            return columns.Select(t => row[this.ColumnDictionary[t]]).ToList();
        }
    }
}