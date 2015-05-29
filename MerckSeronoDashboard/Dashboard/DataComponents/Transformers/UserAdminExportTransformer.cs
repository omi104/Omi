using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class UserAdminExportTransformer : ITransformer<List<UserViewModel>, XTable>
    {
        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };
            table.Rows.Add(GetHeader());
            GetBodyRow(table);
            return table;
        }

        public XRow GetHeader()
        {
            var headerRow = new XRow() { Cells = new List<XCell>() };
            headerRow.Cells.Add(new XCell() { Data = "User ID" });
            headerRow.Cells.Add(new XCell() { Data = "First Name" });
            headerRow.Cells.Add(new XCell() { Data = "Last Name" });
            headerRow.Cells.Add(new XCell() { Data = "Position" });
            headerRow.Cells.Add(new XCell() { Data = "Email" });
            headerRow.Cells.Add(new XCell() { Data = "Role" });
            headerRow.Cells.Add(new XCell() { Data = "Geo" });
            headerRow.Cells.Add(new XCell() { Data = "Org" });
            headerRow.Cells.Add(new XCell() { Data = "Email Alert" });
            return headerRow;
        }

        public void GetBodyRow(XTable table)
        {
            if (Input != null && Input.Any())
            {
                XRow bodyRow;
                foreach (var item in Input)
                {
                    bodyRow = new XRow() { Cells = new List<XCell>() };
                    bodyRow.Cells.Add(new XCell() { Data = item.UserName });
                    bodyRow.Cells.Add(new XCell() { Data = item.FirstName });
                    bodyRow.Cells.Add(new XCell() { Data = item.LastName });
                    bodyRow.Cells.Add(new XCell() { Data = item.Position });
                    bodyRow.Cells.Add(new XCell() { Data = item.Email });
                    bodyRow.Cells.Add(new XCell() { Data = item.Role });
                    bodyRow.Cells.Add(new XCell() { Data = item.GeoCode });
                    bodyRow.Cells.Add(new XCell() { Data = item.Org});
                    bodyRow.Cells.Add(new XCell() { Data = item.ReceiveEmailAlert });
                    table.Rows.Add(bodyRow);
                }
            }
        }

        public List<UserViewModel> Input { set; private get; }
    }
}