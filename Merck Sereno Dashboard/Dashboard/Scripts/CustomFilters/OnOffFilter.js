
function LoadOnOffValues(commandData) {
    this.data = commandData;
};

LoadOnOffValues.prototype.execute = function () {
    var dropdownInfo = this.data;
    var control = $('#' + dropdownInfo.ControlId);

    control.empty();

    var table = $('<table><tr></tr></table>');
    table.addClass('on-off');


    control.append(table);

    jQuery.each(dropdownInfo.Values, function (key, value) {
        var td = $('<td value="' + key + '">' + value + '</td>');
        td.addClass(key);
        td.attr('value', key);
        td.attr('onclick', 'CommandCenter.filterChanged("' + dropdownInfo.FilterName + '", "' + key+'")');

        control.find('table tr').append(td);
    });
};


function SelectOnOffValue(commandData) {
    this.data = commandData;
};

SelectOnOffValue.prototype.execute = function () {
    var dropdownInfo = this.data;
    var id = '#' + dropdownInfo.ControlId;

    $(id + " td").removeClass("selected");
    $(id + " td[value='" + dropdownInfo.SelectedValue + "']").addClass("selected");
};

