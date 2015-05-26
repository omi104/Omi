using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DashboardFramework;

namespace Merck_SCHSP_Dashboard.Configuration
{
    public class MerckDashboardBuilder:IDashboardBuilder
    {
        public IDashboard Build()
        {
            return new MerckDashboardConfiguration().ObjectBeingConfigured;
        }
    }
}