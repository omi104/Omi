
function SelectRadioValue(commandData) {
    this.data = commandData;
}

SelectRadioValue.prototype.execute = function () {
    var dropdownInfo = this.data;
    var id = '#' + dropdownInfo.ControlId;
    
    $(id + " input[value='" + dropdownInfo.SelectedValue + "']").prop('checked', true);

}