using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using $rootnamespace$.Controllers.Widgets;
using $rootnamespace$.Models.Config;
using $rootnamespace$.Models.Data;

namespace $rootnamespace$.Models.ViewModel
{
    public class DummyWidgetViewModel
    {
        public DummyWidgetConfig Config { get; set; }
        public List<DummyWidgetData> List { get; set; }
    }
}