using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class DummyBubbleChartData : IDataSource<CubeData>
    {
        public CubeData GetData()
        {
            var columns = new List<Column>();
            var rows = new List<Row>();

            columns = new List<Column>
            {
                new Column("Rank", 0),
                new Column("Product", 1),
                new Column("Aaa", 2),
                new Column("Bbb", 3),
                new Column("Ccc", 4),
            };

            rows = new List<Row>
            {
                new Row(new List<string>() {"0","Germany","80","15000","24"}),
                new Row(new List<string>() {"1","Denmark","60","18500","26"}),
                new Row(new List<string>() {"2","Italy","50","19450","19"}),
            };

            var variance = new CubeData(columns, rows);
            return variance;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}