using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.DataComponents.Transformers;
using Dashboard.ViewModels;
using DashboardFramework.DataComponent;

namespace Dashboard.Configuration.Filters
{
    public class MonthPickerFilterConfiguration<TDataSource> : MonthPickerFilterConfigurationBase where TDataSource : class, IDataSource
    {
        public MonthPickerFilterConfiguration(FilterItem filterItem)
            : base(filterItem, true)
        {
            FilterParameterName = ParameterList.RbPeriod;
        }

        protected override void AddDataFlow(FilterItem filterItem)
        {
            DataFlow.AddSource<TDataSource>()
                    .WithModule(filterItem.ViewId)
                //    .MapParameter(ParameterList.RbGeo).WithValue("[Geo].[Hierarchy].[Market].&[TOTAL ENA]")
                //.MapParameter(ParameterList.RbMarket).WithValue("[Market].[Hierarchy].[Category].&[FOOTCARE]")
                //.MapParameter(ParameterList.RbChannel).WithValue("[Channel].[Channel].&[RETAIL]")
                //.MapParameter(ParameterList.RbSubChannel).WithValue("[Channel].[SubChannel].&[RETAIL]")
                //.MapParameter(ParameterList.RbPeriodType).WithValue("[Period].[PeriodTypeName].&[Monthly]")
            //.MapParameter(Params.Market.CategoryFilter).WithValue(new MarketReportHelper().GetMarketPeriodSpecificMapping)
                    .Transform().By<CubeDataToDictionaryTransformer>();
        }

    }
}