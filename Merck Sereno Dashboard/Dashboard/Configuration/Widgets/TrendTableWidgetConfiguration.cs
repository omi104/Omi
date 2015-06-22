using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration.Filters;
using Dashboard.Controllers.Exports;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Components;
using Dashboard.DashboardComponent.Models;
using Dashboard.DataComponents.DataSources;
using Dashboard.DataComponents.Transformers;
using Dashboard.Models.Data;
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class TrendTableWidgetConfiguration : WidgetConfiguration<TableChartConfig, object>
    {
        public TrendTableWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig(p=>p)
                .HasController<TrendTableWidgetController>();

            View.DataFlow.AddSource<CubeDataSourceBase>()//DummyTableDataSource
                .WithModule(widgetItem.ViewId)
                .Transform().By<TableChartTransformer>()
                .HasProperty(t=>t.KPI).WithValue(p=>p[ParameterList.KPI])
                 .HasProperty(t => t.UncheckedItems).WithValue(p => widgetItem.Name == WidgetItems.AllRegionTrendTableWidget().Name ? p[ParameterList.RegionUncheckedItems] : p[ParameterList.KsaUncheckedItems])
                 .HasProperty(t => t.ParamName).WithValue(p => widgetItem.Name == WidgetItems.AllRegionTrendTableWidget().Name ? ParameterList.RegionUncheckedItems : ParameterList.KsaUncheckedItems);

            //Export.HasController<TrendTableChartExportController>().HasConfig("CompanyTrend")
            //      .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
            //      .Transform().By<CubeDataToXTableTrendTransformer>()
            //      .HasProperty(t => t.AbsoluteThousandValue).WithValue(p => p["absoluteThousandConversion"])
            //      .Transform().By<ExportModelTransformer>()
            //      .HasProperty(t => t.NavigationNameString).WithValue(p=>p["Navigation_Label"])
            //      .HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
            //     .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@Period_text"])
            //     .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
            //     .HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
            //     .HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
            //     .HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
            //     .HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
            //     .HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"])
            //     .HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

            if (widgetItem.HasParamDependency != null && widgetItem.HasParamDependency.Count > 0)
            {
                HasParameterDependency.On(widgetItem.HasParamDependency);
            }
        }

        private string GetTopCount(IReadOnlyDictionary<string, string> param)
        {
            return "5";
        }

        private string GetHeaderText(IReadOnlyDictionary<string, string> param)
        {         
            return "Name";
        }
    }
}