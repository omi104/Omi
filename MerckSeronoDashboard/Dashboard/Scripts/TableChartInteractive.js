var ChartPartialUpdate = function (obj, name, updateType, chartId) {
    var item = $(obj);
    var status = item.is(":checked");
    if (name != null && name != '') {
        name.replace(/'/g, "&apos;");
        name.replace(/'/g, '\\"');
        setTimeout(function() {
            IMSChart.PartialUpdate(name, status, updateType, chartId);
        }, 200);
    }
};

var CheckUncheckAll = function (obj, updateType, chartId) {
    var checkAll = $(obj);

    if (checkAll.is(":checked"))
        $('.rowCheckBox').each(function () {
            this.checked = true;
            ChartPartialUpdate(this, $(this).parent().find('span').text(), updateType, chartId);
        });
    else {
        $('.rowCheckBox').each(function () {
            this.checked = false;
            ChartPartialUpdate(this, $(this).parent().find('span').text(), updateType, chartId);
        });
    }
};