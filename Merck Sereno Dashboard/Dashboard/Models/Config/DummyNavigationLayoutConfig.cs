using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection.Emit;
using System.Web;

namespace Dashboard.Models.Config
{
    public class DummyNavigationLayoutConfig
    {
        public string Label { get; set; }
        public string Footer { get; set; }
        public List<string> WidgetsName { get; set; }
    }
}