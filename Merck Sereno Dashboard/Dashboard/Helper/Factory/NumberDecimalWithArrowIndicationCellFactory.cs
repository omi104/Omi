using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class NumberDecimalWithArrowIndicationCellFactory : NodeFactoryBase<object, NodeBase>
    {
        private readonly int _colId;
        private readonly string _nodeName;
        private readonly bool _showPlusMInus;
        private TextFormat _numberFormatter;//use database configuration later
        public string Prefix { get; set; }
        public string Suffix { get; set; }
        public string NumberFormatString { get; set; }
        private bool _isAsItIS;

        public NumberDecimalWithArrowIndicationCellFactory(int colId, bool showPlusMinusAsPrefix = false, string nodeName = "td")
        {
            _nodeName = nodeName;
            _showPlusMInus = showPlusMinusAsPrefix;
            _colId = colId;
        }

        protected override NodeBase CreateInternal(object colValues)
        {
            _isAsItIS = false;
            var tableCell = new ComplexNode(_nodeName);
            tableCell.Classes.Add("col-" + _colId);
            tableCell.Classes.Add("has-indicator");
            var values = colValues as List<string>;

            double number;
            values[0] = values[0] ?? "0";
            double.TryParse(values[0].ToString(), out number);

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

            if (string.IsNullOrEmpty(values[0].ToString()))
                return tableCell;

            tableCell.ChildNodes.Add(new SimpleNode("span", result)); 
            tableCell.Classes.Add("col-" + _colId);
            tableCell.ChildNodes.Add(new SimpleNode("img", "")
            {
                Attributes =
                {
                    {"src", string.Format("Content/Images/{0}.gif", values[1].ToString()) },
                }
            });
            tableCell.Attributes.Add("column-index", _colId.ToString());
            return tableCell;
        }
    }
}