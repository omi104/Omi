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
    public class CompanyTrendTableChartWidgetConfiguration : WidgetConfiguration<TableChartConfig, object>
    {
        public CompanyTrendTableChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig(p => p)
                .HasController<CompanyTrendTableWidgetController>();

            View.DataFlow.AddSource<CubeDataSourceBase>()
                .WithModule(widgetItem.ViewId)
                .Transform().By<CompanyTrendTableChartTransformer>()
                .HasProperty(t => t.MeasureType).WithValue(p => p[ParameterList.TypeOfMeasure])
                .HasProperty(t => t.PeriodType).WithValue(p => p["@@" + ParameterList.TimePeriod + "_text"])
                .HasProperty(t => t.Date).WithValue(p => p["@@" + ParameterList.EndDate + "_text"])
                .HasProperty(t => t.NavigationName).WithValue(p => p[ParameterList.NavigationName])
                .HasProperty(t => t.ParamName)
                .WithValue(
                    p =>
                        widgetItem.Name == WidgetItems.CompanyTrendTableChartWidget().Name
                            ? ParameterList.CorporationUncheckedItems
                            : ParameterList.ProductUncheckedItems)
                .HasProperty(t => t.ShowFullLength).WithValue(true)
                .HasProperty(t => t.NameColumHeaderText).WithValue(GetHeaderText)
                .HasProperty(t => t.UncheckedItems).WithValue(p =>  widgetItem.Name == WidgetItems.CompanyTrendTableChartWidget().Name
                            ?p[ParameterList.CorporationUncheckedItems]
                            : p[ParameterList.ProductUncheckedItems]) //UNChecked items could be a bug
                .HasProperty(t => t.AbsoluteTousandValue).WithValue("Thousand");
            
            
            
                //.HasProperty(t => t.MeasureType).WithValue(p => p[ParameterList.RbMeasureType])
                //.HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

            //Export.HasController<TrendTableChartExportController>().HasConfig("CompanyTrend")
            //      .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
            //      .Transform().By<CubeDataToXTableTrendTransformer>()
            //      .HasProperty(t => t.AbsoluteThousandValue).WithValue(p => p["absoluteThousandConversion"])
            //      .Transform().By<ExportModelTransformer>()
            //      .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
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
            if (param.CurrentNavigationName() == NavigationItems.NavProductsTrend().Name)
                return param[ParameterList.TopCountProductTrend];
            
            if (param.CurrentNavigationName() == NavigationItems.NavCompaniesTrend().Name)
                return param[ParameterList.TopCountCompanyTrend];
            

            return "5";
        }

        private string GetHeaderText(IReadOnlyDictionary<string, string> param)
        {
            if (param.CurrentNavigationName() == NavigationItems.NavProductsTrend().Name)
                return "Product";
            
            if (param.CurrentNavigationName() == NavigationItems.NavCompaniesTrend().Name)
                return "Corporation";
            
            return "Name";
        }
    }
}