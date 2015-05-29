'use strict';

(function ($, window, undefined) {

    var headerFixed = function () {

        var pri = {};
        var pub = {};

        pub.apply = function (widgetName) {
            var container = pri._getContainer(widgetName);
            var height = 400;
            var table = container.find('table');
            pri._applyPlugin(table, height);
        };

        pri._getContainer = function (widgetName) {
            return $('#' + widgetName);
        };

        pri._applyPlugin = function (table) {

            var dt = table.DataTable({
                "scrollY": "100%",
                //"scrollX": "100%",
                "scrollCollapse": true,
                "paging": false,
                "bFilter": false,
                "bInfo": false,
                "sScrollX": "100%",
                "sScrollXInner": "200%",
                "bAutoWidth": false,
                "bScrollCollapse": false,
                "bSort": false
            });

            var fixedHeader = new $.fn.dataTable.FixedHeader(table);

        };
        return pub;
    };

    window.FixedHeader = new headerFixed();
})(jQuery, window);