using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Dashboard.Helper;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideHeaderCellCenterGrayFactory : SimpleNode
    {
        public GuideHeaderCellCenterGrayFactory(string name, string value, int columnPosition, int colspan = 1)
            : base(name, value.ToGuideDisplayText())
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("center-align bg-gray white-text");
            Attributes.Add("colspan", colspan.ToString());
        }

    }
}