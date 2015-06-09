var isMonthChanged = '0';

function LoadMonthPickerFilterValues(commandData) {
    this.data = commandData;
}


function SelectMonthPickerFilterValue(commandData) {
    this.data = commandData;
}

SelectMonthPickerFilterValue.prototype.execute = function () {

};


function OpenPeriodCalendar(obj) {
    var showHideDom = $(obj).parent().find('div.hiddenHolderBox');
    if ($(showHideDom).css('display') == 'none') {
        $(showHideDom).css('display', '');
        $('#periodCalendar').bgiframe();
        $('.periodCalendarCell').css('MARGIN-LEFT', '0px');
    }
    else
        $(showHideDom).css('display', 'none');
}

// -- Closing the $('div.hiddenHolderBox') Calender Contro; 
$(document).bind('click', function (e) {

    var $clicked = $(e.target); // get the element clicked

    if ($clicked.is('div.PeriodSlider') || $clicked.parents().is('div.PeriodSlider')) {
        $('div#periodCalendar').css('display', '');
    }
    else {
        $('div#periodCalendar').css('display', 'none');
    }

    if (!$clicked.is('#LM')) {
        $('#helpDiv').remove();
    }

});

function OnCalenderClick(navigation, obj) {

    $(obj).parent().parent().find("div.periodCalendarRow").find("div").removeClass('selected');
    $(obj).addClass("selected");

    $(obj).parent().parent().parent().parent().find("span").each(function () {
        var item = $(this);
        if (item.attr('value') == $(obj).attr('value')) {
            item.addClass("selected");
            item.css('display', 'block');
        }
        else {
            item.removeClass("selected");
            item.css('display', 'none');
        }

    });

    $(obj).parent().parent().parent().css('display', 'none');
    $('#period-text').text($(obj).attr("value"));
    isMonthChanged = '1';
    CommandCenter.parameterChanged("RB_Period", $(obj).attr("value"));

    //var userLogparameters = {
    //    'Navigation': navigation,
    //    'IsFromLandingPage': false,
    //    'IsFromDirectLink': true
    //};
    //var path = '';
    //DashboardOperation.SaveUserActivityLog(path, userLogparameters);
}

function ChangePeriodSlider(navigation, obj, isLeft) {

    var currentlySelectedDom = $(obj).parent().find('span.selected');

    var newValue = "";

    var filterControlId = $(obj).closest('div[id^="filter-"]').attr('id');

    var length = 16 - 7;
    if (filterControlId.indexOf('Executive') > 0) {
        length = 25 - 7;
    }

    var paramName = filterControlId.substring(7, (7 + length)); //"MV_Period";

    if (isLeft) {
        if ($(currentlySelectedDom).next().length && $(currentlySelectedDom).next().prop("tagName") !== "IMG") {
            newValue = $(currentlySelectedDom).next().attr('value');
            $('#period-text').text($(currentlySelectedDom).next().text());
            $(obj).parent().find('span.selected').removeClass('selected').css('display', 'none');
            $(obj).parent().find('div.periodCalendarCell').removeClass('selected');

            $(obj).parent().find('span').each(function () {
                var item = $(this);
                if (item.attr('value') == newValue) {
                    $(item).addClass('selected').css('display', 'block');
                }
            });

            $(obj).parent().find('div.periodCalendarCell').each(function () {
                var item = $(this);
                if (item.attr('value') == newValue) {
                    $(item).addClass('selected');
                    paramName = $(item).attr("filter_name").split('-')[1];
                }
            });
            isMonthChanged = '1';
            CommandCenter.parameterChanged("RB_Period", newValue);
        }
    }
    else {
        if ($(currentlySelectedDom).prev().length && $(currentlySelectedDom).prev().prop("tagName") !== "IMG") {
            newValue = $(currentlySelectedDom).prev().attr('value');
            $('#period-text').text($(currentlySelectedDom).prev().text());
            $(obj).parent().find('span.selected').removeClass('selected').css('display', 'none');
            $(obj).parent().find('div.periodCalendarCell').removeClass('selected');

            $(obj).parent().find('span').each(function () {
                var item = $(this);
                if (item.attr('value') == newValue) {
                    $(item).addClass('selected').css('display', 'block');
                }
            });

            $(obj).parent().find('div.periodCalendarCell').each(function () {
                var item = $(this);
                if (item.attr('value') == newValue) {
                    $(item).addClass('selected');
                    paramName = $(item).attr("filter_name").split('-')[1];
                }
            });
            isMonthChanged = '1';
            CommandCenter.parameterChanged("RB_Period", newValue);
        }
    }

    //var userLogparameters = {
    //    'Navigation': navigation,
    //    'IsFromLandingPage': false,
    //    'IsFromDirectLink': true
    //};
    //var path = '';
    //DashboardOperation.SaveUserActivityLog(path, userLogparameters);
}