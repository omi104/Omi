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
                    {"MTH","Month"},
                    {"QTR","QTR"},
                    {"YTD","YTD"},
                    {"MAT","MAT"},
                };
        }
    }
}