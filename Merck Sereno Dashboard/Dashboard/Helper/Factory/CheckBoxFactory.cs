using System.Collections.Generic;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class CheckBoxFactory : NodeFactoryBase<string, NodeBase>
    {
        private readonly string _nodeName;
        public string TrendChartControlId { get; set; }
        public string StackChartControlId { get; set; }
        public string UncheckedItem { get; set; }
        public string ParamName { get; set; }

        public CheckBoxFactory(string nodeName = "td")
        {
            _nodeName = nodeName;
            Styles = new StyleDictionary();
            Classes = new List<string>();
            Attributes = new Dictionary<string, string>();
        }
        protected override NodeBase CreateInternal(string data)
        {
            var cell = new ComplexNode(_nodeName);
            var checkBox = new SimpleNode("input", "")
                {
                    Attributes = new Dictionary<string, string>()
                    {
                        { "type", "checkbox" }, 
                        { "checked", "checked" }, 
                        { "series-name", data },
                        { "onClick", "customTable.ChartUpdate('"+ParamName+"')" }
                    }
                };
            if (!string.IsNullOrEmpty(UncheckedItem) && UncheckedItem.ToUpper().Contains(data.ToUpper()))
            {
                checkBox.Attributes.Remove("checked");
            }
            cell.ChildNodes.Add(checkBox);
            return cell;
        }
    }
}
