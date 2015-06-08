function LoadSearchableDropdownFilterValues(commandData) {
    this.data = commandData;
}

LoadSearchableDropdownFilterValues.prototype.execute = function () {
    var checkboxInfo = this.data;
    var control = $('#' + checkboxInfo.ControlId);

    control.empty();
    control.append(checkboxInfo.ViewHtml);
}



function SelectSearchableDropdownFilterValue(commandData) {
    this.data = commandData;
}

SelectSearchableDropdownFilterValue.prototype.execute = function () {
    var divGroupInfo = this.data;
    var id = '#' + divGroupInfo.ControlId;
    var isAllItemExists = $(id).find('input[type="checkbox"]')[0].getAttribute('data-value').indexOf('[All]') >= 0;
    var isAllSelected = divGroupInfo.SelectedValue.indexOf('[All]') < 0 ? false : true;
    var selectedValues = divGroupInfo.SelectedValue.length > 0 ? divGroupInfo.SelectedValue.split(',') : [];
    var checkBoxes = $(id + ' input[type=checkbox][name="' + divGroupInfo.FilterName + '"]');
    if (isAllItemExists && (selectedValues.length == checkBoxes.length - 1)) isAllSelected = true;

    checkBoxes.each(function (k, v) {
        if (isAllSelected || selectedValues.indexOf(v.getAttribute('data-value')) >= 0) $(v).attr('checked', '');
        else $(v).removeAttr('checked');
    });

    var selectionText = (isAllSelected ? 'All' : selectedValues.length) + ' Selected';
    $(id).parent().find('input.search-input-text').attr('value', selectionText);
}

/////////////////////////////////////
var MultiSelectDropdownHelper = {
    ShowHideTimeOut: 100,
    TogglePopOver: function (containerId, changeOnSubmit, filterName) {
        var container = $('#' + containerId);
        if (container.is(':visible')) {
            if (MultiSelectDropdownHelper.CheckIfZeroItemsSelected(container) <= 0) return;
            this.HidePopOver(containerId);
            if (changeOnSubmit == "False" || changeOnSubmit == "false") FilterManager.changeSingleFilterValue(filterName);
        } else this.ShowPopOver(containerId);
    },
    ShowPopOver: function (containerId) {
        var container = $('#' + containerId);
        var isAllItemExists = container.find('input[type="checkbox"]')[0].getAttribute('data-value').indexOf('[All]') >= 0;
        container.css({ position: 'absolute', left: container.prev('.btn-group').position().left, zIndex: 999 });
        container.show(this.ShowHideTimeOut);

        setTimeout(function () { SearchActionClientSide.ClearFilter(containerId); }, 10);
        var checkedList = container.find('input[type=checkbox]' + (isAllItemExists ? ':gt(0)' : '')).filter(':checked').parent('li');
        this.sortList(checkedList);
        var uncheckedList = container.find('input[type=checkbox]' + (isAllItemExists ? ':gt(0)' : '')).not(':checked').parent('li');
        this.sortList(uncheckedList);

    },
    HidePopOver: function(containerId) {
        $('#' + containerId).hide(this.ShowHideTimeOut);
    },
    SortSelected: function(containerId) {
        
    },
    sortList: function(li) {
        li.sort(function(a, b) {
            var at = $(a).text();
            var bt = $(b).text();
            if (at > bt) return 1;
            if (at < bt) return -1;
            return 0;
        });

        var ul = li.parent();
        li.detach().appendTo(ul);
    },

    EnableHideOnBodyClick: function (containerId, changeOnSubmit, filterName) {
        var container = $('#' + containerId);
        
        $('body').click(function (e) {
            //if (container && !container.is(":visible")) return;
            var clickedOn = $(e.target);
            if (clickedOn.parents().andSelf().is(container.parent())) {
                //do nothing
            } else {
                if (container.is(':visible')) {
                    if (MultiSelectDropdownHelper.CheckIfZeroItemsSelected(container) <= 0) {
                        var filterNameValue = {};
                        filterNameValue[filterName] = CommandCenter.getParameterValue(filterName);
                        FilterManager.resetMultiselectDropdownUI(filterNameValue);
                    }
                    MultiSelectDropdownHelper.HidePopOver(containerId);
                    if (changeOnSubmit == "False" || changeOnSubmit == "false") FilterManager.changeSingleFilterValue(filterName);
                }
                var inputCtrl = container.parent().find('.search-input-text');
                inputCtrl.val(inputCtrl[0].getAttribute('value'));
            }
        });
    },

    CheckedItemsChanged: function (checkbox, filterName, containerId) {
        var paramValue = $(checkbox).attr('data-value');
        var allItemCheckbox = $('#' + containerId + ' input[type=checkbox]:first')[0];
        var currentValues = [];

        if (paramValue == allItemCheckbox.getAttribute('data-value')) {
            if ($(checkbox).is(':checked')) {
                currentValues = [paramValue];
                //$('#' + containerId + ' input[type=checkbox]').attr('checked', '');
            }
            else {
                $('#' + containerId + ' input[type=checkbox]:checked').removeAttr('checked');
            }
        } else {
            if (!$(checkbox).is(':checked')) $(allItemCheckbox).removeAttr('checked');
            
            var checkboxes = $('#' + containerId + ' input[type=checkbox]');
            currentValues = checkboxes.filter(':checked').map(function () { return $(this).attr("data-value"); }).get();

            if (currentValues.length == 0) {
                $(checkbox).attr('checked', 'checked');
                $("<div>You can not deselect all the items.</div>").dialog({ modal: true, title: 'Information', buttons: { "Ok": function () { $(this).dialog("close"); } } });
                return;
            } else if (currentValues.length == checkboxes.length - 1) {
                currentValues = [allItemCheckbox.getAttribute('data-value')];
            }
        }

        var opt = { ControlId: containerId, FilterName: filterName, SelectedValue: currentValues.toString(), FilterType: 'MultiSelectDropdown' };
        FilterManager.filterValueChanged(filterName, opt);
    },

    CheckedItemsChanged2: function (checkbox, filterName, containerId) {
        var paramValue = $(checkbox).attr('data-value');
        var allItemCheckbox = $('#' + containerId + ' input[type=checkbox]:first')[0];
        var isAllItemExists = allItemCheckbox.getAttribute('data-value').indexOf('[All]') >= 0;

        var currentValues = [];

        if (isAllItemExists && paramValue == allItemCheckbox.getAttribute('data-value')) {
            if ($(checkbox).is(':checked')) {
                currentValues = $('#' + containerId + ' input[type=checkbox]:gt(0)').map(function () { return $(this).attr("data-value"); }).get();
                //$('#' + containerId + ' input[type=checkbox]').attr('checked', '');
            }
            else {
                $('#' + containerId + ' input[type=checkbox]:checked').removeAttr('checked');
            }
        } else {
            if (isAllItemExists && !$(checkbox).is(':checked')) $(allItemCheckbox).removeAttr('checked');

            currentValues = $('#' + containerId + ' input[type=checkbox]:checked').map(function () { return $(this).attr("data-value"); }).get();

            if (currentValues.length == 0) {
                $(checkbox).attr('checked', 'checked');
                $("<div>You can not deselect all the items.</div>").dialog({ modal: true, title: 'Information', buttons: { "Ok": function () { $(this).dialog("close"); } } });
                return;
            }
        }

        var opt = { ControlId: containerId, FilterName: filterName, SelectedValue: currentValues.toString(), FilterType: 'MultiSelectDropdown' };
        FilterManager.filterValueChanged(filterName, opt);
    },


    CheckIfZeroItemsSelected: function (container) {
        var selectedItems = container.find('li input[type=checkbox]:checked').length;
        if (container.find('li input[type=checkbox]:checked').length <= 0) {
            $("<div>Deselect all the items is not allowed.<br/><br/>The filter will be reset with the last updated selection.</div>").dialog({
                modal: true, title: 'Information',
                buttons: { "Ok": function (event) { event.stopPropagation(); $(this).dialog("close"); } },
                width: '445px'
            });
        }
        return selectedItems;
    },

    RegisterSearchAction: function (searchActionId, containerId) {
        SearchActionClientSide.RegisterClick(searchActionId, containerId);
        SearchActionClientSide.RegisterKeyup(searchActionId, containerId);
    }
};


var SearchActionClientSide = {
    ClearFilter: function (contentId) {
        var contentElement = $('#' + contentId);
        contentElement.find('li').show();
        contentElement.find('span.fn-title').each(function () {
            $(this).text($(this).siblings('input').data('text'));
        });
    },

    RegisterClick: function (searchActionId, containerId) {
        $("#" + searchActionId).click(function (e) {
            MultiSelectDropdownHelper.ShowPopOver(containerId);

            var currentValue = $(this).val();
            var matcher = new RegExp("Selected", "i");

            if (matcher.test(currentValue)) {
                $(this).val("");
                setTimeout(function () { SearchActionClientSide.ClearFilter(containerId); }, 10);
            }
            e.stopPropagation();
        });
    },

    RegisterKeyup: function (searchActionId, containerId) {
        $("#" + searchActionId).keyup(function (e) {

            var match = $(e.currentTarget).val();
            var matcher = new RegExp(match, "i");
            $('#' + containerId).find('span.fn-title').each(function () {
                var ele = $(this);
                var text = ele.text();
                if (matcher.test(text)) {
                    ele.closest('li').show();
                    ele.empty().append(text.replace(
                        new RegExp(
                            "(?![^&;]+;)(?!<[^<>]*)(" +
                            match +
                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                        ), "<strong>$1</strong>"));

                } else {
                    ele.closest('li').hide();
                }
            });


            if (e && e.which === $.ui.keyCode.ESCAPE) {
                MultiSelectDropdownHelper.HidePopOver(containerId);
                return;
            }
            e.stopPropagation();
        });
    }

};



var FilterManager = {
    filterValues: {},

    filterValueChanged: function (key, valueObj) {

        if (valueObj.SelectedValue == undefined || valueObj.SelectedValue == null || valueObj.SelectedValue.length <= 0) {
            delete FilterManager.filterValues[key];
            return;
        }

        this.filterValues[key] = valueObj;

        if (valueObj.FilterType == 'Dropdown') {
            new SelectDropdownFilterValue(valueObj).execute();
        } else if (valueObj.FilterType == 'MultiSelectDropdown') {
            new SelectSearchableMultiSelectFilterValue(valueObj).execute();
        } else if (valueObj.FilterType == 'ToggleCheckbox') {
            // no need to perform any action
        }
    },

    getFilterValue: function (key) {
        return this.filterValues[key];
    },

    flush: function () {
        this.filterValues = {};
    },

    submit: function () {
        var params = {};
        for (var key in this.filterValues) {
            params[key] = this.filterValues[key].SelectedValue;
        }

        if (Object.keys(params).length <= 0) return;

        CommandCenter.parametersChanged(params);
        this.flush();
    },

    changeSingleFilterValue: function (key) {
        if (!this.filterValues.hasOwnProperty(key)) return;

        CommandCenter.parameterChanged(key, this.filterValues[key].SelectedValue);
        delete this.filterValues[key];
    },

    reset: function () {
        var defaultFilterValues = $.parseJSON(CommandCenter.getParameterValue('DefaultFilterValues'));
        if (Object.keys(defaultFilterValues).length <= 0) return;

        CommandCenter.parametersChanged(defaultFilterValues);
        this.resetDropdownUI(defaultFilterValues);
        this.resetMultiselectDropdownUI(defaultFilterValues);
        this.flush();
    },

    resetDropdownUI: function (defaultFilterValues) {
        $('div.Dropdown').each(function () {
            var filterName = this.getAttribute('filter_name');
            var containerId = this.parentNode.id;
            var defaultValue = defaultFilterValues[filterName];

            if (defaultValue)
                new SelectDropdownFilterValue({ ControlId: containerId, FilterName: filterName, SelectedValue: defaultValue }).execute();

        });
    },

    resetMultiselectDropdownUI: function (defaultFilterValues) {
        $('div.MultiSelectDropdown').each(function () {
            var filterName = this.getAttribute('filter_name');
            var containerId = this.parentNode.id;
            var defaultValue = defaultFilterValues[filterName];

            if (defaultValue)
                new SelectSearchableMultiSelectFilterValue({ ControlId: containerId, FilterName: filterName, SelectedValue: defaultValue }).execute();

        });
    }

};