using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Dashboard.DashboardComponent.Models;
using Dashboard.Helper.Extension;
using DashboardFramework;
using DashboardFramework.Web;
using DashboardFramework.Web.CommandTranslation.Models;
using DashboardFramework.Web.Controllers;

namespace Dashboard.Controllers.Filters
{
    public class SearchableDropdownFilterController : FilterBaseController<FilterItem, Dictionary<string, string>>
    {
        public override CommandResult LoadValues()
        {
            var model = new MultiSelectFilterModel(Config, Values);
            var result = this.RenderView("~/Views/SearchableDropdownFilter/Index.cshtml", model);

            return new CommandResult
            {
                Name = "LoadSearchableDropdownFilterValues",
                Data = new
                {
                    FilterName = Config.Name,
                    ControlId = Config.ControlId,
                    //IsDisabled = Config.IsDisabled,
                    //IsHidden = Config.IsHidden,
                    //ChangeOnSubmit = Config.ChangeOnSubmit,
                    ModifyParameter = Config.ModifyParam,
                    Values = (IReadOnlyDictionary<string, string>)Values,
                    ViewHtml = result
                },
                ExecutionRequired = true,
            };
        }

        public override CommandResult SelectValue(string selectedValue)
        {
            return new CommandResult
            {
                Name = "SelectSearchableDropdownFilterValue",
                Data = new
                {
                    FilterName = Config.Name,
                    ControlId = Config.ControlId,
                    //IsDisabled = Config.IsDisabled,
                    //IsHidden = Config.IsHidden,
                    //ChangeOnSubmit = Config.ChangeOnSubmit,
                    ModifyParameter = Config.ModifyParam,
                    SelectedValue = selectedValue
                },
                ExecutionRequired = true,
            };
        }

        public ViewResult Index()
        {
            return View();
        }

    }

    public class MultiSelectFilterModel
    {
        private string _selectedValues;
        private string _selectedText;

        public FilterItem Config { get; set; }
        public Dictionary<string, string> Data { get; set; }
        public string PopOverActionBtn { get; private set; }
        public string ContentId { get; private set; }
        public string ContainerId { get; private set; }
        public string SearchItemId { get; private set; }
        public string SearchInputText { get; private set; }

        public bool IsAllSelected
        {
            get { return _selectedValues.Contains("[All]"); }
        }
        public string SelectedText { get { return _selectedText; } }
        public string SelectedValues { get { return _selectedValues; } }
        public List<MultiSelectItem> FilterItems { get; set; }
        public MultiSelectFilterModel(FilterItem config, Dictionary<string, string> data)
        {
            Config = config;
            Data = data;
            FilterItems = new List<MultiSelectItem>();
            PopOverActionBtn = string.Format("filter-popover-btn-{0}", config.ModifyParam);
            ContentId = string.Format("filter-data-content-{0}", config.ModifyParam);
            ContainerId = string.Format("filter-data-container-{0}", config.ModifyParam);
            SearchItemId = string.Format("filter-data-search-{0}", config.ModifyParam);

            var @params = DashboardContext.Current.DashboardInstance.Parameters;
            _selectedValues = @params[config.ModifyParam];
            _selectedText = @params.FilterText(config.ModifyParam);

            var isAllSelected = IsAllSelected;
            var selectedItems = _selectedValues.Split(new[] { ',' }).ToList();
            foreach (var item in data)
            {
                FilterItems.Add(new MultiSelectItem
                {
                    FilterItem = item,
                    IsSelected = isAllSelected ? isAllSelected : selectedItems.Any(p => p == item.Key)
                });
            }

            SearchInputText = isAllSelected
                ? "All Selected"
                : _selectedValues.Split(new[] { ',' }).Count().ToString(CultureInfo.InvariantCulture) + " Selected";
        }



        public class MultiSelectItem
        {
            public KeyValuePair<string, string> FilterItem { get; set; }
            public bool IsSelected { get; set; }
        }
    }
}