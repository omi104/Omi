using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.Common
{
    public static class Constants
    {
        public const string RbGeo = "[Geo].[Hierarchy].[MARKET].&[TOTAL ENA]";
        public const string RbMarketFilterParent = "[Market].[Hierarchy].[All]";
        public const string RbCategoryFilter = "[Market].[Hierarchy].[All]";
       // public const string RbChannel = "[Channel].[Channel].&[COMBINED]";
        public const string RbChannel = "[Channel].[Channel].[All]";
        public const string RbPeriod = "[Period].[Hierarchy].[Period].&[MTH01]";

        public const string ExportFileName = "ExportFileName";
        public const string LoggedInUser = "LoggedInUser";
    }
}