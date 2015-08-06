using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class ExpandCollapseTableWidgetConfiguration : WidgetConfiguration<SingleTableModel, object>
    {
        public ExpandCollapseTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("").HasController<ExpandCollapseTableWidgetController>();
            View.DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                .Transform().By<ExpandCollapseTableTransformer>()
                .HasProperty(t => t.NavigationName).WithValue(p => p[ParameterList.NavigationName])
                //.HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
                .HasProperty(t => t.NameColumnValue).WithValue(GetNameColumnText(widgetItem));
                //.HasProperty(t => t._IsThousand).WithValue(p => p[ParameterList.AbsoluteThousandFilter] == "Thousand")
               // .HasProperty(t => t._IsMoleculeAtAGlance).WithValue(p => p.CurrentNavigationName() == NavigationItems.NavMoleculeAllLocationsAtGlance().Name)
                //.HasProperty(t => t._IsBrandAtAGlance).WithValue(p => p.CurrentNavigationName() == NavigationItems.NavBrandsAllLocationsAtGlance().Name)
                //.HasProperty(t => t._IsSubbrandAtAGlance).WithValue(p => p.CurrentNavigationName() == NavigationItems.NavSubBrandsAllLocationsAtGlance().Name)
               // .HasProperty(t => t.ShowFullLength).WithValue(widgetItem.Name == WidgetItems.SubBrandExpCollapseTableWidget().Name || widgetItem.Name == WidgetItems.SKUExpCollapseTableWidget().Name || widgetItem.Name == WidgetItems.MoleculesExpCollapseTableWidget().Name);


            Export.HasController<ExpandCollapseTableExportController>().HasConfig(widgetItem.Name + " - At a Glance")
                .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                .Transform().By<IndicatorImageExcelTransformer>()
                .Transform().By<CubeDataToXTableExpandCollapseTableTransformer>()
                .HasProperty(t => t.NameColumnValue).WithValue(GetNameColumnText(widgetItem))
                //.HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
                .Transform().By<ExportModelTransformer>()

                .HasProperty(t => t.NavigationNameString).WithValue(p => p.CurrentNavigationLabel())
                  .HasProperty(t => t.RegionOrCluster).WithValue(p =>p["@@"+ParameterList.RegionOrCluster+"_text"])
                  .HasProperty(t => t.Country).WithValue(p => p["@@"+ParameterList.Country+"_text"])
                  .HasProperty(t => t.Segment).WithValue(p => p["@@" + ParameterList.Segment + "_text"])
                  //.HasProperty(t => t.Forms).WithValue(p => p["@@" + ParameterList.Form + "_text"])
                  .HasProperty(t => t.UnitValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                  .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                  .HasProperty(t => t.EndDate).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                  .Transform().By<ExportTableSplitTrasformerForPpt>();


                //.HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
                //.HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
                // .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@Period_text"])
                // .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
                // .HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
                // .HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
                // .HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
                // .HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
                // .HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"]);
                 //.Transform().By<ExportTableSplitTrasformerForPpt>();

            HasParameterDependency.On(widgetItem.HasParamDependency);
        }

        private string GetNameColumnText(WidgetItem widgetItem)
        {
            if (widgetItem.Name == WidgetItems.CompanyExpCollapseTableWidget().Name)
                return "Company";
            if (widgetItem.Name == WidgetItems.IntlProductsAllLocByProdExpCollapseWidget().Name || widgetItem.Name == WidgetItems.IntlProductsAllProdByLocExpCollapseWidget().Name)
                return "Intl Product";
            if (widgetItem.Name == WidgetItems.ProductsAllLocByProdExpCollapseWidget().Name || widgetItem.Name == WidgetItems.ProductsAllProdByLocExpCollapseWidget().Name)
                return "Product";
            
            return "Name";
        }
    }
}