using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class HyperLinkCellFactory : NodeFactoryBase<string, NodeBase>
    {
        private readonly string _nodeName;
        public HyperLinkCellFactory(string nodeName = "td")
        {
            _nodeName = nodeName;
            Styles = new StyleDictionary();
            Classes = new List<string>();
        }
        protected override NodeBase CreateInternal(string value)
        {
            if (value == null)
                value = string.Empty;

            var expandCollapseCell = new ExpandCollapseHyperLinkTableCell(_nodeName)
            {
                HyperLinkInnerNode = new SimpleNode("a", value) { Styles = Styles, Classes = Classes }
            };
            return expandCollapseCell;
        }
    }
}