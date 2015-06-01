using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class NullNode : NodeBase
    {

        public NullNode()
            : base("empty")
        {
        }

        protected override void WriteInner(XmlWriter writer)
        {

        }

        public override void Render(XmlWriter writer)
        {

        }
    }
}