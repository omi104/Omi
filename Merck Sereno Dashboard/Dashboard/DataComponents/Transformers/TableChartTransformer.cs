using System.Collections.Generic;
using System.Linq;
using Component.Node;
using Component.Table;
using Component.Table.Functionalities;
using CubeFramework;
using Dashboard.Configuration;
using Dashboard.Helper;
using Dashboard.Helper.Factory;
using Dashboard.TableComponents.CellDataProvider;
using Dashboard.TableComponents.RowFunctionalities;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using Microsoft.AnalysisServices.AdomdClient;
using TextCellFactory = Dashboard.Helper.Factory.TextCellFactory;

namespace Dashboard.DataComponents.Transformers
{
    public class TableChartTransformer : ITransformer<CubeData, TableChartConfig>
    {
        public string UncheckedItems { get; set; }
        public string ParamName { get; set; }
        public string MeasureType { get; set; }
        public string KPI { get; set; }
        public string Date { get; set; }
        public string PeriodType { get; set; }
        private const string TrendChartControlId = "interactiveTrendChart";
        private int _isMerckIndex = -1;

        public TableChartConfig GetData()
        {
            var data = new TableChartConfig{Table = GetTableData()};
            int numberOfColData = Input.Columns.Count - 3;
            data.TableWidth = 30 + 60 + 250 + (95 * numberOfColData) + (4 * Input.Columns.Count)+10;//extra 10 
            return data;
        }

        public Table GetTableData()
        {
            foreach (var col in Input.Columns.Where(col => col.Name.Contains("IS_MERCK")))
            {
                _isMerckIndex = col.Position;
            }

            var tableFactory = new CubeTableFactory
            {
                CellMaps = GetCellMap(Input.Columns, KPI.ToUpper() == "SALES"),
                AutoCreateCellMaps = false,
                AutoCreateHeader = false,
                RowFunctionalities = new List<IRowFunctionality<Row>>() 
                { 
                    new AlternateRowColorFunctionality<Row>() { EvenColor = "#ffffff;", OddColor = "#E1F5F5" },
                    new LevelWiseRowColorFunctionaility(false),
                    new TotalRowHighlight(){colIndex = 1},
                    new HighlightRowIfMerck() {colIndex = _isMerckIndex}
                }
            };
            var header = new TableHeader();

            if (KPI.ToUpper() == "GROWTH")
                header.Rows.Add(GetHeaderForGrowth());
            else if (PeriodType.ToUpper() == "MAT" || PeriodType.ToUpper() == "YTD")
                header.Rows.Add(GetHeader(true));
            else
                header.Rows.Add(GetHeader(false));
            tableFactory.Header = header;
            Table table = tableFactory.Create(Input);
            table.Attributes.Add("id", TrendChartControlId);
            table.Classes.Add("trend-table");
            return table;
        }

        public List<CellMap<Row>> GetCellMap(List<Column> columns, bool isSales)
        {
            var cellMaps = new List<CellMap<Row>>
            {
                new CellMap<Row>()
                {
                    CellFactory =
                        new CheckBoxFactory("td")
                        {
                            Classes = new List<string>() {"checkBoxCol","trend-checkbox"},
                            TrendChartControlId = TrendChartControlId,
                            UncheckedItem = UncheckedItems,
                            ParamName = ParamName
                        },
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                },
                new CellMap<Row>
                {
                    CellFactory = new ColorfulDivCellFactory() {Classes = new List<string>() {"trend-rank"},UncheckedItem = UncheckedItems,KPI = KPI},
                    RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns),
                    Columns = new List<string> {Input.Columns[0].Name,Input.Columns[1].Name}
                },
                new CellMap<Row>()
                {
                    CellFactory = new TextCellFactory() {NameCollength = 21,IsMakeTextShort = false,Classes = new List<string>() {"trend-company"}},
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                }
            };
            int i = 3;
            if (KPI.ToUpper() == "SALES")
                i = 2;
            for (; i < columns.Count; i++)
            {
                cellMaps.Add(new CellMap<Row>()
                {
                    CellFactory = new NumberDecimalCellFactory()
                    {
                        isSales = KPI.ToUpper() == "SALES",
                        TextFormat = new TextFormat()
                        {
                            FormatString = KPI.ToUpper() == "MARKET SHARE" || KPI.ToUpper() == "GROWTH" ? "0.00" : "#,#0"
                        },
                        suffix = KPI.ToUpper() == "MARKET SHARE" || (i < columns.Count - 1 && KPI.ToUpper() == "GROWTH") ? "%" : null,
                        Classes = new List<string>() { "colData", "col-" + i }
                    },
                    RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns),
                    Columns = new List<string> { Input.Columns[0].Name, Input.Columns[i].Name }
                });
            }
            
            return cellMaps;
        }

        public TableRow GetHeaderForGrowth()
        {
            var row = new TableRow();
            var checkBoxHeadercell = new ComplexNode("th")
            {
                Classes = new List<string>() { "transparentText", "trend-checkbox" },
            };
            var checkBox = new SimpleNode("input", "")
            {
                Attributes = new Dictionary<string, string>() { { "type", "checkbox" }, { "checked", "checked" }, { "series-name", "checkUncheck" }, { "title", "Check/Uncheck All" }, { "onClick", "customTable.CheckUncheckAll(this,'" + ParamName + "')" } },
            };
            if (!string.IsNullOrEmpty(UncheckedItems))
                checkBox.Attributes.Remove("checked");
            checkBoxHeadercell.ChildNodes.Add(checkBox);
            row.Cells.Add(checkBoxHeadercell);

            row.Cells.Add(new SimpleNode("th", "Rank") { Classes = new List<string>() { "trend-rank" } });

            for (int i = 1; i < Input.Columns.Count(); i++)
            {
                if (Input.Columns[i].Name.ToUpper().Contains("IS_MERCK"))
                    continue;
                if (Input.Columns[i].Name.ToUpper().Contains("NAME"))
                {
                    row.Cells.Add(new SimpleNode("th", "Product") { Classes = new List<string>() { "trend-company" } });
                }
                else if (Input.Columns[i].Name.ToUpper().Contains("SALES"))
                {
                    row.Cells.Add(new SimpleNode("th", "Sales") { Classes = new List<string>() { "colData", "col-" + i } });
                }
                else
                {
                    string[] headers = Input.Columns[i].Name.Split('_').ToArray();
                    if (PeriodType.ToUpper() == "MAT" || PeriodType.ToUpper() == "YTD")
                    {
                        row.Cells.Add(new SimpleNode("th", PeriodType + " " + headers[0]) { Classes = new List<string>() { "colData", "col-" + i } });
                    }
                    else
                    {
                        var monthDict = new Dictionary<string, int>()
                        {
                            {"Jan",1},
                            {"Feb",2},
                            {"Mar",3},
                            {"Apr",4},
                            {"May",5},
                            {"Jun",6},
                            {"Jul",7},
                            {"Aug",8},
                            {"Sep",9},
                            {"Oct",10},
                            {"Nov",11},
                            {"Dec",12}
                        };

                        var qtrDict = new Dictionary<string, int>()
                        {
                            {"QTR 1",1},
                            {"QTR 2",2},
                            {"QTR 3",3},
                            {"QTR 4",4}
                        };
                        
                        if (i == 3)
                        {
                            if (PeriodType.ToUpper() == "MTH")
                            {
                                int year;
                                int.TryParse(Date.Split(' ')[1], out year);
                                int prevYear = year - 1;
                                row.Cells.Add(new SimpleNode("th", "Long-Term (" + Date + "-" + Date.Split(' ')[0] +" "+ prevYear + ")") { Classes = new List<string>() { "colData", "col-" + i } });
                            }
                            if (PeriodType.ToUpper() == "QTR")
                            {
                                int year;
                                int.TryParse(Date.Split(' ')[2], out year);
                                int prevYear = year - 1;
                                row.Cells.Add(new SimpleNode("th", "Long-Term (" + Date + "-" + Date.Split(' ')[0] + " " + Date.Split(' ')[1] + " " + prevYear + ")") { Classes = new List<string>() { "colData", "col-" + i } });
                            }

                        }
                        if (i == 4)
                        {
                            if (PeriodType.ToUpper() == "MTH")
                            {
                                int monthIndex = monthDict[Date.Split(' ')[0]];
                                if (monthIndex > 3)
                                    monthIndex = monthIndex - 3;
                                else
                                    monthIndex = 12 + (monthIndex - 3);
                                string oldMonth = monthDict.FirstOrDefault(x => x.Value== monthIndex).Key;
                                row.Cells.Add(new SimpleNode("th", "Short-Term (" + Date + "-" + oldMonth + " " + Date.Split(' ')[1]+ ")") { Classes = new List<string>() { "colData", "col-" + i } });
                            }
                            if (PeriodType.ToUpper() == "QTR")
                            {
                                string concat = string.Concat(Date.Split(' ')[0]+" ", Date.Split(' ')[1]);
                                int qtrIndex = qtrDict[concat];
                                if (qtrIndex > 1)
                                    qtrIndex = qtrIndex - 1;
                                else
                                    qtrIndex = 4 + (qtrIndex - 1);
                                string oldQtr = qtrDict.FirstOrDefault(x => x.Value == qtrIndex).Key;
                                row.Cells.Add(new SimpleNode("th", "Short-Term (" + Date + "-" + oldQtr + " " + Date.Split(' ')[2] + ")") { Classes = new List<string>() { "colData", "col-" + i } });
                            }
                        }
                    }
                }
            }
            return row;
        }

        public TableRow GetHeader(bool isYtdOrMat)
        {
            var row = new TableRow();
            var checkBoxHeadercell = new ComplexNode("th")
            {
                Classes = new List<string>() { "transparentText", "trend-checkbox" },
            };
            var checkBox = new SimpleNode("input", "")
            {
                Attributes = new Dictionary<string, string>() { { "type", "checkbox" }, { "checked", "checked" }, { "series-name", "checkUncheck" }, { "title", "Check/Uncheck All" }, { "onClick", "customTable.CheckUncheckAll(this,'"+ParamName+"')" } },
            };
            if (!string.IsNullOrEmpty(UncheckedItems))
                checkBox.Attributes.Remove("checked");
            checkBoxHeadercell.ChildNodes.Add(checkBox);
            row.Cells.Add(checkBoxHeadercell);

            row.Cells.Add(new SimpleNode("th", "Rank") { Classes = new List<string>() { "trend-rank" } });
            
            for (int i = 1; i < Input.Columns.Count(); i++)
            {
                if (Input.Columns[i].Name.ToUpper().Contains("IS_MERCK"))
                    continue;
                if (Input.Columns[i].Name.ToUpper().Contains("NAME"))
                {
                    row.Cells.Add(new SimpleNode("th", "Product") { Classes = new List<string>() { "trend-company" } });
                }
                else
                {
                    string[] headers = Input.Columns[i].Name.Split('_').ToArray();
                    if (KPI.ToUpper() == "GROWTH")
                    {
                        row.Cells.Add(new SimpleNode("th", isYtdOrMat ? PeriodType + " " + headers[1] : headers[1]) { Classes = new List<string>() { "colData", "col-" + i } });
                    }
                    else
                        row.Cells.Add(new SimpleNode("th", isYtdOrMat ? PeriodType + " " + headers[0] : headers[0]) { Classes = new List<string>() { "colData", "col-" + i } });
                }
            }
            return row;
        }


        public CubeData Input { set; private get; }
    }
}