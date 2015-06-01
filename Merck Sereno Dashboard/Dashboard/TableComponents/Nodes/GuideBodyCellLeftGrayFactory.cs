using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideBodyCellLeftGrayFactory : SimpleNode
    {
        public GuideBodyCellLeftGrayFactory(string name, string value, int columnPosition)
            : base(name, value)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("MKT_DEF_TD_COL bg-gray left-aligned white-text");

            Attributes.Add("nowrap", "nowrap");
        }
    }
}