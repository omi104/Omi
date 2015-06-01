using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideBodyCellCrossTextFactory : SimpleNode
    {
        protected string Value;
        public GuideBodyCellCrossTextFactory(string name, string value, int columnPosition)
            : base(name, value)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("MKT_DEF_TD_COL bg-blue");
            Value = value;
        }

        protected override void WriteInner(XmlWriter writer)
        {
            var displayText = Value;
            writer.WriteValue(displayText);
        }

    }
}