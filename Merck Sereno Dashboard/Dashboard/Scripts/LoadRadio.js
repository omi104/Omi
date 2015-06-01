
function LoadRadioValues(commandData) {
    this.data = commandData;
}

LoadRadioValues.prototype.execute = function () {
    var dropdownInfo = this.data;
    var control = $('#' + dropdownInfo.ControlId);

    control.empty();

    jQuery.each(dropdownInfo.Values, function (key, value) {
        var radioItem = $('<input type="radio"> </input>');
        radioItem.attr('onclick', 'javascript:radioFilterOperation.RadioFilterChanged("' + dropdownInfo.ModifyParameter + '","' + key + '")');
        radioItem.attr('name', dropdownInfo.Name);
        radioItem.attr('value', key);

        var textSpan = $('<div></div>');
        textSpan.addClass('drop-down-text');
        textSpan.text(value);

        control.append(radioItem);
        control.append(textSpan);
    });
};
