using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Component.Node;
using Component.Table;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableCoverageNode : GuideTableNodeBase
    {
        public GuideTableCoverageNode(string xml)
            : base(xml)
        {

            Classes.Add("coverage");
            Attributes.Add("cellspacing", "0");
            Attributes.Add("cellpadding", "0");
            Attributes.Add("id", "MeasurementsTable");

        }

        protected override TableRowContainter GetHeader(XElement columns)
        {
            var header = new TableRowContainter("thead");

            var row = new TableRow();
            row.Classes.Add("header");
            int columnPosition = 0;
            for (int i = 0; i < columns.Elements("col").Count() - 1; i++)
            {
                var column = columns.Elements("col").ElementAt(i);
                if (i == 1)
                {
                    var text = columns.Elements("col").ElementAt(1).Attribute("col_name").Value;
                    if (string.IsNullOrEmpty(text))
                    {
                        text = columns.Elements("col").ElementAt(0).Attribute("col_name").Value;
                    }
                    var cell = new GuideHeaderCellCenterGrayFactory("th", text, columnPosition);
                    row.Cells.Add(cell);
                    columnPosition++;
                }
                else if (i >= 2 && i <= 6)
                {
                    var cell = new GuideHeaderCellCenterGrayFactory("th", column.Attribute("col_name").Value, columnPosition);
                    row.Cells.Add(cell);
                    columnPosition++;
                }
                else if (i >= 7)
                {
                    var cell = new GuideHeaderCellImageTextFactory("th", column.Attribute("col_name").Value, columnPosition);
                    row.Cells.Add(cell);
                    columnPosition++;
                }
            }
            header.Rows.Add(row);
            return header;
        }

        protected override void GenerateColumn(XElement row, ComplexNode tableRow)
        {
            int columnPosition = 0;
            for (int i = 0; i < row.Elements("col").Count() - 1; i++)
            {
                var column = row.Elements("col").ElementAt(i);
                if (i == 1)
                {
                    var geoParent = row.Elements("col").ElementAt(i - 1);

                    var countryClass = string.Empty;

                    var text = row.Elements("col").ElementAt(i).Value;
                    if (string.IsNullOrEmpty(text))
                    {
                        countryClass = " cluster";
                    }
                    else
                    {
                        countryClass = " country";
                    }

                    var cell = new GuideBodyCellLeftGrayCountryFactory("td", column.Value, geoParent.Value, columnPosition + countryClass);
                    tableRow.ChildNodes.Add(cell);
                    columnPosition++;
                }
                if (i == 5)
                {
                    var cell = new GuideBodyCellCrossBgGrayTextFactory("td", column.Value, columnPosition);
                    tableRow.ChildNodes.Add(cell);
                    columnPosition++;
                }
                else if (i == 2 || i == 3 || i == 4 || i == 5 || i == 6)
                {
                    var cell = new GuideBodyCellLeftGrayFactory("td", column.Value, columnPosition);
                    tableRow.ChildNodes.Add(cell);
                    columnPosition++;
                }
                else if (i >= 7)
                {
                    var cell = new GuideBodyCellCrossTextFactory("td", column.Value, columnPosition);
                    tableRow.ChildNodes.Add(cell);
                    columnPosition++;
                }
            }
        }


    }
}