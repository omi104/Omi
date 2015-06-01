using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableWithEntityBaseNode<TData, TRowData> : GuideTableGenericBaseNode<List<TRowData>, TRowData>
    {
        public GuideTableWithEntityBaseNode(List<TRowData> data)
            : base(data)
        {

        }

        protected override void CreateSingleRow(TRowData row, ComplexNode tbody)
        {
            var tableRow = new ComplexNode("tr");

            GenerateColumn(row, tableRow);

            tbody.ChildNodes.Add(tableRow);
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {

            var tBody = new ComplexNode("tbody");

            foreach (var rowData in Input)
            {
                CreateSingleRow(rowData, tBody);
            }

            ChildNodes.Add(GetHeader(Input.First()));
            ChildNodes.Add(tBody);

            base.WriteInner(writer);
        }
    }
}