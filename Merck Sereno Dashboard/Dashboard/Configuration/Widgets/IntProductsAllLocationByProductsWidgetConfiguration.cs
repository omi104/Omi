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
                .HasProperty(t => t._IsThousand).WithValue(true)
                .HasProperty(t=>t.CompanyOrBrandHeader).WithValue(GetHeader);
            HasParameterDependency.On(widgetItem.HasParamDependency);

            //Export.HasController<ExpandCollapseTableExportController>().HasConfig("Categories-FourColumns")
            //    .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
            //    .Transform().By<IndicatorImageExcelTransformer>()
            //    .Transform().By<CubeDataToXTableExpandCollapseTableTransformer>()
            //    .HasProperty(t => t.NameColumnValue).WithValue(GetHeader)
            //    .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
            //    .Transform().By<ExportModelTransformer>()
            //    .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
            //    .HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
            //     .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@Period_text"])
            //     .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
            //     .HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
            //     .HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
            //     .HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
            //     .HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
            //     .HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"])
            //     .Transform().By<ExportTableSplitTrasformerForPpt>();
        }



        private string GetHeader(IReadOnlyDictionary<string, string> param)
        {
            //if (param.CurrentNavigationName() == NavigationItems.NavIntlProdAllLocByIntlProd().Name)
            //    return "Category/Region";
            return "Category/Region";
        }
    }
    
}