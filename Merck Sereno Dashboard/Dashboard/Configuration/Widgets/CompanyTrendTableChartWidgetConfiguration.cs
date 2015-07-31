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
        WidgetItem widgetItem;
        public CompanyTrendTableChartWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            this.widgetItem = widgetItem;
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
                .WithValue(p => GetParamName())
                .HasProperty(t => t.ShowFullLength).WithValue(true)
                .HasProperty(t => t.NameColumHeaderText).WithValue(GetHeaderText)
                .HasProperty(t => t.UncheckedItems).WithValue(GetUncheckedItems) //UNChecked items could be a bug
                .HasProperty(t => t.AbsoluteTousandValue).WithValue(p => p[ParameterList.AbsoluteThousandFilter]);
            
            
            
                //.HasProperty(t => t.MeasureType).WithValue(p => p[ParameterList.RbMeasureType])
                //.HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

            Export.HasController<TrendTableChartExportController>().HasConfig("CompanyTrend")
                  .DataFlow.AddSource<CubeDataSourceBase>().WithModule(widgetItem.ViewId)
                  .Transform().By<CubeDataToXTableTrendTransformer>()
                  .HasProperty(t => t.PeriodType).WithValue(p => p["@@TimePeriod_text"])
                  .HasProperty(t => t.KPI).WithValue(p => p["@@KPI_text"])
                  .HasProperty(t => t.EndDate).WithValue(p => p["@@EndDate_text"])
                //.HasProperty(t => t.AbsoluteThousandValue).WithValueWithValue("Thousand")
                  .Transform().By<ExportModelTransformer>();
                 // .HasProperty(t => t.NavigationNameString).WithValue(p => p["Navigation_Label"])
                  //.HasProperty(t => t.GeoMaptext).WithValue(p => p["RB_Geo_text"])
                 
                 //.HasProperty(t => t.MeasureText).WithValue(p => p["@@UnitOrValue_text"])
                 //.HasProperty(t => t.CategoryText).WithValue(p => p["@@MarketCategory_text"])
                 //.HasProperty(t => t.SubCategoryText).WithValue(p => p["@@MarketSubCategory_text"])
                // .HasProperty(t => t.Segment).WithValue(p => p["@@Segment_text"]);
                 
                 //.HasProperty(t => t.ChannelText).WithValue(p => p["@@Channel_text"])
                 //.HasProperty(t => t.SubChannelText).WithValue(p => p["@@SubChannel_text"])
                 //.HasProperty(t => t.TopCountValue).WithValue(GetTopCount);

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

        private string GetParamName()
        {
            
           
                 if(widgetItem.Name == WidgetItems.CompanyTrendTableChartWidget().Name)
                        return ParameterList.CorporationUncheckedItems;
                 if(widgetItem.Name == WidgetItems.IntlProdTrendTableChartWidget().Name)
                        return ParameterList.IntProductUncheckedItems;
                 if(widgetItem.Name ==  WidgetItems.ProductTrendTableChartWidget().Name)
                        return ParameterList.ProductUncheckedItems;
                
                  return "ParamNames";
                
            

        }

        private string GetUncheckedItems(IReadOnlyDictionary<string, string> param)
        {
            if (widgetItem.Name == WidgetItems.CompanyTrendTableChartWidget().Name)
                return param[ParameterList.CorporationUncheckedItems];
            if (widgetItem.Name == WidgetItems.IntlProdTrendTableChartWidget().Name)
                return param[ParameterList.IntProductUncheckedItems];
            if (widgetItem.Name == WidgetItems.ProductTrendTableChartWidget().Name)
                return param[ParameterList.ProductUncheckedItems];

            return "UncheckedItems";

        }
    }
}