using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;
using Component.Node;

namespace Dashboard.TableComponents.CellFactories
{
    public class CustomNumberCellFactory : NodeFactoryBase<object, SimpleNode>
    {
        private readonly int _colId;
        private readonly string _nodeName;
        private TextFormat _numberFormatter;
        public string Prefix { get; set; }
        public string Suffix { get; set; }
        public string NumberFormatString { get; set; }
        private bool _isAsItIS;

        public CustomNumberCellFactory(int colId, string nodeName = "td")
        {
            _nodeName = nodeName;
            _colId = colId;
        }
        protected override SimpleNode CreateInternal(object data)
        {
            _isAsItIS = false;
            var tableCell = new SimpleNode(_nodeName, "");
            tableCell.Classes.Add("col-" + _colId);

            double number;
            data = data ?? "0";
            double.TryParse(data.ToString(), out number);

            string result = "";
            if (Prefix != null)
                result += Prefix;
            
            if (!string.IsNullOrEmpty(NumberFormatString))
            {
                _numberFormatter = new TextFormat() { FormatString = NumberFormatString };
                if (Suffix != null && Suffix == "k" && Math.Abs(number) < 1000)
                {
                    _numberFormatter = new TextFormat() { FormatString = "#,##0" };
                    _isAsItIS = true;
                }

                var formattedValue = _numberFormatter.Format(Math.Abs(number).ToString(CultureInfo.InvariantCulture));
                result += formattedValue;
            }
            else
                result += Math.Abs(number).ToString(CultureInfo.InvariantCulture);

            if (Suffix != null)
            {
                if (_isAsItIS)
                {
                    result += "";
                }
                else
                {
                    result += Suffix;
                }
            }
                
            if (string.IsNullOrEmpty(data.ToString()))
                return tableCell;

            tableCell = new SimpleNode(_nodeName, result);
            tableCell.Classes.Add("col-" + _colId);

            return tableCell;
        }
    }
}