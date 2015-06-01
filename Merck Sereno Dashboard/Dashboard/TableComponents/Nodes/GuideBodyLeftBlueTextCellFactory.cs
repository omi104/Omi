using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideBodyLeftBlueTextCellFactory : SimpleNode
    {
        public GuideBodyLeftBlueTextCellFactory(string name, string value, int columnPosition)
            : base(name, value)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("MKT_DEF_TD_COL bg-blue left-aligned blue-text");
        }
    }
}