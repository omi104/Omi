function RenderFusionChartAtClient(uniqueId, table) {
    // -- Test 
    //uniqueId = $("#clientFusionChartId").attr('data');
    
    var chartData = window['data' + uniqueId];

    //var chart1 = new FusionCharts(chartData.swfFile, 'chart' + uniqueId, chartData.width, chartData.height, '0', '1');

    setTimeout(function() { fusionChartFunction(uniqueId, table, chartData); }, 1000);
    
//    var chart1 = new FusionCharts(chartData.swfFile, chartData.chartUniqueId, chartData.width, chartData.height, '0', '1');

//    var dataXML = getXmlForChart(table, chartData.data);

//    chart1.setDataXML(dataXML);
//    $('#' + chartData.chartDivId).html(chart1.getSWFHTML());
}


function fusionChartFunction(uniqueId, table, chartData) {
    //var chart1 = new FusionCharts(chartData.swfFile, chartData.chartUniqueId, chartData.width, chartData.height, '0', '1');
    var chart1 = new FusionCharts(chartData.swfFile, chartData.chartUniqueId, chartData.width, chartData.height, '0', '0');

    var dataXML = getXmlForChart(table, chartData.data);

    chart1.setDataXML(dataXML);
    $('#' + chartData.chartDivId).html(chart1.getSWFHTML());
}

function FC_Rendered(obj) {
    //alert(obj);
}
function getXmlForChart(table,dataXml) {
    return processNode(table,dataXml);
}
function processNode(table, node) {
    var xml = '<' + node.Name;
    for (var i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].Name == 'checkStatusId') {
            if (checkStatusToInclude(table, node.attributes[i].Value) == false)
                return '';
        }
        xml += ' ' + node.attributes[i].Name + '="' + node.attributes[i].Value + '"';
    }
    xml += '>';
    for (i = 0; i < node.childNodes.length; i++) {
        xml += processNode(table, node.childNodes[i]);
    }
    xml += '</' + node.Name + '>';
    return xml;
}

function checkStatusToInclude(table, className) {
    className = className.replace("J%26J", "JnJ");
    var status = table.find('input.' + className).is(":checked");
    //alert(table.find('input.' + className).parent().html());
    return status;
}


