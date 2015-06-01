namespace Dashboard.TableComponents
{
    public static class StringToNumericConverter
    {
        public const string NullValueIndicator = "--";
        public static string Convert(object value,string format)
        {

            double val;
            var convertedValue = string.Empty;

            if (value != null)
            {
                if (value.ToString() == "--")
                {
                    return value.ToString();
                }
            } 

            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                convertedValue = NullValueIndicator;
            }

            else
            {
                var parsable = double.TryParse(value.ToString(), out val);
                if (parsable)
                {
                    convertedValue = val.ToString(format);
                }
                else
                {
                    convertedValue = val.ToString();
                }
            }
            return convertedValue;


        }

        

    }
}