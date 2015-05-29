using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Configuration
{
    public static partial class FixedData
    {
        public static class Other
        {
            public const string WidgetNamePrefix = "Widget";
            public const string WidgetPrefixBottom = "Bottom";

            public const string CurrentQuarter = "Current Quarter";
            public const string CurrentMonth = "Current Month";
            public const string RqtrText = "Last 3 Months";
            public const string MatText = "Last 12 Months";
            public const string YtdText = "Year To Date";
            public const string QtrText = "Last 4 Quarters";

            public const string Rqtr = "RQT";
            public const string Mat = "MAT";
            public const string Ytd = "YTD";
            public const string Mth = "MTH";
            public const string Qtr = "QTR";

            public const string MeasureTypeSales = "sales";
            public const string MeasureTypeSalesLabel = "Sales";

            public const string MeasureTypeMarketShare = "market-share";
            public const string MeasureTypeMarketShareLabel = "Market Share";

            public const string ExportPrefix = "Export";
            public const string LatestDataPlaceHolder = "divLatestPeriod";

            public const string LatestDataShowHide = "divLatestShowHide";

            public const string ScriptPrefix = "ScriptWidget";
            public const string LoggedInUser = "LoggedInUser";

            public const string RankColumnNullValue = "-1";
        }
    }
}