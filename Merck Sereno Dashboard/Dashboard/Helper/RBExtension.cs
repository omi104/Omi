using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using DashboardFramework;

namespace Dashboard.Helper
{
    public static class RBExtension
    {
        private static readonly Dictionary<string, string> GuideDisplayText = new Dictionary<string, string>
            {
                  {"DATATYPE","Data Type"}
                , {"PACKLEVEL","Pack Level"} 
                , {"SELLINSELLOUT","Sell in (SI) / Sell out (SO)"}
            };

        public static string GetCurrentNavigationName(this string navigation)
        {
            var parameters = DashboardFramework.Web.DashboardContext.Current.DashboardInstance.Parameters;
            return parameters.CurrentNavigationName();
        }

        public static string ToGuideDisplayText(this string guideText)
        {
            if (!string.IsNullOrEmpty(guideText))
            {
                if (GuideDisplayText.ContainsKey(guideText.ToUpper()))
                {
                    return GuideDisplayText[guideText.ToUpper()];
                }

            }
            return guideText;
        }

        public static string ReplaceEncodedHtmlTag(this string htmlString)
        {
            htmlString = Regex.Replace(htmlString, @"\n", string.Empty);
            htmlString = Regex.Replace(htmlString, @"\r", string.Empty);
            return htmlString.Replace("&lt;", "<").Replace("&gt;", ">").Replace("&amp;", "&");
        }
    }
}