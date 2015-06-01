using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;
using Component.Table;
using Dashboard.IdentityModel.Entity;
using Dashboard.ViewModels;

namespace Dashboard.TableComponents.Nodes
{
    public class GuideTableUserListNode : GuideTableWithEntityBaseNode<UserViewModel, UserViewModel>
    {
        public GuideTableUserListNode(List<UserViewModel> data)
            : base(data)
        {

            Classes.Add("table");
            Attributes.Add("cellspacing", "0");
            Attributes.Add("cellpadding", "0");

        }

        protected override TableRowContainter GetHeader(UserViewModel columns)
        {
            var header = new TableRowContainter("thead");

            var row = new TableRow();
            var cell = new GuideHeaderCellCenterGrayFactory("th", "First Name", 0);
            row.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Last Name", 0);
            row.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Position", 0);
            row.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Email", 0);
            row.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Org", 0);
            row.Cells.Add(cell);

            cell = new GuideHeaderCellCenterGrayFactory("th", "Geo", 0);
            row.Cells.Add(cell);
            header.Rows.Add(row);

            return header;
        }

        protected override void GenerateColumn(UserViewModel row, ComplexNode tableRow)
        {
            var cell = new GuideBodyLeftBlueTextCellFactory("td", row.FirstName, 0);
            tableRow.ChildNodes.Add(cell);

            cell = new GuideBodyLeftBlueTextCellFactory("td", row.LastName, 1);
            tableRow.ChildNodes.Add(cell);

            cell = new GuideBodyLeftBlueTextCellFactory("td", row.Position, 2);
            tableRow.ChildNodes.Add(cell);

            cell = new GuideBodyLeftBlueTextCellFactory("td", row.Email, 3);
            tableRow.ChildNodes.Add(cell);

            cell = new GuideBodyLeftBlueTextCellFactory("td", row.Org, 4);
            tableRow.ChildNodes.Add(cell);

            cell = new GuideBodyLeftBlueTextCellFactory("td", row.GeoCode, 5);
            tableRow.ChildNodes.Add(cell);


        }


    }
}