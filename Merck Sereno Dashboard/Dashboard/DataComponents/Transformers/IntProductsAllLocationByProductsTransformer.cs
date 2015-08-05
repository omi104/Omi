using Component.Node;
using Component.Table;
using CubeFramework;
using Dashboard.Helper.Factory;
using Dashboard.Models.Data;
using Dashboard.TableComponents.CellDataProvider;
using Dashboard.TableComponents.CellFactories;
using Dashboard.TableComponents.RowFunctionalities;
using DashboardFramework.DataComponent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.DataComponents.Transformers
{
    public class IntProductsAllLocationByProductsTransformer : ITransformer<CubeData, SingleTableModel>
    {

        public bool _IsThousand { get; set; }
        public string _Measure { get; set; }
        public string CompanyOrBrandHeader { get; set; }

        public SingleTableModel GetData()
        {
            var header = new TableHeader();
            var tokens = _Measure.Split(' ').ToList();
            var h1 = new TableRow()
            {
                Cells =
                {                    
                    //new SimpleNode(name:"th",value:"Market/Region"){Classes = new List<string>(){"Categories"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    new ComplexNode(name:"th"){ChildNodes = new List<INode>()
                    {
                        new SimpleNode("img", "") { Classes = new List<string>(){"expandCollapseAll"},Attributes = { { "src", "Content/Images/expandAll.png" },{ "title", "Expand/Collapse all" }, { "onClick", "RbHelper.ExpandCollapseAll(this,'1' )"} } },
                        new SimpleNode(name:"div",value:CompanyOrBrandHeader){Classes = new List<string>(){"expandCollAllText"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    },
                    Classes = new List<string>(){"Categories"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    new SimpleNode(name:"th",value:"Total "+tokens.First()+"(Fixed) Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Merck"+tokens.First()+"(Fixed) Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Total Contribution %"){Classes = new List<string>(){"Contribution"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Merck Contribution %"){Classes = new List<string>(){"Contribution"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Total Growth vs. PPYA*"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Merck Growth vs. PPYA*"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}
                }
            };
            header.Rows.Add(h1);

            int childLevel = Input.Rows.Select(r => r.Level).Max();
            var cellMaps = new List<ICellMap<Row>>
                {
                    new CubeCellMap() {Columns = new List<string>(){"Category/Region"},CellFactory = new ExpandCollapseHyperLinkCellFactory(){ChildLevel = childLevel,InactiveParent = 1,Classes = new List<string>(){"Categories"}},RowCellDataProvider = new ExpandCollapseCellDataProvider(Input.Columns)},
                    //new CubeCellMap() {Columns = new List<string>(){"Total Units Sales","Total Units Sales Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0"},Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },

                    new CubeCellMap() {Columns = new List<string>(){"Total Units Sales","Total Units Sales Arrow"},CellFactory = new NumberDecimalWithArrowIndicationCellFactory(2) {NumberFormatString = _IsThousand?"#,###,":"#,#0", Suffix = _IsThousand?"k":"",Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    //Merck Units Sales
                    //Total Sales Share %
                     new CubeCellMap() {Columns = new List<string>(){"Merck Units Sales","Merck Units Sales Arrow"},CellFactory = new NumberDecimalWithArrowIndicationCellFactory(2) {NumberFormatString = _IsThousand?"#,###,":"#,#0", Suffix = _IsThousand?"k":"",Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    new CubeCellMap() {Columns = new List<string>(){"Total Sales Share %","Total Sales Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    new CubeCellMap() {Columns = new List<string>(){"Total Merck Share %","Total Merck Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },

                    //new CubeCellMap() {Columns = new List<string>(){"Market Share %","Market Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Share" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    new CubeCellMap() {Columns = new List<string>(){"Total Growth % VYA","Total Growth % VYA Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    new CubeCellMap() {Columns = new List<string>(){"Merck Growth % VYA","Merck Growth % VYA Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "SharePtsChg"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                    //new CubeCellMap() {Columns = new List<string>(){"Share Pts Chg","Share Pts Chg Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "SharePtsChg"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                };
            var cubeTableFactory = new CubeTableFactory
            {
                Header = header,
                CellMaps = cellMaps,
                RowFunctionalities = new List<IRowFunctionality<Row>>()
                {
                    new RowSpecificRankLevelFunctionality(),
                    new ExpandCollTableAlternateColorFunctionality(){ChildLevel = childLevel},
                },
                AutoCreateHeader = false
            };
            var table = cubeTableFactory.Create(Input);
            table.Classes.Add("cat-all-category-by-loc");

            var data = new SingleTableModel()
            {
                Title = "",
                _Table = table
            };
            return data;
        }

        public CubeData Input { set; private get; }


        //public bool _IsThousand { get; set; }
        //public string CompanyOrBrandHeader { get; set; }
        //public string _Measure { get; set; }

        //public SingleTableModel GetData()
        //{
        //    var header = new TableHeader();
        //    var tokens = _Measure.Split(' ').ToList();
        //    var h1 = new TableRow()
        //    {
        //        Cells =
        //        {                    
        //            //new SimpleNode(name:"th",value:CompanyOrBrandHeader){Classes = new List<string>(){"Categories"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
        //            new ComplexNode(name:"th"){ChildNodes = new List<INode>()
        //            {
        //                new SimpleNode("img", "") { Classes = new List<string>(){"expandCollapseAll"},Attributes = { { "src", "Content/Images/expandAll.png" },{ "title", "Expand/Collapse all" }, { "onClick", "RbHelper.ExpandCollapseAll(this,'1' )"} } },
        //                new SimpleNode(name:"div",value:CompanyOrBrandHeader){Classes = new List<string>(){"expandCollAllText"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
        //            },
        //            Classes = new List<string>(){"Categories"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
        //            //new SimpleNode(name:"th",value:tokens.First()+" Value Retail Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            //new SimpleNode(name:"th",value:"Share%"){Classes = new List<string>(){"Share"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            //new SimpleNode(name:"th",value:"Growth % VYA"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            //new SimpleNode(name:"th",value:"Share Pts Chg"){Classes = new List<string>(){"SharePtsChg"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}
        //            new SimpleNode(name:"th",value:"Total "+tokens.First()+"(Fixed) Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            new SimpleNode(name:"th",value:"Merck "+tokens.First()+"(Fixed) Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            new SimpleNode(name:"th",value:"Total Contribution %"){Classes = new List<string>(){"Contribution"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            new SimpleNode(name:"th",value:"Merck Contribution %"){Classes = new List<string>(){"Contribution"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            new SimpleNode(name:"th",value:"Total Growth vs. PPYA*"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
        //            new SimpleNode(name:"th",value:"Merck Growth vs. PPYA*"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}
        //        }
        //    };
        //    header.Rows.Add(h1);
        //    int childLevel = Input.Rows.Select(r => r.Level).Max();
        //    var cellMaps = new List<ICellMap<Row>>
        //    {
        //        new CubeCellMap() {Columns = new List<string>(){"Category/Region"},CellFactory = new ExpandCollapseHyperLinkCellFactory(){ChildLevel = childLevel,InactiveParent = 1,Classes = new List<string>(){"Categories"}},RowCellDataProvider = new ExpandCollapseCellDataProvider(Input.Columns)},
        //        //new CubeCellMap() {Columns = new List<string>(){"Total Units Sales","Total Units Sales Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0"},Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
               
        //        new CubeCellMap() {Columns = new List<string>(){"Total Units Sales","Total Units Sales Arrow"},CellFactory = new NumberDecimalWithArrowIndicationCellFactory(2) {NumberFormatString = _IsThousand?"#,###,":"#,#0", Suffix = _IsThousand?"k":"",Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        //Merck Units Sales
        //        //Total Sales Share %
        //         new CubeCellMap() {Columns = new List<string>(){"Merck Units Sales","Merck Units Sales Arrow"},CellFactory = new NumberDecimalWithArrowIndicationCellFactory(2) {NumberFormatString = _IsThousand?"#,###,":"#,#0", Suffix = _IsThousand?"k":"",Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        new CubeCellMap() {Columns = new List<string>(){"Total Sales Share %","Total Sales Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        new CubeCellMap() {Columns = new List<string>(){"Total Merck Share %","Total Merck Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
	           
        //        //new CubeCellMap() {Columns = new List<string>(){"Market Share %","Market Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Share" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        new CubeCellMap() {Columns = new List<string>(){"Total Growth % VYA","Total Growth % VYA Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        new CubeCellMap() {Columns = new List<string>(){"Merck Growth % VYA","Merck Growth % VYA Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "SharePtsChg"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //        //new CubeCellMap() {Columns = new List<string>(){"Share Pts Chg","Share Pts Chg Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "SharePtsChg"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
        //    };
        //    var cubeTableFactory = new CubeTableFactory
        //    {
        //        Header = header,
        //        CellMaps = cellMaps,
        //        RowFunctionalities = new List<IRowFunctionality<Row>>()
        //        {
        //            new RowSpecificRankLevelFunctionality(),
        //            new ExpandCollTableAlternateColorFunctionality(){ChildLevel = childLevel},
        //            new HighlightRowIfRb(){colIndex = 1}
        //        },
        //        AutoCreateHeader = false
        //    };
        //    var table = cubeTableFactory.Create(Input);
        //    table.Classes.Add("cat-all-category-by-loc");

        //    var data = new SingleTableModel()
        //    {
        //        Title = "",
        //        _Table = table
        //    };
        //    return data;
        //}

        //public CubeData Input { set; private get; }
    }
}