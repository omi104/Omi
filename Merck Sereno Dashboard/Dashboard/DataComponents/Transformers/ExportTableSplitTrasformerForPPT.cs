using System.Collections.Generic;
using System.Linq;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportTableSplitTrasformerForPpt : ITransformer<ExportModel, ExportModel>
    {
        public ExportModel Input { set; private get; }
        public int DataRowsInEachSlide = 20;
        public string KPI { get; set; }

        public ExportModel GetData()
        {
            Input.PptTables = new List<XTable>();
            var splittedTable1 = new XTable() { Rows = new List<XRow>()};
            var splittedTable2 = new XTable() { Rows = new List<XRow>()};
            var splittedTable3 = new XTable() { Rows = new List<XRow>()};

            for (int r=0; r<Input.DataTable.Rows.Count; r++)
            {
                var row1 = new XRow {Cells = new List<XCell>()};
                var row2 = new XRow { Cells = new List<XCell>() };
                var row3 = new XRow { Cells = new List<XCell>() };
                for (int c = 0; KPI.ToUpper() == "SALES" ? c < 2 : c < 3; c++)
                {
                    row1.Cells.Add(Input.DataTable.Rows[r].Cells[c]);
                    row2.Cells.Add(Input.DataTable.Rows[r].Cells[c]);
                    row3.Cells.Add(Input.DataTable.Rows[r].Cells[c]);
                }
                splittedTable1.Rows.Add(row1);
                splittedTable2.Rows.Add(row2);
                splittedTable3.Rows.Add(row3);
            }

            int cell = KPI.ToUpper() == "SALES" ? 2 : 3;
            for (int r = 0; r < Input.DataTable.Rows.Count; r++)
            {
                cell = KPI.ToUpper() == "SALES" ? 2 : 3;
                for (; cell<Input.DataTable.Rows[0].Cells.Count && KPI.ToUpper() == "SALES" ? cell < 15 : cell < 16; cell++)
                {
                    splittedTable1.Rows[r].Cells.Add(Input.DataTable.Rows[r].Cells[cell]);
                }
                cell--;
                for (; cell < Input.DataTable.Rows[0].Cells.Count && KPI.ToUpper() == "SALES" ? cell < 27 : cell < 28; cell++)
                {
                    splittedTable2.Rows[r].Cells.Add(Input.DataTable.Rows[r].Cells[cell]);
                }
                cell--;
                for (; cell < Input.DataTable.Rows[0].Cells.Count; cell++)
                {
                    splittedTable3.Rows[r].Cells.Add(Input.DataTable.Rows[r].Cells[cell]);
                }
            }
            
            if (splittedTable1.Rows[0].Cells.Count > 3)
            {
                Input.PptTables.Add(splittedTable1);
            }
            if (splittedTable2.Rows[0].Cells.Count > 3)
            {
                Input.PptTables.Add(splittedTable2);
            }
            if (splittedTable3.Rows[0].Cells.Count > 3)
            {
                Input.PptTables.Add(splittedTable3);
            }
            return Input;
        }
    }
}
