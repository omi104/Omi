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
    public class CompanyTrendTableChartWidgetConfiguration : WidgetConfiguration<TableChartConfig, object>
    {
        public CompanyTrendTableChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig(p=>p)
                .HasController<CompanyTrendTableChartWidgetController>();

            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<TableChartTransformer>()
                .HasProperty(t => t.ShowFullLength).WithValue(widgetItem.Name == WidgetItems.SubBrandTrendTableChartWidget().Name || widgetItem.Name == WidgetItems.SKUTrendTableChartWidget().Name)
                .HasProperty(t => t.NameColumHeaderText).WithValue(GetHeaderText)
                .HasProperty(t => t.UncheckedItems).WithValue(p => p[ParameterList.UncheckedItems])//UNChecked items could be a bug
                .HasProperty(t => t.AbsoluteTousandValue).WithValue(p => p[ParameterList.AbsoluteThousandFilter])
                .HasProperty(t => t.MeasureType).WithValue(p => p[ParameterList.RbMeasureType])
                .HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

            Export.HasController<TrendTableChartExportController>().HasConfig("CompanyTrend")
                  .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                  .Transform().By<CubeDataToXTableTrendTransformer>()
                  .HasProperty(t => t.AbsoluteThousandValue).WithValue(p => p["absoluteThousandConversion"])
                  .Transform().By<ExportModelTransformer>()
                  .HasProperty(t => t.NavigationNameString).WithValue(p=>p["Navigation_Label"])
                  .HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
                 .HasProperty(t => t.TimePeriodText).WithValue(p => p["@@Period_text"])
                 .HasProperty(t => t.MeasureText).WithValue(p => p["@@Measure_text"])
                 .HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
                 .HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
                 .HasProperty(t => t.SegementText).WithValue(p => p["@@Segment_text"])
                 .HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
                 .HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"])
                 .HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

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