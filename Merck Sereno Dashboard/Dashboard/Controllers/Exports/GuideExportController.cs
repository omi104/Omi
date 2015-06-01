using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Aspose.Cells;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Export;
using Dashboard.Models.Config;
using ExportFramework;
using ExportFramework.Common;
using ExportFramework.Excel;

namespace Dashboard.Controllers.Exports
{
    public class RbWidgetGuideExportBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }

    public class GuideExportController : RbWidgetGuideExportBaseController<ExportConfig, XTable>
    {
        [ExportType("xlsx")]
        public byte[] ExcelExportRaw()
        {
            var workbook = GetWorkbookForUser();
            return workbook.GetExcelData();
        }

        private Workbook GetWorkbookForUser()
        {
            const int startRow = 7;
            var workbook = ExportHelper.GetWorkbook(Server.MapPath(@"~\Content\ExportTemplate\Guide-User.xlsx"));
            var guideExportUserDataSource = new UserAdminDataSource();
            var users = guideExportUserDataSource.GetData();
            var rbUsers = users.Where(x => x.Org != null && x.Org.ToLower() == "rb").ToList();
            var transformer = new UserEntityToExportTableTransformer();
            XTable table;
            var sheet = workbook.Worksheets["RB"];
            if (rbUsers.Any())
            {
                transformer.Input = rbUsers;
                table = transformer.GetData();
                sheet.WriteTable(table, "C7");
                sheet.DeleteRows(startRow + table.Rows.Count, 1100);
            }
            if (Config.IsImsUser)
            {
                var imsUsers = users.Where(x => x.Org != null && x.Org.ToLower() == "ims").ToList();
                transformer.Input = imsUsers;
                table = transformer.GetData();
                sheet = workbook.Worksheets["IMS"];
                sheet.WriteTable(table, "C7");
                sheet.DeleteRows(startRow + table.Rows.Count, 1100);
            }
            else
            {
                workbook.Worksheets.RemoveAt("IMS");
            }
            workbook.FileName = "RB Account Team";
            return workbook;
        }

    }
}