using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideHeaderCellImageTextFactory : ComplexNode
    {
        protected string Value;
        public GuideHeaderCellImageTextFactory(string name, string value, int columnPosition)
            : base(name)
        {
            Classes.Add("col-" + columnPosition);
            Classes.Add("data");
            Value = value;
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            var image = new SimpleNode("img", string.Empty);

            var imageName = Value;

            var regex = new Regex("[^a-zA-Z0-9-_ ]");
            imageName = regex.Replace(imageName, string.Empty);

            imageName = imageName.Replace("_x0020_", " ");

            image.Attributes.Add("alt", Value);
            image.Attributes.Add("src", "Content/Images/help/countries/" + imageName + ".GIF");
            ChildNodes.Add(image);

            base.WriteInner(writer);
        }
    }
}