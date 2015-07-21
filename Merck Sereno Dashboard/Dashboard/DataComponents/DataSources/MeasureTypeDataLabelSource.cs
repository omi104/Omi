using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;

namespace Dashboard.DataComponents.DataSources
{
    public class MeasureTypeDataLabelSource : FixedDataSource
    {
        public Dictionary<string, string> GetData()
        {
            return new Dictionary<string, string>()
                {
                    {MeasureType.Sales,"Sales"},
                    {MeasureType.MarketShare,"Market Share"},
                };
        }
    }
}