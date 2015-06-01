var CustomMultiTable =
{
    InitMultiTable: function (divClass, parentLevel, tableWidth) {
        $('table.' + divClass).width(tableWidth);
        $('.' + divClass + ' td.ExpandCollapseText img ').each(function (index, item) {
            toggleKeyReport(item, parentLevel);
        });
    },

    UpdateTableState: function (obj, lastCollapsibleLevel) {
        toggleKeyReport(obj, lastCollapsibleLevel);
    },
};