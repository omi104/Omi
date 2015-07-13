using System.Collections.Generic;
using Component.Node;
using Dashboard.Models.Data;
using Dashboard.TableComponents.Nodes;

namespace Dashboard.TableComponents.CellFactories
{
    public class ExpandCollapseHyperLinkCellFactory : NodeFactoryBase<object, NodeBase>
    {
        public int ChildLevel { get; set; }
        public int InactiveParent { get; set; }
        public bool IsMakeTextShort { get; set; }
        public bool IsMoleculeAtAGlance { get; set; }
        public int NameCollength { get; set; }

        public ExpandCollapseHyperLinkCellFactory()
        {
            IsMakeTextShort = false;
            InactiveParent = 0;
            ChildLevel = -1;
        }
        protected override NodeBase CreateInternal(object value)
        {
            var data = (ExpandCollapseCellData)value;
            if (data.CellData == null)
                data.CellData = string.Empty;

            var imgNode = new SimpleNode("img", "");
            imgNode.Attributes.Add("src", "Content/Images/expand.gif");
            //imgNode.Attributes.Add("onClick", IsMoleculeAtAGlance?"CustomMultiTable.UpdateTableState(this, '1')":"CustomMultiTable.UpdateTableState(this, '2')");
            imgNode.Attributes.Add("onClick", "CustomMultiTable.UpdateTableState(this, '1')");
            imgNode.Styles.Add("margin-right", "2px");
            
            if (IsMoleculeAtAGlance && data.Level == 2)
            {
                imgNode.Styles.Add("padding-left", (data.GeoLevel != 0 ? (data.GeoLevel * 10)+10 : 20) + "px");
            }
            else
                imgNode.Styles.Add("padding-left", (data.GeoLevel != 0 ? (data.GeoLevel * 10) : 10) + "px");

            var expandCollapseCell = new ExpandCollapseTableCell
            {
                RankingNode = new SimpleNode("span", data.CellData)
                {
                    Styles = new Dictionary<string, string>()
                    {
                        {"padding-left",((data.GeoLevel*10)+20)+"px"},
                    }
                },
            };

            if (IsMakeTextShort && data.CellData.Length > NameCollength)
            {
                expandCollapseCell = new ExpandCollapseTableCell
                {
                    RankingNode = new SimpleNode("span", data.CellData.Substring(0, NameCollength - 1) + "...")
                    {
                        Styles = new Dictionary<string, string>()
                        {
                            {"padding-left",((data.GeoLevel*10)+20)+"px"},
                        },
                        Attributes = new Dictionary<string, string>()
                        {
                            {"title",data.CellData},
                        }
                    },
                };
            }

            
            if (InactiveParent > 0 && data.Rank == InactiveParent)
            {
                expandCollapseCell.RankingNode.Styles.Clear();
                expandCollapseCell.Classes.Add("inactiveParent");
            }
            else if (data.Level != ChildLevel) //region/sub-region/country
            {
                expandCollapseCell.ImgInnerNode = imgNode;
                expandCollapseCell.RankingNode.Styles.Clear();
            }
            return expandCollapseCell;
        }
    }
}
