using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dashboard.Configuration;
using IMS.Logger;

namespace Dashboard.Helper
{
    public class ParameterTextFormatter
    {
        public static string FormatMonth(string value)
        {
            //return value;
            var words = value.Split('_');
            var monthList = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            var qtrList = new List<string> { "1", "2", "3", "4" };

            try
            {
                if (words[0] == FixedData.Other.Qtr)
                    value = string.Format("QTR {0} {1}", qtrList[Int32.Parse(words[2]) - 1], words[1]);
                else
                    value = string.Format("{0} {1}", monthList[Int32.Parse(words[2]) - 1], words[1]);
                return value;
            }
            catch (IndexOutOfRangeException ex)
            {
                Logger.Warn(ex.Message, ex);
                return value;
            }

        }

        public static string FormatMonthDetail(string value)
        {
            //return value;
            var words = value.Split('_');
            var monthList = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            var qtrList = new List<string> { "1", "2", "3", "4" };

            try
            {
                if (words[0] == FixedData.Other.Qtr)
                    value = string.Format("QTR {0} {1}", qtrList[Int32.Parse(words[2]) - 1], words[1]);
                else
                    value = string.Format("{0} {1}", monthList[Int32.Parse(words[2]) - 1], words[1].Substring(2, 2));
                return value;
            }
            catch (IndexOutOfRangeException ex)
            {
                Logger.Warn(ex.Message, ex);
                return value;
            }

        }

        public static string FormatMonthForMonthPicker(string value)
        {
            var monthList = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            if (value.Contains("_"))
            {
                try
                {
                    var words = value.Split('_');
                    value = string.Format("{0} {1}", monthList[Int32.Parse(words[2]) - 1], words[1]);
                }
                catch (IndexOutOfRangeException ex)
                {
                    Logger.Warn(ex.Message, ex);
                    return value;
                }
            }
            return value;
        }

        public static string FormatMonthDetailForMonthPicker(string value)
        {
            var monthList = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            if (value.Contains("_"))
            {
                try
                {
                    var words = value.Split('_');
                    value = string.Format("{0} {1}", monthList[Int32.Parse(words[2]) - 1], words[1]);
                }
                catch (IndexOutOfRangeException ex)
                {
                    Logger.Warn(ex.Message, ex);
                    return value;
                }
            }
            return value;
        }

        public static string GetExecutiveClass()
        {
            return " executive";
        }

        public static string GetNonExecutiveClass()
        {
            return " non-executive";
        }

        public static string GetMarketClass()
        {
            return " market";
        }

        public static string GetFiveColumnClass()
        {
            return " column-5";
        }

        public static string GetSevenColumnClass()
        {
            return " column-7";
        }

        public static string GetHasRankClass()
        {
            return " has-rank";
        }
    }
}