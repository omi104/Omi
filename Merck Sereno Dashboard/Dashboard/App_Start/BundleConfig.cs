using System.Web.Optimization;

namespace Dashboard.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-1.11.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                       "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            "~/Scripts/jquery.unobtrusive*",
            "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/layout").Include(
                //"~/Scripts/jquery-ui.js",
                "~/Scripts/modernizr.custom.js",
                "~/Scripts/jRespond.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/RBCommandCenter.js",
                "~/Scripts/rb-helper.js",
                "~/Scripts/jquery-migrate-1.2.1.min.js",
                "~/Scripts/DataTables-1.10.4/jquery.dataTables.js",
                "~/Scripts/DataTables-1.10.4/dataTables.fixedColumns.js",
                "~/Scripts/DataTables-1.10.4/dataTables.fixedHeader.js",
                "~/Scripts/jquery.bgiframe.js",
                "~/Scripts/LoadRadio.js",
                "~/Scripts/Favourite.js",
                "~/Scripts/SelectRadioValue.js",
                "~/Scripts/RadioFilterOperation.js",
                "~/Scripts/ExpandCollapseTable.js",
                "~/Scripts/ExpandCollapseTableForCS.js",
                "~/Scripts/Plugin/jquery.cleditor.js",
                "~/Scripts/SnapshotOperation.js",
                "~/Scripts/Plugin/jquery.cleditor.min.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/project_js").Include(
                "~/Scripts/fastclick.js",
                "~/Scripts/jquery.appStart.js",
                "~/Scripts/app.js"
                ));
            bundles.Add(new ScriptBundle("~/bundles/dataTable").
               Include("~/Scripts/DataTables-1.10.4/jquery.dataTables.min.js").
               Include("~/Scripts/DataTables-1.10.4/dataTables.bootstrap.js").
               Include("~/Scripts/DataTables-1.10.4/dataTables.tableTools.min.js")
               );
            bundles.Add(new ScriptBundle("~/bundles/chartjs")
                .Include("~/Scripts/Chart/FusionCharts.js")
                .Include("~/Scripts/Chart/FusionCharts.HC.js")
                .Include("~/Scripts/Chart/FusionCharts.HC.Maps.js")
                .Include("~/Scripts/Chart/FusionMaps.js")
                .Include("~/Scripts/Chart/IMSChart.js")
                .Include("~/Scripts/MonthPicker.js")
                .Include("~/Scripts/column-fridge.js")
                .Include("~/Scripts/TableBuilder.js")
             );

            bundles.Add(new ScriptBundle("~/bundles/customFilters").Include(
               "~/Scripts/CustomFilters/*.js"
               ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/override-bootstrap.css",
                 "~/Content/font-awesome/css/font-awesome.css",
                 "~/Content/main.css",
                 "~/Content/login.css",
                  "~/Content/plugins.css",
                  "~/Content/layout.css"
                 ));

            bundles.Add(new StyleBundle("~/Content/dashboardCss").Include(
                 "~/Content/Dashboard/*.css"
                 ));
            bundles.Add(new StyleBundle("~/Content/themeCss").Include(
                "~/Content/themes/base/*.css"
                ));
            bundles.Add(new StyleBundle("~/Content/dataTable").Include(
                "~/Content/DataTables-1.10.4/css/jquery.dataTables.min.css",
                 "~/Content/DataTables-1.10.4/css/dataTables.bootstrap.css",
                 "~/Content/DataTables-1.10.4/css/dataTables.responsive.css",
                 "~/Content/Plugin/custom.dataTables.css"
                 ));
        }
    }
}
