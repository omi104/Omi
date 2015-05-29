using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;
using Dashboard.DashboardComponent.Models;

namespace Dashboard.DashboardComponent.Components
{
    public static class WidgetItems
    {
        public static WidgetItem WidgetWelcomeTextnImage()
        {
            return new WidgetItem()
            {
                Name = "WidgetWelcomeTextnImage",
                ViewId = "not applicable",
                HasParamDependency = new List<string>(){}
            };
        }

        public static WidgetItem PerformanceVsCompetitors()
        {
            return new WidgetItem()
            {
                Name = "PerformanceVsCompetitors",
                ViewId = "103",
                HasParamDependency = new List<string>() { ParameterList.RbGeo, ParameterList.RbMarket, ParameterList.RbChannel, ParameterList.RbSubChannel, ParameterList.RbMeasure, ParameterList.RbPeriod, ParameterList.RbPeriodType }
            };
        }

    }
}