var radioFilterOperation =
{
    RadioFilterChanged: function (parameter, key) {
        var dropDownParameter = {};
        dropDownParameter[parameter] = key;
        CommandCenter.parametersChanged(dropDownParameter);
    }
};