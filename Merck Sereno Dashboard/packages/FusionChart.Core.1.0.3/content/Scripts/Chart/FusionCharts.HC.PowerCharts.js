/**!
 * @license FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 * @version fusioncharts/3.2.2-servicerelease1.4190
 */

(function () {
    // Register the module with FusionCharts and als oget access to a global
    // variable within the core's scope.
    var global = FusionCharts(['private', 'modules.renderer.highcharts-powercharts']);
    // Check whether the module has been already registered. If true, then
    // do not bother to re-register.
    if (global === undefined) {
        return;
    }

    var lib = global.hcLib,

    //strings
    BLANKSTRINGPLACEHOLDER = lib.BLANKSTRINGPLACEHOLDER,
    BLANKSTRING = lib.BLANKSTRING,

    createTrendLine = lib.createTrendLine,

    //add the tools thats are requared
    pluck = lib.pluck,
    getValidValue = lib.getValidValue,
    pluckNumber = lib.pluckNumber,
    defaultPaletteOptions = lib.defaultPaletteOptions,
    getFirstValue = lib.getFirstValue,
    parsePointValue = lib.parsePointValue,
    parseStr = lib.parseStr,
    FC_CONFIG_STRING = lib.FC_CONFIG_STRING,
    extend2 = lib.extend2,//old: jarendererExtend / margecolone
    getDashStyle = lib.getDashStyle, // returns dashed style of a line series

    stubFN = lib.stubFN,
    hasSVG = lib.hasSVG,
    falseFN = lib.falseFN,

    getColumnColor = lib.graphics.getColumnColor,
    getFirstColor = lib.getFirstColor,
    pluckColor = lib.pluckColor,
    getFirstAlpha = lib.getFirstAlpha,
    getDarkColor = lib.graphics.getDarkColor,
    getLightColor = lib.graphics.getLightColor,
    convertColor = lib.graphics.convertColor,
    COLOR_TRANSPARENT = lib.COLOR_TRANSPARENT,

    chartAPI = lib.chartAPI,

    titleSpaceManager = lib.titleSpaceManager,
    axisMinMaxSetter = lib.axisMinMaxSetter,
    placeHorizontalAxis = lib.placeHorizontalAxis,
    placeVerticalAxis = lib.placeVerticalAxis,
    stepYAxisNames = lib.stepYAxisNames,
    configureAxis = lib.configureAxis,

    placeLegendBlockBottom = lib.placeLegendBlockBottom,
    adjustHorizontalCanvasMargin = lib.adjustHorizontalCanvasMargin,
    adjustVerticalCanvasMargin = lib.adjustVerticalCanvasMargin,
    placeLegendBlockRight = lib.placeLegendBlockRight,

    mapSymbolName = lib.graphics.mapSymbolName,

    singleSeriesAPI = chartAPI.singleseries,

    multiSeriesAPI = chartAPI.multiseries,
    COMMASTRING = lib.COMMASTRING,
    ZEROSTRING = lib.ZEROSTRING,
    ONESTRING = lib.ONESTRING,
    hundredstring = lib.hundredstring,
    commaspacestring = lib.commaspacestring,

    getDefinedColor = lib.getDefinedColor,
    parseUnsafeString = lib.parseUnsafeString,

    toPrecision = lib.toPrecision,

    setLineHeight = lib.setLineHeight,
    pluckFontSize = lib.pluckFontSize, // To get the valid font size (filters negative values)
    POSITION_CENTER = lib.POSITION_CENTER,
    POSITION_TOP = lib.POSITION_TOP,
    POSITION_BOTTOM = lib.POSITION_BOTTOM,
    POSITION_RIGHT = lib.POSITION_RIGHT,
    POSITION_LEFT = lib.POSITION_LEFT,
    INT_ZERO = 0,

    HUNDREDSTRING = lib.HUNDREDSTRING,
    PXSTRING = lib.PXSTRING,
    BGRATIOSTRING = lib.BGRATIOSTRING,
    COMMASPACE = lib.COMMASPACE,
    creditLabel = false;


    /* Spline Charts */
    chartAPI('spline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'spline'
    }, chartAPI.linebase);

    chartAPI('splinearea', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'areaspline',
        anchorAlpha: '100'
    }, chartAPI.area2dbase);


    chartAPI('msspline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'spline'
    }, chartAPI.mslinebase);


    chartAPI('mssplinearea', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'areaspline',
        anchorAlpha: '100'
    }, chartAPI.msareabase);


    chartAPI('msstepline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'line',
        stepLine: true
    }, chartAPI.mslinebase);


    /* Inverse Charts */
    chartAPI('inversemsline', {
        standaloneInit: true,
        inversed : true
    }, chartAPI.mslinebase);

    chartAPI('inversemsarea', {
        standaloneInit: true,
        inversed : true
    }, chartAPI.msareabase);

    chartAPI('inversemscolumn2d', {
        standaloneInit: true,
        inversed : true
    }, chartAPI.mscolumn2dbase);

    /* Log Charts */

    //log axis helper Function
    var getLog = function (value, base) {
        if (value > 0) {
            return Math.log(value) / Math.log(base || 10);
        }
        else {
            return null;
        }
    },
    /**
     * getAxisLimits is the method to calculate the axis limits
     * of the chart w.r.t. the mantissa of the yMax and yMin.
     * @param	maxValue	the maximum value of the data set to
     *						be plotted.
     * @param	minValue	the minimum value of the data set to
     *						be plotted.
     */
    getLogAxisLimits = function (maxValue , minValue, yAxisMaxValue, yAxisMinValue, base, numMinorDivLines ) {
        var minLogY, maxLogY, yMin, yMax, numDivLines;

        //Local function to check whether the given parameter is specified or not.
        var validate = function (param)
        {
            if (param == null || param == undefined || param == "" || isNaN (param))
            {
                //Variable is not specified - so return false.
                return false;
            }
            else
            {
                //Variable is specified - so return true.
                return true;
            }
        };
        var power ;
        // if yAxisMaxValue is valid and greater than yMax
        if (validate (yAxisMaxValue) && Number (yAxisMaxValue) >= maxValue)
        {
            yMax = Number (yAxisMaxValue);
        } else
{
            // for base greater than one
            if (base > 1)
            {
                power = Math.ceil (Math.log (maxValue) / Math.log (base));
            // for 0 < base < 1

            }
            else

            {
                power = Math.floor (Math.log (maxValue) / Math.log (base));
            }
            yMax = Math.pow (base, power);
            maxLogY = power;
        }
        // if maxLogY is not yet defined
        if (!maxLogY)
        {
            // for base greater than one
            if (base > 1)
            {
                maxLogY = Math.ceil (Math.log (yMax) / Math.log (base));
            // for 0 < base < 1

            } else
{
                maxLogY = Math.floor (Math.log (yMax) / Math.log (base));
            }

        }
        //
        // if yAxisMinValue is valid and less than yMin
        if (validate (yAxisMinValue) && Number (yAxisMinValue) <= minValue)
        {
            yMin = Number (yAxisMinValue);
        } else
{
            // for base greater than one
            if (base > 1)
            {
                power = Math.floor (Math.log (minValue) / Math.log (base));
            // for 0 < base < 1

            } else
{
                power = Math.ceil (Math.log (minValue) / Math.log (base));
            }
            yMin = Math.pow (base, power);
            minLogY = power;
        }
        // if minLogY is not yet defined
        if ( ! minLogY)
        {
            // for base greater than one
            if (base > 1)
            {
                minLogY = Math.floor (Math.log (yMin) / Math.log (base));
            // for 0 < base < 1

            } else
{
                minLogY = Math.ceil (Math.log (yMin) / Math.log (base));
            }
        }
        //}




        /**
         * calcDivs is the method to calculate the numerical value
         * of the divLines and store as object in an array along
         * with other properties.
         */
        //function calcDivs ()
        //{
        //Variables
        var divLineValue ;
        //Initialize counter to 0
        var counter = 0;
        //Initial and check value
        var iniValue, checkValue, divLines = [];
        //Get log of base w.r.t. base=10
        var r = Number (String (Math.log (base) / Math.log (10)));
        //R is integer if base is an integer power of 10. So, set
        //num div lines accordingly.
        numDivLines = Number (numMinorDivLines) || ((Math.floor (r) == r) ? 8 : 4);
        //Initialize iniValue and checkValue w.r.t base value
        if (base > 1)
        {
            //If base > 1
            iniValue = maxLogY;
            checkValue = minLogY;
        } else if (base > 0 && base < 1)
{
            //If base between 0 and 1.
            iniValue = minLogY;
            checkValue = maxLogY;
        }
        //Initialize r to maxLogY. It will be incremented/decremented within loop as required
        r = maxLogY;

        //Loop to calculate major div lines
        for (var i = iniValue; i >= checkValue; -- i)
        {

            //Select the major divLines
            // Conditions for major div lines:
            // 1. If y-axis is inverted and div value is not the very first one
            // 	  (the lowest one coinciding with x-axis)
            // OR
            // 2. If y-axis is not inverted and div value is not the very last one
            //	  (the lowest one coinciding with x-axis)
            //if ((invertYAxis && r != maxLogY) || !(invertYAxis || i == checkValue)) {
            //Get the numerical value of div line by getting power of base.
            divLineValue = Math.pow (base, r);
            //Create the div line object
            // conditional to avoid plot of major divLines and their axis labels beyond plot area

            if (yMin <= divLineValue && yMax >= divLineValue)
            {
                divLines [counter++] = {
                    value: divLineValue,
                    ismajor: true
                };
            }
            //Increment counter to be used in calculation for minor divLines

            //If it's upper limit (mantissa), no need of the minor divLines, as only major can be plotted
            if (i == checkValue)
            {
                continue;
            }
            //Multiplication factor
            //For base <1, powers go in negative -0.1 is 10^-1, 0.001 is 10 ^ -3 and so on.
            var d = (base > 1) ? - 1 : 1;
            //Numeric interval between two succesive major divLines (variable)
            var slabInterval = Math.pow (base, r) - Math.pow (base, r + d);
            //Numeric interval between two succesive minor divLines (variable) in between 2 successive major divLines
            var subInterval = slabInterval / (numDivLines + 1);
            //Iterate through minor div lines
            for (var j = 1; j <= numDivLines; ++ j)
            {
                //Get the numeric value for minor div line
                //By adding the sub-interval to power of base (of major div line)
                divLineValue = Math.pow (base, r + d) + subInterval * j;
                //Create the object
                // conditional to avoid plot of minor divLines and their axis labels beyond plot area
                //if (divLineValue>=yMin && divLineValue<=yMax) {
                if (yMin <= divLineValue && yMax >= divLineValue)
                {
                    divLines [counter++] = {
                        value: divLineValue,
                        ismajor: false
                    };
                }
            //Increment
            }
            //Update counter corresponding to next major divLine w.r.t. base value
            if (base > 1)
            {
                r --;
            } else
{
                r ++;
            }
        }
        var isYMinDivLine , isYMaxDivLine;
        // iterating to check if the limits are divLines and flagged
        for (var u in divLines)
        {
            for (var e in divLines [u])
            {
                if (e == 'value')
                {
                    //if its found that yMin is a divLine, then don't work on it anymore
                    if(!isYMinDivLine){
                        isYMinDivLine = (divLines [u][e] == yMin);
                    }
                    //if its found that yMax is a divLine, then don't work on it anymore
                    if(!isYMaxDivLine){
                        isYMaxDivLine = (divLines [u][e] == yMax);
                    }
                }
            }
        }

        // if yMin is not a divLine
        if ( ! isYMinDivLine)
        {
            // include yMin as a divLine
            divLines [counter++] = {
                value: yMin,
                ismajor: false
            };
        }
        // if yMax is not a divLine
        if ( ! isYMaxDivLine)
        {
            // include yMax as a divLine
            divLines [counter] = {
                value: yMax,
                ismajor: false
            };
        }

        ///return
        return {
            Max: yMax,
            Min: yMin,
            divArr: divLines
        };
    },
    plotLineSortFN = function(a,b)
    {
        return a.value - b.value;
    };







    chartAPI('logmsline', {
        standaloneInit: true,
        isValueAbs : true,
        isLog : true,
        configureAxis : function (HCObj, FCObj) {
            var conf = HCObj[FC_CONFIG_STRING], xAxisObj = HCObj.xAxis, xConf = conf.x,
            FCchartObj = FCObj.chart,
            yAxisObj, i, len, yAxisConf, yAxisMaxValue, yAxisMinValue, stopMaxAtZero,
            setMinAsZero, setadaptiveymin, yCalTemp,
            numDivLines, adjustDiv, showYAxisValues, showLimits, showDivLineValues,
            yaxisvaluesstep, series = HCObj.series, seriesLength = series.length, y,
            seri, z, dataLength, point, axisGridManager = conf.axisGridManager,
            plotLength,plotObj,
            base = pluckNumber(FCchartObj.base, 10);
            if (base <= 0) {
                base = 10
            }
            //modify all series value
            for (y = 0; y < seriesLength; y += 1) {
                seri = series[y];
                if (seri.data) {
                    for (z = 0, dataLength = seri.data.length; z < dataLength; z += 1) {
                        point = seri.data[z];
                        point.y = getLog(point.y, base);
                    }
                }
            }

            /**
             * configure x axis
             */

            //add xaxisTitle
            xAxisObj.title.text = parseUnsafeString(FCchartObj.xaxisname);

            /**
             * configure y axis
             */



            yAxisObj = HCObj.yAxis[0], yAxisConf = conf[0];

            if(FCchartObj.invertyaxis === '1'){
                yAxisObj.reversed = true;
            }
            yAxisConf.isLog = true;
            yAxisMaxValue = FCchartObj.yaxismaxvalue;
            yAxisMinValue = FCchartObj.yaxisminvalue;

            // add axis Names
            yAxisObj.title.text = parseUnsafeString(FCchartObj.yaxisname);






            yCalTemp = getLogAxisLimits(yAxisConf.max || base , yAxisConf.min || 1, yAxisMaxValue, yAxisMinValue, base, FCchartObj.numminordivlines);
            //set min max
            yAxisObj.max = getLog(yCalTemp.Max, base);
            yAxisObj.min = getLog(yCalTemp.Min, base);
            //delete the min max
            delete yAxisConf.max;
            delete yAxisConf.min;
            if (yAxisObj.reversed && yAxisObj.min >= 0) {
                HCObj.plotOptions.series.threshold = yAxisObj.max;
            }
            //now put the trends in it
            if (FCObj.trendlines) {
                createTrendLine (FCObj.trendlines, [{//create the dummy axis Arr so that it works fine
                    max : yCalTemp.Max,
                    min : yCalTemp.Min,
                    plotLines : yAxisObj.plotLines,
                    plotBands : yAxisObj.plotBands
                }], conf);
            }

            //modify all plotLines and plotBands
            //lines
            for (y = 0, plotLength = yAxisObj.plotLines.length; y < plotLength; y += 1) {
                plotObj = yAxisObj.plotLines[y];
                if (plotObj.value) {
                    plotObj.value = getLog(plotObj.value, base);
                }
                if (plotObj.from) {
                    plotObj.from = getLog(plotObj.from, base);
                }
                if (plotObj.to) {
                    plotObj.to = getLog(plotObj.to, base);
                }
            }
            //bands
            for (y = 0, plotLength = yAxisObj.plotBands.length; y < plotLength; y += 1) {
                plotObj = yAxisObj.plotBands[y];
                if (plotObj.from) {
                    plotObj.from = getLog(plotObj.from, base);
                }
                if (plotObj.to) {
                    plotObj.to = getLog(plotObj.to, base);
                }
            }



            var gridLineColor = yAxisObj.gridLineColor,
            gridLineWidth = pluckNumber (FCchartObj.divlinethickness, 2),
            gridLineDashStyle = yAxisObj.gridLineDashStyle, text, divObj,
            numFormatterStr = 'yAxis', value,
            numberFormatter = conf.numberFormatter,
            divLineColor = pluck(FCchartObj.minordivlinealpha, defaultPaletteOptions.
                divLineColor[HCObj.chart.paletteIndex]),
            divLineAlpha = pluckNumber(FCchartObj.minordivlinealpha, defaultPaletteOptions.
                divLineAlpha[HCObj.chart.paletteIndex]),
            minorDivLineThickness = pluckNumber (FCchartObj.minordivlinethickness , 1),
            minorDivLineColor = pluck(FCchartObj.minordivlinecolor, divLineColor),
            minorDivLineAlpha = pluckNumber(FCchartObj.minordivlinealpha, divLineAlpha / 2),
            minorDivLineRGBA = convertColor(minorDivLineColor, minorDivLineAlpha);

            ///addd divlines
            for (y = 0, len = yCalTemp.divArr.length; y < len; y += 1) {
                divObj = yCalTemp.divArr[y];
                //if major axis
                if (divObj.ismajor) {
                    text = numberFormatter[numFormatterStr](divObj.value);// : BLANKSTRING;
                    value = getLog(divObj.value, base)
                    axisGridManager.addAxisGridLine(yAxisObj, value, text, gridLineWidth,
                        gridLineDashStyle, gridLineColor, 2);
                }
                else {//if minor axis
                    text = FCchartObj.showminordivlinevalues === '1' ? numberFormatter[numFormatterStr](divObj.value) : BLANKSTRING;
                    value = getLog(divObj.value, base)
                    axisGridManager.addAxisGridLine(yAxisObj, value, text, minorDivLineThickness,
                        gridLineDashStyle, minorDivLineRGBA, 2);
                }
            }

            //disable default labels and grid
            yAxisObj.labels.enabled = false;
            yAxisObj.gridLineWidth = INT_ZERO;
            yAxisObj.alternateGridColor = COLOR_TRANSPARENT;





            // sorting yAxis to fix negative values in bar chart
            yAxisObj.plotLines.sort(plotLineSortFN);

        },
        pointValueWatcher : function (HCObj, value, yAxisIndex) {
            if ( value > 0) {
                var obj, stackObj, FCconf = HCObj[FC_CONFIG_STRING];
                yAxisIndex = pluckNumber(yAxisIndex, 0);

                if (!FCconf[yAxisIndex]) {
                    FCconf[yAxisIndex] = {};
                }
                obj = FCconf[yAxisIndex];
                obj.max = obj.max > value ? obj.max : value;
                obj.min = obj.min < value ? obj.min : value;
            }
        },
        creditLabel : creditLabel
    }, chartAPI.mslinebase);

    chartAPI('logmscolumn2d', {
        standaloneInit: true,
        isLog : true,
        configureAxis : chartAPI.logmsline.configureAxis,
        pointValueWatcher : chartAPI.logmsline.pointValueWatcher,
        creditLabel : creditLabel,
        isValueAbs : true
    }, chartAPI.mscolumn2dbase);


    /////////////// ErrorBar2D ///////////
    chartAPI('errorbar2d', {
        standaloneInit: true,
        creditLabel : creditLabel,
        point : function (chartName, series, dataset, FCChartObj, HCObj, catLength, seriesIndex, MSStackIndex) {
            var hasValidPoint = false;
            // We proceed if there is data inside dataset object
            if (dataset.data) {
                var itemValue, errorValue, index, setColor, setAlpha, dataObj,
                setRatio, setAngle, setBorderWidth, isRoundEdges, isBar, is3d,
                setPlotBorderColor, setPlotBorderAlpha, colorArr, dataLabel,
                pointShadow, plotBorderAlpha,
                data = dataset.data,
                // HighChart configuration object
                conf = HCObj[FC_CONFIG_STRING],
                // take the series type
                seriesType = pluck(series.type, this.defaultSeriesType),
                // Check the chart is a stacked chart or not
                isStacked = HCObj.plotOptions[seriesType] && HCObj.plotOptions[seriesType].stacking,
                // 100% stacked chart takes absolute values only
                isValueAbs = pluck(this.isValueAbs, conf.isValueAbs, false),
                // showValues attribute in individual dataset
                datasetShowValues = pluckNumber(dataset.showvalues, conf.showValues),
                seriesYAxis = pluckNumber(series.yAxis, 0),
                // use3DLighting to show gradient color effect in 3D Column charts
                use3DLighting = pluckNumber(FCChartObj.use3dlighting, 1),
                NumberFormatter = HCObj[FC_CONFIG_STRING].numberFormatter,
                paletteIndex = HCObj.chart.paletteIndex;

                // Dataset seriesname
                series.name = getValidValue(dataset.seriesname);

                // If includeInLegend set to false
                // We set series.name blank
                if (pluckNumber(dataset.includeinlegend) === 0 || series.name === undefined) {
                    series.showInLegend = false;
                }


                // Error Bar Attributes
                //HCObj.chart.errorBarWidthPercent = pluckNumber(FCChartObj.errorBarWidthPercent, 70);
                //HCObj.chart.halfErrorBar = pluckNumber(FCChartObj.halfErrorBar, 1);
                series.errorBarWidthPercent = pluckNumber(FCChartObj.errorbarwidthpercent, 70);
                series.halfErrorBar = pluckNumber(FCChartObj.halferrorbar, 1);
                series.errorBarColor = convertColor(getFirstColor(pluck(dataset.errorbarcolor, FCChartObj.errorbarcolor, 'AAAAAA')),
                    pluck(dataset.errorbaralpha, FCChartObj.errorbaralpha, HUNDREDSTRING));
                series.errorBarThickness = pluckNumber(dataset.errorbarthickness, FCChartObj.errorbarthickness, 1);



                // Color of the individual series
                series.color = pluck(dataset.color, HCObj.colors[seriesIndex % HCObj.colors.length]).split(COMMASTRING)[0].replace(/^#?/g, "#");
                // Column border thickness
                setBorderWidth = pluck(FCChartObj.plotborderthickness , ONESTRING);
                // whether to use round edges or not in the column
                isRoundEdges = HCObj.chart.useRoundEdges;
                // is3d and isBar helps to get the column color by getColumnColor function
                // whether the chart is a 3D or Bar
                isBar = this.isBar;
                is3d = /3d$/.test(HCObj.chart.defaultSeriesType);

                // dataplot border color
                setPlotBorderColor = pluck(FCChartObj.plotbordercolor,
                    defaultPaletteOptions.plotBorderColor[paletteIndex]).split(COMMASTRING)[0];
                // dataplot border alpha
                setPlotBorderAlpha = FCChartObj.showplotborder == ZEROSTRING  ?
                ZEROSTRING : pluck(FCChartObj.plotborderalpha, HUNDREDSTRING);

                // Managing plot border color for 3D column chart
                // 3D column chart doesn't show the plotborder by default until we set showplotborder true
                setPlotBorderAlpha = is3d ? (FCChartObj.showplotborder ?
                    setPlotBorderAlpha : ZEROSTRING) : setPlotBorderAlpha;

                // Default  plotBorderColor  is FFFFFF for this 3d chart
                setPlotBorderColor = is3d ? pluck(FCChartObj.plotbordercolor, "#FFFFFF") : setPlotBorderColor;

                // Iterate through all level data
                // We are managing the data value labels and other cosmetics inside this loop
                for (index = 0; index < catLength; index += 1) {
                    // Individual data object
                    dataObj = data[index];
                    if (dataObj) {
                        // get the valid value
                        itemValue = NumberFormatter.getCleanValue(dataObj.value, isValueAbs);
                        // get the valid value
                        errorValue = NumberFormatter.getCleanValue(dataObj.errorvalue, isValueAbs);
                        if (itemValue === null) {
                            // add the data
                            series.data.push({
                                y : null
                            });
                            continue;
                        }

                        hasValidPoint = true;
                        // Label of the data
                        // We take the label from HighCharts configuration object
                        dataLabel = conf.oriCatTmp[index];
                        // Individual data point color
                        setColor = pluck(dataObj.color, dataset.color, HCObj.colors[seriesIndex % HCObj.colors.length]) +
                        COMMASTRING + getDefinedColor(FCChartObj.plotgradientcolor, defaultPaletteOptions.plotGradientColor[paletteIndex]);
                        // Alpha of the data point
                        setAlpha = pluck(dataObj.alpha, dataset.alpha, FCChartObj.plotfillalpha, HUNDREDSTRING);
                        setRatio = pluck(dataObj.ratio, dataset.ratio, FCChartObj.plotfillratio);
                        // defaultAngle depend upon item value
                        setAngle = pluck(360 - FCChartObj.plotfillangle, 90);
                        if (itemValue < 0) {
                            setAngle = 360 - setAngle;
                        }
                        // Used to set alpha of the shadow
                        pointShadow = {
                            opacity: setAlpha / 100
                        };
                        plotBorderAlpha = Math.min(setAlpha, setPlotBorderAlpha) + BLANKSTRING;

                        // calculate the color object for the set
                        colorArr = getColumnColor (setColor, setAlpha, setRatio,
                            setAngle, isRoundEdges, setPlotBorderColor, plotBorderAlpha, isBar, is3d);

                        // add the data
                        series.data.push(extend2(this.getPointStub(dataObj, itemValue, dataLabel, HCObj, dataset, datasetShowValues, seriesYAxis), {
                            y : itemValue,
                            shadow: pointShadow,
                            errorValue: errorValue,
                            color: colorArr[0],
                            borderColor: colorArr[1],
                            borderWidth: setBorderWidth,
                            use3DLighting : use3DLighting
                        }));

                        // Set the maximum and minimum found in data
                        // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                        this.pointValueWatcher(HCObj, itemValue, errorValue);

                    }
                    else {
                        // add the data
                        series.data.push({
                            y : null
                        });
                    }
                }
            }

            if (!hasValidPoint) {
                series.showInLegend = false
            }

            return series;
        },
        pointValueWatcher : function (HCObj, value, errorValue) {
            var pValue, nValue, obj, stackObj, FCconf = HCObj[FC_CONFIG_STRING],
            yAxisIndex = 0;
            if ( value !== null) {
                if (errorValue) {
                    pValue = value + errorValue
                    nValue = value - errorValue;
                }
                else {
                    pValue = nValue = value;
                }


                if (!FCconf[yAxisIndex]) {
                    FCconf[yAxisIndex] = {};
                }
                obj = FCconf[yAxisIndex];

                obj.max = obj.max > pValue ? obj.max : pValue;
                obj.min = obj.min < pValue ? obj.min : pValue;
                obj.max = obj.max > nValue ? obj.max : nValue;
                obj.min = obj.min < nValue ? obj.min : nValue;
            }
        }
    }, chartAPI.mscolumn2dbase);


    /////////////// ErrorBar2D ///////////
    //chartAPI('errorline2d', {
    chartAPI('errorline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        point: function (chartName, series, dataset, FCChartObj, HCObj, catLength, seriesIndex) {
            var hasValidPoint = false;
            if (dataset.data) {
                var itemValue, errorValue, index, lineColor, lineAlpha, lineThickness, lineDashed,
                lineDashLen, lineDashGap, drawAnchors, setAnchorAlpha, setAnchorBgAlpha,
                setAnchorBgColor, setAnchorBorderColor, setAnchorBorderThickness,
                setAnchorRadius, setAnchorSides, dataLabel, dataObj, pointShadow,
                setAnchorSidesDef, setAnchorRadiusDef, setAnchorBorderColorDef,
                setAnchorBorderThicknessDef, setAnchorBgColorDef, setAnchorAlphaDef,
                setAnchorBgAlphaDef, lineAlphaDef, lineColorDef,
                pointAnchorEnabled, dashStyle,
                // Data array in dataset object
                data = dataset.data,
                // HighChart configuration object
                conf = HCObj[FC_CONFIG_STRING],
                // take the series type
                seriesType = pluck(series.type, this.defaultSeriesType),
                // Check the chart is a stacked chart or not
                isStacked = HCObj.plotOptions[seriesType] && HCObj.plotOptions[seriesType].stacking,
                // 100% stacked chart takes absolute values only
                isValueAbs = pluck(this.isValueAbs, conf.isValueAbs, false),
                // showValues attribute in individual dataset
                datasetShowValues = pluckNumber(dataset.showvalues, conf.showValues),
                seriesYAxis = pluckNumber(series.yAxis, 0),
                NumberFormatter = conf.numberFormatter;

                // Dataset seriesname
                series.name = getValidValue(dataset.seriesname);

                // Line cosmetics attributes
                // Color of the line series
                lineColorDef = getFirstColor(pluck(dataset.color, FCChartObj.linecolor, HCObj.colors[seriesIndex % HCObj.colors.length]));
                // Alpha of the line
                lineAlphaDef = pluck(dataset.alpha, FCChartObj.linealpha, HUNDREDSTRING);
                // Line Thickness
                lineThickness = pluckNumber(dataset.linethickness, FCChartObj.linethickness, 2);
                // Whether to use dashline
                lineDashed = Boolean(pluckNumber(dataset.dashed, FCChartObj.linedashed, 0));

                // line dash attrs
                lineDashLen = pluckNumber(dataset.linedashlen, FCChartObj.linedashlen, 5);
                lineDashGap = pluckNumber(dataset.linedashgap, FCChartObj.linedashgap, 4);

                // Set the line color and alpha to
                // HC seris obj with FusionCharts color format using FCcolor obj
                series.color = {
                    FCcolor: {
                        color: lineColorDef,
                        alpha: lineAlphaDef
                    }
                };

                // Set the line thickness (line width)
                series.lineWidth = lineThickness;
                // Managing line series markers
                // Whether to drow the Anchor or not
                drawAnchors = pluckNumber(dataset.drawanchors, dataset.showanchors , FCChartObj.drawanchors, FCChartObj.showanchors);

                // Anchor cosmetics
                // We first look into dataset then chart obj and then default value.
                setAnchorSidesDef = pluckNumber(dataset.anchorsides,
                    FCChartObj.anchorsides, 0);
                setAnchorRadiusDef = pluckNumber(dataset.anchorradius,
                    FCChartObj.anchorradius, 3);
                setAnchorBorderColorDef = getFirstColor(pluck(dataset.anchorbordercolor,
                    FCChartObj.anchorbordercolor, lineColorDef));
                setAnchorBorderThicknessDef = pluckNumber(dataset.anchorborderthickness,
                    FCChartObj.anchorborderthickness, 1);
                setAnchorBgColorDef = getFirstColor(pluck(dataset.anchorbgcolor,
                    FCChartObj.anchorbgcolor, defaultPaletteOptions.anchorBgColor[HCObj.chart.paletteIndex]));
                setAnchorAlphaDef = pluck(dataset.anchoralpha, FCChartObj.anchoralpha,
                    HUNDREDSTRING);
                setAnchorBgAlphaDef = pluck(dataset.anchorbgalpha, FCChartObj.anchorbgalpha,
                    setAnchorAlphaDef);


                // Error Bar Attributes
                //HCObj.chart.errorBarWidthPercent = pluckNumber(FCChartObj.errorBarWidth, 70);
                //HCObj.chart.halfErrorBar = pluckNumber(FCChartObj.halfErrorBar, 1);
                series.errorBarWidth = pluckNumber(FCChartObj.errorbarwidth, 5);
                series.halfErrorBar = pluckNumber(FCChartObj.halferrorbar, 1);
                series.errorBarColor = convertColor(getFirstColor(pluck(dataset.errorbarcolor, FCChartObj.errorbarcolor, 'AAAAAA')),
                    pluck(dataset.errorbaralpha, FCChartObj.errorbaralpha, HUNDREDSTRING));
                series.errorBarThickness = Math.min(lineThickness, pluckNumber(dataset.errorbarthickness, FCChartObj.errorbarthickness, 1));


                // If includeInLegend set to false
                // We set series.name blank
                if (pluckNumber(dataset.includeinlegend) === 0 ||
                    series.name === undefined || (lineAlphaDef == 0 &&
                        drawAnchors !== 1)) {
                    series.showInLegend = false;
                }

                //set the marker attr at series
                series.marker = {
                    fillColor: {
                        FCcolor: {
                            color: setAnchorBgColorDef,
                            alpha: ((setAnchorBgAlphaDef * setAnchorAlphaDef) / 100) + BLANKSTRING
                        }
                    },
                    lineColor: {
                        FCcolor: {
                            color: setAnchorBorderColorDef,
                            alpha: setAnchorAlphaDef + BLANKSTRING
                        }
                    },
                    lineWidth: setAnchorBorderThicknessDef,
                    radius: setAnchorRadiusDef,
                    symbol: mapSymbolName(setAnchorSidesDef)
                };


                // Iterate through all level data
                for (index = 0; index < catLength; index += 1) {
                    // Individual data obj
                    // for further manipulation
                    dataObj = data[index];
                    if (dataObj) {
                        itemValue = NumberFormatter.getCleanValue(dataObj.value, isValueAbs);
                        errorValue = NumberFormatter.getCleanValue(dataObj.errorvalue, isValueAbs);

                        if (itemValue === null) {
                            // add the data
                            series.data.push({
                                y : null
                            });
                            continue;
                        }

                        hasValidPoint = true;

                        // Anchor cosmetics in data points
                        // Getting anchor cosmetics for the data points or its default values
                        setAnchorSides = pluckNumber(dataObj.anchorsides, setAnchorSidesDef);
                        setAnchorRadius = pluckNumber(dataObj.anchorradius, setAnchorRadiusDef);
                        setAnchorBorderColor = getFirstColor(pluck(dataObj.anchorbordercolor, setAnchorBorderColorDef));
                        setAnchorBorderThickness = pluckNumber(dataObj.anchorborderthickness, setAnchorBorderThicknessDef);
                        setAnchorBgColor = getFirstColor(pluck(dataObj.anchorbgcolor, setAnchorBgColorDef));
                        setAnchorAlpha = pluck(dataObj.anchoralpha, setAnchorAlphaDef);
                        setAnchorBgAlpha = pluck(dataObj.anchorbgalpha, setAnchorBgAlphaDef);

                        // Managing line series cosmetics
                        // Color of the line
                        lineColor = getFirstColor(pluck(dataObj.color, lineColorDef));

                        // alpha
                        lineAlpha = pluck(dataObj.alpha, lineAlphaDef);

                        // Create line dash
                        // Using dashStyle of HC
                        dashStyle = pluckNumber(dataObj.dashed, lineDashed) ?
                        getDashStyle(lineDashLen, lineDashGap, lineThickness) : undefined;

                        // Used to set alpha of the shadow
                        pointShadow = {
                            opacity: lineAlpha / 100
                        };
                        pointAnchorEnabled = drawAnchors === undefined ?
                        lineAlpha != 0 : !!drawAnchors;

                        // Finally add the data
                        // we call getPointStub function that manage displayValue, toolText and link
                        series.data.push(extend2(this.getPointStub(dataObj, itemValue, dataLabel, HCObj, dataset, datasetShowValues, seriesYAxis), {
                            y : itemValue,
                            shadow: pointShadow,
                            dashStyle: dashStyle,
                            errorValue: errorValue,
                            color: {
                                FCcolor: {
                                    color: lineColor,
                                    alpha: lineAlpha
                                }
                            },
                            marker : {
                                enabled: pointAnchorEnabled,
                                fillColor: {
                                    FCcolor: {
                                        color: setAnchorBgColor,
                                        alpha: (setAnchorBgAlpha * setAnchorAlpha / 100) + BLANKSTRING
                                    }
                                },
                                lineColor: {
                                    FCcolor: {
                                        color: setAnchorBorderColor,
                                        alpha: setAnchorAlpha
                                    }
                                },
                                lineWidth: setAnchorBorderThickness,
                                radius: setAnchorRadius,
                                symbol: mapSymbolName(setAnchorSides)
                            }
                        }));

                        // Set the maximum and minimum found in data
                        // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                        chartAPI.errorbar2d.pointValueWatcher(HCObj, itemValue, errorValue);
                    }
                    else {
                        // add the data
                        series.data.push({
                            y : null
                        });
                    }
                }
            }

            if (!hasValidPoint) {
                series.showInLegend = false
            }

            //return series
            return series;
        }
    }, chartAPI.mslinebase);


    /////////////// ErrorBar2D ///////////
    //chartAPI('errorline2d', {
    chartAPI('errorscatter', {
        standaloneInit: true,
        creditLabel : creditLabel,
        point: function (chartName, series, dataset, FCChartObj, HCObj, catLength, seriesIndex) {
            if (dataset.data) {
                var itemValueY, index, lineColor, lineAlpha, lineThickness, lineDashed,
                lineDashLen, lineDashGap, drawAnchors, dataLabel, dataObj, pointShadow,
                seriesAnchorSides, seriesAnchorRadius, seriesAnchorBorderColor,
                seriesAnchorBorderThickness, seriesAnchorBgColor, seriesAnchorAlpha,
                seriesAnchorBgAlpha, setAnchorSides, setAnchorRadius, setAnchorBorderColor,
                setAnchorBorderThickness, setAnchorBgColor, setAnchorAlpha, setAnchorBgAlpha,
                itemValueX, hasValidPoint = false,
                errorValue, hErrorValue, vErrorValue,
                pointStub, chartNameAPI = chartAPI[chartName],
                // Whether to draw scatter line
                drawLine = pluckNumber(dataset.drawline, 0),
                drawProgressionCurve = pluckNumber(dataset.drawprogressioncurve, 0),
                conf = HCObj[FC_CONFIG_STRING],
                // Data array in dataset object
                data = dataset.data,
                regressionData,
                dataLength = data.length,
                // showValues attribute in individual dataset
                datasetShowValues = pluckNumber(dataset.showvalues, conf.showValues),
                NumberFormatter = conf.numberFormatter,

                //Regratation line
                showRegressionLine = pluckNumber(dataset.showregressionline,
                    FCChartObj.showregressionline, 0);

                //add z index so that the regration line set at the back of the series
                series.zIndex = 1;

                // Dataset seriesname
                series.name = getValidValue(dataset.seriesname);
                // If showInLegend set to false
                // We set series.name blank
                if (pluckNumber(dataset.includeinlegend) === 0 || series.name === undefined) {
                    series.showInLegend = false;
                }


                // --------------------- ERRORBARS ------------------------- //

                var errorBarColor, errorBarAlpha, errorBarThickness, errorBarWidth,
                useHorizontalErrorBar, useVerticalErrorBar, useHorizontalErrorBarDef,
                useVerticalErrorBarDef;

                errorBarColor =  pluck(FCChartObj.errorbarcolor, 'AAAAAA');
                errorBarAlpha = pluck(FCChartObj.errorbaralpha, HUNDREDSTRING);
                errorBarThickness = pluckNumber(FCChartObj.errorbarthickness, 1);
                errorBarWidth = pluckNumber(FCChartObj.errorbarwidth, 5);


                series.halfVerticalErrorBar = pluckNumber(FCChartObj.halfverticalerrorbar , 1);
                series.verticalErrorBarColor = convertColor(pluck(
                    dataset.verticalerrorbarcolor, dataset.errorbarcolor,
                    FCChartObj.verticalerrorbarcolor, errorBarColor),
                pluck(dataset.verticalerrorbaralpha, dataset.errorbaralpha,
                    FCChartObj.verticalerrorbaralpha, errorBarAlpha));

                series.verticalErrorBarThickness = pluckNumber(
                    dataset.verticalerrorbarthickness, dataset.errorbarthickness,
                    FCChartObj.verticalerrorbarthickness, errorBarThickness);
                series.verticalErrorBarWidth = pluckNumber(dataset.verticalerrorbarwidth,
                    dataset.errorbarwidth, FCChartObj.verticalerrorbarwidth , errorBarWidth);

                series.halfHorizontalErrorBar = pluckNumber(FCChartObj.halfhorizontalerrorbar , 1);
                series.horizontalErrorBarColor = convertColor(pluck(
                    dataset.horizontalerrorbarcolor, dataset.errorbarcolor,
                    FCChartObj.horizontalerborbarcolor, errorBarColor),
                pluck(dataset.horizontalerrorbaralpha, dataset.errorbaralpha,
                    FCChartObj.horizontalerrorbaralpha, errorBarAlpha));

                series.horizontalErrorBarThickness = pluckNumber(
                    dataset.horizontalerrorbarthickness, dataset.errorbarthickness,
                    FCChartObj.horizontalerrorbarthickness, errorBarThickness);
                series.horizontalErrorBarWidth = pluckNumber(
                    dataset.horizontalerrorbarwidth, dataset.errorbarwidth,
                    FCChartObj.horizontalerrorbarwidth, errorBarWidth)

                useHorizontalErrorBarDef = pluckNumber(dataset.usehorizontalerrorbar, FCChartObj.usehorizontalerrorbar , 0);
                useVerticalErrorBarDef = pluckNumber(dataset.useverticalerrorbar, FCChartObj.useverticalerrorbar , 1);


                if (drawLine || drawProgressionCurve) {
                    if (drawProgressionCurve) {
                        series.type = 'spline';
                    }

                    // Line cosmetics attributes
                    // Color of the line series
                    lineColor = getFirstColor(pluck(dataset.color, FCChartObj.linecolor, HCObj.colors[seriesIndex % HCObj.colors.length]));
                    // Alpha of the line
                    lineAlpha = pluck(dataset.alpha, FCChartObj.linealpha, HUNDREDSTRING);
                    // Line Thickness
                    lineThickness = pluckNumber(dataset.linethickness, FCChartObj.linethickness, 2);
                    // Whether to use dashline
                    lineDashed = Boolean(pluckNumber(dataset.dashed, FCChartObj.linedashed, 0));

                    // line dash attrs
                    lineDashLen = pluckNumber(dataset.linedashlen, FCChartObj.linedashlen, 5);
                    lineDashGap = pluckNumber(dataset.linedashgap, FCChartObj.linedashgap, 4);

                    // Set the line color and alpha to
                    // HC seris obj with FusionCharts color format using FCcolor obj
                    series.color = {
                        FCcolor: {
                            color: lineColor,
                            alpha: lineAlpha
                        }
                    };

                    // Set the line thickness (line width)
                    series.lineWidth = lineThickness;
                    // Create line dash
                    // Using dashStyle of HC
                    series.dashStyle = lineDashed ? getDashStyle(lineDashLen, lineDashGap, lineThickness) : undefined;
                }

                // Managing line series markers
                // Whether to drow the Anchor or not
                drawAnchors = Boolean(pluckNumber(dataset.drawanchors, dataset.showanchors,
                    FCChartObj.drawanchors, FCChartObj.showanchors, 1));

                // Anchor cosmetics
                // We first look into dataset then chart obj and then default value.
                seriesAnchorSides = pluckNumber(dataset.anchorsides,
                    FCChartObj.anchorsides, seriesIndex + 3);
                seriesAnchorRadius = pluckNumber(dataset.anchorradius,
                    FCChartObj.anchorradius, 3);
                seriesAnchorBorderColor = getFirstColor(pluck(dataset.anchorbordercolor, dataset.color,
                    FCChartObj.anchorbordercolor, lineColor, HCObj.colors[seriesIndex % HCObj.colors.length]));
                seriesAnchorBorderThickness = pluckNumber(dataset.anchorborderthickness,
                    FCChartObj.anchorborderthickness, 1);
                seriesAnchorBgColor = getFirstColor(pluck(dataset.anchorbgcolor,
                    FCChartObj.anchorbgcolor, defaultPaletteOptions.anchorBgColor[HCObj.chart.paletteIndex]));
                seriesAnchorAlpha = pluck(dataset.anchoralpha, FCChartObj.anchoralpha,
                    HUNDREDSTRING);
                seriesAnchorBgAlpha = pluck(dataset.anchorbgalpha, FCChartObj.anchorbgalpha,
                    seriesAnchorAlpha);


                //set the marker attr at series
                series.marker = {
                    fillColor: this.getPointColor(seriesAnchorBgColor, HUNDREDSTRING),
                    lineColor: {
                        FCcolor: {
                            color: seriesAnchorBorderColor,
                            alpha: seriesAnchorAlpha + BLANKSTRING
                        }
                    },
                    lineWidth: seriesAnchorBorderThickness,
                    radius: seriesAnchorRadius,
                    symbol: mapSymbolName(seriesAnchorSides)
                };

                if (showRegressionLine) {
                    series.events = {
                        hide : this.hideRLine,
                        show : this.showRLine
                    };
                    //regration object used in XY chart
                    //create here to avoid checking always
                    var regressionObj = {
                        sumX : 0,
                        sumY : 0,
                        sumXY : 0,
                        sumXsqure : 0,
                        sumYsqure : 0,
                        xValues : [],
                        yValues : []
                    }, regSeries,
                    showYOnX = pluckNumber(dataset.showyonx, FCChartObj.showyonx, 1),
                    regressionLineColor = getFirstColor(pluck(dataset.regressionlinecolor,
                        FCChartObj.regressionlinecolor, seriesAnchorBorderColor)),
                    regressionLineThickness = pluckNumber(dataset.regressionlinethickness,
                        FCChartObj.regressionlinethickness, seriesAnchorBorderThickness),
                    regressionLineAlpha = getFirstAlpha(pluckNumber(dataset.regressionlinealpha,
                        FCChartObj.regressionlinealpha, seriesAnchorAlpha)),
                    regLineColor = convertColor(regressionLineColor, regressionLineAlpha);
                }

                // Iterate through all level data
                for (index = 0; index < dataLength; index += 1) {
                    // Individual data obj
                    // for further manipulation
                    dataObj = data[index];
                    if (dataObj) {
                        itemValueY = NumberFormatter.getCleanValue(dataObj.y);
                        itemValueX = NumberFormatter.getCleanValue(dataObj.x);
                        errorValue = NumberFormatter.getCleanValue(dataObj.errorvalue);

                        if (itemValueY === null) {
                            series.data.push({
                                y: null,
                                x: itemValueX
                            });
                            continue;
                        }

                        hasValidPoint = true;

                        pointStub = chartNameAPI
                        .getPointStub(dataObj, itemValueY, NumberFormatter.xAxis(itemValueX), HCObj, dataset, datasetShowValues);


                        // Anchor cosmetics
                        // We first look into dataset then chart obj and then default value.
                        setAnchorSides = pluckNumber(dataObj.anchorsides, seriesAnchorSides);
                        setAnchorRadius = pluckNumber(dataObj.anchorradius, seriesAnchorRadius);
                        setAnchorBorderColor = getFirstColor(pluck(dataObj.anchorbordercolor, seriesAnchorBorderColor));
                        setAnchorBorderThickness = pluckNumber(dataObj.anchorborderthickness, seriesAnchorBorderThickness);
                        setAnchorBgColor = getFirstColor(pluck(dataObj.anchorbgcolor, seriesAnchorBgColor));
                        setAnchorAlpha = pluck(dataObj.anchoralpha, seriesAnchorAlpha);
                        setAnchorBgAlpha = pluck(dataObj.anchorbgalpha, seriesAnchorBgAlpha);

                        //----- Whether to use Horizontal or Vertical Error value -----//

                        useHorizontalErrorBar = Boolean(pluckNumber(dataObj.usehorizontalerrorbar, useHorizontalErrorBarDef));
                        useVerticalErrorBar = Boolean(pluckNumber(dataObj.useverticalerrorbar, useVerticalErrorBarDef));
                        hErrorValue = vErrorValue = 0;
                        if (useHorizontalErrorBar) {
                            hErrorValue = NumberFormatter.getCleanValue(pluck(dataObj.horizontalerrorvalue, errorValue));
                        }
                        if (useVerticalErrorBar) {
                            vErrorValue = NumberFormatter.getCleanValue(pluck(dataObj.verticalerrorvalue, errorValue));
                        }

                        // Finally add the data
                        // we call getPointStub function that manage displayValue, toolText and link
                        series.data.push({
                            y: itemValueY,
                            x: itemValueX,
                            hErrorValue: hErrorValue,
                            vErrorValue: vErrorValue,
                            useHorizontalErrorBar: useHorizontalErrorBar,
                            useVerticalErrorBar: useVerticalErrorBar,
                            displayValue : pointStub.displayValue,
                            toolText : pointStub.toolText,
                            link: pointStub.link,
                            marker: {
                                enabled: drawAnchors,
                                fillColor: {
                                    FCcolor: {
                                        color: setAnchorBgColor,
                                        alpha: ((setAnchorBgAlpha * setAnchorAlpha) / 100) + BLANKSTRING
                                    }
                                },
                                lineColor: {
                                    FCcolor: {
                                        color: setAnchorBorderColor,
                                        alpha: setAnchorAlpha
                                    }
                                },
                                lineWidth: setAnchorBorderThickness,
                                radius: setAnchorRadius,
                                symbol: mapSymbolName(setAnchorSides)
                            }
                        });

                        // Set the maximum and minimum found in data
                        // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                        this.pointValueWatcher(HCObj, itemValueY + vErrorValue, itemValueX + hErrorValue, showRegressionLine && regressionObj);
                        if (series.halfHorizontalErrorBar == 0) {
                            this.pointValueWatcher(HCObj, itemValueY, itemValueX - hErrorValue, showRegressionLine && regressionObj);
                        }
                        if (series.halfVerticalErrorBar == 0) {
                            this.pointValueWatcher(HCObj, itemValueY - vErrorValue, itemValueX, showRegressionLine && regressionObj);
                        }
                    }
                    else {
                        // add the data
                        series.data.push({
                            y : null
                        });
                    }
                }

                if (showRegressionLine) {
                    regressionData = this.getRegressionLineSeries(regressionObj,
                        showYOnX, dataLength);

                    this.pointValueWatcher(HCObj, regressionData[0].y,
                        regressionData[0].x);
                    this.pointValueWatcher(HCObj, regressionData[1].y,
                        regressionData[1].x);

                    regSeries = {
                        type : 'line',
                        color : regLineColor,
                        showInLegend: false,
                        lineWidth : regressionLineThickness,
                        enableMouseTracking : false,
                        marker : {
                            enabled : false
                        },
                        data: regressionData,
                        zIndex : 0
                    };
                    series = [series, regSeries];
                }
            }
            // If all the values in current dataset is null
            // we will not show its legend
            if (!hasValidPoint) {
                series.showInLegend = false
            }
            return series;
        }
    }, chartAPI.scatterbase);


    /////////////// WaterFall2D ///////////
    chartAPI('waterfall2d', {
        standaloneInit: true,
        point : function (chartName, series, data, FCChartObj, HCObj) {

            var
            itemValue, index, countPoint, dataLabel, setColor, setAlpha,
            setRatio, colorArr, dataObj, setAngle, showLabel, pointShadow,
            lineThickness = pluck(FCChartObj.connectorthickness, 1),
            zLine = {
                step : true,
                type : 'line',
                enableMouseTracking  : false,
                data: [],
                dataLabels : {
                    enabled : false
                },
                marker : {
                    enabled : false
                },
                dashStyle : FCChartObj.connectordashed === '1' ? getDashStyle(
                    pluckNumber(FCChartObj.connectordashlen, 2), pluckNumber(
                        FCChartObj.connectordashgap, 2), lineThickness) : undefined,
                drawVerticalJoins : false,
                color : convertColor(pluck(FCChartObj.connectorcolor, "000000"), pluck(FCChartObj.connectoralpha, 100)),
                lineWidth : lineThickness
            },
            // length of the data
            length = data.length,
            // HighCharts configuration
            conf = HCObj[FC_CONFIG_STRING],
            // axisGridManager to manage the axis
            // it contains addVline, addXaxisCat, addAxisAltGrid and
            // addAxisGridLine function
            axisGridManager = conf.axisGridManager,
            // HighCharts xAxis obj
            xAxisObj = HCObj.xAxis,
            // palette of the chart
            paletteIndex = HCObj.chart.paletteIndex,
            // xAxis configuration it contains configuration of xAxis like
            // catCount, horizontalAxisNamePadding, horizontalLabelPadding,
            // labelDisplay, slantLabels, staggerLines
            xAxisConf = conf.x,
            // Array of default colors (paletteColors)
            // We use it to specify the individual data point color
            defaultColors = HCObj.colors,
            // Length of the default colors
            defaultColLen = HCObj.colors.length,
            // is3d and isBar helps to get the column color by getColumnColor function
            // whether the chart is a 3D or Bar
            is3d = /3d$/.test(HCObj.chart.defaultSeriesType),
            isBar = this.isBar,
            // dataplot border width
            // Managing for 3D too
            showPlotBorder = pluck(FCChartObj.showplotborder,
                (is3d ? ZEROSTRING : ONESTRING) ) === ONESTRING,
            // 3D column chart doesn't show the plotborder by default until we set showplotborder true
            setBorderWidth = showPlotBorder ?
            (is3d ? 1 : pluckNumber(FCChartObj.plotborderthickness, 1)) : 0,
            // whether to use round edges or not in the column
            isRoundEdges = HCObj.chart.useRoundEdges,
            // dataplot border alpha
            setPlotBorderAlpha = pluckNumber(FCChartObj.plotborderalpha, FCChartObj.plotfillalpha, 100) + BLANKSTRING,
            // dataplot border color
            setPlotBorderColor = pluck(FCChartObj.plotbordercolor,
                defaultPaletteOptions.plotBorderColor[paletteIndex]).split(COMMASTRING)[0],
            // Original index of the data inside the loop
            catIndex = 0,
            issum,
            cumulative,
            // use3DLighting to show gredient color effect in 3D Column charts
            use3DLighting = Boolean(pluckNumber(FCChartObj.use3dlighting, 1)),
            total = 0,
            lastComTotal = 0,
            plotgradientcolor = getDefinedColor(FCChartObj.plotgradientcolor, defaultPaletteOptions.plotGradientColor[paletteIndex]);
            NumberFormatter = HCObj[FC_CONFIG_STRING].numberFormatter;

            // Iterate through all level data
            // We are managing the data value labels and other cosmetics inside this loop
            for (index = 0, countPoint = 0; index < length; index += 1) {

                // individual data obj
                dataObj = data[index];

                // Managing vLines in between <set> elements
                // If its vline
                // we call the grid manager addVline function, that creates vline
                // and we stop execution here and continue the loop to next data
                if (dataObj.vline) {
                    axisGridManager.addVline(xAxisObj, dataObj, catIndex, HCObj);
                    continue;
                }

                // get the valid value
                // parsePointValue check the its a value value of not and return
                // the valid value

                itemValue = NumberFormatter.getCleanValue(dataObj.value);
                issum = pluckNumber(dataObj.issum, 0);
                cumulative = pluckNumber(dataObj.cumulative, 1);
                if (issum) {
                    itemValue = cumulative ? total : (total - lastComTotal);
                    lastComTotal = total;
                    zLine.data.push({
                        y : null,
                        x : index - 0.5
                    });
                }
                else {
                    total += itemValue
                }

                // we check showLabel in individual data
                // if its set to 0 than we do not show the particular label
                showLabel = pluckNumber(dataObj.showlabel, 1);

                // Label of the data
                // getFirstValue returns the first defined value in arguments
                // we check if showLabel is not set to 0 in data
                // then we take the label given in data, it can be given using label as well as name too
                // we give priority to label if label is not there, we check the name attribute
                dataLabel = parseUnsafeString(!showLabel ? BLANKSTRING : getFirstValue(dataObj.label, dataObj.name));

                // adding label in HighChart xAxis categories
                // increase category counter by one
                axisGridManager.addXaxisCat(xAxisObj, catIndex, catIndex, dataLabel);
                catIndex += 1;

                // <set> cosmetics
                // Color of the particular data
                setColor = pluck(dataObj.color, defaultColors[countPoint % defaultColLen]) +
                COMMASTRING + plotgradientcolor;
                // Alpha of the data
                setAlpha = pluck(dataObj.alpha, FCChartObj.plotfillalpha, HUNDREDSTRING);
                // Fill ratio of the data
                setRatio = pluck(dataObj.ratio, FCChartObj.plotfillratio);
                // defaultAngle depend upon item value
                setAngle = pluck(360 - FCChartObj.plotfillangle, 90);
                if (itemValue < 0) {
                    setAngle = 360 - setAngle;
                }

                // Used to set alpha of the shadow
                pointShadow = {
                    opacity: setAlpha / 100,
                    inverted: isBar
                };

                // calculate the color object for the column
                colorArr = getColumnColor (setColor, setAlpha, setRatio,
                    setAngle, isRoundEdges, setPlotBorderColor,
                    pluck(dataObj.alpha, setPlotBorderAlpha), isBar, is3d);

                // Finally add the data
                // we call getPointStub function that manage displayValue, toolText and link
                series.data.push( extend2(
                    this.getPointStub(dataObj, itemValue, dataLabel, HCObj), {
                        y: itemValue,
                        _FCY : itemValue < 0 ? (total - itemValue) : total,
                        shadow: pointShadow,
                        color: colorArr[0],
                        borderColor: colorArr[1],
                        borderWidth: setBorderWidth,
                        use3DLighting: use3DLighting
                    })
                );
                zLine.data.push({
                    y : total,
                    x : index
                });
                // Set the maximum and minimum found in data
                // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                this.pointValueWatcher(HCObj, total);
                countPoint += 1;
            }

            //add the total
            if (FCChartObj.showsumatend != '0') {
                dataLabel = parseUnsafeString(getFirstValue(FCChartObj.sumlabel, 'Total'));

                // adding label in HighChart xAxis categories
                // increase category counter by one
                axisGridManager.addXaxisCat(xAxisObj, catIndex, catIndex, dataLabel);
                catIndex += 1;

                setColor = defaultColors[countPoint % defaultColLen] + COMMASTRING + plotgradientcolor;
                setAlpha = pluck(FCChartObj.plotfillalpha, HUNDREDSTRING);
                setAngle = pluck(360 - FCChartObj.plotfillangle, 90);
                if (total < 0) {
                    setAngle = 360 - setAngle;
                }

                // Used to set alpha of the shadow
                pointShadow = {
                    opacity: setAlpha / 100,
                    inverted: isBar
                };

                // calculate the color object for the column
                colorArr = getColumnColor (setColor, setAlpha, FCChartObj.plotfillratio,
                    setAngle, isRoundEdges, setPlotBorderColor, setPlotBorderAlpha, isBar, is3d);

                series.data.push( extend2(
                    this.getPointStub({}, total, dataLabel, HCObj), {
                        y: total,
                        shadow: pointShadow,
                        color: colorArr[0],
                        borderColor: colorArr[1],
                        borderWidth: setBorderWidth,
                        use3DLighting: use3DLighting
                    })
                );

            }



            // set the xAxisConf catCount for further use
            xAxisConf.catCount = catIndex;
            if (FCChartObj.showconnectors != '0')  {
                series = [zLine, series];
            }
            return series;
        },
        defaultSeriesType : 'floatedcolumn'
    }, singleSeriesAPI);

    /////////////// MultiLevelPie ///////////

    ///function to add mspie data
    var colorCount = 0;
    function addMSPieCat(cat, HCObj, lavel, start, end, alpha) {
        //[index % HCObj.colors.length])
        var sLavel, sharePercent, i, space, label, series = HCObj.series, colors = HCObj.colors;

        if (lavel === 0) {
            colorCount = 0;
        }
        //if the series dosen't exist
        //add a blank series
        
        if (!series[lavel]) {
            series[lavel] = {
                data: [{
                    toolText: false,
                    doNotSlice: true,//added to stop slicing
                    y: 100,
                    visible: false,
                    color: 'rgba(255,255,255,0)'//set the color a s transparent
                }]
            };
        }
        sLavel = series[lavel];
        ////
        //reduce the blank labels value[may need to split the slice]
        //check blank-slice and the start get same
        //find the gap between blank lavel and start
        space = start - 100 + sLavel.data[sLavel.data.length - 1].y;
        //there has a space
        if (space) {
            sLavel.data.splice(sLavel.data.length - 1, 0, {
                toolText: false,
                doNotSlice: true,//added to stop slicing
                y: space,
                visible: false,
                color: 'rgba(255,255,255,0)'//set the color as transparent
            });
        }
        sLavel.data[sLavel.data.length - 1].y = 100 - end;

        //add the category
        sharePercent = (end - start) / cat.length;
        for (i = cat.length - 1; i >= 0 ; i -= 1) {
            label = parseUnsafeString(pluck(cat[i].label, cat[i].name));
            sLavel.data.splice(sLavel.data.length - 1, 0, {
                displayValue: label,
                toolText: parseUnsafeString(pluck(cat[i].tooltext, cat[i].hovertext, label)),
                y: sharePercent,
                link: getValidValue(cat[i].link),
                doNotSlice: true,//added to stop slicing
                color: convertColor(cat[i].color || colors[colorCount % colors.length], cat[i].alpha || alpha)
            });
            colorCount += 1;
            if (cat[i].category) {
                addMSPieCat(cat[i].category, HCObj, lavel + 1, start, (i === 0) ? end : (start +  sharePercent), alpha);
            }
            start +=  sharePercent;
        }
    }




    chartAPI('multilevelpie', {
        standaloneInit: true,
        defaultSeriesType : 'pie',
        defaultPlotShadow: 1,
        series : function (FCObj, HCObj, chartName, width, height) {
            var FCChartObj = FCObj.chart, seriesArr = HCObj.series, y;
            //disable legend
            HCObj.legend.enabled = false;
            //stop point slicing
            HCObj.plotOptions.pie.allowPointSelect = false;
            //set the bordercolor
            HCObj.plotOptions.series.borderColor = convertColor(pluck(FCChartObj.plotbordercolor,
                FCChartObj.piebordercolor, 'FFFFFF'), FCChartObj.showplotborder != '0' ?
            pluck(FCChartObj.plotborderalpha, FCChartObj.pieborderalpha, 100) : 0);
            HCObj.plotOptions.series.borderWidth = FCChartObj.pieborderthickness || 1;
            HCObj.plotOptions.pie.startingAngle = 0; //set the chart's startingAngle as 0 [alwase]
            HCObj.plotOptions.pie.size = '100%';
            //make the plotBackground transparent
            HCObj.chart.plotBorderColor = 0;
            HCObj.chart.plotBackgroundColor = null;

            //remove the plotboder
            HCObj.chart.plotBorderWidth = 0;
            if (FCObj.category) {
                //send default alpha as it ma suplyed by the chart piefillAlpha
                addMSPieCat(FCObj.category, HCObj, 0, 0, 100, pluck(FCChartObj.plotfillalpha, FCChartObj.piefillalpha, 100));
            }
            var pierad = parseInt(FCChartObj.pieradius), serieswidth,
            inner = 0, ispersent = true;
            if (pierad) {
                serieswidth = (2 * pierad) / seriesArr.length;
                ispersent = false;
            }
            else {
                serieswidth = parseInt(100 / seriesArr.length , 10);
            }
            HCObj.plotOptions.series.dataLabels.distance = 0;
            HCObj.plotOptions.series.dataLabels.placeInside  = true;
            //iterate through all data series
            for (y = 0; y < seriesArr.length; y += 1) {

                //set the size and iner radious
                seriesArr[y].innerSize = inner + (ispersent ? '%' : '');
                seriesArr[y].size = (inner += serieswidth) + (ispersent ? '%' : '');
                if (seriesArr[y].data[seriesArr[y].data.length - 1].y === 0) {
                    seriesArr[y].data.pop();
                }
            }


        },
        //manage the space for title only
        spaceManager: function (hcJSON, fcJSON, width, height) {
            var conf = hcJSON[FC_CONFIG_STRING],
            marginLeftExtraSpace = conf.marginLeftExtraSpace,
            marginTopExtraSpace = conf.marginTopExtraSpace,
            marginBottomExtraSpace = conf.marginBottomExtraSpace,
            marginRightExtraSpace = conf.marginRightExtraSpace,
            workingWidth = width - (marginLeftExtraSpace + marginRightExtraSpace +
                hcJSON.chart.marginRight + hcJSON.chart.marginLeft),
            workingHeight = height - (marginBottomExtraSpace + marginTopExtraSpace + hcJSON.chart.marginBottom +
                hcJSON.chart.marginTop);
            titleSpaceManager(hcJSON, fcJSON, workingWidth, workingHeight * 0.4);
        },

        creditLabel : creditLabel
    }, singleSeriesAPI);

    /////////////// Radar ///////////
    chartAPI('radar', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'radar',
        spaceManager: function (hcJSON, fcJSON, width, height) {
            //make the plotBackground transparent
            hcJSON.chart.plotBorderWidth = 0;
            hcJSON.chart.plotBackgroundColor = null;
            var conf = hcJSON[FC_CONFIG_STRING],
            xAxisConf = conf.x,
            xAxis = hcJSON.xAxis,
            fcJSONChart = fcJSON.chart,
            marginLeftExtraSpace = conf.marginLeftExtraSpace,
            marginTopExtraSpace = conf.marginTopExtraSpace,
            marginBottomExtraSpace = conf.marginBottomExtraSpace,
            marginRightExtraSpace = conf.marginRightExtraSpace,
            workingWidth = width - (marginLeftExtraSpace + marginRightExtraSpace +
                hcJSON.chart.marginRight + hcJSON.chart.marginLeft),
            workingHeight = height - (marginBottomExtraSpace + marginTopExtraSpace + hcJSON.chart.marginBottom +
                hcJSON.chart.marginTop);
            workingHeight -= titleSpaceManager(hcJSON, fcJSON, workingWidth, workingHeight * 0.4);

            //set the xAxis min max
            xAxis.min = pluckNumber(xAxisConf.min, 0);
            xAxis.max = pluckNumber(xAxisConf.max, xAxisConf.catCount - 1);
            xAxis.gridLineColor = convertColor(pluck(fcJSONChart.radarspikecolor,
                defaultPaletteOptions.divLineColor[hcJSON.chart.paletteIndex]),
            pluckNumber(fcJSONChart.radarspikealpha, fcJSONChart.radarinlinealpha,
                defaultPaletteOptions.divLineAlpha[hcJSON.chart.paletteIndex]));
            xAxis.gridLineWidth = pluckNumber(fcJSONChart.radarspikethickness, 1);
            xAxis.showRadarBorder = pluckNumber(fcJSONChart.showradarborder, 1);
            xAxis.radarBorderThickness = pluckNumber(fcJSONChart.radarborderthickness, 2);
            xAxis.radarBorderColor = convertColor(pluck(fcJSONChart.radarbordercolor,
                defaultPaletteOptions.divLineColor[hcJSON.chart.paletteIndex]),
            pluckNumber(fcJSONChart.radarborderalpha, 100));
            xAxis.radarFillColor = convertColor(pluck(fcJSONChart.radarfillcolor,
                defaultPaletteOptions.altHGridColor[hcJSON.chart.paletteIndex]),
            pluckNumber(fcJSONChart.radarfillalpha, defaultPaletteOptions.altHGridAlpha[hcJSON.chart.paletteIndex]));


            if (hcJSON.legend.enabled) {
                if (pluck(fcJSONChart.legendposition, POSITION_BOTTOM).toLowerCase() != POSITION_RIGHT) {
                    workingHeight -= placeLegendBlockBottom(hcJSON, fcJSON, workingWidth,
                        workingHeight / 2);
                } else {
                    workingWidth -= placeLegendBlockRight(hcJSON, fcJSON,
                        workingWidth / 3, workingHeight);
                }
            }
            var pieRadius = pluckNumber(fcJSONChart.radarradius, 0),
            lineHeight2 = 2 * pluckNumber(parseInt(xAxis.labels.style.lineHeight, 10), 12),
            labelPadding2 = 6,
            //100 px fixed label width
            minOfWH = Math.min(workingWidth - (100 + labelPadding2), workingHeight - (lineHeight2 + labelPadding2)),
            pieMinRadius = pieRadius === 0 ? minOfWH * 0.5 : pieRadius;
            if (!(pieMinRadius > 0)) {
                pieMinRadius = 5;//min 5 px radius
            }
            hcJSON.chart.axisRadius = pieMinRadius;
        },
        anchorAlpha: '100',
        showValues : 0,
        isRadar : true
    }, chartAPI.msareabase);

    /* Drag Node Chart */
    /////////////// DragArea ///////////
    chartAPI('dragnode', {
        standaloneInit: true,
        postSeriesAddition: function () {
            var api = this,
            result = api.base.postSeriesAddition &&
            api.base.postSeriesAddition.apply(api, arguments);
            return result;
        },

        point: function (chartName, series, dataset, FCChartObj, HCObj, catLength, seriesIndex) {
            if (dataset.data) {
                var itemValueY, index, drawAnchors, dataObj,
                itemValueX, hasValidPoint = false,
                pointStub, chartNameAPI = chartAPI[chartName],
                conf = HCObj[FC_CONFIG_STRING],
                // Data array in dataset object
                data = dataset.data,
                dataLength = data && data.length,
                // showValues attribute in individual dataset
                datasetShowValues = pluckNumber(dataset.showvalues, conf.showValues),
                NumberFormatter = conf.numberFormatter,
                UNDERSCORE = '_';

                //add z index so that the regration line set at the back of the series
                series.zIndex = 1;

                // Dataset seriesname
                series.name = getValidValue(dataset.seriesname);
                // If showInLegend set to false
                // We set series.name blank
                if (pluckNumber(dataset.includeinlegend) === 0 || series.name === undefined) {
                    series.showInLegend = false;
                }


                var plotFillAlpha, showPlotBorder, plotBorderColor, plotBorderThickness, plotBorderAlpha, use3DLighting, nodeScale, negativeColor;

                //Plot Properties
                plotFillAlpha = pluck(FCChartObj.plotfillalpha, HUNDREDSTRING);
                showPlotBorder = pluckNumber(FCChartObj.showplotborder, 1);
                plotBorderColor = getFirstColor(pluck(FCChartObj.plotbordercolor, "666666"));
                plotBorderThickness = pluckNumber(FCChartObj.plotborderthickness, 1);
                plotBorderAlpha = pluck(FCChartObj.plotborderalpha, '95');

                //Node Properties
                use3DLighting = Boolean(pluckNumber(FCChartObj.use3dlighting, 1));

                var datasetId, datasetColor, datasetAlpha, datasetShowPlotBorder,
                datasetPlotBorderColor, datasetPlotBorderThickness, datasetPlotBorderAlpha,
                datasetAllowDrag;

                //Store attributes
                datasetId = pluck(dataset.id, seriesIndex);
                datasetColor = getFirstColor(pluck(dataset.color, HCObj.colors[seriesIndex % HCObj.colors.length]));
                datasetAlpha = pluck(dataset.plotfillalpha, dataset.nodeFillAlpha, plotFillAlpha);
                //Data set plot properties
                datasetShowPlotBorder = Boolean(pluckNumber(dataset.showplotborder, showPlotBorder));
                datasetPlotBorderColor = getFirstColor(pluck(dataset.plotbordercolor, dataset.nodebordercolor, plotBorderColor));
                datasetPlotBorderThickness = pluckNumber(dataset.plotborderthickness, dataset.nodeborderthickness, plotBorderThickness);
                datasetPlotBorderAlpha = (datasetShowPlotBorder) ? pluck(dataset.plotborderalpha, dataset.nodeborderalpha, plotBorderAlpha) : ZEROSTRING;
                //Drag Border properties
                datasetAllowDrag = Boolean(pluckNumber(dataset.allowdrag, "1"));


                // Add marker to the series to draw the Legend
                series.marker = {
                    enabled: true,
                    fillColor: convertColor(datasetColor, datasetAlpha),
                    lineColor: {
                        FCcolor: {
                            color: datasetPlotBorderColor,
                            alpha: datasetPlotBorderAlpha
                        }
                    },
                    lineWidth: datasetPlotBorderThickness,
                    symbol: 'diamond'
                }

                var allowDrag, shape, height, width, radius, numSides,
                labelAlign, color, setId, alpha, fillColor, nodeW, nodeH;

                // Iterate through all level data
                for (index = 0; index < dataLength; index += 1) {
                    // Individual data obj
                    // for further manipulation
                    dataObj = data[index];
                    if (dataObj) {
                        itemValueY = NumberFormatter.getCleanValue(dataObj.y);
                        itemValueX = NumberFormatter.getCleanValue(dataObj.x);

                        if (itemValueY === null) {
                            series.data.push({
                                y: null,
                                x: itemValueX
                            });
                            continue;
                        }

                        hasValidPoint = true;

                        pointStub = chartNameAPI
                        .getPointStub(dataObj, itemValueY, NumberFormatter.xAxis(itemValueX), HCObj, dataset, datasetShowValues);


                        setId = pluck(dataObj.id, (datasetId + UNDERSCORE + index));
                        allowDrag = Boolean(getValidValue(dataObj.allowdrag, datasetAllowDrag));
                        shape = getValidValue(dataObj.shape, 'rectangle').toLowerCase();
                        height = getValidValue(dataObj.height, 10);
                        width = getValidValue(dataObj.width, 10);
                        radius = getValidValue(dataObj.radius, 10);
                        numSides = getValidValue(dataObj.numsides, 4);
                        color = getFirstColor(pluck(dataObj.color, datasetColor));
                        alpha = pluck(dataObj.alpha, datasetAlpha);

                        //If not required shape then set it to rectangle
                        switch (shape) {
                            case 'circle':
                                break;
                            case 'polygon':
                                shape = mapSymbolName(numSides);
                                break;
                            default :
                                shape = 'square';
                                break;
                        }

                        if (shape == 'square') {
                            nodeW = width;
                            nodeH = height;
                        } else {
                            nodeW = radius * 1.5;
                            nodeH = radius * 1.5;
                        }

                        if (use3DLighting) {
                            fillColor = this.getPointColor(color, alpha);
                        } else {
                            fillColor = convertColor(color, alpha);
                        }

                        // Finally add the data
                        // we call getPointStub function that manage displayValue, toolText and link
                        series.data.push({
                            y: itemValueY,
                            x: itemValueX,
                            id: setId,
                            //displayValue : pluck(dataObj.name, dataObj.label, pointStub.displayValue),
                            displayValue : pluck(pointStub.displayValue),
                            toolText : pointStub.toolText,
                            link: pointStub.link,
                            imageNode: Boolean(getValidValue(dataObj.imagenode)),
                            imageURL: getValidValue(dataObj.imageurl),
                            imageAlign: getValidValue(dataObj.imagealign, BLANKSTRING).toLowerCase(),
                            imageWidth: getValidValue(dataObj.imagewidth),
                            imageHeight: getValidValue(dataObj.imageheight),
                            labelAlign: labelAlign,
                            allowDrag: allowDrag,
                            marker: {
                                enabled: true,
                                fillColor: fillColor,
                                lineColor: {
                                    FCcolor: {
                                        color: datasetPlotBorderColor,
                                        alpha: datasetPlotBorderAlpha
                                    }
                                },
                                lineWidth: datasetPlotBorderThickness,
                                radius: radius,
                                height: height,
                                width: width,
                                symbol: shape
                            }
                        });

                        // Set the maximum and minimum found in data
                        // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                        this.pointValueWatcher(HCObj, itemValueY, itemValueX);
                    }
                    else {
                        // add the data
                        series.data.push({
                            y : null
                        });
                    }
                }
            }
            // If all the values in current dataset is null
            // we will not show its legend
            if (!hasValidPoint) {
                series.showInLegend = false
            }
            return series;
        },

        // Function to create tooltext for individual data points
        getPointStub: function (setObj, value, label, HCObj, dataset) {
            var toolText, displayValue, dataLink, HCConfig = HCObj[FC_CONFIG_STRING],
            formatedVal = value === null ? value : HCConfig.numberFormatter.dataLabels(value),
            seriesname, setTooltext = getValidValue(parseUnsafeString(setObj.tooltext)),
            tooltipSepChar = HCConfig.tooltipSepChar, labelText;

            //create the tooltext
            if (!HCConfig.showTooltip) {
                toolText = false;
            }

            // if tooltext is given in data object
            else if (setTooltext !== undefined) {
                toolText = setTooltext;
            }
            else if (getValidValue(setObj.name) !== undefined) {
                toolText = parseUnsafeString(getValidValue(setObj.name, BLANKSTRING));
            }
            else {//determine the tooltext then
                if (formatedVal === null) {
                    toolText = false;
                } else {
                    if (HCConfig.seriesNameInToolTip) {
                        seriesname = getFirstValue(dataset && dataset.seriesname);
                    }
                    toolText = seriesname ? seriesname + tooltipSepChar : BLANKSTRING;
                    toolText += label ? label + tooltipSepChar : BLANKSTRING;
                    toolText += formatedVal;
                }
            }

            labelText = parseUnsafeString(pluck(setObj.name, setObj.label));

            //create the displayvalue
            if ((getValidValue(labelText) !== undefined) &&
                !(setObj.imagenode == 1 && getValidValue(setObj.imageurl) != undefined)) {
                displayValue = labelText;
            }
            else {
                displayValue = BLANKSTRING;
            }

            ////create the link
            dataLink = pluck(setObj.link);

            return {
                displayValue : displayValue,
                toolText : toolText,
                link: dataLink
            };
        },

        //----  Parse the connector attributes  ----//
        connector: function (chartName, connectors, connectorsObj, FCChartObj, HCObj, catLength, seriesIndex) {
            var stdThickness, conColor, conAlpha, conDashGap, conDashLen, conDashed,
            arrowAtStart, arrowAtEnd, conStrength,
            connector = connectorsObj.connector,
            index, length = connector.length,
            connectorObj, seriesConnector,
            conf = HCObj[FC_CONFIG_STRING],
            smartLabel = conf.smartLabel;

            //Extract attributes of this node.
            stdThickness = pluckNumber(connectorsObj.stdthickness, 1);
            conColor = getFirstColor(pluck(connectorsObj.color, 'FF5904'));
            conAlpha = pluck(connectorsObj.alpha, HUNDREDSTRING);
            conDashGap = pluckNumber(connectorsObj.dashgap, 5);
            conDashLen = pluckNumber(connectorsObj.dashlen, 5);
            conDashed = Boolean(pluckNumber(connectorsObj.dashed, 0));
            arrowAtStart = Boolean(pluckNumber(connectorsObj.arrowatstart, 1));
            arrowAtEnd = Boolean(pluckNumber(connectorsObj.arrowatend, 1));
            conStrength = pluckNumber(connectorsObj.strength, 1);

            seriesConnector = connectors.connector;

            var connectorFrom, connectorTo, connectorLabel, setConColor,
            setConAlpha, setConLineDashed, setConDashGap, setConDashLen,
            setArrowAtStart, setArrowAtEnd, setConStrength, connectorLink,
            dashStyle, labelTextObj;



            for (index = 0; index < length; index += 1) {
                connectorObj = connector[index];
                //From To value
                connectorFrom = pluck(connectorObj.from, BLANKSTRING);
                connectorTo = pluck(connectorObj.to, BLANKSTRING);
                //connector label.
                connectorLabel = parseUnsafeString(pluck(connectorObj.label, connectorObj.name));
                setConAlpha = pluck(connectorObj.alpha, conAlpha);
                //setConColor = convertColor(getFirstColor(pluck(connectorObj.color, conColor)), setConAlpha);
                setConColor = {
                    FCcolor : {
                        color: getFirstColor(pluck(connectorObj.color, conColor)),
                        alpha: setConAlpha
                    }
                }
                setConLineDashed  = Boolean(pluckNumber(connectorObj.dashed, conDashed));
                setConDashGap = pluckNumber(connectorObj.dashgap, conDashGap);
                setConDashLen = pluckNumber(connectorObj.dashlen, conDashLen);
                setArrowAtStart = Boolean(pluckNumber(connectorObj.arrowatstart, arrowAtStart));
                setArrowAtEnd = Boolean(pluckNumber(connectorObj.arrowatend, arrowAtEnd));
                setConStrength = pluckNumber(connectorObj.strength, conStrength);
                connectorLink = getValidValue(connectorObj.link);
                labelTextObj = smartLabel.getOriSize(connectorLabel);
                // Create line dash
                // Using dashStyle of HC
                dashStyle = setConLineDashed ?
                getDashStyle(setConDashLen, setConDashGap, stdThickness) : undefined;

                seriesConnector.push({
                    from: connectorFrom,
                    to: connectorTo,
                    label: connectorLabel,
                    color: setConColor,
                    dashStyle: dashStyle,
                    arrowAtStart: setArrowAtStart,
                    arrowAtEnd: setArrowAtEnd,
                    conStrength: setConStrength,
                    connectorLink: connectorLink,
                    stdThickness: stdThickness,
                    labelWidth: labelTextObj.widht,
                    labelHeight: labelTextObj.height
                });
            }

            return connectors;
        },

        series : function (FCObj, HCObj, chartName) {
            var index, length, conf = HCObj[FC_CONFIG_STRING],
            series, seriesArr, connectors, connectorsArr = [],
            connectorLengts, datasetLength,
            xAxis = HCObj.xAxis,
            yAxis = HCObj.yAxis[0];

            //enable the legend
            HCObj.legend.enabled = Boolean(pluckNumber(FCObj.chart.showlegend, 1));

            if (FCObj.dataset && (datasetLength = FCObj.dataset.length) > 0) {
                // add category
                this.categoryAdder(FCObj, HCObj);
                //remove xaxis auto numeric labels
                conf.x.requaredAutoNumeicLabels = false;
                xAxis.gridLineWidth = yAxis.gridLineWidth = INT_ZERO;
                xAxis.alternateGridColor =  yAxis.alternateGridColor = COLOR_TRANSPARENT;

                //add connectors
                if (FCObj.connectors && (connectorLengts = FCObj.connectors.length)) {
                    for (index = 0, length = connectorLengts; index < length; index += 1) {
                        connectors = {
                            connector : []
                        };

                        connectorsArr.push(this.connector(chartName, connectors,
                            FCObj.connectors[index], FCObj.chart, HCObj, conf.oriCatTmp.length,
                            index));
                    }
                }

                //add data series
                for (index = 0; index < datasetLength; index += 1) {
                    series = {
                        data : []
                    };
                    //add data to the series
                    seriesArr = this.point(chartName, series,
                        FCObj.dataset[index], FCObj.chart, HCObj, conf.oriCatTmp.length,
                        index);


                    //if the returned series is an array of series (case: pareto)
                    if (seriesArr instanceof Array) {
                        HCObj.series = HCObj.series.concat(seriesArr)
                    }
                    //all other case there will be only1 series
                    else {
                        HCObj.series.push(seriesArr);
                    }
                }

                HCObj.connectors = connectorsArr;

                ///configure the axis
                this.configureAxis(HCObj, FCObj);
                ///////////Trend-lines /////////////////
                if (FCObj.trendlines) {
                    createTrendLine (FCObj.trendlines, HCObj.yAxis, conf,
                        false, this.isBar);
                }

            }
        },
        creditLabel : creditLabel,
        showYAxisValues : 0,
        defaultSeriesType : 'dragnode'
    }, chartAPI.scatterbase);



    /******    Dragable Charts    ******/

    /////////////// DragArea ///////////
    chartAPI('dragarea', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'area',
        anchorAlpha: '100'
    }, chartAPI.msareabase);

    /////////////// DragArea ///////////
    chartAPI('dragline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'line'
    }, chartAPI.mslinebase);

    /////////////// DragArea ///////////
    chartAPI('dragcolumn2d', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'column'
    }, chartAPI.mscolumn2dbase);

    /////////////// DragArea ///////////
    chartAPI('selectscatter', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'scatter'
    }, chartAPI.scatterbase);


    chartAPI('multiaxisline', {
        standaloneInit: true,
        creditLabel : creditLabel,
        defaultSeriesType : 'line',

        series : function (FCObj, HCObj, chartName) {
            var index, length, conf = HCObj[FC_CONFIG_STRING],
            series, seriesArr, dataset,
            FCchartObj = FCObj.chart,
            Axis = FCObj.axis,
            axisIndex;

            //enable the legend
            HCObj.legend.enabled = Boolean(pluckNumber(FCObj.chart.showlegend, 1));

            if (Axis && Axis.length > 0) {
                this.categoryAdder(FCObj, HCObj);
                var previousAxis = HCObj.yAxis[0], axisJson, axisColor, isOpp, datasetIndex,
                datasetLen, yAxisConf,
                axisHEXColor, gridLineWidth,
                lastLeftAxisIndex = 0,
                tickWidth, axisLineThickness,
                yaxisvaluesstep = pluckNumber(FCchartObj.yaxisvaluesstep, FCchartObj.yaxisvaluestep, 1);
                HCObj.yAxis.splice(0, 2);

                for (axisIndex = 0, length = Axis.length; axisIndex < length; axisIndex += 1) {
                    axisJson = Axis[axisIndex];
                    axisHEXColor = pluck(axisJson.color, HCObj.colors[axisIndex % HCObj.colors.length]);
                    axisColor = convertColor(axisHEXColor, 100);
                    isOpp = !pluckNumber(axisJson.axisonleft, 1);
                    gridLineWidth = pluckNumber(axisJson.divlinethickness, FCchartObj.divlinethickness, 1);
                    tickWidth = pluckNumber(axisJson.tickwidth, 2);
                    axisLineThickness = pluckNumber(axisJson.axislinethickness, 2);
                    //create conf obj
                    yAxisConf = conf[axisIndex] = {};
                    if (!isOpp) {
                        lastLeftAxisIndex = axisIndex;
                    }

                    //create the axis object
                    HCObj.yAxis.push(
                    {
                        startOnTick: false,
                        endOnTick : false,
                        title : {
                            style: previousAxis.title.style,
                            text : parseUnsafeString(axisJson.title)
                        },
                        labels: {
                            x : 0,
                            style: previousAxis.labels.style
                        },
                        plotBands: [],
                        plotLines: [],
                        gridLineColor : convertColor(pluck(axisJson.divlinecolor, axisHEXColor),
                            pluckNumber(axisJson.divlinealpha, FCchartObj.divlinealpha,
                                defaultPaletteOptions.divLineAlpha[HCObj.chart.paletteIndex ], 100)),
                        gridLineWidth : gridLineWidth,
                        gridLineDashStyle : pluckNumber(axisJson.divlineisdashed,
                            FCchartObj.divlineisdashed, 0) ? getDashStyle(pluckNumber(axisJson.divlinedashlen,
                            FCchartObj.divlinedashlen, 4), pluckNumber(axisJson.divlinedashgap,
                            FCchartObj.divlinedashgap, 2), gridLineWidth) : undefined,
                        alternateGridColor : COLOR_TRANSPARENT,
                        //offset: (isOpp ? hc.chart.margin[1] : hc.chart.margin[3]) + 3, //set the offset during space management
                        lineColor: axisColor,
                        lineWidth: axisLineThickness,
                        tickLength: tickWidth,
                        tickColor: axisColor,
                        tickWidth: axisLineThickness,
                        //set the axis position as per xml conf.
                        opposite: isOpp

                    });
                    //add axis configuration
                    yAxisConf.yAxisValuesStep = pluckNumber(axisJson.yaxisvaluesstep, axisJson.yaxisvaluestep, yaxisvaluesstep);
                    yAxisConf.maxValue = axisJson.maxvalue;
                    yAxisConf.tickWidth = tickWidth;
                    yAxisConf.minValue = axisJson.minvalue;
                    yAxisConf.setadaptiveymin = pluckNumber(axisJson.setadaptiveymin, FCchartObj.setadaptiveymin);
                    yAxisConf.numDivLines = pluckNumber(axisJson.numdivlines, FCchartObj.numdivlines, 4);
                    yAxisConf.adjustdiv = pluckNumber(axisJson.adjustdiv, FCchartObj.adjustdiv);
                    yAxisConf.showYAxisValues = pluckNumber(axisJson.showyaxisvalues, axisJson.showyaxisvalue, 1);
                    yAxisConf.showLimits = pluckNumber(axisJson.showlimits, FCchartObj.showlimits,
                        FCchartObj.showyaxisvalues, FCchartObj.showyaxisvalue, yAxisConf.showYAxisValues);
                    yAxisConf.showDivLineValues = pluckNumber(axisJson.showdivlinevalue, axisJson.showdivlinevalues,
                        yAxisConf.showYAxisValues);


                    //put all series now

                    if (axisJson.dataset && axisJson.dataset.length > 0) {
                        datasetLen = axisJson.dataset.length;
                        for (datasetIndex = 0; datasetIndex < datasetLen; datasetIndex += 1) {

                            dataset = axisJson.dataset[datasetIndex];

                            series = {
                                yAxis : axisIndex,
                                data : []
                            };

                            //add data to the series
                            seriesArr = this.point(chartName, series,
                                dataset, FCObj.chart, HCObj, conf.oriCatTmp.length,
                                axisIndex);


                            //if the returned series is an array of series (case: pareto)
                            if (seriesArr instanceof Array) {
                                HCObj.series = HCObj.series.concat(seriesArr)
                            }
                            //all other case there will be only1 series
                            else {
                                HCObj.series.push(seriesArr);
                            }
                        }
                    }

                }
                for (axisIndex = 0, length = HCObj.yAxis.length; axisIndex < length; axisIndex += 1) {
                    if (axisIndex != lastLeftAxisIndex) {
                        HCObj.yAxis[axisIndex].gridLineWidth = 0;
                    }
                }





                ///configure the axis
                this.configureAxis(HCObj, FCObj);
            ///////////Trend-lines /////////////////
            //********no trend line
            /*if (FCObj.trendlines) {
                    createTrendLine (FCObj.trendlines, HCObj.yAxis, conf,
                        false, this.isBar);
                }*/
            }
        },

        configureAxis : function (HCObj, FCObj) {
            var conf = HCObj[FC_CONFIG_STRING], xAxisObj = HCObj.xAxis, xConf = conf.x,
            FCchartObj = FCObj.chart,
            yAxisObj, i, len, yAxisConf, yAxisMaxValue, yAxisMinValue, stopMaxAtZero,
            setMinAsZero, setadaptiveymin,
            numDivLines, adjustDiv, showLimits, showDivLineValues,
            yaxisvaluesstep, y;

            /**
             * configure x axis
             */

            //add xaxisTitle
            xAxisObj.title.text = parseUnsafeString(FCchartObj.xaxisname);

            /**
             * configure y axis
             */
            for (y = 0, len = HCObj.yAxis.length; y < len; y += 1) {
                yAxisObj = HCObj.yAxis[y];
                yAxisConf = conf[y]
                yaxisvaluesstep = pluckNumber(yAxisConf.yAxisValuesStep, 1);
                yaxisvaluesstep = yaxisvaluesstep < 1 ? 1 : yaxisvaluesstep;
                yAxisMaxValue = yAxisConf.maxValue;
                yAxisMinValue = yAxisConf.minValue;


                // adaptiveymin is available for non-stack charts
                setadaptiveymin = pluckNumber(yAxisConf.setadaptiveymin, 0);

                setMinAsZero = stopMaxAtZero = !setadaptiveymin;
                numDivLines = yAxisConf.numDivLines;
                adjustDiv = yAxisConf.adjustdiv !== ZEROSTRING;
                showLimits = yAxisConf.showLimits;
                showDivLineValues = yAxisConf.showDivLineValues;





                //////////////////////calculate the axis min max and the div interval for y axis ///////////////////
                axisMinMaxSetter (yAxisObj, yAxisConf, yAxisMaxValue, yAxisMinValue, stopMaxAtZero,
                    setMinAsZero, numDivLines, adjustDiv);

                // create label category and remove trend obj if out side limit
                configureAxis(FCchartObj, HCObj, yAxisObj, yAxisConf, showLimits, showDivLineValues,
                    yaxisvaluesstep, conf.numberFormatter, false);

                if (yAxisObj.reversed && yAxisObj.min >= 0) {
                    HCObj.plotOptions.series.threshold = yAxisObj.max;
                }

            }

        },
        spaceManager: function (hcJSON, fcJSON, width, height) {

            var conf = hcJSON[FC_CONFIG_STRING], axisConf, axisObj,
            canvasWidth, fcJSONChart = fcJSON.chart,
            isDual = false, yAxisNamePadding, yAxisValuesPadding, rotateYAxisName,

            marginLeftExtraSpace = conf.marginLeftExtraSpace,
            marginTopExtraSpace = conf.marginTopExtraSpace,
            marginBottomExtraSpace = conf.marginBottomExtraSpace,
            marginRightExtraSpace = conf.marginRightExtraSpace,
            workingWidth = width - (marginLeftExtraSpace + marginRightExtraSpace +
                hcJSON.chart.marginRight + hcJSON.chart.marginLeft),
            workingHeight = height - (marginBottomExtraSpace + hcJSON.chart.marginBottom +
                hcJSON.chart.marginTop),

            //calculate the min width, height for canvas
            
            minCanWidth = workingWidth * 0.3,
            minCanHeight = workingHeight * 0.3,

            // calculate the space remaining
            avaiableWidth = workingWidth - minCanWidth,
            avaiableHeight = workingHeight - minCanHeight,

            //if the legend is at the right then place it and deduct the width
            //if at bottom calculate the space for legend after the vertical axis placed

            legendPos = pluck(fcJSONChart.legendposition, POSITION_BOTTOM).toLowerCase();

            if (hcJSON.legend.enabled && legendPos === POSITION_RIGHT) {
                avaiableWidth -= placeLegendBlockRight(hcJSON, fcJSON, avaiableWidth / 2, workingHeight);
            }

            /*
             * place the vertical axis
             */
            var yAxis = hcJSON.yAxis, isOpp,
            numAxis = yAxis.length, y, canvasHeight, yAxisObj, yAxisConf,
            leftSpace = 0, rightSpace = 0, axisPad = 8, axisOffset, axisWidthUsed,
            extraWidth = 0, perAxisWidth = avaiableWidth / numAxis, axisSpecifficWidth,
            extra;
            for (y = numAxis - 1; y >= 0; y -= 1) {
                yAxisObj = yAxis[y];
                axisConf = conf[y];
                isOpp = yAxisObj.opposite;
                axisOffset = (isOpp ? rightSpace : leftSpace) + axisPad;
                //add all axis margin pading
                yAxisNamePadding = 10;
                yAxisValuesPadding = axisConf.tickWidth + axisOffset;
                rotateYAxisName = true;
                axisConf.verticalAxisNamePadding = yAxisNamePadding;
                axisConf.verticalAxisValuesPadding = yAxisValuesPadding;
                axisConf.rotateVerticalAxisName = rotateYAxisName;
                axisConf.verticalAxisNameWidth = 50;
                yAxisObj.offset  = axisOffset;
                axisSpecifficWidth = perAxisWidth + extraWidth - axisPad;
                //now configure the axis
                if (isOpp) {
                    axisWidthUsed = placeVerticalAxis(yAxisObj, axisConf, hcJSON, fcJSON,
                        workingHeight, axisSpecifficWidth , isOpp, 0, 0, rightSpace);
                    rightSpace += axisWidthUsed;
                }
                else {
                    axisWidthUsed = placeVerticalAxis(yAxisObj, axisConf, hcJSON, fcJSON,
                        workingHeight, axisSpecifficWidth , isOpp, 0, 0, leftSpace);
                    leftSpace += axisWidthUsed;
                }

                extra = axisSpecifficWidth - axisWidthUsed;
                extraWidth += extra;
                avaiableWidth -= (axisSpecifficWidth - extra + axisPad);
            }

            // adjust left and right canvas margins
            avaiableWidth -= adjustHorizontalCanvasMargin(hcJSON, fcJSON, avaiableWidth);

            

            //now thw canvas width is fixed(no element to reduce the width
            canvasWidth = avaiableWidth + minCanWidth;

            if (hcJSON.legend.enabled && legendPos !== POSITION_RIGHT) {
                avaiableHeight -= placeLegendBlockBottom(hcJSON, fcJSON, canvasWidth,
                    avaiableHeight/2);
            }

            /*
             * Now place the Title
             */
            //allowed height may

            avaiableHeight -= titleSpaceManager(hcJSON, fcJSON, canvasWidth,
                avaiableHeight/2);

            /*
             * Now place the horizontal axis
             */
            //add all axis margin pading
            axisConf = conf.x;
            axisConf.horizontalAxisNamePadding = pluckNumber(fcJSONChart.xaxisnamepadding, 5);
            axisConf.horizontalLabelPadding = pluckNumber(fcJSONChart.labelpadding, 2);
            axisConf.labelDisplay = (fcJSONChart.rotatelabels == "1") ? "rotate" :
            pluck(fcJSONChart.labeldisplay, "auto").toLowerCase();
            axisConf.staggerLines = pluckNumber(fcJSONChart.staggerlines, 2);
            axisConf.slantLabels = pluckNumber(fcJSONChart.slantlabels, fcJSONChart.slantlabel, 0);

            //set x axis min max
            this.xAxisMinMaxSetter(hcJSON, fcJSON, canvasWidth);

            avaiableHeight -= placeHorizontalAxis(hcJSON.xAxis, axisConf, hcJSON, fcJSON,
                canvasWidth, avaiableHeight, minCanWidth);

            // adjust top and bottom the canvas margins here
            avaiableHeight -= adjustVerticalCanvasMargin(hcJSON, fcJSON, avaiableHeight, hcJSON.xAxis);

            // checking after the finalizing of the canvas height whether, and to what extent should we
            canvasHeight = minCanHeight + avaiableHeight;
            for (y = 0; y < numAxis; y += 1) {
                // step them.
                stepYAxisNames(canvasHeight, hcJSON, fcJSONChart, hcJSON.yAxis[y], conf[y].lYLblIdx);
            }


            if (hcJSON.legend.enabled && legendPos === POSITION_RIGHT) {
                var legendObj = hcJSON.legend, extraWidth,
                maxHeight = minCanHeight + avaiableHeight;

                if (legendObj.height > maxHeight) {
                    legendObj.height = maxHeight;
                    legendObj.scroll.enabled = true;
                    extraWidth = (legendObj.scroll.scrollBarWidth = 10) + (legendObj.scroll.scrollBarPadding = 2);
                    legendObj.width += extraWidth;
                    hcJSON.chart.marginRight += extraWidth;
                }
                legendObj.y = 20;
            }

            var xc = ((hcJSON.chart.marginLeft - pluckNumber(hcJSON.chart.spacingLeft, 0)) - (hcJSON.chart.marginRight - pluckNumber(hcJSON.chart.spacingRight, 0))) / 2,
            xl = hcJSON.chart.marginLeft - pluckNumber(hcJSON.chart.spacingLeft, 0),
            xr = - (hcJSON.chart.marginRight - pluckNumber(hcJSON.chart.spacingRight, 0));
            switch (hcJSON.title.align) {
                case 'left' :
                    hcJSON.title.x = xl;
                    break;
                case 'right':
                    hcJSON.title.x = xr;
                    break;
                default:
                    hcJSON.title.x = xc;
            }
            switch (hcJSON.subtitle.align) {
                case 'left' :
                    hcJSON.subtitle.x = xl;
                    break;
                case 'right':
                    hcJSON.subtitle.x = xr;
                    break;
                default:
                    hcJSON.subtitle.x = xc;
            }


            /*
             * if the titles requared space and there has avaleble space the re-alocatethe title space
             */
            //this logic is not implemented in Flash so let is as TODO:

            


            hcJSON.chart.marginLeft += marginLeftExtraSpace;
            hcJSON.chart.marginTop += marginTopExtraSpace;
            hcJSON.chart.marginBottom += marginBottomExtraSpace;
            hcJSON.chart.marginRight += marginRightExtraSpace;
        }
    }, chartAPI.mslinebase);




    ////////CandleStick///////
    chartAPI('candlestick', {
        standaloneInit: true,
        creditLabel : creditLabel,
        paletteIndex : 3,
        defaultSeriesType : 'candlestick',
        placeLegendBlockBottom: false,

        series : function (FCObj, HCObj, chartName) {
            var index, length, conf = HCObj[FC_CONFIG_STRING],
            series, seriesArr, datasetObj, trendsetObj, volumeHeightPercent,
            plotHeight, volumeHeight,
            trendGroup;

            //enable the legend
            HCObj.legend.enabled = Boolean(pluckNumber(FCObj.chart.showlegend, 1));

            if (FCObj.dataset && FCObj.dataset.length > 0) {
                // add category
                this.categoryAdder(FCObj, HCObj);

                //place the series in oppside
                HCObj.yAxis[0].opposite = true;
                conf.numdivlines = getValidValue(FCObj.chart.numpdivlines);

                var volumeChart = jQuery.extend(true, {}, HCObj, {
                    chart: {
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderColor: 'rgba(255,255,255,0)',
                        animation: false

                    },
                    title: {
                        text: null
                    },
                    subtitle: {
                        text: null
                    },
                    legend: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        opposite: true,
                        labels: {
                            enabled: false
                        }
                    },
                    yAxis: [{
                        opposite: true,
                        title: {
                        //text: FCObj.chart.vyaxisname
                        },
                        plotBands: [],
                        plotLines: []
                    },{
                        opposite: false,
                        title: {
                            text: FCObj.chart.vyaxisname
                        }
                    }]
                });                                
                // Add dataset series
                for (index = 0, length = FCObj.dataset.length; index < length; index += 1) {
                    series = {
                        //yAxis: 1,
                        data : []
                    };
                    datasetObj = FCObj.dataset[index];
                    //add data to the series
                    seriesArr = this.point(chartName, series,
                        datasetObj, FCObj.chart, HCObj, conf.oriCatTmp.length,
                        index);

                    //if the returned series is an array of series (case: pareto)
                    if (seriesArr instanceof Array) {
                        if (pluckNumber(FCObj.chart.showvolumechart, 1)) {
                            //when it is an array then 2nd one is Volume chart
                            volumeChart.series.push({
                                type: 'column',
                                data: seriesArr[1]
                            });

                            volumeChart.showVolume = true;
                        
                            volumeHeightPercent = pluckNumber(FCObj.chart.volumeheightpercent, 40);
                            volumeHeightPercent = volumeHeightPercent < 20 ? 20 : (volumeHeightPercent > 80 ? 80 : volumeHeightPercent);
                            plotHeight = conf.height - (HCObj.chart.marginBottom + HCObj.chart.marginTop);
                            volumeHeight = (plotHeight * volumeHeightPercent / 100);
                            var marginBottom = HCObj.chart.marginBottom + volumeHeight;

                            volumeChart[FC_CONFIG_STRING].marginTop = marginBottom + 40;
                            volumeChart.yAxis[0].plotBands = [];
                            volumeChart.yAxis[0].plotLines = [];
                            volumeChart.exporting.enabled = false;
                            volumeChart.yAxis[0].title.text = parseUnsafeString(getValidValue(FCObj.chart.vyaxisname));
                            volumeChart.yAxis[0].title.align = 'low';
                            volumeChart.chart.height = volumeHeight + 20;
                            volumeChart.chart.width = conf.width;
                            volumeChart.chart.top = plotHeight - volumeHeight;
                            volumeChart.chart.left = 0;
                            volumeChart.chart.volumeHeightPercent = volumeHeightPercent;

                            if (!HCObj.subCharts) {
                                HCObj.subCharts = [];
                            }
                            HCObj.subCharts.push(volumeChart);
                        }
                        HCObj.series.push(seriesArr[0]);
                    }
                    //all other case there will be only1 series
                    else {
                        HCObj.series.push(seriesArr);
                    }
                }
                
                // Add trendset series
                if (FCObj.trendset && FCObj.trendset.length > 0) {
                    for (index = 0, length = FCObj.trendset.length; index < length; index += 1) {
                        series = {
                            type: 'line',
                            //yAxis: 1,
                            marker: {
                                enabled: false
                            },
                            connectNullData: 1,
                            data : []
                        };
                        trendsetObj = FCObj.trendset[index];
                        //add data to the series
                        if (trendsetObj.data && trendsetObj.data.length > 0) {
                            seriesArr = this.getTrendsetPoint(chartName, series,
                                trendsetObj, FCObj.chart, HCObj, conf.oriCatTmp.length,
                                index);

                            HCObj.series.push(seriesArr);
                        }
                    }
                }
                
                // Making secondary yAxis default data Label hidden
                FCObj.chart.showdivlinesecondaryvalue = 0;
                FCObj.chart.showsecondarylimits = 0;

                ///configure the axis
                this.configureAxis(HCObj, FCObj);

                // To show the yAxis name in the chart
                // we use the secondary yAxis title and make opposite false
                // so that the yAxis title appears on left side of the chart
                HCObj.yAxis[1].opposite = false;
                HCObj.yAxis[1].min = HCObj.yAxis[0].min;
                HCObj.yAxis[1].max = HCObj.yAxis[0].max;
                HCObj.yAxis[1].title.text = HCObj.yAxis[0].title.text;
                HCObj.yAxis[0].title.text = BLANKSTRING;

                ///////////Trend-lines /////////////////
                //for log it will be done in configureAxis
                trendGroup = FCObj.trendlines && FCObj.trendlines[0] && FCObj.trendlines[0].line;
                if (trendGroup && trendGroup.length)
                {
                    for (var i = 0; i < trendGroup.length; i+= 1) {
                        trendGroup[i].parentyaxis='s';
                        trendGroup[i].valueonleft='1'
                    }
                    createTrendLine (FCObj.trendlines, HCObj.yAxis, conf,
                        true, this.isBar);
                }
            }
        },


        getTrendsetPoint: function (chartName, series, trendset, FCChartObj, HCObj) {
            if (trendset.data) {
                var
                data = trendset.data,
                length = data.length,
                index = 0,
                dataObj, itemValue, x,
                trendSetColor, trendSetAlpha, trendSetThickness, trendSetDashed,
                trendSetDashLen, trendSetDashGap, includeInLegend,
                conf = HCObj[FC_CONFIG_STRING],
                NumberFormatter = conf.numberFormatter,
                toolText, toolTextObj = conf.toolTextStore;

                //Trend-sets default properties
                trendSetColor = getFirstColor(pluck(trendset.color, FCChartObj.trendsetcolor, "666666"));
                trendSetAlpha = pluck(trendset.alpha, FCChartObj.trendsetalpha, HUNDREDSTRING);
                trendSetThickness = pluckNumber(trendset.thickness, FCChartObj.trendsetthickness, 2);
                trendSetDashed = Boolean(pluckNumber(trendset.dashed, FCChartObj.trendsetdashed, 0));
                trendSetDashLen = pluckNumber(trendset.dashlen, FCChartObj.trendsetdashlen, 4);
                trendSetDashGap = pluckNumber(trendset.dashgap, FCChartObj.trendsetdashgap, 4);
                includeInLegend = pluck(trendset.includeinlegend, 1);

                series.color = convertColor(trendSetColor, trendSetAlpha);
                series.lineWidth = trendSetThickness;
                series.dashStyle = trendSetDashed ? getDashStyle(trendSetDashLen, trendSetDashGap) : undefined;
                series.includeInLegend = includeInLegend;
                series.name = getValidValue(trendset.name);
                // If includeInLegend set to false
                // We set series.name blank
                if (pluckNumber(trendset.includeinlegend) === 0 || series.name === undefined) {
                    series.showInLegend = false;
                }
                series.tooltip = {
                    enabled :  false
                };

                // Stop interactive legend for CandleStick
                FCChartObj.interactivelegend = 0;

                for (index = 0, length = data.length; index < length; index += 1) {
                    dataObj = data[index];
                    if (dataObj && !dataObj.vline) {
                        itemValue = NumberFormatter.getCleanValue(dataObj.value);
                        x = NumberFormatter.getCleanValue(dataObj.x);
                        x = x !== null ? x : index + 1;
                        // tooltex
                        toolText = toolTextObj && toolTextObj[x];

                        series.data.push({
                            x: x,
                            y: itemValue,
                            toolText: toolText
                        });
                    }
                }
            }
            return series;
        },


        point: function (chartName, series, dataset, FCChartObj, HCObj, catLength, seriesIndex) {
            if (dataset.data) {
                var itemValueY, index, drawAnchors, dataObj,
                itemValueX, hasValidPoint = false,
                pointStub, chartNameAPI = chartAPI[chartName],
                conf = HCObj[FC_CONFIG_STRING],
                plotPriceAs,
                // Data array in dataset object
                data = dataset.data,
                dataLength = data && data.length,
                // showValues attribute in individual dataset
                datasetShowValues = pluckNumber(dataset.showvalues, conf.showValues),
                NumberFormatter = conf.numberFormatter,
                candleSeries = [], volumeSeries = [],
                paletteIndex = HCObj.chart.paletteIndex,
                toolTextStore = {};

                // Dataset seriesname
                series.name = getValidValue(dataset.seriesname);

                // Make the CandleStick chart legend off
                series.showInLegend = false;


                // Add marker to the series to draw the Legend
                series.marker = {
                    enabled: true
                }

                plotPriceAs = getValidValue(FCChartObj.plotpriceas, BLANKSTRING).toLowerCase();
                if (plotPriceAs == 'line' || plotPriceAs == 'bar') {
                    series.plotType = plotPriceAs;
                } else {
                    series.plotType = 'candlestick';
                }


                var open, close, high, low, volume, minValue, maxValue, x,
                valueText, setColor, setBorderColor, setAlpha, dashStyle, drawVolume = false,
                bearBorderColor, bearFillColor, bullBorderColor, bullFillColor, plotLineThickness,
                plotLineAlpha, plotLineDashLen, plotLineDashGap, showVPlotBorder, vPlotBorderThickness,
                vPlotBorderAlpha, seriesYAxis, rollOverBandColor, rollOverBandAlpha;

                seriesYAxis = pluckNumber(series.yAxis, 0);

                //Candle stick properties.
                //Bear fill and border color - (Close lower than open)
                bearBorderColor = getFirstColor(pluck(FCChartObj.bearbordercolor, "B90000"));
                bearFillColor = getFirstColor(pluck(FCChartObj.bearfillcolor, "B90000"));
                //Bull fill and border color - Close higher than open
                bullBorderColor = getFirstColor(pluck(FCChartObj.bullbordercolor, defaultPaletteOptions.canvasBorderColor[paletteIndex]));
                bullFillColor = getFirstColor(pluck(FCChartObj.bullfillcolor, "FFFFFF"));
                //Line Properties - Serves as line for bar & line and border for candle stick
                plotLineThickness = pluckNumber(FCChartObj.plotlinethickness, (plotPriceAs == 'line' || plotPriceAs == 'bar') ? 2 : 1);
                plotLineAlpha = pluck(FCChartObj.plotlinealpha, HUNDREDSTRING);
                plotLineDashLen = pluckNumber(FCChartObj.plotlinedashlen, 5);
                plotLineDashGap = pluckNumber(FCChartObj.plotlinedashgap, 4);
                //VPlotBorder is border properties for the volume chart.
                showVPlotBorder = Boolean(pluckNumber(FCChartObj.showvplotborder, 1));
                //vPlotBorderColor = getFirstColor(pluck(FCChartObj.vplotbordercolor, this.defColors.get2DCanvasBorderColor(palette)));
                vPlotBorderThickness = pluckNumber(FCChartObj.vplotborderthickness, 1);
                vPlotBorderAlpha = pluck(FCChartObj.vplotborderalpha, (showVPlotBorder == true) ? HUNDREDSTRING : ZEROSTRING);
                //Roll-over band properties
                rollOverBandColor = getFirstColor(pluck(FCChartObj.rolloverbandcolor, defaultPaletteOptions.altHGridColor[paletteIndex]));
                rollOverBandAlpha = pluck(FCChartObj.rolloverbandalpha, defaultPaletteOptions.altHGridAlpha[paletteIndex]);


                // Iterate through all level data
                for (index = 0; index < dataLength; index += 1) {
                    // Individual data obj
                    // for further manipulation
                    dataObj = data[index];
                    if (dataObj && !dataObj.vline) {
                        open = NumberFormatter.getCleanValue(dataObj.open);
                        close = NumberFormatter.getCleanValue(dataObj.close);
                        high = NumberFormatter.getCleanValue(dataObj.high);
                        low = NumberFormatter.getCleanValue(dataObj.low);
                        volume = NumberFormatter.getCleanValue(dataObj.volume, true);
                        x = NumberFormatter.getCleanValue(dataObj.x);

                        if (volume !== null) {
                            drawVolume = true;
                        }

                        minValue = Math.min(open, close, high, low);
                        maxValue = Math.max(open, close, high, low);

                        valueText = parseUnsafeString(getValidValue(dataObj.valuetext, BLANKSTRING));

                        setBorderColor = getFirstColor(pluck(dataObj.bordercolor, close < open ? bearBorderColor : bullBorderColor));
                        setAlpha = pluck(dataObj.alpha, HUNDREDSTRING);
                        setColor = convertColor(getFirstColor(pluck(dataObj.color, close < open ? bearFillColor : bullFillColor)), setAlpha);
                        dashStyle = Boolean(pluckNumber(dataObj.dashed)) ? getDashStyle(plotLineDashLen, plotLineDashGap) : undefined;

                        hasValidPoint = true;

                        pointStub = chartNameAPI
                        .getPointStub(HCObj, FCChartObj, dataObj, open, close, high, low, volume, plotPriceAs);

                        x = x ? x : index + 1;

                        toolTextStore[x] = pointStub.toolText;

                        // Finally add the data
                        // we call getPointStub function that manage displayValue, toolText and link
                        series.data.push({
                            high: Math.max(open, close, high, low),
                            low: Math.min(open, close, high, low),
                            color: convertColor(setColor, setAlpha),
                            borderColor: convertColor(setBorderColor, plotLineAlpha),
                            dashStyle: dashStyle,
                            borderWidth: plotLineThickness,
                            x: x,
                            y: close,
                            MY: open,
                            toolText : pointStub.toolText,
                            link: pointStub.link
                        });

                        volumeSeries.push({
                            y: volume,
                            color: convertColor(setColor, setAlpha),
                            toolText : pointStub.toolText,
                            borderWidth: vPlotBorderThickness,
                            borderColor: convertColor(setBorderColor, vPlotBorderAlpha),
                            dashStyle: dashStyle,
                            x: x
                        });


                        // Set the maximum and minimum found in data
                        // pointValueWatcher use to calculate the maximum and minimum value of the Axis
                        this.pointValueWatchers(HCObj, x, minValue, maxValue, volume, seriesYAxis);
                    }
                }

                // Storing the toolText in config to make trendset line tooltext
                conf.toolTextStore = toolTextStore;

                if (series.drawVolume = drawVolume) {
                    candleSeries.push(series, volumeSeries);
                } else {
                    candleSeries = series;
                }
            }
            return candleSeries;
        },


        getPointStub: function (HCObj, FCChartObj, dataObj, open, close, high, low, volume, plotPriceAs) {
            var toolText = BLANKSTRING, HCConfig = HCObj[FC_CONFIG_STRING],
            NumberFormatter = HCConfig.numberFormatter, isLine = plotPriceAs == 'line';

            //create the tooltext
            if (!HCConfig.showTooltip) {
                toolText = BLANKSTRING;
            } else {
                toolText = getValidValue(dataObj.tooltext);
                if (typeof toolText == 'undefined') {
                    toolText = (open !== null && !isLine) ? '<b>Open:</b> ' + NumberFormatter.dataLabels(open) + '<br/>' : BLANKSTRING;
                    toolText += close !== null ? '<b>Close:</b> ' + NumberFormatter.dataLabels(close)  + '<br/>' : BLANKSTRING;
                    toolText += (high !== null && !isLine) ? '<b>High:</b> ' + NumberFormatter.dataLabels(high)  + '<br/>' : BLANKSTRING;
                    toolText += (low !== null && !isLine) ? '<b>Low:</b> ' + NumberFormatter.dataLabels(low)  + '<br/>' : BLANKSTRING;
                    toolText += volume !== null ? '<b>Volume:</b> ' + NumberFormatter.dataLabels(volume) : BLANKSTRING;
                }
            }
            return {
                toolText: toolText
            };
        },


        pointValueWatchers: function (HCObj, valueX, min, max, volume, yAxisIndex) {
            //debugger;
            var obj, conf = HCObj[FC_CONFIG_STRING], objX;
            yAxisIndex = pluckNumber(yAxisIndex, 0);
            if (volume !== null) {
                obj = conf.volume;
                if (!obj) {
                    obj = conf.volume = {}
                }
                obj.max = obj.max > volume ? obj.max : volume;
                obj.min = obj.min < volume ? obj.min : volume;
            }
            if (min !== null) {
                obj = conf[yAxisIndex];
                obj.max = obj.max > min ? obj.max : min;
                obj.min = obj.min < min ? obj.min : min;
            }
            if (max !== null) {
                obj = conf[yAxisIndex];
                obj.max = obj.max > min ? obj.max : min;
                obj.min = obj.min < min ? obj.min : min;
            }
            if (valueX !== null) {
                objX = conf.x;
                objX.max = objX.max > valueX ? objX.max : valueX;
                objX.min = objX.min < valueX ? objX.min : valueX;
            }
        },


        spaceManager: function (hcJSON, fcJSON, width, height) {

            var conf = hcJSON[FC_CONFIG_STRING], axisConf, fcJSONChart = fcJSON.chart,
            yAxisNamePadding, yAxisValuesPadding, rotateYAxisName,
            smartLabel = conf.smartLabel,

            marginLeftExtraSpace = conf.marginLeftExtraSpace,
            marginTopExtraSpace = conf.marginTopExtraSpace,
            marginBottomExtraSpace = conf.marginBottomExtraSpace,
            marginRightExtraSpace = conf.marginRightExtraSpace,
            workingWidth = width - (marginLeftExtraSpace + marginRightExtraSpace +
                hcJSON.chart.marginRight + hcJSON.chart.marginLeft),
            workingHeight = height - (marginBottomExtraSpace + 
                //hcJSON.chart.marginBottom +
                0 +
                hcJSON.chart.marginTop),

            //calculate the min width, height for canvas
            
            minCanWidth = workingWidth * 0.3,
            minCanHeight = workingHeight * 0.3,

            // calculate the space remaining
            avaiableWidth = workingWidth - minCanWidth,
            avaiableHeight = workingHeight - minCanHeight,

            //if the legend is at the right then place it and deduct the width
            //if at bottom calculate the space for legend after the vertical axis placed

            yAxis = hcJSON.yAxis, isOpp,
            numAxis = yAxis.length, y, canvasHeight, yAxisObj, yAxisConf,
            leftSpace = 0, rightSpace = 0, axisPad = 8, axisOffset, axisWidthUsed,
            extraWidth = 0, perAxisWidth = avaiableWidth / numAxis, axisSpecifficWidth;

            this.base.spaceManager.apply(this, arguments);
            
            //---- SpaceManagement For Volume Charts ----//
            if (hcJSON.subCharts) {
                var subChart = hcJSON.subCharts[0],
                mainChartHeight = height - (hcJSON.chart.marginTop + hcJSON.chart.marginBottom),
                volumeHeightPercent = subChart.chart.volumeHeightPercent,
                volumeChartHeight,
                marginBetweenCharts = conf.horizontalAxisHeight + 5, // 2 is the additional padding
                index, length, xaxisObj, newXaxisObj;

                rotateYAxisName = pluckNumber(fcJSON.chart.rotateyaxisname, 1);

                volumeChartHeight = (mainChartHeight * volumeHeightPercent /100);
                hcJSON.chart.marginBottom += volumeChartHeight + marginBetweenCharts;

                // Copying xAxis form main chart to Volume chart.
                //var xAxis = jQuery.extend(true, {}, hcJSON.xAxis)
                var xAxis = extend2({}, hcJSON.xAxis)
                
                // Removing all trendline labels for CandleStick Chart
                for(index = 0, length = hcJSON.xAxis.plotBands.length; index < length; index += 1) {
                    xaxisObj = hcJSON.xAxis.plotBands[index];
                    if (xaxisObj && xaxisObj.label && xaxisObj.label.text) {
                        xaxisObj.label.text = BLANKSTRING;
                    }

                    newXaxisObj = xAxis.plotBands[index];
                    if (newXaxisObj && newXaxisObj.label && newXaxisObj.label.y) {
                        newXaxisObj.label.y = pluckFontSize(fcJSONChart.basefontsize, 10) + 4; // 4 px looks proper
                    }
                }
                
                // Removing all data labels from volumeChart
                for(index = 0, length = xAxis.plotLines.length; index < length; index += 1) {
                    xaxisObj = xAxis.plotLines[index];
                    if (xaxisObj && xaxisObj.label && xaxisObj.label.text) {
                        xaxisObj.label.text = BLANKSTRING;
                    }
                }
                // Clearing the Volume chart primary axis label title
                if (subChart.yAxis && subChart.yAxis[0] && subChart.yAxis[0].title && subChart.yAxis[0].title.text) {
                    subChart.yAxis[0].title.text = BLANKSTRING;                    
                }
                subChart.xAxis = xAxis;
                // deleting yAxis label text
                //xAxis.plotLines[0].label.text = BLANKSTRING;

                var yAxisName;
                // rapping Volume chart yAxis label title text.
                if (yAxis[1].title.rotation) {
                    yAxisName = smartLabel.getSmartText(subChart.yAxis[1].title.text,
                                    rotateYAxisName == 0 ? hcJSON.chart.marginLeft - 10 : volumeChartHeight, undefined, true).text;
                } else {
                    yAxisName = smartLabel.getSmartText(subChart.yAxis[1].title.text,
                                    smartLabel.getOriSize(yAxis[1].title.text).width, undefined, true).text;
                }

            /*
             * Volume Chart
             * place the vertical axis
             */
                yAxis = subChart.yAxis;
                numAxis = yAxis.length; 
                leftSpace = 0;
                rightSpace = 0; 
                axisPad = 0;
                extraWidth = 0;
                perAxisWidth = avaiableWidth / numAxis;
                for (y = numAxis - 1; y >= 0; y -= 1) {
                    yAxisObj = yAxis[y];
                    axisConf = conf[y];
                
                    isOpp = yAxisObj.opposite;
                    axisOffset = (isOpp ? rightSpace : leftSpace) + axisPad;
                    //add all axis margin pading
                    yAxisNamePadding = 10;
                    yAxisValuesPadding = pluckNumber(axisConf.tickWidth, 2) + axisOffset;
                    axisConf.verticalAxisNamePadding = yAxisNamePadding;
                    axisConf.verticalAxisValuesPadding = yAxisValuesPadding;
                    axisConf.rotateVerticalAxisName = rotateYAxisName;
                    yAxisObj.offset  = axisOffset;
                    axisSpecifficWidth = perAxisWidth + extraWidth - axisPad;

                    //now configure the axis
                    /* if (isOpp) {
                        axisWidthUsed = placeVerticalAxis(yAxisObj, axisConf, subChart, fcJSON,
                            workingHeight, axisSpecifficWidth , !isOpp, 0, 0, rightSpace);
                        rightSpace += axisWidthUsed;
                    }
                    else {
                        axisWidthUsed = placeVerticalAxis(yAxisObj, axisConf, subChart, fcJSON,
                            workingHeight, axisSpecifficWidth , !isOpp, 0, 0, leftSpace);

                        leftSpace += axisWidthUsed;
                    } 

                    extra = axisSpecifficWidth - axisWidthUsed;
                    extraWidth += extra;
                    avaiableWidth -= (axisSpecifficWidth - extra + axisPad);*/
                }

                // setting the Primary chart yAxis title style to Volume Chart title
                yAxis = hcJSON.yAxis
                subChart.yAxis[1].title = jQuery.extend(true, {}, hcJSON.yAxis[1].title);
                subChart.yAxis[1].title.text = yAxisName;
                
                // deleting yAxis label text
                //xAxis.plotLines[0].label.text = BLANKSTRING;
                
                subChart.chart.left = 0;
                subChart.chart.width = width;
                subChart.chart.top = (height - hcJSON.chart.marginBottom) + marginBetweenCharts;
                subChart.chart.height = hcJSON.chart.marginBottom - marginBetweenCharts; // 20 is the height needed to show the horizontal axis
                
                subChart.chart.marginLeft = hcJSON.chart.marginLeft;
                subChart.chart.marginRight = hcJSON.chart.marginRight;
                subChart.chart.marginTop = 5;
                subChart.chart.marginBottom = hcJSON.chart.marginBottom - (marginBetweenCharts + volumeChartHeight);
            }
        },
        isDual: true,
        numVDivLines: 0,
        setAdaptiveYMin: true,
        divLineIsDashed: 1,
        isCandleStick : true,
        defaultPlotShadow: 1,
        requaredAutoNumeicLabels: 0
    }, chartAPI.scatterbase);




})();



