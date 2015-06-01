using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class NumberDecimalWithoutArrowIndicatorCellFactory : NodeFactoryBase<object, NodeBase>
    {
        private readonly int _colId;
        private readonly string _nodeName;
        private readonly bool _showPlusMInus;
        private TextFormat _numberFormatter;//use database configuration later
        public string Prefix { get; set; }
        public string Suffix { get; set; }
        public string NumberFormatString { get; set; }
        private bool _isAsItIS;

        public NumberDecimalWithoutArrowIndicatorCellFactory(int colId, bool showPlusMinusAsPrefix = false, string nodeName = "td")
        {
            _nodeName = nodeName;
            _showPlusMInus = showPlusMinusAsPrefix;
            _colId = colId;
        }
        protected override NodeBase CreateInternal(object value)
        {
            _isAsItIS = false;
            
            double number;
            value = value ?? "0";
            double.TryParse(value.ToString(), out number);

            string result = "";
            if (_showPlusMInus && number >= 0)
                result += "+";
            else if (_showPlusMInus && number < 0)
                result += "-";
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
            var tableCell = new SimpleNode(_nodeName,result);
            tableCell.Classes.Add("col-" + _colId);
            tableCell.Attributes.Add("column-index", _colId.ToString());

            return tableCell;
        }
    }
}