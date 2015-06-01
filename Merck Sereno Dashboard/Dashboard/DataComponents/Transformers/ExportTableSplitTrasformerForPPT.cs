using System.Collections.Generic;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class ExportTableSplitTrasformerForPpt : ITransformer<ExportModel, ExportModel>
    {
        public ExportModel Input { set; private get; }
        public int DataRowsInEachSlide = 20;

        public ExportModel GetData()
        {
            Input.PptTables = new List<XTable>();
            var splittedTable = new XTable() { Rows = new List<XRow>()};
            if (Input.DataTable.Rows != null && Input.DataTable.Rows.Count>0)
                splittedTable.Rows.Add(Input.DataTable.Rows[0]);

            for (int i = 1; Input.DataTable.Rows!=null && i < Input.DataTable.Rows.Count; i++)
            {
                splittedTable.Rows.Add(Input.DataTable.Rows[i]);
                if (i % DataRowsInEachSlide == 0)
                {
                    Input.PptTables.Add(splittedTable);
                    splittedTable = new XTable() { Rows = new List<XRow>() { } };
                    splittedTable.Rows.Add(Input.DataTable.Rows[0]);
                }
            }
            if (splittedTable.Rows.Count >0)
            {
                Input.PptTables.Add(splittedTable);
            }
           
            return Input;
        }
    }
}
