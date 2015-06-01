using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableGenericBaseNode<TData, TRowData> : ComplexNode, IGuideTableNodeBase<TData, TRowData>
    {
        public TData Input { get; private set; }

        public GuideTableGenericBaseNode(TData data)
            : base("table")
        {
            Input = data;
        }

        protected virtual TableRowContainter GetHeader(TRowData columns)
        {
            throw new ArgumentException("Header mapping should be in inherited class");
        }

        protected virtual void GenerateColumn(TRowData row, ComplexNode tableRow)
        {
            ;
        }

        protected virtual void CreateSingleRow(TRowData row, ComplexNode tbody)
        {
            var tableRow = new ComplexNode("tr");

            GenerateColumn(row, tableRow);

            tbody.ChildNodes.Add(tableRow);
        }
    }
}