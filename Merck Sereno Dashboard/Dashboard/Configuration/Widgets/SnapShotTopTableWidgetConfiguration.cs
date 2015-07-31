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
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class SnapShotTopTableWidgetConfiguration : WidgetConfiguration<HierarchyTableConfig, object>
    {
        public SnapShotTopTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            HasTitle(widgetItem.Name);

            View.HasController<SnapshotTableWidgetController>();

            View.HasConfig(p => p);
            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<SnapshotTableTransformer>()
                .HasProperty(t => t.IsTopTable).WithValue(true)
                .HasProperty(t => t.MeasureValue).WithValue(p => p["@@" + ParameterList.UnitOrValue + "_text"])
                .HasProperty(t => t.AbsoluteTousandValue).WithValue(p => p[ParameterList.AbsoluteThousandFilter]);
                //.HasProperty(t => t.ShowFullLength).WithValue(widgetItem.Name == WidgetItems.TopSubBrandSnapShotTable().Name || widgetItem.Name == WidgetItems.TopSKUSnapShotTable().Name);

            //Export.HasController<SnapshotTopTableExportController>()
            //      .DataFlow.AddSource<CubeDataSourceBase>()
            //      .WithModule(widgetItem.ViewId)
            //      .Transform().By<CubeDataToXTableSnapshotTransformer>()
            //      .HasProperty(t => t.IsTopTable).WithValue(true)
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
    }
}