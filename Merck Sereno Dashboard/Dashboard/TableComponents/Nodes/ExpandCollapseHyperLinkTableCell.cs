using System.Xml;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class ExpandCollapseTableCell : NodeBase
    {
        public SimpleNode ImgInnerNode { get; set; }
        public SimpleNode RankingNode { get; set; }

        public ExpandCollapseTableCell(string name = "td")
            : base(name)
        {
            Classes.Add("ExpandCollapseText");
        }

        protected override void WriteInner(XmlWriter writer)
        {
            if (ImgInnerNode != null)
                ImgInnerNode.Render(writer);

            if (RankingNode != null)
                RankingNode.Render(writer);
        }
    }
}
