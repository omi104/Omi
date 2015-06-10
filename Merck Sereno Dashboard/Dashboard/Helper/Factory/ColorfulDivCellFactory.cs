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
        public string UncheckedItem { get; set; }

        public ColorfulDivCellFactory()
        {
            _colorSource = new ColorListDataSource();
            Styles = new StyleDictionary();
        }

        protected override NodeBase CreateInternal(object data)
        {
            var values = data as List<string>;

            var complexNode = new ComplexNode("td");
            complexNode.ChildNodes.Add(new SimpleNode("span", values != null ? Convert.ToString(values[0]) : "") { Classes = new List<string>() { "rank-div" } });
            if (!UncheckedItem.ToUpper().Contains(values[1].ToUpper()))
            {
                string colorValue = _colorSource.GetNextColor();
                complexNode.ChildNodes.Add(new SimpleNode("span", string.Empty)
                {
                    Classes = new List<string>() { "color-div" },
                    Styles = new Dictionary<string, string>()
                    {
                        {"background-color","#"+colorValue}
                    }
                });
            }


            return complexNode;
        }
    }
}