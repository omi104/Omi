using System;
using System.Text;
using Component.Chart.Core;

namespace Component.Chart.Fusion
{
    public static class ChartHtmlExtensionMethods
    {
        public static string RenderWithScript(this IFusionChart chart, string width, string height
            , string swfRootPath = "Content/FusionChartsSWF/", string callbackFunction = "", bool isForceHtmlRender = false)
        {

            string cId = chart.ControlId;
            string divId = cId;
            string w = width;
            string h = height;

            string xmlData = chart.ToString();
            xmlData = xmlData.Replace(Environment.NewLine, "").Replace("  ", "").Replace("&amp;", "&");

            string chartType = chart.ChartType;

            var oBuilder = new StringBuilder();
            oBuilder.AppendLine(@"<div id=""" + divId + @""" align=""center""></div>");

            oBuilder.AppendLine(@"<script type=""text/javascript"">");

            oBuilder.AppendLine(@"$(document).ready(function () {");

            oBuilder.AppendLine(@"var " + cId + @" = {}");

            oBuilder.AppendLine(cId + @".xmlData = """ + xmlData.Replace(@"""", @"'") + @""";");
            oBuilder.AppendLine(cId + @".chartType = """ + chartType + @""";");
            oBuilder.AppendLine(cId + @".swfRoot = """ + swfRootPath + @""";");
            oBuilder.AppendLine(cId + @".containerId =  """ + divId + @""";");
            oBuilder.AppendLine(cId + @".callbackFunction =  """ + callbackFunction + @""";");

            if (isForceHtmlRender)
            {
                oBuilder.AppendLine(@" FusionCharts.setCurrentRenderer('javascript');");
            }

            oBuilder.Append(@"   IMSChart.Render(" + cId + ",\'" + w + "\', \'" + h + "\'");

            oBuilder.AppendLine(@");");
            oBuilder.AppendLine(@" });");

            oBuilder.AppendLine(@"</script>");

            return oBuilder.ToString();
        }
    }
}