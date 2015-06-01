using System;
using Component.Table;
using CubeFramework;

namespace Dashboard.TableComponents.RowFunctionalities
{
    public class HoverValueAddRowFunctionality : IRowFunctionality<Row>
    {
        public int CompanyTextColIndex { get; set; }
        public int CompanyValueColIndex { get; set; }
        private bool _IsLowerTable;

        public HoverValueAddRowFunctionality(bool IsLowerTable)
        {
            _IsLowerTable = IsLowerTable;
        }
        public void Apply(Row rowData, TableRow row)
        {
            if (_IsLowerTable)
            {
                var val = rowData.Values[CompanyValueColIndex];
                var text = rowData.Values[CompanyTextColIndex];
                row.Attributes.Add("company", val);
                text = text.Replace('/', '0').Replace('.', '_');
                row.Attributes.Add("companyText", text);
            }
        }
    }
}
