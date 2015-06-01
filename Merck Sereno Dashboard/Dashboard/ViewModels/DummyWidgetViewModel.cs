using System.Collections.Generic;
using Dashboard.Models.Config;
using Dashboard.Models.Data;

namespace Dashboard.Models.ViewModel
{
    public class DummyWidgetViewModel
    {
        public DummyWidgetConfig Config { get; set; }
        public List<DummyWidgetData> List { get; set; }
    }
}