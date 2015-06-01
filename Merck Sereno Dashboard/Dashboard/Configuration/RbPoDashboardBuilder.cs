using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework;

namespace Dashboard.Configuration
{
    public class RbPoDashboardBuilder : IDashboardBuilder
    {
        public IDashboard Build()
        {
            return new RbPoDashboardConfiguration().ObjectBeingConfigured;
        }
    }
}