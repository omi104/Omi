using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideNodeFixedImage : ComplexNode
    {
        private string _imagePath;
        public GuideNodeFixedImage(string imagePath)
        {
            Classes.Add("guide-template1");
            _imagePath = imagePath;
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            var container = new ComplexNode();
            container.Classes.Add("image-container");

            var img = new SimpleNode("img", string.Empty);
            img.Attributes.Add("src", _imagePath);
            img.Styles.Add("width","100%");

            container.ChildNodes.Add(img);
            ChildNodes.Add(container);

            base.WriteInner(writer);
        }

    }
}