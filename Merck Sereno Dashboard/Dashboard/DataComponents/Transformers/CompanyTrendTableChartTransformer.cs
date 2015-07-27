using System.Collections.Generic;
using System.Linq;
using Component.Node;
using Component.Table;
using Component.Table.Functionalities;
using CubeFramework;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Components;
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
    public class CompanyTrendTableChartTransformer : ITransformer<CubeData, TableChartConfig>
    {
        
        public bool ShowFullLength { get; set; }
        public string NameColumHeaderText { get; set; }
        public string UncheckedItems { get; set; }
        public string TopCountValue { get; set; }
        public string AbsoluteTousandValue { get; set; }
        public string MeasureType { get; set; }

        private const string TrendChartControlId = "interactiveTrendChart";

        private int _isRbIndex = -1;
        public string PeriodType { get; set; }
        public string Date { get; set; }
        public string NavigationName { get; set; }

        public string ParamName { get; set; }


        public TableChartConfig GetData()
        {
            foreach (var col in Input.Columns.Where(col => col.Name.Contains("IS_MERCK")))
            {
                _isRbIndex = col.Position;
            }

            var data = new TableChartConfig
            {
                Table = GetTableData(),
                Chart = new CombinationTrendChartTransformer(TrendChartControlId, Input, UncheckedItems)
                {
                    AbsoluteTousandValue = AbsoluteTousandValue
                }.GetChart()
            };
            return data;
        }
        public Table GetTableData()
        {
            var tableFactory = new CubeTableFactory
            {
                CellMaps = GetCellMap(Input.Columns),
                AutoCreateCellMaps = false,
                AutoCreateHeader = false,
                RowFunctionalities = new List<IRowFunctionality<Row>>() 
                { 
                    new AlternateRowColorFunctionality<Row>() { EvenColor = "#ffffff;", OddColor = "#E1F5F5" },
                    new LevelWiseRowColorFunctionaility(false),
                    new TotalRowHighlight(){colIndex = 1},
                    new HighlightRowIfRb() {colIndex = _isRbIndex}
                }
            };
            var header = new TableHeader();
            header.Rows.Add(GetHeader());
            tableFactory.Header = header;
            Table table = tableFactory.Create(Input);
            table.Attributes.Add("id", TrendChartControlId);
            table.Classes.Add("trend-table");
            //if (ShowFullLength)
            //    table.Classes.Add("LargeNameColTable");
            return table;
        }

        public List<CellMap<Row>> GetCellMap(List<Column> columns)
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
                            UncheckedItem = UncheckedItems
                        },
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                },
                new CellMap<Row>
                {
                    CellFactory = new ColorfulDivCellFactory() {Classes = new List<string>() {"trend-rank"}},
                    RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns),
                    Columns = new List<string> {Input.Columns[0].Name,Input.Columns[1].Name}
                },
                new CellMap<Row>()
                {
                    CellFactory = new TextCellFactory() {NameCollength = ShowFullLength?999:16,IsMakeTextShort = true,Classes = new List<string>() {"trend-company"}},
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                }
            };

            if (AbsoluteTousandValue == "Thousand")
            {
                for (int i = 3; i < columns.Count; i++)
                {
                    cellMaps.Add(new CellMap<Row>()
                    {
                        CellFactory = new NumberDecimalWithoutArrowIndicatorCellFactory(colId: i, nodeName: "td")
                        {
                            Classes = new List<string>() { "colData", "col-" + i },
                            NumberFormatString = "#,##0,",
                            Suffix = "k"
                        },
                        RowCellDataProvider = new CustomRowCellDataProvider(),
                        Columns = new List<string>() { i.ToString() }
                    });
                }
            }
            else
            {
                for (int i = 3; i < columns.Count; i++)
                {
                    cellMaps.Add(new CellMap<Row>()
                    {
                        CellFactory = new NumberDecimalCellFactory()
                        {
                            TextFormat = new TextFormat() { FormatString = "#,#0" },
                            Classes = new List<string>() { "colData", "col-" + i }
                        },
                        RowCellDataProvider = new CustomRowCellDataProvider(),
                        Columns = new List<string>() { i.ToString() }
                    });
                }
            }

            return cellMaps;
        }
        public TableRow GetHeader()
        {
            var row = new TableRow();
            var checkBoxHeadercell = new ComplexNode("th")
            {
                Classes = new List<string>() { "transparentText", "trend-checkbox" },
            };
            var checkBox = new SimpleNode("input", "")
            {
                Attributes = new Dictionary<string, string>() { { "type", "checkbox" }, { "checked", "checked" }, { "series-name", "checkUncheck" }, { "title", "Check/Uncheck All" }, { "onClick", "customTable.CheckUncheckAll(this)" } },
            };
            if (!string.IsNullOrEmpty(UncheckedItems))
                checkBox.Attributes.Remove("checked");
            checkBoxHeadercell.ChildNodes.Add(checkBox);
            row.Cells.Add(checkBoxHeadercell);

            row.Cells.Add(new SimpleNode("th", "Rank") { Classes = new List<string>() { "trend-rank" } });
            for (int i = 1; i < Input.Columns.Count(); i++)
            {
                if (Input.Columns[i].Name == "IS_MERCK" || Input.Columns[i].Name == "Dummy")
                    continue;
                if (Input.Columns[i].Name.ToUpper().Contains("NAME"))
                {
                    row.Cells.Add(new SimpleNode("th", NameColumHeaderText) { Classes = new List<string>() { "trend-company" } });
                }
                else
                {
                    row.Cells.Add(new SimpleNode("th", Input.Columns[i].Name) { Classes = new List<string>() { "colData", "col-" + i } });
                }
            }
            return row;
        }




        public CubeData Input { set; private get; }
    }
}