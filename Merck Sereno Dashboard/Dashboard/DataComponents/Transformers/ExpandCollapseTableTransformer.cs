using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Component.Table;
using CubeFramework;
using Dashboard.DashboardComponent.Components;
using Dashboard.Helper.Factory;
using Dashboard.Models.Data;
using Dashboard.TableComponents.CellDataProvider;
using Dashboard.TableComponents.CellFactories;
using Dashboard.TableComponents.RowFunctionalities;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class ExpandCollapseTableTransformer : ITransformer<CubeData, SingleTableModel>
    {
        public string NameColumnValue { get; set; }
        public string MeasureText { get; set; }
        public string NavigationName { get; set; }
        public bool ShowFullLength { get; set; }
        private int _isRbIndex = -1;
        public bool _IsThousand { get; set; }
        public bool _IsMoleculeAtAGlance { get; set; }
        public bool _IsBrandAtAGlance { get; set; }
        public bool _IsSubbrandAtAGlance { get; set; }

        public SingleTableModel GetData()
        {
            var header = new TableHeader();
            var h1 = new TableRow()
            {
                Cells =
                {
                    //new SimpleNode(name:"th",value:"Rank"){Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    new ComplexNode(name:"th"){ChildNodes = new List<INode>()
                    {
                        new SimpleNode("img", "") { Classes = new List<string>(){"expandCollapseAll"},Attributes = { { "src", "Content/Images/expandAll.png" },{ "title", "Expand/Collapse all" }, { "onClick", _IsMoleculeAtAGlance? "RbHelper.ExpandCollapseAll(this,'2' )":"RbHelper.ExpandCollapseAll(this,'1' )"} } },
                        new SimpleNode(name:"div",value:"Rank"){Classes = new List<string>(){"expandCollAllText"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    },
                    Classes = new List<string>(){"Rank"},
                    Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    new SimpleNode(name:"th",value:NameColumnValue){Classes = new List<string>(){"Company"},Styles = new Dictionary<string, string>(){{"text-align","left"}}},
                    new SimpleNode(name:"th",value:MeasureText+" Sales"){Classes = new List<string>(){"Sales"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Share%"){Classes = new List<string>(){"Share"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Growth % VYA"){Classes = new List<string>(){"Growth"},Styles = new Dictionary<string, string>(){{"text-align","center"}}},
                    new SimpleNode(name:"th",value:"Share Pts Chg"){Classes = new List<string>(){"SharePtsChg"},Styles = new Dictionary<string, string>(){{"text-align","center"}}}
                }
            };
            header.Rows.Add(h1);
            int childLevel = Input.Rows.Select(r => r.Level).Max();
            var cellMaps = new List<ICellMap<Row>>
            {
                new CubeCellMap() {Columns = new List<string>(){"Ranking"},CellFactory = new ExpandCollapseHyperLinkCellFactory(){Classes = new List<string>(){"Rank"}, ChildLevel= childLevel,IsMoleculeAtAGlance=_IsMoleculeAtAGlance},RowCellDataProvider = new ExpandCollapseCellDataProvider(Input.Columns)},
                new CubeCellMap() {Columns = new List<string>(){"Name"},CellFactory = new NameCellFactory(nodeName:"td")
                {
                    IsMakeTextShort=true,NameCollength = ShowFullLength?999:35, 
                    IsMoleculeAtAGlance=_IsMoleculeAtAGlance, IsBrandAtAGlance= _IsBrandAtAGlance,IsSubbrandAtAGlance= _IsSubbrandAtAGlance,
                    ChildLevel = childLevel, Classes = new List<string> {"Company"}
                },RowCellDataProvider = new ExpandCollapseCellDataProvider(Input.Columns)},
                
                new CubeCellMap() {Columns = new List<string>(){"Total Units Sales","Total Units Sales Arrow"},CellFactory = new NumberDecimalWithArrowIndicationCellFactory(2) {NumberFormatString = _IsThousand?"#,###,":"#,#0", Suffix = _IsThousand?"k":"",Classes = new List<string>() { "Sales" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                
                new CubeCellMap() {Columns = new List<string>(){"Share %","Market Share % Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Share" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                new CubeCellMap() {Columns = new List<string>(){"Growth % VYA","Growth % VYA Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "Growth" } },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
                new CubeCellMap() {Columns = new List<string>(){"Share Pts Chg","Share Pts Chg Arrow"},CellFactory = new IndicatorCellFactory() {TextFormat = new TextFormat(){FormatString = "#,#0.0"},Classes = new List<string>() { "SharePtsChg"} },RowCellDataProvider = new CubeMultipleColumnDataProvider(Input.Columns) },
            };

            foreach (var col in Input.Columns.Where(col => col.Name.ToUpper() == "IS_MERCK"))
            {
                _isRbIndex = col.Position;
            }

            var cubeTableFactory = new CubeTableFactory
            {
                Header = header,
                CellMaps = cellMaps,
                RowFunctionalities = new List<IRowFunctionality<Row>>()
                {
                    new RowSpecificRankLevelFunctionality(),
                    new ExpandCollTableAlternateColorFunctionality(){ChildLevel = childLevel},
                    new HighlightRowIfRb() {colIndex = _isRbIndex}
                },
                AutoCreateHeader = false
            };
           var input = GetProperRanking(Input);

            var table = cubeTableFactory.Create(input);
            if (ShowFullLength)
            {
                table.Classes.Add("LargeNameColTable");
            }
            var data = new SingleTableModel()
            {
                Title = "",
                _Table = table
            };
            return data;
        }

        public CubeData Input { set; private get; }

        public CubeData GetProperRanking(CubeData input)
        {
            
            int childRankCount = 1;
            foreach (var row in Input.Rows)
            {
                if (row.Rank <= 1000)//parent
                {
                    row.Values[0] = string.Empty;
                    childRankCount = 1;
                }
                else // child
                {
                    row.Values[0] = childRankCount.ToString();
                    childRankCount++;
                }
            }
                                                            
            return input;
        }
    }
}