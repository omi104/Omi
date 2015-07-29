var SnapshotOperation = function () {

    var pub = this;
    var pri = {};


    pub.hoveringDom;
    pub.columnToDisplay;
    pri.IsHovering = false;
    pri.hoverDiv = $('<div id="hoverDiv" style="background-color:white;position:absolute;border:solid 2px #f78db8;z-index:9999999" />');
    pri.snapshotHoverTimeout;

    pub.loadingDiv = $('<div id="snapshot-hover-loading" style="position:absolute;" ></div>');

    pub.SetHoverAction = function (isHover) {
        if (isHover.indexOf('True') >= 0) {
            $('table.bottom-table tbody tr td.hoverable').hover(function () {
                pri.IsHovering = false;
                var that = this;
                pri.snapshotHoverTimeout = setTimeout(function () {
                    if (pri.IsHovering == false) {
                        pri.IsHovering = true;

                        var offset = $(that).offset();
                        var left = offset.left - 420;
                        var top = offset.top - 185;
                        //alert("left: " + left + " , top: " + top);
                        if (left >= 720) {
                            left = left - 130;
                        }
                        if (top >= 1100)
                            top = top - 172;
                        pub.hoveringDom = that;
                        pub.GetHoverData(top, left);

                    }
                }, 300
                );
            }, function () {
                pri.IsHovering = false;
                pub.RemoveSnapshotHover();
                clearTimeout(pri.snapshotHoverTimeout);
            });
        }
        
    };

    pub.GetHoverData = function (top, left) {
        var cell = $(pub.hoveringDom);
        pub.columnToDisplay = cell.attr('column-index');
        var nameRow = cell.closest('tr');
        var company = nameRow.attr('company');

        var escapedCompany = nameRow.attr('companyText');
        if (escapedCompany.length > 0) {
            var hoverdataContainer = $('.hover-data');
            var cachedData = hoverdataContainer.find('table.' + escapedCompany);
            escapedCompany = escapedCompany.replace('_', '.');
            escapedCompany = escapedCompany.replace('0', '/');
            if (cachedData.length == 0) {
                var parameters = {
                    'HoverValue': company,
                    'EscapedCompany': escapedCompany,
                    'Top': top,
                    'Left': left
                };
                GetDataByAjaxCAll('BusinessLogic/GetHoverData', parameters, pri.onHoverDataFetchSuccess);
            }
            else {
                var table = cachedData.first().clone();
                pub.ShowSnapshotHover(table, top, left);
            }
        }
    };

        pub.GetDataByAjaxCAll = function (ajaxUrl, parameters, onSuccess) {
            $.ajax({
                url: ajaxUrl,
                type: 'POST',
                data: parameters,
                success: function (data) {
                    onSuccess(data, parameters);
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            });
            window.document.title = "Merck Serono";
        };
    pri.onHoverDataFetchSuccess = function (returnedData, parameters) {
        pri.IsHovering = false;
        var hoverdataContainer = $('.hover-data');
        var table = $(returnedData);

        pub.ShowSnapshotHover(table, parameters.Top, parameters.Left);

        var copyForCaching = table.clone();
        copyForCaching.addClass(parameters.EscapedCompany);
        hoverdataContainer.append(copyForCaching);
    };

    pub.ShowSnapshotHover = function (table, top, left) {

        table.find('tr td,tr th').addClass('ui-helper-hover-hidden');
        table.find('tr td.col-1').removeClass('ui-helper-hover-hidden');
        table.find('tr td.col-' + pub.columnToDisplay).removeClass('ui-helper-hover-hidden');
        table.find('tr th.col-' + pub.columnToDisplay).removeClass('ui-helper-hover-hidden');

        table.find('tr th.col-' + pub.columnToDisplay).attr('colspan', '2');
        table.find('tr td.col-1').css('width','150px');

        pri.hoverDiv.empty().append(table);
        pri.hoverDiv.css('left', left + 'px');
        pri.hoverDiv.css('top', top + 'px');

        $(pub.hoveringDom).append(pri.hoverDiv);

    };

    pub.RemoveSnapshotHover = function () {
        pri.hoverDiv.remove();
    };

    return pub;
}();