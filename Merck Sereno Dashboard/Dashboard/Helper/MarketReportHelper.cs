using System.Collections.Generic;
using Dashboard.Configuration;
using Dashboard.Configurations;
using Dashboard.Configurations.Constant;

namespace Dashboard.Helper
{
    public class MarketReportHelper : ReportHelper
    {
        
        public string GetMarketSpecificMapping(IReadOnlyDictionary<string, string> parameters)
        {
            var afilter = parameters[ParameterList.RbMarket];
            if (IsMappableValue(afilter))
                return parameters[ParameterList.RbMarketFilterParent];

            afilter = parameters[ParameterList.RbSegment];
            if (IsMappableValue(afilter))
                return parameters[ParameterList.RbSubCategoryFilter];

            return parameters[ParameterList.RbSegment];
        }

        //public string GetMarketPeriodSpecificMapping(IReadOnlyDictionary<string, string> parameters)
        //{
        //    var afilter = parameters[Params.Market.Category];
        //    if (IsMappableValue(afilter))
        //        return parameters[Params.Market.Franchise];

        //    afilter = parameters[Params.Market.SubCategory];
        //    if (IsMappableValue(afilter))
        //        return parameters[Params.Market.Category];

        //    return parameters[Params.Market.SubCategory];
        //}

        //public string GetMarketChartTitle(IReadOnlyDictionary<string, string> parameters)
        //{
        //    const string Na = "-na-";
        //    var helper = new ApplicationHelper();
        //    var title = " vs. J&J Market Share Snapshot";
        //    if (parameters[helper.GetText(Params.Market.Category)] == Na)
        //    {
        //        title = "Franchise" + title;
        //    }
        //    else if (parameters[helper.GetText(Params.Market.SubCategory)] == Na)
        //    {
        //        title = "Category" + title;
        //    }
        //    else if (parameters[helper.GetText(Params.Market.Segment)] == Na)
        //    {
        //        title = "Sub Category" + title;
        //    }
        //    else if (parameters[helper.GetText(Params.Market.SubSegment)] == Na)
        //    {
        //        title = "Segment" + title;
        //    }
        //    else if (parameters[helper.GetText(Params.Market.Strength)] == Na)
        //    {
        //        title = "Sub Segment" + title;
        //    }
        //    else
        //    {
        //        title = "Strength" + title;
        //    }

        //    return title;
        //}

        //public string GetMarketHomeTrendChartTitle(IReadOnlyDictionary<string, string> parameters)
        //{
        //    var helper = new ApplicationHelper();
        //    var title = parameters[helper.GetText(Params.Market.Franchise)].Trim() + GetConditionalCategoryText(parameters) + " vs. J&J Sales Trend in " + parameters[helper.GetText(Params.Market.Geo)].Trim() + " - " + parameters[helper.GetText(Params.Market.PeriodType)].ToTitleText() + " - " + parameters[helper.GetText(Params.Market.Period)];

        //    return title;
        //}


        //private string GetConditionalCategoryText(IReadOnlyDictionary<string, string> parameters)
        //{
        //    var helper = new ApplicationHelper();

        //    var franchise = parameters[Params.Market.Franchise];
        //    var category = parameters[Params.Market.Category];
        //    string appendText = string.Empty;
        //    if (franchise != category)
        //    {
        //        appendText = " - " + parameters[helper.GetText(Params.Market.Category)]; ;
        //    }
        //    return appendText;
        //}

       
        //public string GetMarketChartFooter(IReadOnlyDictionary<string, string> parameters)
        //{
        //    var helper = new ApplicationHelper();
        //    string appendText = string.Empty;
        //    var franchise = parameters[Params.Market.Franchise];
        //    var category = parameters[Params.Market.Category];
        //    if (franchise != category)
        //    {
        //        appendText = " - " + parameters[helper.GetText(Params.Market.Category)];
        //    }

        //    var title = parameters[helper.GetText(Params.Market.Franchise)].Trim() + appendText + " " + parameters[helper.GetText(Params.Market.Geo)].Trim() + " - " + parameters[helper.GetText(Params.Market.PeriodType)].ToTitleText() + " - " + parameters[helper.GetText(Params.Market.Period)];


        //    return title;
        //}

    }


}