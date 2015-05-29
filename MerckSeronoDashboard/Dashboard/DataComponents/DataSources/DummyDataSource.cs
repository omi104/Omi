using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class DummyDataSource : IDataSource<CubeData>
    {
        public CubeData GetData()
        {
            var rows = new List<Row>();
            var cols = new List<Column>()
            {
                new Column("Product",0),
                new Column("Mar-13",1),
                new Column("Apr-13",2),
                new Column("May-13",3),
                new Column("Jun-13",4),
                new Column("Jul-13",5),
                new Column("Aug-13",6),
                new Column("Sep-13",7),
                new Column("Oct-13",8),
                new Column("Nov-13",9),
                new Column("Dec-13",10),
                new Column("Jan-14",11),
                new Column("feb-14",12),
            };
            rows = new List<Row>
            {
                new Row(new List<string>() {"TOTAL","67186","51981","11045","67186","51981","11045","67186","51281","11045","67186","51981","11045"}),
                new Row(new List<string>() {"ABC","34186","51281","11045","67486","51981","11045","67186","51981","11045","67186","51981","11045"}),
                new Row(new List<string>() {"MNO","78186","51581","11045","34186","51981","11045","67186","51971","11045","67186","51981","11045"}),
            }
            ;
            var data = new CubeData(cols,rows,false);

            return data;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}