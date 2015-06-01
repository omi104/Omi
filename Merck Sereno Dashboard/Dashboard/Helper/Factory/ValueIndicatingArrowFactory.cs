using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class ValueIndicatingArrowFactory: NodeFactoryBase<object, NodeBase>
    {
        public ValueIndicatingArrowFactory()
        {
            Styles = new StyleDictionary();
        }

        protected override NodeBase CreateInternal(object data)
        {
            
            var style = new Dictionary<string, string>
                {
                    {"height","20px"},
                    {"width","15px"},
                    {"align","center"}
                };
            var complexNode = new ComplexNode("td") {Styles = {{"width", "20px"}}};
            if (string.IsNullOrEmpty(data.ToString()))
            {
                complexNode.ChildNodes.Add(new SimpleNode("div", string.Empty)
                {
                    Styles = style,
                });
            }
            else
            {
                complexNode.ChildNodes.Add(new SimpleNode("img", "")
                {
                    Styles = style,
                    Attributes =
                                {
                                    {"src", "Content/Images/"+data.ToString()+".gif"},

                                }
                });
            }
            
            return complexNode;
        }
    }
}