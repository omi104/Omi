using System.Collections.Generic;
using System.Xml;
using Component.Node;
using Dashboard.Models;

namespace Dashboard.Helper
{
    public class TextOnlyNode : NodeBase
    {
        private readonly string _value;
        public TextOnlyNode(string value)
        {
            _value = value;
        }

        public override void Render(XmlWriter writer)
        {
            WriteInner(writer);
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            writer.WriteValue(_value ?? string.Empty);
        }
    }

}