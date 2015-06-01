using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableTimePeriodMappingNode : GuideTableNodeBase
    {
        public GuideTableTimePeriodMappingNode(string xml)
            : base(xml)
        {

            Classes.Add("time-period-mapping");
            Attributes.Add("cellspacing", "0");
            Attributes.Add("cellpadding", "0");

        }

        protected override TableRowContainter GetHeader(XElement columns)
        {
            var header = new TableRowContainter("thead");

            var row1 = new TableRow();
            row1.Classes.Add("header header-1");
            var cell = new GuideHeaderCellCenterGrayFactory("th", "Nielsen Mapping Time Periods (444 Weeks)", 0, 3);
            row1.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "IRI Mapping Time Periods (445)", 1, 3);
            row1.Cells.Add(cell);
            header.Rows.Add(row1);

            var row2 = new TableRow();
            row2.Classes.Add("header header-2");
            cell = new GuideHeaderCellCenterGrayFactory("th", "Dec 10 reporting", 0, 3);
            row2.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Dec 10 reporting", 1, 3);
            row2.Cells.Add(cell);
            header.Rows.Add(row2);

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