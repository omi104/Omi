using System.Collections.Generic;
using Dashboard.Configuration;

namespace Dashboard.DataComponents.DataSources
{
    public class TimePeriodDataSource : FixedDataSource
    {
        public Dictionary<string, string> GetData()
        {
            return new Dictionary<string, string>()
                {
                    {"[Period].[PeriodTypeName].&[Monthly]","MTH"},
                    {"[Period].[PeriodTypeName].&[Quarterly]","QTR"},
                    {"[Period].[PeriodTypeName].&[Year To Date]","YTD"},
                    {"[Period].[PeriodTypeName].&[Moving Annual Total]","MAT"},
                };
        }
    }
}