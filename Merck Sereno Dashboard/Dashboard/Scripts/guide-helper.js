var Guide = function() {
    var pub = this;
    var pri = {};

    pub.SetParameterName = function (parameterName) {
        pri.ParameterName = parameterName;
    };

    pub.LevelOneClick = function (btn) {
        var button = $(btn);
        ChangeSelectedButtonClass(button);
        $('.lvlTwo').addClass('hiddenTabButton');
        $('.lvlThree').addClass('hiddenTabButton');
        TriggerDefaultOrSelectedChildButton(button);
    };

    pub.LevelTwoClick = function (btn) {
        var button = $(btn);
        ChangeSelectedButtonClass(button);
        $('.lvlThree').addClass('hiddenTabButton');
        TriggerDefaultOrSelectedChildButton(button);
    };

    pub.LevelThreeClick = function (btn) {
        var button = $(btn);
        ChangeSelectedButtonClass(button);
        TriggerDefaultOrSelectedChildButton(button);
    };

    pub.ChangeSelectedButtonClass = function (button) {
        button.parent().find('.selectedButton').removeClass('selectedButton');
        button.addClass('selectedButton');
    };

    pub.TriggerDefaultOrSelectedChildButton = function (button) {
        var childContainer = $('#' + button.attr('id') + 'container');
        $('.TableContainer').children().remove();
        if (childContainer.length > 0) {
            childContainer.removeClass('hiddenTabButton');

            if (childContainer.find('.selectedButton').length > 0) {
                childContainer.find('.selectedButton').click();
            } else {
                var selectedChild = childContainer.find('.tabButton').first();
                selectedChild.addClass('selectedButton');
                selectedChild.click();
            }
        }
        else {
            var parentTab = button.attr('parentTab');
            if (!!parentTab) {
                var obj = {};
                obj[pri.ParameterName] = parentTab + button.attr('tab');
                CommandCenter.parametersChanged(obj);

            } else {
                $('#divGuideTable').html('');
            }
        }
    };

    return pub;
}();