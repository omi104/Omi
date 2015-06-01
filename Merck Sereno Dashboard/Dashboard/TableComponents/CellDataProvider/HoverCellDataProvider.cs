using System.Collections.Generic;
using System.Globalization;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.CellDataProvider
{
    public class HoverCellDataProvider: CubeCellDataProviderBase<string>
    {
        private readonly Dictionary<string, Column> _columns = new Dictionary<string, Column>();

        public HoverCellDataProvider(IEnumerable<Column> columns)
            : base(columns)
        {
            foreach (var column in columns)
            {
                _columns.Add(column.Position.ToString(CultureInfo.InvariantCulture), column);
            }
        }

        public override string Get(Row row, List<string> columns)
        {
            return row[this.ColumnDictionary[columns[0]]];
        }
    }
}
