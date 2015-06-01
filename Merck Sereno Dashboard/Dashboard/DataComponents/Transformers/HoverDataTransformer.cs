using System.Collections.Generic;
using Component.Node;
using Component.Table;
using Component.Table.Functionalities;
using CubeFramework;
using Dashboard.Configuration;
using Dashboard.Helper.Factory;
using Dashboard.TableComponents;
using Dashboard.TableComponents.CellDataProvider;
using DashboardFramework.DataComponent;
using DashboardFramework.Web;
using TextCellFactory = Dashboard.Helper.Factory.TextCellFactory;

namespace Dashboard.DataComponents.Transformers
{
    public class HoverDataTransformer : ITransformer<CubeData, HoverData>
    {
        public string MeasureText { get; set; }
        public string PeriodType { get; set; }
        public string HoverItem { get; set; }

        public HoverData GetData()
        {
            var data = new HoverData();

            var tableFactory = new CubeTableFactory()
            {
                CellMaps = GetMap(Input),
                Header = GetHeader(Input.Columns),
                RowFunctionalities = new List<IRowFunctionality<Row>>()
                {
                    new AlternateRowColorFunctionality<Row>(){EvenColor = "#FFFFFF",OddColor = "#FFEFF9"}
                },
                AutoCreateHeader = false
            };
            var table = tableFactory.Create(Input);
            table.Classes.Add("latest-data-hover");
            data.TableNode = table;
           
            return data;
        }

        protected string ExtractHoverItemName(string name)
        {
            int startIndex = name.LastIndexOf('[');
            int endIndex = name.LastIndexOf(']');
            var sub = name.Substring(startIndex + 1, endIndex - startIndex - 1);
            return sub;

        }

        public TableHeader GetHeader(List<Column> columns)
        {
            var hoverItem = ExtractHoverItemName(HoverItem);
            var row = new TableRow();

            row.Cells.Add(new SimpleNode("th", ""){Classes = new List<string>(){"col-1"}});
            if (columns.Count == 15)
            {
                var hc = new HoverHeaderTableFactory(hoverItem, columns[1].Name.Split('_')[0], "$ Value Retail");
                hc.Classes.Add("col-3");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[2].Name.Split('_')[0], "Share%");
                hc.Classes.Add("col-4");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[3].Name.Split('_')[0], "$ Value Retail");
                hc.Classes.Add("col-5");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[5].Name.Split('_')[0], "Share%");
                hc.Classes.Add("col-6");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[7].Name.Split('_')[0], "%Growth vs. PPYA");
                hc.Classes.Add("col-7");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[9].Name.Split('_')[0], "$ Value Retail");
                hc.Classes.Add("col-8");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[11].Name.Split('_')[0], "Share%");
                hc.Classes.Add("col-9");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[13].Name.Split('_')[0], "%Growth vs. PPYA");
                hc.Classes.Add("col-10");
                row.Cells.Add(hc);
            }
            else if (columns.Count == 13)
            {
                var hc = new HoverHeaderTableFactory(hoverItem, columns[1].Name.Split('_')[0], "$ Value Retail");
                hc.Classes.Add("col-5");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[3].Name.Split('_')[0], "Share%");
                hc.Classes.Add("col-6");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[5].Name.Split('_')[0], "%Growth vs. PPYA");
                hc.Classes.Add("col-7");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[7].Name.Split('_')[0], "$ Value Retail");
                hc.Classes.Add("col-8");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[9].Name.Split('_')[0], "Share%");
                hc.Classes.Add("col-9");
                row.Cells.Add(hc);

                hc = new HoverHeaderTableFactory(hoverItem, columns[11].Name.Split('_')[0], "%Growth vs. PPYA");
                hc.Classes.Add("col-10");
                row.Cells.Add(hc);
            }
             else if (columns.Count == 7)
             {
                 var hc = new HoverHeaderTableFactory(hoverItem, columns[1].Name.Split('_')[0], "$ Value Retail");
                 hc.Classes.Add("col-8");
                 row.Cells.Add(hc);

                 hc = new HoverHeaderTableFactory(hoverItem, columns[3].Name.Split('_')[0], "Share%");
                 hc.Classes.Add("col-9");
                 row.Cells.Add(hc);

                 hc = new HoverHeaderTableFactory(hoverItem, columns[5].Name.Split('_')[0], "%Growth vs. PPYA");
                 hc.Classes.Add("col-10");
                 row.Cells.Add(hc);
             }

            var header = new TableHeader();
            header.Rows.Add(row);
            return header;
        }

        protected List<CellMap<Row>> GetMap(CubeData data)
        {
            var list = new List<CellMap<Row>>();
            string absoluteTousandValue = DashboardContext.Current.DashboardInstance.Parameters[ParameterList.AbsoluteThousandFilter];

            if (data.Columns.Count == 15)
            {
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { NameCollength = 16, IsMakeTextShort = true, Classes = new List<string>() { "col-1" } }, RowCellDataProvider = new CubeCellDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[0].Name } });

                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithoutArrowIndicatorCellFactory(colId: 3, nodeName: "td") { Classes = new List<string>() { "col-3" }, NumberFormatString = absoluteTousandValue == "Thousand" ? "#,###," : "", Suffix = absoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeCellDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[1].Name } });
                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalCellFactory() { colId = 4, Classes = new List<string>() { "col-4" }, }, RowCellDataProvider = new CubeCellDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[2].Name } });

                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 5, nodeName: "td") { Classes = new List<string>() { "col-5", "value-retail" }, NumberFormatString = absoluteTousandValue == "Thousand" ? "#,###," : "", Suffix = absoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[3].Name, Input.Columns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 6, nodeName: "td") { Classes = new List<string>() { "col-6", "share" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[5].Name, Input.Columns[6].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 7, nodeName: "td") { Classes = new List<string>() { "col-7", "growth-vs-ppya" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[7].Name, Input.Columns[8].Name } });

                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 8, nodeName: "td") { Classes = new List<string>() { "col-8", "value-retail" }, NumberFormatString = absoluteTousandValue == "Thousand" ? "#,###," : "", Suffix = absoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[9].Name, Input.Columns[10].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 9, nodeName: "td") { Classes = new List<string>() { "col-9", "share" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[11].Name, Input.Columns[12].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 10, nodeName: "td") { Classes = new List<string>() { "col-10", "growth-vs-ppya" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[13].Name, Input.Columns[14].Name } });
            }
            else if (data.Columns.Count == 13)
            {
                list.Add(new CellMap<Row> { CellFactory = new TextCellFactory() { NameCollength = 16, IsMakeTextShort = true, Classes = new List<string>() { "col-1" } }, RowCellDataProvider = new CubeCellDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[0].Name } });

                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 5, nodeName: "td") { Classes = new List<string>() { "col-5", "value-retail" }, NumberFormatString = absoluteTousandValue == "Thousand" ? "#,###," : "", Suffix = absoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[1].Name, Input.Columns[2].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 6, nodeName: "td") { Classes = new List<string>() { "col-6", "share" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[3].Name, Input.Columns[4].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 7, nodeName: "td") { Classes = new List<string>() { "col-7", "growth-vs-ppya" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[5].Name, Input.Columns[6].Name } });

                list.Add(new CellMap<Row> { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 8, nodeName: "td") { Classes = new List<string>() { "col-8", "value-retail" }, NumberFormatString = absoluteTousandValue == "Thousand" ? "#,###," : "", Suffix = absoluteTousandValue == "Thousand" ? "k" : string.Empty }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string> { Input.Columns[7].Name, Input.Columns[8].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 9, nodeName: "td") { Classes = new List<string>() { "col-9", "share" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[9].Name, Input.Columns[10].Name } });
                list.Add(new CellMap<Row>() { CellFactory = new NumberDecimalWithArrowIndicationCellFactory(colId: 10, nodeName: "td") { Classes = new List<string>() { "col-10", "growth-vs-ppya" } }, RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns), Columns = new List<string>() { Input.Columns[11].Name, Input.Columns[12].Name } });
            }

            return list;
        }
        public CubeData Input { set; private get; }
    }
    public class HoverData
    {
        public INode TableNode;
        public string Table;
    }
}