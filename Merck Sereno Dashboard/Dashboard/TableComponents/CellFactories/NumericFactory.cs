using Component.Node;
using Dashboard.Helper.Factory;

namespace Dashboard.TableComponents.CellFactories
{
    public class NumericFactory : CellFactoryBase
    {
        protected string Format;
        protected string Prefix;
        protected string Suffix;

        public NumericFactory(string format = null, string prefix = null, string suffix = null)
            : base()
        {
            Format = format;
            Prefix = prefix;
            Suffix = suffix;
        }

        public override INode Create(object value)
        {
            value = GetScaledValue(value);
            var cellValue = StringToNumericConverter.Convert(value, Format);
            cellValue = ReplaceThousandSeparator(cellValue);
            string formattedValue;
            if (cellValue == StringToNumericConverter.NullValueIndicator)
            {
                formattedValue = cellValue;
            }
            else
            {
                formattedValue = Prefix + cellValue + Suffix;
            }

            var data = new SimpleNode("div", formattedValue);
            data.Styles.Add("display", "inline");
            return data;
        }

        protected virtual string ReplaceThousandSeparator(string value)
        {
            return value;
        }

        protected virtual object GetScaledValue(object value)
        {
            return value;
        }
    }
}

