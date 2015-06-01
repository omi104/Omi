namespace Dashboard.Helper
{
    public class ReportHelper
    {
        public string NoData = "-na-";
        public string IgnoreData = "[all]";

        protected bool IsMappableValue(string afilter)
        {
            return afilter.ToLower().EndsWith(IgnoreData.ToLower());
        }
    }


}