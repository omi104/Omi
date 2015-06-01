using System.Collections.Generic;
using Component.Node;

namespace Dashboard.TableComponents.CellFactories
{
    public class CellFactoryBase : NodeFactoryBase<object, SimpleNode>
    {
        protected readonly string NodeName;
        public string ColumnPosition { get; set; }

        //public StyleDictionary Styles { get; set; }
        //public IList<string> Classes { get; set; }

        public CellFactoryBase(string nodeName = "td")
        {
            NodeName = nodeName;
            Styles=new StyleDictionary();
            Classes = new List<string>();
        }

        public virtual INode Create(object value)
        {
            return CreateInternal(value);
        }

        protected override SimpleNode CreateInternal(object data)
        {
            var cell = new SimpleNode(NodeName);
            return cell;
        }
    }
}

