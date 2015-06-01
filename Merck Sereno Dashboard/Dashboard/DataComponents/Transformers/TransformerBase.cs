using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Component.Node;
using CubeFramework;
using Dashboard.Models.Data;
using DashboardFramework.DataComponent;

namespace Dashboard.DataComponents.Transformers
{
    public class TransformerBase : ITransformer<CubeData, SingleChartModel>
    {
        public CubeData Input { set; protected get; }
        private TextFormat _numberFormatter;
        public string Prefix { get; set; }
        public string NumberFormatString { get; set; }
        public string Suffix { get; set; }

        public SingleChartModel GetData()
        {
            throw new NotImplementedException();
        }

        public string NumberFormatter(object data)
        {
            var isMillion = false;
            var isBillion = false;
            var isThousand = false;
            double number;
            data = data ?? "0";
            double.TryParse(data.ToString(), out number);

            var result = "";
            if (Prefix != null)
                result += Prefix;

            if (!string.IsNullOrEmpty(NumberFormatString))
            {
                _numberFormatter = new TextFormat() { FormatString = NumberFormatString };
                if (Math.Abs(number) >= 1000000000)//greater than or equal to 1 billion
                {
                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,,.0" };
                    isBillion = true;
                }
                else if (Math.Abs(number) >= 1000000)//greater than or equal to 1 million
                {
                    _numberFormatter = new TextFormat() { FormatString = "#,##0,,.0" };
                    isMillion = true;
                }
                else if (Math.Abs(number) >= 1000)
                {
                    _numberFormatter = new TextFormat() { FormatString = "#,##0,.0" };
                    isThousand = true;
                }

                var formattedValue = _numberFormatter.Format(Math.Abs(number).ToString(CultureInfo.InvariantCulture));
                result += formattedValue;
            }
            else
                result += Math.Abs(number).ToString(CultureInfo.InvariantCulture);

            if (isBillion)
            {
                result += "b";
            }
            else if (isMillion)
            {
                result += "m";
            }
            else if (isThousand)
            {
                result += "k";
            }
            else
                result += Suffix;
            return result;
        }

    }
}