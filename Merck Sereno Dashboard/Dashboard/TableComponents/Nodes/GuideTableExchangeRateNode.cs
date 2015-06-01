using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableExchangeRateNode : GuideTableNodeBase
    {
        public GuideTableExchangeRateNode(string xml)
            : base(xml)
        {

            Classes.Add("exchange-rate");
            Attributes.Add("cellspacing", "0");
            Attributes.Add("cellpadding", "0");

        }

        protected override TableRowContainter GetHeader(XElement columns)
        {
            var header = new TableRowContainter("thead");

            var row = new TableRow();
            for (int i = 0; i < columns.Elements("col").Count(); i++)
            {
                var column = columns.Elements("col").ElementAt(i);
                var cell = new GuideHeaderCellCenterGrayFactory("th", column.Attribute("col_name").Value, i);
                row.Cells.Add(cell);
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
                var cell = new GuideBodyLeftBlueTextCellFactory("td", column.Value, columnPosition);
                tableRow.ChildNodes.Add(cell);

                columnPosition++;
            }
        }


    }
}