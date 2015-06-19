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
using TextCellFactory = Dashboard.Helper.Factory.TextCellFactory;

namespace Dashboard.DataComponents.Transformers
{
    public class TableChartTransformer : ITransformer<CubeData, TableChartConfig>
    {
        public string UncheckedItems { get; set; }
        public string ParamName { get; set; }
        public string MeasureType { get; set; }
        private const string TrendChartControlId = "interactiveTrendChart";
        private int _isMerckIndex = -1;

        public TableChartConfig GetData()
        {
            var data = new TableChartConfig{Table = GetTableData()};
            int numberOfColData = Input.Columns.Count - 3;
            data.TableWidth = 20 + 45 + 150 + (65 * numberOfColData) + (4 * Input.Columns.Count); // 50 for all padding
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
                CellMaps = GetCellMap(Input.Columns),
                AutoCreateCellMaps = false,
                AutoCreateHeader = false,
                RowFunctionalities = new List<IRowFunctionality<Row>>() 
                { 
                    new AlternateRowColorFunctionality<Row>() { EvenColor = "#ffffff;", OddColor = "#E1F5F5" },
                    new LevelWiseRowColorFunctionaility(false),
                    //new TotalRowHighlight(){colIndex = 1},
                    new HighlightRowIfMerck() {colIndex = _isMerckIndex}
                }
            };
            var header = new TableHeader();
            header.Rows.Add(GetHeader());
            tableFactory.Header = header;
            Table table = tableFactory.Create(Input);
            table.Attributes.Add("id", TrendChartControlId);
            table.Classes.Add("trend-table");
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
                            UncheckedItem = UncheckedItems,
                            ParamName = ParameterList.RegionUncheckedItems
                        },
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                },
                new CellMap<Row>
                {
                    CellFactory = new ColorfulDivCellFactory() {Classes = new List<string>() {"trend-rank"},UncheckedItem = UncheckedItems,},
                    RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns),
                    Columns = new List<string> {Input.Columns[0].Name,Input.Columns[1].Name,Input.Columns[_isMerckIndex].Name}
                },
                new CellMap<Row>()
                {
                    CellFactory = new TextCellFactory() {NameCollength = 21,IsMakeTextShort = true,Classes = new List<string>() {"trend-company"}},
                    RowCellDataProvider = new CustomRowCellDataProvider(),
                    Columns = new List<string>() {"1"}
                }
            };

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
                    row.Cells.Add(new SimpleNode("th", Input.Columns[i].Name) { Classes = new List<string>() { "colData","col-"+i }});
                }
            }
            return row;
        }


        public CubeData Input { set; private get; }
    }
}