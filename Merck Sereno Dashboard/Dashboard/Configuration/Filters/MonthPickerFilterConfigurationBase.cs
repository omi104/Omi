using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Dashboard.Common;
using Dashboard.Controllers.Filters;
using Dashboard.DashboardComponent.Models;
using Dashboard.Helper;
using Dashboard.ViewModels;
using DashboardFramework;
using DashboardFramework.Configuration;
using DashboardFramework.Web.CommandTranslation.Models;
using DashboardFramework.Web.Controllers;
using DashboardFramework.Web.Convensions;

namespace Dashboard.Configuration.Filters
{
    public class MonthPickerFilterConfigurationBase : FilterConfiguration<Dictionary<string, string>>
    {
        public string FilterParameterName { get; set; }

        public MonthPickerFilterConfigurationBase(FilterItem filterItem, bool isActiveControl)
        {
            HasName(filterItem.Name);
            Layout.HasController<MonthPickerFilterLayoutController>();
            Layout.HasConfig(filterItem);
            HasController<MonthPickerFilterController>();
            HasConfig(p => p[FilterParameterName] + "@" + filterItem.ControlId + "@" + isActiveControl);

            HasValueSelector(new MonthPickerFilterDataValueSelector());


            AddDataFlow(filterItem);


            ModifyParameter(filterItem.ModifyParam);

            if (filterItem.HasParamDependency != null)
            {
                HasParameterDependency.On(filterItem.HasParamDependency);
            }
        }

        protected virtual void AddDataFlow(FilterItem filterDetails)
        {
            throw new Exception("Define data flow in derived class");
        }
    }


    public class MonthPickerFilterController : FilterBaseController<string, Dictionary<string, string>>
    {

        public override CommandResult LoadValues()
        {
            var configParams = Config.Split('@');
            return new CommandResult
            {
                Name = "LoadHtml",
                Data = new
                {
                    ContainerId = configParams[1],
                    Html = FilterHtmlBuilder(Values, configParams[1], bool.Parse(configParams[2]), configParams[0])
                }
            };
        }

        public override CommandResult SelectValue(string selectedValue)
        {
            var configParams = Config.Split('@');
            return new CommandResult
            {
                Name = "SelectMonthPickerFilterValue",
                Data = new
                {
                    ContainerId = configParams[1],
                    SelectedValue = selectedValue
                }
            };
        }

        private static string FilterHtmlBuilder(Dictionary<string, string> values, string paramName, bool isActiveControl, string selectValue)
        {
            var navigation = string.Empty;
            navigation =navigation.GetCurrentNavigationName() ;

            var monthPickerHolder = new XElement("div");

            var monthPickerDom = new XElement("div");
            monthPickerDom.Add(new XAttribute("class", "PeriodSlider"));


            var leftImageTag = new XElement("img");
            leftImageTag.Add(new XAttribute("src", "Content/Images/roundArrowLeft.gif"));
            if (isActiveControl) leftImageTag.Add(new XAttribute("onclick", "ChangePeriodSlider('" + navigation + "',this,true);"));
            leftImageTag.Add(new XAttribute("style", "float:left;"));
            monthPickerDom.Add(leftImageTag);

            var index = 0;
            foreach (var item in values)
            {
                var spanTag = new XElement("span");
                if (selectValue == item.Key)
                {
                    spanTag.Add(new XAttribute("class", "selected"));
                }
                //else if (index == 0)
                //{
                //    spanTag.Add(new XAttribute("class", "selected"));
                //}
                else
                {
                    spanTag.Add(new XAttribute("style", "display:none;"));
                }
                if (isActiveControl) spanTag.Add(new XAttribute("onclick", "OpenPeriodCalendar(this);"));
                spanTag.Add(new XAttribute("value", item.Key));
                spanTag.SetValue(ParameterTextFormatter.FormatMonthForMonthPicker(item.Value));

                monthPickerDom.Add(spanTag);

                index++;
            }

            var rightImageTag = new XElement("img");
            rightImageTag.Add(new XAttribute("src", "Content/Images/roundArrowRight.gif"));
            if (isActiveControl) rightImageTag.Add(new XAttribute("onclick", "ChangePeriodSlider('" + navigation + "',this,false);"));
            rightImageTag.Add(new XAttribute("style", "padding-bottom:5px;"));
            monthPickerDom.Add(rightImageTag);

            var hiddenHolder = new XElement("div");
            hiddenHolder.Add(new XAttribute("class", "hiddenHolderBox"));
            hiddenHolder.Add(new XAttribute("style", "display:none"));


            var innerHiddenHolder = new XElement("div");
            innerHiddenHolder.Add(new XAttribute("id", "periodCalendar"));
            innerHiddenHolder.Add(new XAttribute("style", "padding:0px;"));

            var count = 1;
            var rowAddedToParent = false;
            index = 0;
            XElement rowDiv = null;
            foreach (var item in values)
            {
                if (count == 1) // first cell in the row, so need to create the row div
                {
                    var temp = new XElement("div");
                    rowDiv = temp;
                    rowDiv.Add(new XAttribute("class", "periodCalendarRow"));
                    rowAddedToParent = false;
                }


                var itemDiv = new XElement("div");
                //itemDiv.Add(index == 0
                //                ? new XAttribute("class", "periodCalendarCell selected")
                //                : new XAttribute("class", "periodCalendarCell"));

                if (selectValue == item.Key)
                {
                    itemDiv.Add(new XAttribute("class", "periodCalendarCell selected"));
                }
                //else if (index == 0)
                //{
                //    itemDiv.Add(new XAttribute("class", "periodCalendarCell selected"));
                //}
                else
                {
                    itemDiv.Add(new XAttribute("class", "periodCalendarCell"));
                }

                itemDiv.Add(new XAttribute("title", item.Value));

                if (!item.Value.Contains("QTR"))
                    itemDiv.Add(new XAttribute("style", "line-height: 13px;"));

                if (isActiveControl) itemDiv.Add(new XAttribute("onclick", "OnCalenderClick('" + navigation + "',this);"));
                itemDiv.Add(new XAttribute("value", item.Key));
                itemDiv.Add(new XAttribute("filter_name", paramName));
                itemDiv.SetValue(ParameterTextFormatter.FormatMonthDetailForMonthPicker(item.Value));
                if (rowDiv != null) rowDiv.Add(itemDiv);

                if (count == 6)
                {
                    count = 0;
                    var clrDiv = new XElement("div");
                    clrDiv.Add(new XAttribute("class", "clr"));

                    if (rowDiv != null) rowDiv.Add(clrDiv);

                    innerHiddenHolder.Add(rowDiv);
                    rowAddedToParent = true;
                }
                count++;
                index++;
            }

            if (!rowAddedToParent)
                innerHiddenHolder.Add(rowDiv);

            hiddenHolder.Add(innerHiddenHolder);

            monthPickerDom.Add(hiddenHolder);


            monthPickerHolder.Add(monthPickerDom);
            return monthPickerHolder.ToString();
        }
    }

    public class MonthPickerFilterDataValueSelector : IFilterValueSelector<Dictionary<string, string>>
    {
        public bool Exists(string value, Dictionary<string, string> values)
        {
            return values.Any(v => v.Key == value);
        }

        public string GetSelectedValue(string paramValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            if (Exists(paramValue, newValues))
                return paramValue;

            return newValues.First().Key;
        }

        public string GetSelectedText(string selectedValue, Dictionary<string, string> newValues, IReadOnlyDictionary<string, string> parameters)
        {
            return ParameterTextFormatter.FormatMonthForMonthPicker(newValues.First(v => v.Key == selectedValue).Value);
        }
    }

}