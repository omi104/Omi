using System.Collections.Generic;
using Dashboard.DashboardComponent.Models;
using Dashboard.ViewModels;
using DashboardFramework.Web.CommandTranslation.Models;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class OnOffFilterController : FilterBaseController<FilterItem,Dictionary<string,string>>
    {

        public override CommandResult LoadValues()
        {
            return new CommandResult()
                {
                    Name = "LoadOnOffValues",
                    Data = new
                        {
                            FilterName = Config.Name,
                            ControlId = Config.ControlId,
                            //IsDisabled = Config.IsDisabled,
                            //IsHidden = Config.IsHidden,
                            //ChangeOnSubmit = Config.ChangeOnSubmit,
                            //ModifyParameter = Config.ModifyParameter,
                            Values = (IReadOnlyDictionary<string, string>)Values
                        },
                    ExecutionRequired = true,
                };
        }

        public override CommandResult SelectValue(string selectedValue)
        {
            return new CommandResult()
            {
                Name = "SelectOnOffValue",
                Data = new
                {
                    FilterName = Config.Name,
                    ControlId = Config.ControlId,
                    //IsDisabled = Config.IsDisabled,
                    //IsHidden = Config.IsHidden,
                    //ChangeOnSubmit = Config.ChangeOnSubmit,
                    //ModifyParameter = Config.ModifyParameter,
                    SelectedValue = selectedValue
                },
                ExecutionRequired = true,
            };
        }
    }
}
