using Dashboard.Helper.Factory;

namespace Dashboard.TableComponents.CellFactories
{
    public class NumericExtendedFactory : NumericFactory
    {
        protected string ThousandSeparator = ",";
        protected double ScaleBy = 1;

        public NumericExtendedFactory(string format = null, string prefix = null, string suffix = null, string thousandSeparator = ",", double scaleBy = 1)
            : base(format, prefix, suffix)
        {
            ThousandSeparator = thousandSeparator;
            ScaleBy = scaleBy;
        }

        protected override string ReplaceThousandSeparator(string value)
        {
            if (string.IsNullOrEmpty(ThousandSeparator))
                return value;

            return value.Replace(",", ThousandSeparator);
        }

        protected override object GetScaledValue(object value)
        {
            double val;

            double scaledValue;
            if (value != null)
            {
                if (value.ToString() == "--")
                {
                    return value;
                }
            }

            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return value;
            }

            else
            {
                var parsable = double.TryParse(value.ToString(), out val);
                if (parsable)
                {
                    scaledValue = val / ScaleBy;
                }
                else
                {
                    scaledValue = val;
                }
            }
            return scaledValue;
        }
    }
}

