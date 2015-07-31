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
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class SnapshotBottomTableWidgetConfiguration : WidgetConfiguration<HierarchyTableConfig, object>
    {
        public SnapshotBottomTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            HasTitle(widgetItem.Name);

            View.HasController<SnapshotTableWidgetController>();
            View.HasConfig(p => p);

            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<SnapshotTableTransformer>()
                .HasProperty(t => t.IsLowerTable).WithValue(true)
                .HasProperty(t => t.NameColumHeaderText).WithValue(GetHeaderText)
                .HasProperty(t => t.ShowFullLength).WithValue(true)
                .HasProperty(t => t.MeasureValue).WithValue(p => p["@@UnitOrValue_text"])
                .HasProperty(t => t.AbsoluteTousandValue).WithValue(p => p["absoluteThousandConversion"]);
            
                //.HasProperty(t => t.ShowFullLength).WithValue(widgetItem.Name == WidgetItems.BottomSubBrandSnapshotTable().Name || widgetItem.Name == WidgetItems.BottomSKUSnapshotTable().Name);

            //Export.HasController<SnapshotBottomTableExportController>()
            //      .DataFlow.AddSource<CubeDataSourceBase>()
            //      .WithModule(widgetItem.ViewId)
            //      .Transform().By<CubeDataToXTableSnapshotTransformer>()
            //      .HasProperty(t => t.IsTopTable).WithValue(false)
            //      .HasProperty(t => t.AbsoluteThousandValue).WithValue(p => p["absoluteThousandConversion"])
            //      .Transform().By<ExportSnapshotModelTransformer>()
            //      .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
            //      .HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
            //     .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@Period_text"])
            //     .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
            //     .HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
            //     .HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
            //     .HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
            //     .HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
            //     .HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"]);
            HasParameterDependency.On(widgetItem.HasParamDependency);
        }

        private string GetHeaderText(IReadOnlyDictionary<string, string> param)
        {
            if (param.CurrentNavigationName() == NavigationItems.NavProductsSnapshot().Name)
                return "Product";
            if (param.CurrentNavigationName() == NavigationItems.NavCompaniesSnapshot().Name)
                return "Company";
            
            return "Name";
        }
    }
}