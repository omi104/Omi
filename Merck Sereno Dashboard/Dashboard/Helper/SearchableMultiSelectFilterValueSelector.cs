using DashboardFramework;
using System.Collections.Generic;
using System.Linq;

namespace Dashboard.Helper
{
    public class SearchableDropdownFilterValueSelector : IFilterValueSelector<Dictionary<string, string>>
    {
        public bool Exists(string value, Dictionary<string, string> values)
        {
            var checkedItems = value.Split(',').Where(x => !string.IsNullOrEmpty(x)).ToList();
            //for bootstrap multi select
            checkedItems.Remove("multiselect-all");
            var isExist = checkedItems.Any() && checkedItems.All(values.ContainsKey);
            
            return isExist;
        }

        public string GetSelectedText(string selectedValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            var checkedItems = selectedValue.Split(',').Where(x => !string.IsNullOrEmpty(x));
            var checkedItemText = (from item in checkedItems where newValues.ContainsKey(item) select newValues[item]).ToList();

            return checkedItemText.Count > 0 ? checkedItemText.Aggregate((x, y) => x + "," + y) : "";
        }

        public string GetSelectedValue(string paramValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            return Exists(paramValue, newValues) ? paramValue : newValues.First().Key;
        }
    }
    public class CountrySetFilterValueSelector : IFilterValueSelector<Dictionary<string, string>>
    {
        public bool Exists(string value, Dictionary<string, string> values)
        {
            var checkedItems = value.Split(',').Where(x => !string.IsNullOrEmpty(x)).ToList();
            var isExist = checkedItems.Any(values.ContainsKey);
            
            return isExist;
        }

        public string GetSelectedText(string selectedValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            var checkedItems = selectedValue.Split(',').Where(x => !string.IsNullOrEmpty(x));
            var checkedItemText = (from item in checkedItems where newValues.ContainsKey(item) select newValues[item]).ToList();

            return checkedItemText.Count > 0 ? checkedItemText.Aggregate((x, y) => x + "," + y) : "";
        }

        public string GetSelectedValue(string paramValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            var checkedItems = paramValue.Split(',').Where(x => !string.IsNullOrEmpty(x)).ToList();
            checkedItems.RemoveAll(x => !newValues.ContainsKey(x));
            return checkedItems.Count <= 0 ? newValues.First().Key : checkedItems.Aggregate((x,y) => x + "," + y);
        }
    }
}