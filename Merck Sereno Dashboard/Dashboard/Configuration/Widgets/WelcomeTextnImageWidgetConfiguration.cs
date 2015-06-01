using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Controllers.Layouts;
using Dashboard.Controllers.Widgets;
using Dashboard.DashboardComponent.Models;
using DashboardFramework.Configuration;

namespace Dashboard.Configuration.Widgets
{
    public class WelcomeTextnImageWidgetConfiguration : WidgetConfiguration<object, object>
    {
        public WelcomeTextnImageWidgetConfiguration(WidgetItem widgetItem)
        {
            HasName(widgetItem.Name);
            View.HasConfig("")
                .HasController<WelcomeTextnImageWidgetController>();
            HasParameterDependency.On(widgetItem.HasParamDependency);
        }
    }
}