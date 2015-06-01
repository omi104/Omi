using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Chart.Fusion;

namespace Dashboard.Models.Data
{
    public class MSCombiDY2D: MultiSeriesChart
    {
        public MSCombiDY2D()
        {
            this.ChartType = "MSCombiDY2D.swf";
        }

        public MSCombiDY2D(string chartAttributes)
          : base(chartAttributes)
        {
            this.ChartType = "MSCombiDY2D.swf";
        }

        public MSCombiDY2D(Dictionary<string, string> chartAttributes)
          : base(chartAttributes)
        {
            this.ChartType = "MSCombiDY2D.swf";
        }
    }
}