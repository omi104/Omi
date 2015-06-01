using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.CellFactories
{
    public class IndicatorCellFactory : NodeFactoryBase<object, NodeBase>
    {
        public TextFormat TextFormat;
        public int colId { get; set; }


        public IndicatorCellFactory()
        {
            TextFormat = new TextFormat { FormatString = "#,#0.0" };
            Styles = new StyleDictionary();
        }

        protected override NodeBase CreateInternal(object colValues)
        {
            string data = null;
            var values = colValues as List<string>;

            if (values == null || string.IsNullOrEmpty(values[0]))
                return new SimpleNode("td", string.Empty)
                {
                    Classes = new List<string>(){"col-"+colId.ToString()},
                    Attributes = new Dictionary<string, string>()
                    {
                        {"column-index",colId.ToString()}
                    }
                };
            if (TextFormat != null)
                data = TextFormat.Format(values[0]);

            var complexNode = new ComplexNode("td");
            complexNode.Attributes.Add("column-index",colId.ToString());

            complexNode.ChildNodes.Add(new SimpleNode("span", data));
            complexNode.ChildNodes.Add(new SimpleNode("img", "")
            {
                Attributes =
                {
                    {"src", "Content/Images/"+values[1]+".gif"},
                }
            });
            return complexNode;
        }
    }
}