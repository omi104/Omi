using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class BlankTableCellFactory : NodeFactoryBase<object, NodeBase>
    {
        public BlankTableCellFactory()
        {
            Styles = new StyleDictionary();
        }

        protected override NodeBase CreateInternal(object data)
        {
            return new SimpleNode("td", string.Empty);
        }
    }
}