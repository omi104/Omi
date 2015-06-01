using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using Component.Node;
using Dashboard.DataComponents.DataSources;

namespace Dashboard.Helper.Factory
{
    public class ColorfulDivCellFactory : NodeFactoryBase<object, NodeBase>
    {
        private ColorListDataSource _colorSource;

        public ColorfulDivCellFactory()
        {
            _colorSource = new ColorListDataSource();
            Styles = new StyleDictionary();
        }

        protected override NodeBase CreateInternal(object data)
        {
            var values = data as List<string>;
            string colorValue = "";

            if (values[0]==null || values[0] == string.Empty)
            {
                colorValue = "fecefe";
            }
            else if (values != null && values[1]=="RECKITT BENCKISER")
            {
                colorValue = "de2588";
            }
            else
            {
                colorValue = _colorSource.GetNextColor();
            }

            var complexNode = new ComplexNode("td");
            complexNode.ChildNodes.Add(new SimpleNode("span", values!=null?Convert.ToString(values[0]):"") { Classes = new List<string>() { "rank-div" } });
            complexNode.ChildNodes.Add(new SimpleNode("span", string.Empty)
            {
                Classes = new List<string>() { "color-div" },
                Styles = new Dictionary<string, string>()
                {
                    {"background-color","#"+colorValue}
                }
            });

            return complexNode;
        }
    }
}