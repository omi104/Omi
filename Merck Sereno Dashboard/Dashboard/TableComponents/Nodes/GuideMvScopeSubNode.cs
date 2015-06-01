using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideMvScopeSubNode : ComplexNode
    {
        protected readonly string WidgetName;

        protected readonly INode ExportNode;
        protected INode TableNode;
        public GuideMvScopeSubNode(string widgetName, INode exportNode, INode tableNode)
            : base("div")
        {

            Classes.Add("guide-template2");
            WidgetName = widgetName;
            ExportNode = exportNode;
            TableNode = tableNode;
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {
            ChildNodes.Add(ExportNode);

            var scrollableTableContainer = new ComplexNode();
            scrollableTableContainer.Classes.Add("table-responsive");

            scrollableTableContainer.ChildNodes.Add(TableNode);

            ChildNodes.Add(scrollableTableContainer);
            base.WriteInner(writer);
        }

        //protected virtual void AddTable(ComplexNode container)
        //{
        //    container.ChildNodes.Add(new GuideTableMeasurementNode(Data));
        //}
    }
}