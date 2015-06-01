using Aspose.Cells;
using Aspose.Slides.Pptx;
using Dashboard.Export;
using Dashboard.ViewModels;
using ExportFramework;
using ExportFramework.Common;
using ExportFramework.Excel;
using ExportFramework.Powerpoint;

namespace Dashboard.Controllers.Exports
{
    public class RbWidgetUserAdminExportBaseController<TCon, TData> : WidgetExportBaseController<TCon, TData>
    {
        public byte[] GetData(string widgetName, string exportType, string authToken)
        {
            return GetWidgetData(widgetName, exportType, authToken);
        }
    }
    public class UserAdminExportController : RbWidgetUserAdminExportBaseController<string, XTable>
    {
        private const int StartRow = 7;

        [ExportType("xlsx")]
        public byte[] ExcelExportRaw()
        {
            var workbook = GetExcelWorkbook();
            return workbook.GetExcelData();
        }        

        public Workbook GetExcelWorkbook()
        {
            var path = Server.MapPath(@"~\Content\ExportTemplate\UserManagement.xlsx");       
            var workbook = ExportHelper.GetWorkbook(path);
            var sheet = workbook.Worksheets["Sheet1"];
            sheet.Name = "UserManagement";

            if (Data.Rows.Count > 0)
            {
                sheet.WriteTable(Data, "C7");
                sheet.DeleteRows(StartRow + Data.Rows.Count, 1100);
            }

            //sheet.Cells.MemorySetting = MemorySetting.MemoryPreference;           

            return workbook;
        }
    }
}