using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Component.Table;
using CubeFramework;
using Dashboard.Models.Data;
using Dashboard.TableComponents.CellFactories;
using Dashboard.TableComponents.RowFunctionalities;
using DashboardFramework.DataComponent;
using TextCellFactory = Dashboard.Helper.Factory.TextCellFactory;

namespace Dashboard.DataComponents.Transformers
{
    public class SingleTableTransformer : ITransformer<CubeData, SingleTableModel>
    {
        public string CategoryText { get; set; }
        public string WidgetName { get; set; }
        public string GeoText { get; set; }
        public string PeriodTypeText { get; set;}
        public string Periodtext { get; set; }
        public string EndDate { get; set; }

        public SingleTableModel GetData()
        {
            //string WidgetName = WidgetName;
            var header = new TableHeader();
            //var footer = new TableFooter();
            var firstHeaderRow = new TableRow()
            {
                Cells =
                {
                    new SimpleNode(name:"th",value:"Rank"), 
                    new SimpleNode(name:"th",value:"Company"),
                    new SimpleNode(name:"th",value:"Sales"){Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"MS%"){Styles = new Dictionary<string, string>(){{"text-align","center"}}}
                }
            };

            var footerRow = new TableRow()
                {
                    Cells =
                        {
                            new SimpleNode(name:"th",value:Periodtext+"-"+EndDate)
                                {
                                    Attributes = new Dictionary<string, string>(){{"colspan","4"}}
                                }
                        }
                };
            header.Rows.Add(firstHeaderRow);
            //header.Classes.Add("sfhtHeader");
            //footer.Rows.Add(footerRow);
            //footer.Classes.Add("homeTableFooter");

            var cellMaps = new List<ICellMap<Row>>
            {
                new CubeCellMap() 
                {
                    Columns = new List<string>(){"CorporationRank"},
                    CellFactory = new TextCellFactory(nodeName:"td")
                    {
                        Classes = new List<string>(){"Rank_Col"},
                        Styles = new Dictionary<string, string>(){{"text-align","center"}}
                    },
                    RowCellDataProvider = new CubeCellDataProvider(Input.Columns)
                },

                new CubeCellMap() {Columns = new List<string>(){"Company"},CellFactory = new TextCellFactory(nodeName:"td"){Classes = new List<string>(){"Rank_Company"}}, RowCellDataProvider = new CubeCellDataProvider(Input.Columns)},
                new CubeCellMap() {Columns = new List<string>(){"SALES"},CellFactory = new CustomNumberCellFactory(colId:3,nodeName:"td"){NumberFormatString = "#,##0,",Suffix = "k",Classes = new List<string>(){"Rank_Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}, RowCellDataProvider = new CubeCellDataProvider(Input.Columns)},
                new CubeCellMap() {Columns = new List<string>(){"MS%"},CellFactory = new CustomNumberCellFactory(colId:4,nodeName:"td"){NumberFormatString = "##0.0",Suffix = "%",Classes = new List<string>(){"Rank_MS"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}, RowCellDataProvider = new CubeCellDataProvider(Input.Columns)},
            };

            var cubeTableFactory = new CubeTableFactory
            {
                Header = header,
                CellMaps = cellMaps,
                //Footer = footer,
                RowFunctionalities = new List<IRowFunctionality<Row>>()
                {
                    new RbRowHighlight()
                },
                AutoCreateHeader = false
            };
            var table = cubeTableFactory.Create(Input);
            var data = new SingleTableModel()
            {
                Title = (WidgetName == "Top10IntPrdTable") ? "Top 10 Int Product" : "Top 10 Companies by Sales",
                _Table = table
            };
            return data;
        }

        public CubeData Input { set; private get; }
    }
}