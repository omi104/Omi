using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableNodeBase : ComplexNode
    {
        public XElement Input { get; private set; }
        public string Class { get; set; }


        public GuideTableNodeBase(string xml)
            : base("table")
        {
            Input = XElement.Parse(xml);
        }

        protected virtual TableRowContainter GetHeader(XElement columns)
        {
            throw new ArgumentException("Header mapping should be in inherited class");
        }

        protected virtual void GenerateColumn(XElement row, ComplexNode tableRow)
        {
            ;
        }

        protected virtual void CreateSingleRow(XElement row, ComplexNode tbody)
        {
            var tableRow = new ComplexNode("tr");

            GenerateColumn(row, tableRow);

            tbody.ChildNodes.Add(tableRow);
        }

        protected override void WriteInner(System.Xml.XmlWriter writer)
        {

            var tBody = new ComplexNode("tbody");

            foreach (var r in Input.Elements("row"))
            {
                CreateSingleRow(r, tBody);
            }

            ChildNodes.Add(GetHeader(Input.Element("row")));
            ChildNodes.Add(tBody);

            Classes.Add(Class);

            base.WriteInner(writer);
        }
    }
}