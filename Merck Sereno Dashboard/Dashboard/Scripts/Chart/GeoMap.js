var GeoMap = function() {

    function init() {
        
    }

    function geoMapParameterChanged(navigation, parameterName, parameterObj) {

        var obj = $(parameterObj);

        var parameterText = obj.find('option:selected').text();
        var parameterValue = obj.find('option:selected').val();
        
        $('#geo-text').text(parameterText.trim());
        var parameterList = {
            "RB_Geo": parameterValue,
            "RB_Geo_text": parameterText.trim()
        };
        //CommandCenter.parameterChanged(parameterName, parameterValue);
        CommandCenter.parametersChanged(parameterList);
    }

    function changeGeoFromFusionMap(geoInfo) {
        var words = geoInfo.split('|');
        var paramValue = words[0];
        var paramName = words[1];

        CommandCenter.parameterChanged(paramName, paramValue);
    }

    return {
        init: init,
        geoMapParameterChanged: geoMapParameterChanged,
        changeGeoFromFusionMap: changeGeoFromFusionMap
    }
}();

GeoMap.init();