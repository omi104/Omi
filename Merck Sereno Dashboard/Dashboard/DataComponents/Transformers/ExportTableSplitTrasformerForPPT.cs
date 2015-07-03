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

            for (int j=0; j<Input.DataTable.Rows.Count; j++)
            {
                for (int i = 0; KPI.ToUpper() == "SALES" ? i < 2 : i < 3; i++)
                {
                    splittedTable1.Rows[j] = new XRow(){Cells = new List<XCell>()};
                    splittedTable1.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[i]);
                    splittedTable2.Rows[j] = new XRow() { Cells = new List<XCell>() };
                    splittedTable2.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[i]);
                    splittedTable3.Rows[j] = new XRow() { Cells = new List<XCell>() };
                    splittedTable3.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[i]);
                }
            }

            int k = KPI.ToUpper() == "SALES" ? 3 : 4;
            for (int j = 0; j < Input.DataTable.Rows.Count; j++)
            {
                for (; k<Input.DataTable.Rows[0].Cells.Count && KPI.ToUpper() == "SALES" ? k < 15 : k < 16; k++)
                {
                    splittedTable1.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[k]);
                }
                for (; k < Input.DataTable.Rows[0].Cells.Count && KPI.ToUpper() == "SALES" ? k < 27 : k < 28; k++)
                {
                    splittedTable2.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[k]);
                }
                for (; k < Input.DataTable.Rows[0].Cells.Count && KPI.ToUpper() == "SALES" ? k < 39 : k < 40; k++)
                {
                    splittedTable3.Rows[j].Cells.Add(Input.DataTable.Rows[j].Cells[k]);
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
