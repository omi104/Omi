'use strict';

(function ($, window, undefined) {

    var columnFridge = function () {

        var pri = {};
        var pub = {};

        pub.apply = function (widgetName) {
            var container = pri._getContainer(widgetName);
            var height = 300;
            var table = container.find('table');           
            pri._applyPlugin(table,height);   
        };

        pri._getContainer = function (widgetName) {
            return $('#' + widgetName);
        };

        pri._applyPlugin = function (table) {
            
            var dt = table.DataTable({
                "scrollY": "246px",
                "scrollX": "100%",
                "scrollCollapse": true,
                "paging": false,
                //"sScrollYInner": "270%",
                "bInfo": false,
                "bAutoWidth": false,
                "sScrollX": "190%",
                "sScrollXInner": "230%",
                "bScrollCollapse": true,
                "bSort": false,
                "bFilter":false
            });
            if (table.selector == "#interactivetablecontents table") {
                var fixedCol = new $.fn.dataTable.FixedColumns(dt, {
                    "leftColumns": 4,
                 
                    //"heightMatch": "auto"
                });
            }
           // var fixedHeader = new $.fn.dataTable.FixedHeader(table);
            
        };
        return pub;
    };

    window.ColumnFridge = new columnFridge();
})(jQuery, window);