using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class NumberDecimalCellFactory : NodeFactoryBase<object, NodeBase>
    {
        public TextFormat TextFormat;
        public int colId { get; set; }
        public bool isSales { get; set; }
        public string suffix { get; set; }

        public NumberDecimalCellFactory()
        {
            TextFormat = new TextFormat { FormatString = "#,#0.0" };
        }

        protected override NodeBase CreateInternal(object data)
        {
            var values = data as List<string>;

            if (data == null || string.IsNullOrWhiteSpace(values[1]))
                return new SimpleNode("td", string.Empty)
                {
                    Attributes = new Dictionary<string, string>() { { "column-index" ,colId.ToString()} }
                };
            if (isSales && values!=null && values[0]== "--")//rankname == '--'
            {
                return new SimpleNode("td", values[1]+"%")
                {
                    Attributes = new Dictionary<string, string>() { { "column-index", colId.ToString() } }
                };
            }
            if (TextFormat != null)
                values[1] = TextFormat.Format(values[1]);

            if (suffix != null || !string.IsNullOrEmpty(suffix))
                values[1] += suffix;
            return new SimpleNode("td", values[1])
            {
                Attributes = new Dictionary<string, string>() { { "column-index", colId.ToString() } }
            };
        }
    }
}