window.chartUpdateFunctionCounter = 'not entered';
var customTable =
{
    DrawHorizontalBarColumn: function (divClass, varianceScale, uniqueColumnIdentifier) {
        var positiveValueColor = '#9ca73d';
        var negativeValueColor = '#a92538';

        $('.' + divClass + ' td.HorizontalBar.' + uniqueColumnIdentifier).horaizontalbar('html', {
            positiveValueColor: positiveValueColor,
            negativeValueColor: negativeValueColor,
            width: 70,
            height: 25,
            barHeight: 8,
            scale: varianceScale,
            showAxis: true
        });
    },
    
    ChartUpdate: function (paramName) {
        //update unchecked parameter value
        var uncheckedItems = [];
        $('table.trend-table').find('td.checkBoxCol input').each(function (ix, element) {
            var item = $(element);
            var status = element.checked;
            if (!status) {
                var seriesName = item.attr('series-name');
                    uncheckedItems.push(seriesName);
            }
        });
        var parameter = {};
        parameter[paramName] = uncheckedItems.join();
        CommandCenter.parametersChanged(parameter);
        window.chartUpdateFunctionCounter = 'entered';
    },
    ShowMoreLessRows :function (obj) {
        var topTable = $('.top-table');
        var rows = topTable.find('tbody tr:gt(7)');
        for (var i = 0; i < rows.length; i++) {
            var current = $(rows[i]);
            current.toggle('slow');
        }
        var text = $(obj).text();
        if (text.indexOf('Show Less') === -1) {
            $(obj).text("Show Less");
        } else {
            $(obj).text("Show More");
        }
    },
    
    ShowAbsoluteThousand: function (obj) {

        var text = new String($(obj).text());
        var parameter = {};
        if (text.indexOf('Thousand')>=0) { // we need to change here....ki bosbe ta parameterList er abs er upor depend kore...
            $(obj).text('Switch To Absolute');
            parameter["absoluteThousandConversion"] = "Thousand";
        } else {
            $(obj).text('Switch To Thousand');
            parameter["absoluteThousandConversion"] = "Absolute";
        }

        CommandCenter.parametersChanged(parameter);
    },

    ToggleDataTable: function (obj, targetDiv) {
        var image = $(obj).find('img:first');
        var imagePath = new String(image.attr('src'));

        var target = $(targetDiv);
        target.slideToggle("fast");
        
        if (imagePath.indexOf('maximize') >= 0) {
            imagePath = imagePath.replace('maximize', 'minimize');
            $('#ShowHideDataTableText').text("Hide data table");
        }
        else{
            imagePath = imagePath.replace('minimize', 'maximize');
            $('#ShowHideDataTableText').text("Show data table");
        }
        
        image.attr('src', imagePath);
    },
    
    
    UpdateChartUpdateFunctionCounter: function() {
        if (window.chartUpdateFunctionCounter == 'entered') {
            window.chartUpdateFunctionCounter = 'not entered';
        }
    },
    
    ToggleButtonOnClick: function (obj,navigationName) {
        var image = $(obj);
        var toggleValue = 'OPEN';
        var imagePath = new String(image.attr('src'));

        if (imagePath.indexOf("ToggleOnBtn") != -1) {
            imagePath = imagePath.replace('ToggleOnBtn', 'ToggleOffBtn');
            toggleValue = 'CLOSE';
        }
        else if (imagePath.indexOf("ToggleOffBtn") != -1) {
            imagePath = imagePath.replace('ToggleOffBtn', 'ToggleOnBtn');
        }
        image.attr('src', imagePath);
        var parameter = {};
        if (navigationName == "GeoNavigation")
            parameter["toggle"] = toggleValue;
        else
            parameter["toggle2"] = toggleValue;
        CommandCenter.parametersChanged(parameter);
    },
    
    HideTotal: function(container) {
        var $totalChkBx = $('#' + container).find("input[series-name*='N2A']");
        if ($totalChkBx != null) {
            $totalChkBx.removeAttr('checked');
            $totalChkBx.remove();
        }
        
        $totalChkBx = $('#' + container).find("input[series-name*='All']");
        if ($totalChkBx != null) {
            $totalChkBx.removeAttr('checked');
            $totalChkBx.remove();
        }

        $totalChkBx = $('#' + container).find("input[series-name*='Market']");
        if ($totalChkBx != null) {
            $totalChkBx.removeAttr('checked');
            $totalChkBx.remove();  
        }
    },
    
    CheckUncheckAll: function (obj, paramName) {
        var checkAll = $(obj);
        var parameter = {};

        if (checkAll.is(":checked"))
            parameter[paramName] = "";
        else {
            var uncheckedItems = [];
            $('table.trend-table td.checkBoxCol input').each(function (ix, element) {
                var item = $(element);
                var seriesName = item.attr('series-name');
                uncheckedItems.push(seriesName);
            });
            parameter[paramName] = uncheckedItems.join();
        }
        CommandCenter.parametersChanged(parameter);
    },
    ShowHideTable: function (id, imgId) {
        var image = $('#' + imgId);
        var imagePath = new String(image.attr('src'));
        
        if (window.chartUpdateFunctionCounter == 'not entered') {
            $('#ShowHideDataTableText').text("Show data table");
            $('#' + id).hide();
        } else {            
            $('#' + id).show();
            $('#ShowHideDataTableText').text("Hide data table");
            imagePath = imagePath.replace('maximize', 'minimize');
            image.attr('src', imagePath);
        }
    }
};