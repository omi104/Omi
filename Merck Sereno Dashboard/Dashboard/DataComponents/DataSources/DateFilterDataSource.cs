using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using CubeFramework;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.DataSources
{
    public class DateFilterDataSource : IDataSource<Dictionary<string, string>>
    {
        public Dictionary<string, string> GetData()
        {
            var periods = new Dictionary<string, string>();

            var today = DateTime.Now;
            for (int i = 0; i < 15; i++)
            {

                var day = today.Day.ToString("D2");
                var month = today.Month.ToString("D2");
                var year = today.Year;

                string monthName = today.ToString("MMM", CultureInfo.InvariantCulture);


                var dateKey = year + "_" + month + "_" + day;
                var dateReadableValue = day + " " + monthName + " " + year;

                periods.Add(dateKey, dateReadableValue);
                today = today.AddDays(1);
            }

            return periods;
        }

        public string ConnectionString { set; private get; }
        public string ModuleName { set; private get; }
        public IReadOnlyDictionary<string, string> Parameters { set; private get; }
    }
}