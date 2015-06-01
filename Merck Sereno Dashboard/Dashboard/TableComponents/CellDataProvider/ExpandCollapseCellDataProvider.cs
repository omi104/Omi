using System.Collections.Generic;
using Component.Table;
using CubeFramework;
using Dashboard.Models.Data;

namespace Dashboard.TableComponents.CellDataProvider
{
    public class ExpandCollapseCellDataProvider : CubeCellDataProviderBase<ExpandCollapseCellData>
    {
        public ExpandCollapseCellDataProvider(IEnumerable<Column> columns): base(columns)
        {

        }

        public override ExpandCollapseCellData Get(Row row, List<string> columns)
        {
            int geoLevel = 0;
            if (this.ColumnDictionary.ContainsKey("GeoLevel"))
                int.TryParse(row[this.ColumnDictionary["GeoLevel"]], out geoLevel);
            return new ExpandCollapseCellData()
            {
                CellData = row[this.ColumnDictionary[columns[0]]],
                GeoLevel = geoLevel,
                Rank = row.Rank,
                Level = row.Level
            };
        }
    }
}