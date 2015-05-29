using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.Models.Data;
using DashboardFramework.Web.CommandTranslation.Models;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class RadioFilterController : FilterBaseController<FilterVisibilityConfig, Dictionary<string, string>>
    {

        public override CommandResult LoadValues()
        {
            return new CommandResult()
                {
                    Name = "LoadRadioValues",
                    Data = new
                        {
                            ControlId = "filter-MeasureType-control",
                            Values = (IReadOnlyDictionary<string, string>)Values,
                            ModifyParameter = Config.ModifyParameter,
                            Name = Name

                        },
                    ExecutionRequired = true,
                };
        }

        public override CommandResult SelectValue(string selectedValue)
        {
            return new CommandResult()
            {
                Name = "SelectRadioValue",
                Data = new
                {
                    ControlId = "filter-MeasureType-control",
                    SelectedValue = selectedValue,
                    ModifyParameter = Config.ModifyParameter,
                    Name = Name
                },
                ExecutionRequired = true,
            };
        }
    }
}
