using CubeFramework;
using DashboardFramework.DataComponent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.DataComponents.Transformers
{
    public class IndicatorImageExcelTransformer : ITransformer<CubeData, CubeData>
    {
        private List<int> ColumnIndexes = new List<int>();
        public CubeData GetData()
        {
            foreach (var col in Input.Columns)
            {
                if (col.Name.ToUpper().Contains("ARROW"))
                    ColumnIndexes.Add(col.Position);
            }
            foreach (var row in Input.Rows)
            {
                foreach (var col in ColumnIndexes)
                    row.Values[col] = GetIndicatorSignalEquivalent(row.Values[col]);
            }
            return Input;
        }

        public string GetIndicatorSignalEquivalent(string signalColor)
        {
            if (signalColor.ToUpper() == "RED")
                return "-1";
            if (signalColor.ToUpper() == "GREEN")
                return "1";
            return "0";
        }

        public CubeData Input { set; private get; }
    }
}