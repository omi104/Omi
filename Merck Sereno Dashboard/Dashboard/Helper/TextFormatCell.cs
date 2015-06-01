using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using Component.Node;

namespace Dashboard.Helper
{
    public class TextFormatCell : NodeBase
    {
        private string _value;
        private readonly TextFormat _textFormat;

        public TextFormatCell(string name, string value, TextFormat format)
            : base(name)
        {
            _value = value;
            _textFormat = format;
        }

        public string Value
        {
            get { return _value; }
            set
            {
                _value = value;
            }
        }

        protected override void WriteInner(XmlWriter writer)
        {
            if (_textFormat != null && _value != null)
                _value = _textFormat.Format(_value);
            writer.WriteValue(_value ?? string.Empty);
        }
    }
}