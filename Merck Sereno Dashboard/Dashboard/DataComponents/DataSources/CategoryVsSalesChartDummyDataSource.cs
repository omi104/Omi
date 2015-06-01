using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class CategoryVsSalesChartDummyDataSource : IDataSource<CubeData>
    {
        public CubeData GetData()
        {
            var columns = new List<Column>();
            var rows = new List<Row>();
            columns = new List<Column>
            {
                new Column("SeriesName", 0),
                new Column("11-13", 1),
                new Column("12-13", 2),
                new Column("01-14", 3),
                new Column("02-14", 4),
                new Column("03-14", 5),
                new Column("04-14", 6),
                new Column("05-14", 7),
                new Column("06-14", 8),
                new Column("07-14", 9),
                new Column("08-14", 10),
                new Column("09-14", 11),
                new Column("10-14", 12)
            };

            rows = new List<Row>
            {
                new Row(new List<string>() {"Total Category","485","458","498", "493","461","470","456","431","428","453","409.59","467"}),
                new Row(new List<string>() {"Reckitt Benckiser","495","458","510", "493","461","489","476","431","428","421","409.59","511"}),
            };

            var variance = new CubeData(columns, rows.ToList());
            return variance;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}