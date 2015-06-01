using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideBodyCellCrossBgGrayTextFactory : SimpleNode
    {
        protected string Value;
        public GuideBodyCellCrossBgGrayTextFactory(string name, string value, int columnPosition)
            : base(name, value)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("MKT_DEF_TD_COL bg-gray white-text");
            Value = value;
        }

        protected override void WriteInner(XmlWriter writer)
        {
            var displayText = string.Empty;
            if (Value == "1" || Value == "X")
            {
                displayText = "X";
            }
            if (Value == "-")
            {
                displayText = Value;
            }
            writer.WriteValue(displayText);
        }

    }
}