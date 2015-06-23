var RBCommandCenter = {
    filterChange: function (filterName, filterValue) {
        if (filterName == "MarketCategory") {
            $('#category-text').text($('#filter-MarketCategory-control option:selected').text());
        }
        if (filterName == "Measure") {
            $('#measure-text').text($('#filter-Measure-control option:selected').text());
        }
        if (filterName == "Channel") {
            $('#channel-text').text($('#filter-Channel-control option:selected').text());
        }
        if (filterName == "SubChannel") {
            $('#sub-channel-text').text($('#filter-SubChannel-control option:selected').text());
        }
        if (filterName == "PeriodType") {
            if ($('#filter-PeriodType-control option:selected').text() == "Monthly") {
                $('#latest-period-type').text('Latest 13 Months');
                //isMonthChanged = '1';
            } else {
                //isMonthChanged = '1';
                $('#latest-period-type').text($('#filter-PeriodType-control option:selected').text());
            }
        }

        CommandCenter.filterChanged(filterName, filterValue);       
    },

    navigationChanged: function (element, navigationName, navigationLabel) {
        var elementId = null;
        if (element.id == "undefined" || element.id == null)
            elementId = element;
        else {
            elementId = element.id;
        }
        RbHelper.highlightMenu(elementId, navigationLabel);
        RbHelper.resizeBodyWidth(navigationName);
        //$('#NumberFormatswitch').text('Switch To Absolute');
        if (navigationName == 'NavKSATerritoryLevel') {
            window.CommandCenter.navigationAndParametersChanged(navigationName, { 'CurrentNavigationId': elementId, 'Navigation_Label': navigationLabel, 'NavigationName': navigationName, 'Is_KSA': 'false' });
        }
        else
            window.CommandCenter.navigationAndParametersChanged(navigationName, { 'CurrentNavigationId': elementId, 'Navigation_Label': navigationLabel, 'NavigationName': navigationName, 'Is_KSA': 'true' });
    }
};