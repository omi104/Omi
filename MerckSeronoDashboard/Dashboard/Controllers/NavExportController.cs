using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.Export;
using DashboardFramework.Web;
using ExportFramework;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;


namespace Dashboard.Controllers
{
    public class NavExportController : NavigationExportBaseController
    {
        protected override byte[] MergeExportData(IEnumerable<byte[]> widgetDataList, string extension)
        {
            if (extension.Equals("xlsx", StringComparison.OrdinalIgnoreCase))
                return ExportHelper.MergeWorkbooks(widgetDataList).GetExcelData();
            if (extension.Equals("pptx", StringComparison.OrdinalIgnoreCase))
                return ExportHelper.MergePowerpoints(widgetDataList).GetPowerpointData();
            if (extension.Equals("pdf", StringComparison.OrdinalIgnoreCase))
                return ExportHelper.MergePowerpoints(widgetDataList).GetPdfData();


            return null;
        }

        protected override string GetFileNameWithoutExtension()
        {
            return (string)DashboardContext.Current
                    .DashboardInstance.CurrentNavigation
                    .ExtendedProperties["ExportFileName"];

        }



    }
}
