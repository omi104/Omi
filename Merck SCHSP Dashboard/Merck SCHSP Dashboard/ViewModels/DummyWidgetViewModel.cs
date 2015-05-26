using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Merck_SCHSP_Dashboard.Controllers.Widgets;
using Merck_SCHSP_Dashboard.Models.Config;
using Merck_SCHSP_Dashboard.Models.Data;

namespace Merck_SCHSP_Dashboard.Models.ViewModel
{
    public class DummyWidgetViewModel
    {
        public DummyWidgetConfig Config { get; set; }
        public List<DummyWidgetData> List { get; set; }
    }
}