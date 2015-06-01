using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.Helper
{
    public class ExpandCollapseHyperLinkTableCell : ComplexNode
    {
        public SimpleNode ImgInnerNode { get; set; }
        public SimpleNode HyperLinkInnerNode { get; set; }

        public ExpandCollapseHyperLinkTableCell(string name = "td")
            : base(name)
        {
            //Classes.Add("ExpandCollapseHyperLinkText");
            ChildNodes.Add(ImgInnerNode);
            ChildNodes.Add(HyperLinkInnerNode);
        }

        protected override void WriteInner(XmlWriter writer)
        {
            if (ImgInnerNode != null)
                ImgInnerNode.Render(writer);

            if (HyperLinkInnerNode != null)
                HyperLinkInnerNode.Render(writer);
        }
    }
}