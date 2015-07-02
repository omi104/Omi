using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;
using ExportFramework.Common;

namespace Dashboard.DataComponents.Transformers
{
    public class CubeDataToXTableHomeTopRankingTransformer : ITransformer<CubeData, XTable>
    {
        public XTable GetData()
        {
            var table = new XTable() { Rows = new List<XRow>() };

            foreach (var r in Input.Rows)
            {
                var row = new XRow() { Cells = new List<XCell>() };
                foreach (string t in r.Values)
                {
                    row.Cells.Add(new XCell() { Data = t });
                }
                table.Rows.Add(row);
            }
            return table;
        }

        public CubeData Input { set; private get; }
    }
}