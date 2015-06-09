using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using Dashboard.Configuration;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class DummyTableDataSource : IDataSource<CubeData>
    {
        public bool IsMultiSrcSupplier { get; set; }
        public CubeData GetData()
        {
            var columns = new List<Column>();
            var rows = new List<Row>();

            columns = new List<Column>
            {
                new Column("Ranking", 0),
                new Column("Name", 1),
                new Column("IS_MERCK", 2),
                new Column("Mar 2014", 3),
                new Column("Apr 2014", 4),
                new Column("May 2014", 5),
                new Column("Jun 2014", 6),
                new Column("Jul 2014", 7),
                new Column("Aug 2014",8),
                new Column("Sep 2014", 9),
                new Column("Oct 2014", 10),
                new Column("Nov 2014", 11),
                new Column("Dec 2014", 12),
                new Column("Jan 2014", 13),

            };

            rows = new List<Row>
            {
                new Row(new List<string>() {"0","Diclo","0","156031500.0","132166400.0","113088200.0","85627490.0","65000660.0","78615640.0","207704800.0","188400700.0","160960800.0","235871500.0","225401600.0"}),
                new Row(new List<string>() {"1","Arcoxia","0","225401600.0","132166400.0","184434000.0","85627490.0","65000660.0","78615640.0","207704800.0","121534200.0","160960800.0","235871500.0","225401600.0"}),
                new Row(new List<string>() {"2","Total","0","247214700.0","212504900.0","184434000.0","147909200.0","65000660.0","78615640.0","207704800.0","188400700.0","225401600.0","235871500.0","164307900.0"}),
            };

            var variance = new CubeData(columns, rows);
            return variance;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}