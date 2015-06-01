using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Component.Node;

namespace Dashboard.Helper.Factory
{
    public class CustomHorizontalBarFactory : NodeFactoryBase<string, TextFormatCell>
    {
        private readonly TextFormat _textFormat;
        private readonly string _nodeName;
        private double _maxValueOfColumn = -1.1d;

        public TextFormat Textformat
        {
            get
            {
                return _textFormat;
            }
        }

        public double MaxValue
        {
            get
            {
                return _maxValueOfColumn;
            }
            set
            {
                _maxValueOfColumn = value;
            }
        }

        public CustomHorizontalBarFactory(TextFormat textFormat, string nodeName = "td")
        {
            _textFormat = textFormat;
            _nodeName = nodeName;
            Styles = new StyleDictionary();
            Classes = new List<string>();
        }

        public CustomHorizontalBarFactory(string format = null, string prefix = null, string suffix = null, string nodeName = "td")
            : this(new TextFormat { FormatString = format, Prefix = prefix, Suffix = suffix }, nodeName)
        {

        }

        protected override TextFormatCell CreateInternal(string value)
        {
            var cell = new TextFormatCell(_nodeName, value, _textFormat);

            double maxVal = 0, cellvalue;
            var parsable = double.TryParse(cell.Value, out cellvalue);

            if (parsable)
                maxVal = Math.Abs(cellvalue);
            if (_maxValueOfColumn < maxVal)
                _maxValueOfColumn = maxVal;

            return cell;
        }


    }
}