using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class TextCellFactory : NodeFactoryBase<string, NodeBase>
    {
        private readonly string _nodeName;
        private readonly TextFormat _textFormat;
        public bool IsMakeTextShort { get; set; }
        public int NameCollength { get; set; }


        public TextCellFactory(TextFormat textFormat, string nodeName = "td")
        {
            NameCollength = 13;
            IsMakeTextShort = false;
            _textFormat = textFormat;
            _nodeName = nodeName;
        }

        public TextCellFactory(string format = null, string prefix = null, string suffix = null,
                                          string nodeName = "td")
            : this(new TextFormat { FormatString = format, Prefix = prefix, Suffix = suffix }, nodeName)
        {

        }

        protected override NodeBase CreateInternal(string data)
        {
            if (data == null || string.IsNullOrWhiteSpace(data))
                return new SimpleNode("td", string.Empty);
                
            if (_textFormat != null)
                data = _textFormat.Format(data);
           

            if (IsMakeTextShort && data.Length > NameCollength)
            {
                return new SimpleNode("td", data.Substring(0, NameCollength-1) + "...")
                {

                    Attributes = new Dictionary<string, string>()
                    {
                        {"title",data},
                    }
                };
            }
            return new SimpleNode("td", data);
        }
    }
}