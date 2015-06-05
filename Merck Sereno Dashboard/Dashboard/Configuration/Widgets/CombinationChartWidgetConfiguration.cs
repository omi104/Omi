using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Chart;
using Component.Chart.Fusion;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using DashboardFramework.Configuration;
using DashboardFramework;

namespace Dashboard.Configuration.Widgets
{
    public class CombinationChartWidgetConfiguration : WidgetConfiguration<SingleChartModel, object>
    {
        public CombinationChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("")
                .HasController<CombiChartWidgetController>();
            View.DataFlow.AddSource<DummyTableDataSource>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<CombinationChartTransformer>()
                .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.AllRegionCombinationChart().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems]);

            //Export.HasController<HomeExportController>().HasConfig("HomeTrend")
            //      .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
            //      .Transform().By<CubeDataToXTableHomeTrendTransformer>()
            //      .Transform().By<ExportModelTransformer>()
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