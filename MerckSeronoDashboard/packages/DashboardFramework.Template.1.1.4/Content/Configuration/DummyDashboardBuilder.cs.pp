using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework;

namespace $rootnamespace$.Configuration
{
    public class DummyDashboardBuilder:IDashboardBuilder
    {
        public IDashboard Build()
        {
            return new DummyDashboardConfiguration().ObjectBeingConfigured;
        }
    }
}