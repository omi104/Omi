using Component.Node;

namespace Dashboard.TableComponents
{
    public class HoverHeaderTableFactory : ComplexNode
    {


        public HoverHeaderTableFactory(string hoverItem,string periodType, string measureText)
            : base("th")
        {
            var companyNode = new SimpleNode("div",hoverItem.ToLower()=="all"?"Selected Market":hoverItem);
            companyNode.Classes.Add("snapshot-hover-compnay");
            ChildNodes.Add(companyNode);

            var yearAndMeasureNode = new ComplexNode();
            yearAndMeasureNode.Classes.Add("snapshot-hover-head");

            //var yearNode = new SimpleNode("span", periodType);
            //yearNode.Classes.Add("snapshot-hover-year");
            //yearAndMeasureNode.ChildNodes.Add(yearNode);

            var measureNode = new SimpleNode("div", ": " + periodType+" - "+measureText);
            measureNode.Classes.Add("snapshot-hover-measure");
            ChildNodes.Add(measureNode);

            //ChildNodes.Add(yearAndMeasureNode);
        }
    }
}
