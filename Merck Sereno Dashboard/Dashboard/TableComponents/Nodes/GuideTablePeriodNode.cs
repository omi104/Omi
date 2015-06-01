using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTablePeriodNode : GuideTableNodeBase
    {
        public GuideTablePeriodNode(string xml)
            : base(xml)
        {

            Classes.Add("period");
            Attributes.Add("cellspacing", "0");
            Attributes.Add("cellpadding", "0");

        }

        protected override TableRowContainter GetHeader(XElement columns)
        {
            var header = new TableRowContainter("thead");

            var row = new TableRow();
            row.Classes.Add("header");
            int columnPosition = 0;
            for (int i = 0; i < columns.Elements("col").Count(); i++)
            {
                var column = columns.Elements("col").ElementAt(i);
                var cell = new GuideHeaderCellCenterGrayFactory("th", column.Attribute("col_name").Value, columnPosition);
                row.Cells.Add(cell);
                columnPosition++;
            }
            header.Rows.Add(row);
            return header;
        }

        protected override void GenerateColumn(XElement row, ComplexNode tableRow)
        {
            int columnPosition = 0;
            for (int i = 0; i < row.Elements("col").Count(); i++)
            {
                var column = row.Elements("col").ElementAt(i);
                if (i == 0)
                {
                    var cell = new GuideBodyCellLeftGrayFactory("td", column.Value, columnPosition);
                    tableRow.ChildNodes.Add(cell);

                }
                else
                {
                    var cell = new GuideBodyLeftBlueTextCellFactory("td", column.Value, columnPosition);
                    tableRow.ChildNodes.Add(cell);
                }

                columnPosition++;
            }
        }


    }
}