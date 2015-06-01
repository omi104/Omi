using Component.Node;
using Component.Node.Hyperlink;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard.TableComponents.CellFactories
{
    public class TextCellFactory : NodeFactoryBase<object, SimpleNode>
    {
        private readonly int _colId;
        private readonly string _cssClass;
        private HyperlinkConfig _config; 
        private string Name { get; set; }
        public List<string> ParamNames { get; set; }

        public TextCellFactory(int colId, string cssClass, string name = "td")
        {
            Name = name;
            _colId = colId;
            _cssClass = cssClass;

        }

        protected override SimpleNode CreateInternal(object value)
        {
            var values = value as List<string>;
            var tableCell = new SimpleNode(Name,value.ToString());       
            tableCell.Classes.Add("col-"+_colId);
            if (_cssClass != null)
            {
                tableCell.Classes.Add(_cssClass);
            }
            return tableCell;
        }
    }
}