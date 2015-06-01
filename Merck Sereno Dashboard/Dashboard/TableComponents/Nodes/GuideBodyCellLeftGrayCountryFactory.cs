using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideBodyCellLeftGrayCountryFactory : SimpleNode
    {
        protected string Geo;
        protected string GeoParent;

        public GuideBodyCellLeftGrayCountryFactory(string name, string value, string geoParent, string columnPosition)
            : base(name, value)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("MKT_DEF_TD_COL bg-gray left-aligned white-text");

            Attributes.Add("nowrap", "nowrap");
            Geo = value;
            GeoParent = geoParent;
        }

        protected override void WriteInner(XmlWriter writer)
        {
            if (string.IsNullOrEmpty(Geo))
            {
                writer.WriteValue(GeoParent);
            }
            writer.WriteValue(Geo);

        }
    }
}