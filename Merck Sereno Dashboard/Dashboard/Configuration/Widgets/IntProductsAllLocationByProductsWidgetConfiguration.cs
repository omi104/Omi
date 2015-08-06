using DashboardFramework.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.DashboardComponent.Components;
using Dashboard.Models.Data;
using Dashboard.DataComponents.Transformers;
using Dashboard.DataComponents.DataSources;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using DashboardFramework;
using Dashboard.Controllers.Exports;

namespace Dashboard.Configuration.Widgets
{
    public class IntProductsAllLocationByProductsWidgetConfiguration:WidgetConfiguration<SingleTableModel, object>
    {


        public IntProductsAllLocationByProductsWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("").HasController<ExpandCollapseTableWidgetController>();
            View.DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                .Transform().By<IntProductsAllLocationByProductsTransformer>()
                //.HasProperty(t => t._Measure).WithValue(p => p["@@Measure_text"])
                .HasProperty(t => t._Measure).WithValue(p => p["@@UnitOrValue_text"])
                .HasProperty(t => t._IsThousand).WithValue(p => p[ParameterList.AbsoluteThousandFilter] == "Thousand")
                .HasProperty(t=>t.CompanyOrBrandHeader).WithValue(GetHeader);
            HasParameterDependency.On(widgetItem.HasParamDependency);

            Export.HasController<ExpandCollapseTableExportController>().HasConfig("Categories-SixColumns")
                .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                .Transform().By<IndicatorImageExcelTransformer>()
                .Transform().By<CubeDataToXTableExpandCollapseTableTransformer>()
                .HasProperty(t => t.NameColumnValue).WithValue(GetHeader)
                .HasProperty(t => t.MeasureText).WithValue(p => p[ParameterList.TypeOfMeasure])
                .Transform().By<ExportModelTransformer>()
                .HasProperty(t => t.NavigationNameString).WithValue(p => p.CurrentNavigationLabel())
                  .HasProperty(t => t.RegionOrCluster).WithValue(p => p["@@" + ParameterList.RegionOrCluster + "_text"])
                  .HasProperty(t => t.Country).WithValue(p => p["@@" + ParameterList.Country + "_text"])
                  .HasProperty(t => t.Segment).WithValue(p => p["@@" + ParameterList.Segment + "_text"])
                //.HasProperty(t => t.Forms).WithValue(p => p["@@" + ParameterList.Form + "_text"])
                  .HasProperty(t => t.UnitValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                  .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                  .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                 .Transform().By<ExportTableSplitTrasformerForPpt>();
        }



        private string GetHeader(IReadOnlyDictionary<string, string> param)
        {
            //if (param.CurrentNavigationName() == NavigationItems.NavIntlProdAllLocByIntlProd().Name)
            //    return "Category/Region";
            return "Category/Region";
        }
    }
    
}