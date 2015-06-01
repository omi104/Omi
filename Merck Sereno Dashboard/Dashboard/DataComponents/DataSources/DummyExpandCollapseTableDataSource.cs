using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class DummyExpandCollapseTableDataSource : IDataSource<CubeData>
    {
        public CubeData GetData()
        {
            var columns = new List<Column>
            {
                new Column("ItemNo", 0),
                new Column("ItemColor", 1),
                new Column("Item", 2),
                new Column("Brand", 3),
                new Column("MS", 4),
                new Column("Change", 5),
                new Column("Change1", 6),
                new Column("Blank1",7),
                new Column("MS2", 8),
                new Column("MS3", 9),
                new Column("Change2", 10),
                new Column("Change3", 11),
                new Column("Contribution", 12),
                new Column("Contribution2", 13),
                new Column("Blank2",14),
                new Column("MS4", 15),
                new Column("Change4", 16),
                new Column("Contribution3", 17),
            };

            var rows = new List<Row>
            {
                new Row(level:0,values:new List<string>() {"","0","Selected Market","","100.0%", "100.0%","","","1.5","", "100.0%","","5.1","","","","",""},
                    childRows:new List<Row>()
                    {
                         new Row(level:1,values:new List<string>() {"13","13","STADA","","7.2%","8.2%","yellow","","16.0","green", "8.3%","green","5.5","yellow","","","",""},
                             childRows:new List<Row>()
                             {
                                 new Row(level:2,values:new List<string>() {"4","4","BRISTOL-MYERS SQB","","7.3%", "6.9%","green","","-5.1","red", "6.5%","yellow","-1.0","red","","","",""}),
                                 new Row(level:2,values:new List<string>() {"5","5","BAYER","","5.1%", "4.8%","yellow","","-5.2","red", "4.6%","yellow","0.8","yellow","","","",""}),
                                 new Row(level:2,values:new List<string>() {"6","6","BOEHRINGER INGEL","","10.8%", "11.0%","green","","3.8","green", "11.3%","yellow","7.2","green","","","",""}),
                             }),
                         new Row(level:1,values:new List<string>() {"14","14","MYLAN","","7.3%", "6.9%","green","","-5.1","red", "6.5%","yellow","-1.0","red","","","",""}),
                         new Row(level:1,values:new List<string>() {"15","15","FERRAR","","5.1%", "4.8%","yellow","","-5.2","red", "4.6%","yellow","0.8","yellow","","","",""}),
                    }),

                new Row(level:0,values:new List<string>() {"1","1","SANOFI","","10.8%", "11.0%","green","","3.8","green", "11.3%","yellow","7.2","green","","","",""},
                    childRows:new List<Row>()
                    {
                        new Row(level:1,values:new List<string>() {"7","7","TEVA","","10.5%", "10.2%","yellow","","-1.0","red", "10.13%","green","9.34%","green","","","",""}),
                        new Row(level:1,values:new List<string>() {"8","8","PFIZER","","7.2%","8.2%","yellow","","16.0","green", "8.3%","green","5.5","yellow","","","",""}),
                        new Row(level:1,values:new List<string>() {"9","9","JOHNSON & JONHSON","","7.3%", "6.9%","green","","-5.1","red", "6.5%","yellow","-1.0","red","","","",""}),
                    }),
                new Row(level:0,values:new List<string>() {"2","2","RECKITT BENCKISER","","10.5%", "10.2%","yellow","","-1.0","red", "10.13%","green","9.34%","green","","","",""},
                    childRows:new List<Row>()
                    {
                        new Row(level:1,values:new List<string>() {"10","10","ANGELINI","","5.1%", "4.8%","yellow","","-5.2","red", "4.6%","yellow","0.8","yellow","","","",""}),
                        new Row(level:1,values:new List<string>() {"11","11","KLOSTERFRAU","","10.8%", "11.0%","green","","3.8","green", "11.3%","yellow","7.2","green","","","",""}),
                        new Row(level:1,values:new List<string>() {"12","12","MENARINI","","10.5%", "10.2%","yellow","","-1.0","red", "10.13%","green","9.34%","green","","","",""}),
                    }),
                new Row(level:0,values:new List<string>() {"3","3","NOVARTIS","","7.2%","8.2%","yellow","","16.0","green", "8.3%","green","5.5","yellow","","","",""}),
            };

            var tableData = new CubeData(columns, rows);
            return tableData;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}