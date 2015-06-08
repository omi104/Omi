function LoadDatePickerValues(commandData) {
    this.data = commandData;
};

LoadDatePickerValues.prototype.execute = function () {
    var dropdownInfo = this.data;
    var control = $('#' + dropdownInfo.ControlId);

    //$('#datepicker').Zebra_DatePicker({
    //    format: 'm Y'   //  note that becase there's no day in the format
    //    //  users will not be able to select a day!
    //});

    var datepicker = control.find("#datepicker");

    datepicker.datepicker(
        {
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd MM'
            //minDate: 0,
            //maxDate: 14,
            //beforeShow: function (input, instance) {
            //    return true;
            //},
           
            //onSelect: function (dateText) {
            //    dateText = dateText.replace(/\//g, '_');
            //    var parts = dateText.split('_');
            //    dateText = parts[2] + '_' + parts[0] + '_' + parts[1];
            //    CommandCenter.filterChanged(dropdownInfo.ModifyParameter, dateText);
            //}
        });



};


function SelectDatePickerValue(commandData) {
    this.data = commandData;
};

SelectDatePickerValue.prototype.execute = function () {

};

