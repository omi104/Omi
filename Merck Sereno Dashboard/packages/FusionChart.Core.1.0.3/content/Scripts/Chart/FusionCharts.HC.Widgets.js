/**!
 * @license FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 * @version fusioncharts/3.2.3-release.4719
 */

(function () {
    // Register the module with FusionCharts and als oget access to a global
    // variable within the core's scope.
    var global = FusionCharts(['private', 'modules.renderer.highcharts-widgets']);
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
    getFirstDefinedValue = lib.getFirstDefinedValue,
    defaultPaletteOptions = lib.defaultPaletteOptions,
    getFirstValue = lib.getFirstValue,
    parsePointValue = lib.parsePointValue,
    parseStr = lib.parseStr,
    FC_CONFIG_STRING = lib.FC_CONFIG_STRING,
    extend2 = lib.extend2,//old: jarendererExtend / maegecolone
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
    parseColor = lib.graphics.parseColor,
    parseAlpha = lib.graphics.parseAlpha,
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
    STRINGUNDEFINED  = lib.STRINGUNDEFINED ,

    mapSymbolName = lib.graphics.mapSymbolName,

    singleSeriesAPI = chartAPI.singleseries,

    multiSeriesAPI = chartAPI.multiseries,
    COMMASTRING = lib.COMMASTRING,
    ZEROSTRING = lib.ZEROSTRING,
    ONESTRING = lib.ONESTRING,
    hundredstring = lib.hundredstring,
    commaspacestring = lib.commaspacestring,
    DECIMALSTRING = lib.DECIMALSTRING,

    getDefinedColor = lib.getDefinedColor,
    parseUnsafeString = lib.parseUnsafeString,

    HCstub = lib.HCstub,
    NumberFormatter = lib.NumberFormatter,
    getLinkAction = lib.getLinkAction,

    BOLDSTRING = 'bold',
    userAgent = navigator.userAgent,
    win = window,
    isIE = /msie/i.test(userAgent) && !win.opera,
    Highcharts = lib.Highcharts,
    doc = document,
    docMode8 = doc.documentMode === 8,
    math = Math,
    mathRound = math.round,
    mathFloor = math.floor,
    mathCeil = math.ceil,
    mathMax = math.max,
    mathMin = math.min,
    mathAbs = math.abs,
    mathCos = math.cos,
    mathSin = math.sin,
    mathRandom = math.random,
    mathATan2 = math.atan2,
    mathPI = math.PI,
    deg2rad = mathPI / 180,
    dropHash = lib.regex.dropHash,
    toPrecision = lib.toPrecision,
    HASHSTRING = lib.HASHSTRING,
    getColorCodeString = lib.getColorCodeString,
    hexcode = lib.regex.hexcode,
    defaultPlotOptions,
    //seriesTypes = Highcharts.seriesTypes,
    //attr = Highcharts.attr,
    hasTouch = doc.documentElement.ontouchstart !== undefined,
    // Expose utility funcitons for modules
    addEvent = Highcharts.addEvent,
    createElement = Highcharts.createElement,
    discardElement = Highcharts.discardElement,
    css = Highcharts.css,
    each = Highcharts.each,
    extend = Highcharts.extend,
    map = Highcharts.map,
    merge = Highcharts.merge,
    pick = Highcharts.pick,
    Color = Highcharts.Color,
    extendClass = Highcharts.extendClass,
    UNDEFINED,
    isObject = function (obj) {
        return typeof obj === 'object';
    },
    isString = function (s) {
        return typeof s === 'string';
    },
    defined = function  (obj) {
        return obj !== UNDEFINED && obj !== null;
    },
    TRACKER_FILL = 'rgba(192,192,192,'+ (hasSVG ? 0.000001 : 0.002) +')', // invisible but clickable
    NORMAL_STATE = '',
    HOVER_STATE = 'hover',
    SELECT_STATE = 'select',
    VISIBLE = isIE && !hasSVG ? 'visible' : '',
    PX = 'px',
    NONE = 'none',
    M = 'M',
    L = 'L',
    A = 'A',
    AT = 'AT',
    WA = 'WA',
    Z = 'Z',

    GAUGETYPE_HORIZONTAL = 1,
    GAUGETYPE_HORIZONTAL_REVERSED = 2,
    GAUGETYPE_VERTICAL = 3,
    GAUGETYPE_VERTICAL_REVERSED = 4,
    AXISPOSITION_TOP = 1,
    AXISPOSITION_RIGHT = 2,
    AXISPOSITION_BOTTOM = 3,
    AXISPOSITION_LEFT = 4,

    startsRGBA = lib.regex.startsRGBA,

    setLineHeight = lib.setLineHeight,
    pluckFontSize = lib.pluckFontSize, // To get the valid font size (filters negative values)
    POSITION_CENTER = lib.POSITION_CENTER,
    POSITION_TOP = lib.POSITION_TOP,
    POSITION_BOTTOM = lib.POSITION_BOTTOM,
    POSITION_RIGHT = lib.POSITION_RIGHT,
    POSITION_LEFT = lib.POSITION_LEFT,
    POSITION_MIDDLE = lib.POSITION_MIDDLE,
    INT_ZERO = 0,

    HUNDREDSTRING = lib.HUNDREDSTRING,
    PXSTRING = lib.PXSTRING,
    BGRATIOSTRING = lib.BGRATIOSTRING,
    COMMASPACE = lib.COMMASPACE,
    getAxisLimits = lib.getAxisLimits,
    creditLabel = false,

    // Space-Management for placing the vertical tick marks
    placeTickMark = function (hcJSON, canvasWidth, canvasHeight, isHorizontal) {

        var conf = hcJSON[FC_CONFIG_STRING],
        smartLabel = conf.smartLabel,
        series = hcJSON.series[0],
        // Take the maximum height that label can use
        maxLabelWidth = (((isHorizontal ? canvasHeight : canvasWidth) * 0.7) - series.tickValueDistance - series.tickMarkDistance),
        i, tickMarkWidth = 0,
        tickValueWidth = 0, tickValueObj, tickValue, tickObj, length,
        style = hcJSON.xAxis.labels.style,
        lineHeight = style.lineHeight.split(/px/)[0];
        smartLabel.setStyle(style);
        if (maxLabelWidth < 0) {
            maxLabelWidth = 0;
        }

        //In this function, we calculate the best fit co-ordinates for the gauge.
        //In cylinder gauge, we can have the tick marks/values on the left or right of gauge
        //So, first accomodate that
        //----------TICK MARKS & VALUES------------//
        length = series.majorTM.length;
        //First get the height for tick values if it's to be shown and if to be shown outside
        for (i=0; i < length; i++) {
            tickObj = series.majorTM[i];
            //Get tick value
            tickValue = tickObj.displayValue;
            //If it's the limit values, we check and render
            tickValueObj = smartLabel.getSmartText(tickValue, canvasWidth * 0.7, lineHeight);
            tickValueWidth = Math.max(tickValueWidth, (isHorizontal ? tickValueObj.height : tickValueObj.width));
            tickObj.displayValue = tickValueObj.text;
        }
        //Add the padding
        tickValueWidth = tickValueWidth + series.tickValueDistance;

        //Now, calculate the tick marks height
        if (series.showTickMarks) {
            tickMarkWidth = Math.max(series.majorTMHeight, series.minorTMHeight) + series.tickMarkDistance;
        }

        return (tickMarkWidth + tickValueWidth);
    },

    // space management for the ticks in angular gauge
    placeAngularTickMark = function (hcJSON, fcJSON, canvasWidth, canvasHeight,
        radius, startAngle, endAngle, scaleAngle) {
        var conf = hcJSON[FC_CONFIG_STRING],
        smartLabel = conf.smartLabel,
        series = hcJSON.series[0],
        labelsInside = series.placeValuesInside,
        i = 0, tickObj, tickValue, tickValueObj, tickValueWidth, tickAngle,
        style = hcJSON.xAxis.labels.style,
        lineHeight = style.lineHeight.split(/px/)[0],

        //In this function, we calculate the best fit co-ordinates for the gauge.
        //In cylinder gauge, we can have the tick marks/values on the left or right of gauge
        //So, first accomodate that
        //----------TICK MARKS & VALUES------------//
        heightReduction = 0, widthReduction = 0,
        length = series.majorTM.length, reductionFactor, excessWidth = 0, excessHeight = 0,
        ew1 = 0, ew2 = 0, eh1 = 0, eh2 = 0,
        widthWithLabel, heightWithLabel,
        checkWidth = (canvasWidth / 2), checkHeight = (canvasHeight / 2),
        tickDistance = series.tickValueDistance,
        perTickAngle = scaleAngle / (length - 1);
        smartLabel.setStyle(style);
        //First get the height for tick values if it's to be shown and if to be shown outside
        if (series.showTickValues && !labelsInside) {
            for (; i < length; i+=1) {
                tickAngle = startAngle + (i * perTickAngle);
                tickObj = series.majorTM[i];
                //Get tick value
                tickValue = tickObj.displayValue;
                //Get lower/upper limit display
                if (i==0) {
                    tickObj.displayValue = tickValue = pluck(series.lowerLimitDisplay, tickValue);
                }else if (i == length-1){
                    tickObj.displayValue = tickValue = pluck(series.upperLimitDisplay, tickValue);
                }
                //If it's the limit values, we check and render
                tickValueObj = smartLabel.getSmartText(tickValue, canvasWidth, lineHeight, true);
                widthWithLabel = tickValueObj.width + Math.abs((radius + tickDistance) * Math.cos(tickAngle));
                if (widthWithLabel > checkWidth) {
                    reductionFactor = widthWithLabel - checkWidth;
                    reductionFactor = reductionFactor / Math.cos(tickAngle);
                    ew1 = Math.max(ew1, reductionFactor);
                    ew2 = Math.min(ew2, reductionFactor);
                }

                heightWithLabel = tickValueObj.height + Math.abs((radius + tickDistance) * Math.sin(tickAngle));
                if (heightWithLabel > checkHeight) {
                    reductionFactor = heightWithLabel - checkHeight;
                    reductionFactor = reductionFactor / Math.sin(tickAngle);
                    eh1 = Math.max(eh1, reductionFactor);
                    eh2 = Math.min(eh2, reductionFactor);
                }

                //widthReduction = Math.max(widthReduction,
                tickObj.displayValue = tickValueObj.text;
            }
            //Add the padding
            tickValueWidth = tickValueWidth + series.tickValueDistance;
        }

        //Now, calculate the tick marks height
        //if (series.showTickMarks){
        //    tickMarkWidth = Math.max(series.majorTMHeight, series.minorTMHeight) + series.tickMarkDistance;
        //}
        if (ew1 > 0 && ew2 < 0) {
            excessWidth = ew1 - ew2;
        } else {
            excessWidth = Math.max(Math.abs(ew1), Math.abs(ew2))
        }

        if (eh1 > 0 && eh2 < 0) {
            excessHeight = eh1 - eh2;
        } else {
            excessHeight = Math.max(Math.abs(eh1), Math.abs(eh2))
        }

        return {
            width: excessWidth,
            height: excessHeight
        };

    },


    drawVerticalTicks = function (tickX, tickY, width, height, renderer, series, reverseScale) {
        // Drawing of TickMarks and Tick Labels
        var options = series.options, minorTM = options.minorTM,
        min = options.min,
        max = options.max,
        ratio = height / (max - min),
        majorTM = options.majorTM,
        value, tmY, label, tmLabelX, majorTMx, minorTMx,
        ticksOnRight = options.ticksOnRight == 1,
        align = ticksOnRight == 1 ?  POSITION_LEFT : POSITION_RIGHT,
        tmX, startY = tickY,
        index, length, majorTMObj,
        minorTMHeight = options.minorTMHeight,
        majorTMHeight = options.majorTMHeight,
        tickValueDistance = options.tickValueDistance,
        minorTMColor = options.minorTMColor,
        minorTMAlpha = options.minorTMAlpha,
        minorTMThickness = options.minorTMThickness,
        majorTMColor = options.majorTMColor,
        majorTMAlpha = options.majorTMAlpha,
        majorTMThickness = options.majorTMThickness,
        tickMarkDistance = options.tickMarkDistance,
        dataLabelsGroup = series.dataLabelsGroup,
        style = options.tickValueStyle, //options.dataLabels.style,
        tickLabelHeight = parseInt(style.lineHeight),
        tickMaxHeight = Math.max(majorTMHeight, minorTMHeight), path,
        ERROR_Distance = 0,
        RIGHT_TICKS_PADDING = 1,
        showTickMarks = options.showTickMarks == 1;

        if (!reverseScale) {
            startY = height + tickY;
            ratio = -ratio;
        }

        // Whether to place the ticks on right or left
        if (ticksOnRight) {
            tmX = tickX + tickMarkDistance + width;
            minorTMx = tmX + minorTMHeight;
            majorTMx = tmX + majorTMHeight;
            tmLabelX = tmX + tickMaxHeight + tickValueDistance;
            tmLabelX = tmX + (showTickMarks ? tickMaxHeight : 0) + tickValueDistance;
            ERROR_Distance = 1;
        } else {
            tmX = tickX - tickMarkDistance - RIGHT_TICKS_PADDING;
            minorTMx = tmX - minorTMHeight - RIGHT_TICKS_PADDING;
            majorTMx = tmX - majorTMHeight - RIGHT_TICKS_PADDING;
            tmLabelX = tmX  - ((showTickMarks ? tickMaxHeight : 0) + tickValueDistance) - RIGHT_TICKS_PADDING;
        }

        // Draw Straight line
        if (options.connectTickMarks && showTickMarks) {
            path = renderer.crispLine([M, tmX, tickY + 1, L, tmX, tickY + height], majorTMThickness);
            renderer.path(path)
            .attr({
                stroke: convertColor(majorTMColor, majorTMAlpha),
                'stroke-linecap': 'round',
                'stroke-width': majorTMThickness
            })
            .add(dataLabelsGroup);
        }

        // Draw minor ticks
        if (!series.minorTM) {
            series.minorTM = [];
        }

        if (minorTMHeight != 0 && showTickMarks) {
            for (index = 0, length = minorTM.length; index < length; index += 1) {
                value = minorTM[index];
                tmY = startY + (value - min) * ratio;
                path = renderer.crispLine([M, tmX + ERROR_Distance, tmY, L, minorTMx, tmY], minorTMThickness);
                series.minorTM[index] = renderer.path(path)
                .attr({
                    stroke: convertColor(minorTMColor, minorTMAlpha),
                    'stroke-linecap': 'round',
                    'stroke-width': minorTMThickness
                })
                .add(dataLabelsGroup);
            }
        }


        // Draw major ticks
        if (!series.majorTM) {
            series.majorTM = [];
        }

        for (index = 0, length = majorTM.length; index < length; index += 1) {
            majorTMObj = majorTM[index];
            value = majorTMObj.value,
            label = majorTMObj.displayValue;
            tmY = startY + (value - min) * ratio;

            if (minorTMHeight != 0 && showTickMarks) {
                path = renderer.crispLine([M, tmX + ERROR_Distance, tmY, L, majorTMx, tmY], minorTMThickness);
                series.majorTM[index] = renderer.path(path)
                .attr({
                    stroke: convertColor(majorTMColor, majorTMAlpha),
                    'stroke-linecap': 'round',
                    'stroke-width': majorTMThickness
                })
                .add(dataLabelsGroup);
            }
            // Render tickMark label text
            series.majorTM[index] = renderer.text(label, tmLabelX, tmY + (tickLabelHeight * 0.35))
            .attr({
                align: align
            })
            .css(style)
            .add(dataLabelsGroup);
        }
    },

    drawHorizontalTicks = function (tickX, tickY, width, height, renderer, series, reverseScale) {

        // Drawing of TickMarks and Tick Labels
        var options = series.options, minorTM = options.minorTM,
        min = options.min,
        max = options.max,
        ratio = width / (max - min),
        majorTM = options.majorTM,
        value, label,
        ticksBelowGauge = options.ticksBelowGauge == 1,
        tmY,
        tmX = tickX,
        startX = tickX,
        index, length,
        dataLabelsGroup = series.dataLabelsGroup,
        minorTMHeight = options.minorTMHeight,
        majorTMHeight = options.majorTMHeight,
        tickValueDistance = options.tickValueDistance,
        placeValuesInside = options.placeValuesInside,
        minorTMColor = options.minorTMColor,
        minorTMAlpha = options.minorTMAlpha,
        minorTMThickness = options.minorTMThickness,
        majorTMColor = options.majorTMColor,
        majorTMAlpha = options.majorTMAlpha,
        majorTMThickness = options.majorTMThickness,
        style = options.tickValueStyle, //options.dataLabels.style,
        majorTMObj,
        tickLabelHeight = style.lineHeight.split(/px/)[0] * 1,
        minorTicksHeight, majorTicksHeight, ticksLabelY,
        tickMaxHeight = Math.max(majorTMHeight, minorTMHeight),
        path,
        ERROR_Distance = 0,
        showTickMarks = options.showTickMarks == 1;
        if(reverseScale) {
            ratio = -ratio;
            startX = tickX + width;
        }

        // Whether to place the this on top or bottom
        if (ticksBelowGauge) {
            tmY = tickY + options.tickMarkDistance;
            minorTicksHeight = tmY + minorTMHeight;
            majorTicksHeight = tmY + majorTMHeight;
            if (placeValuesInside) {
                ticksLabelY = tmY - tickValueDistance - tickLabelHeight * 0.5;
            } else {
                ticksLabelY = tmY + tickValueDistance + tickLabelHeight + (showTickMarks ? tickMaxHeight : 0);
            }
            ERROR_Distance = 1;
        }else {
            tmY =  tickY - height - options.tickMarkDistance;
            minorTicksHeight = tmY - minorTMHeight;
            majorTicksHeight = tmY - majorTMHeight;
            if (placeValuesInside) {
                ticksLabelY = tmY + tickValueDistance + tickLabelHeight;
            } else {
                ticksLabelY = tmY - tickValueDistance - tickLabelHeight - (showTickMarks ? tickMaxHeight : 0) + tickLabelHeight * 0.75;
            }
        }

        // Draw Straight line
        if (options.connectTickMarks && showTickMarks) {
            path = renderer.crispLine([M, tickX + 1, tmY, L, tickX + width, tmY], majorTMThickness);
            renderer.path(path)
            .attr({
                stroke: convertColor(majorTMColor, majorTMAlpha),
                'stroke-linecap': 'round',
                'stroke-width': majorTMThickness
            })
            .add(dataLabelsGroup);
        }

        // Draw minor ticks
        if (!series.minorTM) {
            series.minorTM = [];
        }
        if (minorTMHeight != 0 && showTickMarks) {
            for (index = 0, length = minorTM.length; index < length; index += 1) {
                value = minorTM[index];
                tmX = startX + (value - min) * ratio;
                path = renderer.crispLine([M, tmX, tmY + ERROR_Distance, L, tmX, minorTicksHeight], minorTMThickness);
                series.minorTM[index] = renderer.path(path)
                .attr({
                    stroke: convertColor(minorTMColor, minorTMAlpha),
                    'stroke-linecap': 'round',
                    'stroke-width': minorTMThickness
                })
                .add(dataLabelsGroup);
            }
        }

        // Draw major ticks
        if (!series.majorTM) {
            series.majorTM = [];
        }
        // Draw major ticks
        if (!series.tmLabel) {
            series.tmLabel = [];
        }

        for (index = 0, length = majorTM.length; index < length; index += 1) {
            majorTMObj = majorTM[index],
            value = majorTMObj.value,
            label = majorTMObj.displayValue;
            tmX = startX + (value - min) * ratio;

            if (majorTMHeight != 0 && showTickMarks) {
                path = renderer.crispLine([M, tmX, tmY + ERROR_Distance, L, tmX, majorTicksHeight], majorTMThickness);
                series.majorTM[index] = renderer.path(path)
                .attr({
                    stroke: convertColor(majorTMColor, majorTMAlpha),
                    'stroke-linecap': 'round',
                    'stroke-width': majorTMThickness
                })
                .add(dataLabelsGroup);
            }
            // Render tickMark label text
            series.tmLabel[index] = renderer.text(label, tmX, ticksLabelY)
            .attr({
                align: 'center'
            })
            .css(style)
            .add(dataLabelsGroup);
        }
    },


    drawScale = function (width, height, renderer, series, parentGroup) {
        // Drawing of TickMarks and Tick Labels
        var scale = series.chart.options.scale,
        minorTM = scale.minorTM,
        min = scale.min,
        max = scale.max,
        majorTM = scale.majorTM,
        value, label,
        axisPosition = scale.axisPosition,
        index, length,
        minorTMHeight = scale.minorTMHeight,
        majorTMHeight = scale.majorTMHeight,
        connectorColor = scale.connectorColor,
        connectorThickness = scale.connectorThickness,
        minorTMColor = scale.minorTMColor,
        minorTMThickness = scale.minorTMThickness,
        majorTMColor = scale.majorTMColor,
        majorTMThickness = scale.majorTMThickness,
        tickMarkDistance = scale.tickMarkDistance,
        tickValueDistance = scale.tickValueDistance,
        placeTicksInside = scale.placeTicksInside,
        placeValuesInside = scale.placeValuesInside,
        style,
        majorTMObj,
        tickMaxHeight = Math.max(majorTMHeight, minorTMHeight),
        path,
        scaleGroup = renderer.g('scale')
        .add(parentGroup),
        labelTextAlign = POSITION_CENTER,
        reverseScale = scale.reverseScale,
        sx = 0,
        sy = 0,
        k1 = 0,
        k2 = 0,
        Mk1 = 0,
        Mk2 = 0,
        mk1 = 0,
        mk2 = 0,
        k3 = 0,
        k4 = 0,
        k5 = 0,
        k6 = 0,
        k7 = 0,
        k8 = 0,
        transX = 0, transY = 0,
        valueRange = max - min,
        tx, ty, ltx, lty,
        startValue = min,
        minorTMThicknessHalf = minorTMThickness / 2,
        majorTMThicknessHalf = majorTMThickness / 2;

        if (placeTicksInside) {
            tickMarkDistance = -tickMarkDistance;
            majorTMHeight = -majorTMHeight;
            minorTMHeight = -minorTMHeight;
            if (placeValuesInside) {
                tickMaxHeight = -tickMaxHeight;
                tickValueDistance = -tickValueDistance;
            }
            else {
                tickMaxHeight = -tickMarkDistance;
            }
        }
        else {
            if (placeValuesInside) {
                tickMaxHeight = -tickMarkDistance;
                tickValueDistance = -tickValueDistance;
            }
        }



        if(reverseScale) {
            valueRange = -valueRange;
            startValue = max;
        }

        switch (axisPosition) {
            case 1 : // TOP
                sx = width / valueRange;
                k2 = -tickMarkDistance;
                Mk2 = k2 - majorTMThicknessHalf;
                mk2 = k2 - minorTMThicknessHalf;
                k4 = k2 - majorTMHeight;
                k6 = k2 - minorTMHeight;
                k8 = k2 - tickMaxHeight - tickValueDistance;
                break;
            case 2 : // RIGHT
                sy = height / valueRange;
                k1 = tickMarkDistance;
                Mk1 = k1 + majorTMThicknessHalf;
                mk1 = k1 + minorTMThicknessHalf;
                k3 = k1 + majorTMHeight;
                k5 = k1 + minorTMHeight;
                k7 = k1 + tickMaxHeight + tickValueDistance;
                labelTextAlign = placeValuesInside ? POSITION_RIGHT : POSITION_LEFT;
                transX = width;
                break;
            case 3 : // BOTTOM

                sx = width / valueRange;
                k2 = tickMarkDistance;
                Mk2 = k2 + majorTMThicknessHalf;
                mk2 = k2 + minorTMThicknessHalf;
                k4 = k2 + majorTMHeight;
                k6 = k2 + minorTMHeight;
                k8 = k2 + tickMaxHeight + tickValueDistance;
                transY = height;
                break;
            case 4 : // LEFT
                sy = height / valueRange;
                k1 = -tickMarkDistance;
                Mk1 = k1 - majorTMThicknessHalf;
                mk1 = k1 - minorTMThicknessHalf;
                k3 = k1 - majorTMHeight;
                k5 = k1 - minorTMHeight;
                k7 = k1 - tickMaxHeight - tickValueDistance;
                labelTextAlign = placeValuesInside ? POSITION_LEFT : POSITION_RIGHT;
                break;
        }

        // Balnk array to store Ticks
        if (!series.minorTM) {
            series.minorTM = [];
        }
        if (!series.majorTM) {
            series.majorTM = [];
        }
        if (!series.tmLabel) {
            series.tmLabel = [];
        }

        //translate the group to properly position it
        scaleGroup.translate(transX, transY);



        // Draw minor ticks
        if (minorTMHeight) {
            for (index = 0, length = minorTM.length; index < length; index += 1) {
                value = minorTM[index] - startValue;
                tx = value * sx;
                ty = value * sy;
                path = renderer.crispLine([M, tx + mk1, ty + mk2, L,
                    tx + k5, ty + k6], minorTMThickness);
                series.minorTM[index] = renderer.path(path)
                .attr({
                    stroke: minorTMColor,
                    'stroke-linecap': 'round',
                    'stroke-width': minorTMThickness
                })
                .add(scaleGroup);
            }
        }


        // Draw major ticks and ticks labels
        for (index = 0, length = majorTM.length; index < length; index += 1) {
            majorTMObj = majorTM[index];
            value = majorTMObj.value - startValue;
            label = majorTMObj.displayValue;
            tx = value * sx;
            ty = value * sy;
            // Draw major ticks
            if (minorTMHeight) {
                path = renderer.crispLine([M, tx + Mk1, ty + Mk2, L,
                    tx + k3, ty + k4], minorTMThickness);
                series.majorTM[index] = renderer.path(path)
                .attr({
                    stroke: majorTMColor,
                    'stroke-linecap': 'round',
                    'stroke-width': majorTMThickness
                })
                .add(scaleGroup);
            }
            if (label !== BLANKSTRING) {
                style = (index == 0 || index == length - 1) ? scale.limitValues.style :
                scale.tickValues.style;
                ltx = majorTMObj.labelX || 0;
                lty = majorTMObj.labelY || 0;
                // Render tickMark label text
                series.tmLabel[index] = renderer.text(label, tx + k7 + ltx, (ty + k8) + lty)
                .attr({
                    align: pluck(majorTMObj.align, labelTextAlign)
                })
                .css(style)
                .add(scaleGroup);
            }
        }
        // Draw Straight line
        if (connectorThickness) {
            path = renderer.crispLine([M, k1, k2, L, valueRange * sx + k1, valueRange * sy + k2], majorTMThickness);
            renderer.path(path)
            .attr({
                stroke: connectorColor,
                'stroke-linecap': 'round',
                'stroke-width': connectorThickness
            })
            .add(scaleGroup);
        }

        return scaleGroup;
    },

    defaultGaugePaletteOptions = {
        //Store colors now
        //Dark variation of green-yellow-blue: '339900', 'DD9B02', '943A0A'
        paletteColors: [['8BBA00', 'F6BD0F', 'FF654F', 'AFD8F8', 'FDB398', 'CDC309', 'B1D0D2', 'FAD1B9', 'B8A79E', 'D7CEA5', 'C4B3CE', 'E9D3BE', 'EFE9AD', 'CEA7A2', 'B2D9BA'],
        ['8BBA00', 'F6BD0F', 'FF654F', 'AFD8F8', 'FDB398', 'CDC309', 'B1D0D2', 'FAD1B9', 'B8A79E', 'D7CEA5', 'C4B3CE', 'E9D3BE', 'EFE9AD', 'CEA7A2', 'B2D9BA'],
        ['8BBA00', 'F6BD0F', 'FF654F', 'AFD8F8', 'FDB398', 'CDC309', 'B1D0D2', 'FAD1B9', 'B8A79E', 'D7CEA5', 'C4B3CE', 'E9D3BE', 'EFE9AD', 'CEA7A2', 'B2D9BA'],
        ['8BBA00', 'F6BD0F', 'FF654F', 'AFD8F8', 'FDB398', 'CDC309', 'B1D0D2', 'FAD1B9', 'B8A79E', 'D7CEA5', 'C4B3CE', 'E9D3BE', 'EFE9AD', 'CEA7A2', 'B2D9BA'],
        ['8BBA00', 'F6BD0F', 'FF654F', 'AFD8F8', 'FDB398', 'CDC309', 'B1D0D2', 'FAD1B9', 'B8A79E', 'D7CEA5', 'C4B3CE', 'E9D3BE', 'EFE9AD', 'CEA7A2', 'B2D9BA']],
        //Store other colors
        // ------------- For 2D Chart ---------------//
        //We're storing 5 combinations, as we've 5 defined palettes.
        bgColor: ['CBCBCB,E9E9E9', 'CFD4BE,F3F5DD', 'C5DADD,EDFBFE', 'A86402,FDC16D', 'FF7CA0,FFD1DD'],
        bgAngle: [270, 270, 270, 270, 270],
        bgRatio: ['0,100', '0,100', '0,100', '0,100', '0,100'],
        bgAlpha: ['50,50', '60,50', '40,20', '20,10', '30,30'],

        toolTipBgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
        toolTipBorderColor: ['545454', '545454', '415D6F', '845001', '68001B'],
        baseFontColor: ['555555', '60634E', '025B6A', 'A15E01', '68001B'],

        tickColor: ['333333', '60634E', '025B6A', 'A15E01', '68001B'],
        trendDarkColor: ['333333', '60634E', '025B6A', 'A15E01', '68001B'],
        trendLightColor: ['f1f1f1','F3F5DD','EDFBFE','FFF5E8','FFD1DD'],

        pointerBorderColor: ['545454', '60634E', '415D6F', '845001', '68001B'],
        pointerBgColor: ['545454', '60634E', '415D6F', '845001', '68001B'],

        canvasBgColor: ['FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
        canvasBgAngle: [0, 0, 0, 0, 0],
        canvasBgAlpha: ['100', '100', '100', '100', '100'],
        canvasBgRatio: ['', '', '', '', ''],
        canvasBorderColor: ['545454', '545454', '415D6F', '845001', '68001B'],
        canvasBorderAlpha: [100, 100, 100, 90, 100]		,

        altHGridColor: ['EEEEEE', 'D8DCC5', '99C4CD', 'DEC49C', 'FEC1D0'],
        altHGridAlpha: [50, 35, 10, 20, 15],
        altVGridColor: ['767575', 'D8DCC5', '99C4CD', 'DEC49C', 'FEC1D0'],
        altVGridAlpha: [10, 20, 10, 15, 10],

        borderColor: ['767575', '545454', '415D6F', '845001', '68001B'],
        borderAlpha: [50, 50, 50, 50, 50],
        legendBgColor: ['ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff'],
        legendBorderColor: ['545454', '545454', '415D6F', '845001', 'D55979'],
        plotFillColor: ['767575', 'D8DCC5', '99C4CD', 'DEC49C', 'FEC1D0'],
        plotBorderColor: ['999999', '8A8A8A', '6BA9B6', 'C1934D', 'FC819F'],
        msgLogColor: ['717170', '7B7D6D', '92CDD6', '965B01', '68001B'],

        TrendLightShadeOffset: 30
    // TODO: delete the following code
    //----------- Chart specific colors ------------
    /*
      //Angular gauge
        dialColor: ['999999,ffffff,999999', 'ADB68F,F3F5DD,ADB68F', 'A2C4C8,EDFBFE,A2C4C8', 'FDB548,FFF5E8,FDB548', 'FF7CA0,FFD1DD,FF7CA0'],
        dialBorderColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0'],
        pivotColor: ['999999,ffffff,999999', 'ADB68F,F3F5DD,ADB68F', 'A2C4C8,EDFBFE,A2C4C8', 'FDB548,FFF5E8,FDB548', 'FF7CA0,FFD1DD,FF7CA0'],
        pivotBorderColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0'],
        //Thermometer chart
        thmBorderColor: ['545454', '60634E', '415D6F', '845001', '68001B'],
        thmFillColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0'],
        //Cylinder
        cylFillColor: ['CCCCCC', 'ADB68F', 'E1F5FF', 'FDB548', 'FF7CA0'],
        periodColor: ['EEEEEE', 'ECEEE6', 'E6ECF0', 'FFF4E6', 'FFF2F5'],
        //Colors for win loss chart
        winColor: ['666666', '60634E', '025B6A', 'A15E01', 'FF97B1'],
        lossColor: ['CC0000', 'CC0000', 'CC0000', 'CC0000', 'CC0000'],
        drawColor: ['666666', 'A5AE84', '93ADBF', 'C97901', 'FF97B1'],
        scorelessColor: ['FF0000', 'FF0000', 'FF0000', 'FF0000', 'FF0000']*/
    };


    /** The alert manager listens to the data change events generated by the real-
     * time framework and the feedData method of the chart object. It gets the updated
     * values from the chart object and if the updated value lies within any of
     * the alert ranges, it performs the corresponding actions for that alert range.
     */
    var alertManager = function (event) {

        // Initialize the alert framework
        var i = 0, dataNum, chartObj = event.sender, args = chartObj.jsVars.instanceAPI,
        alertObjArr = args.dataObj && args.dataObj.alerts && args.dataObj.alerts.alert || [],
        len = alertObjArr.length,
        IN_ALERT_RANGE = "1", OUT_OF_ALERT_RANGE = "2",
        values = chartObj.jsVars._rtLastUpdatedData && chartObj.jsVars._rtLastUpdatedData.values;

        if (!values || !values.length) {
            return;
        }

        var checkBounds = function (value) {
            var j = 0, alertObj, l = len;

            for (; j < l; j += 1) {
                alertObj = alertObjArr[j];

                if (alertObj.minvalue < value && alertObj.maxvalue > value) {
                    if (!(alertObj.occuronce === "1" && alertObj.hasOccurred)) {

                        alertObj.hasOccurred = true;
                        alertObj.state = IN_ALERT_RANGE;

                        if (alertObj.action === "callJS") {
                            // Executing the JS it in a seperate thread.
                            setTimeout(eval(alertObj.param), 0);
                        } else if (alertObj.action === "showAnnotation"){
                            chartObj.showAnnotation && chartObj.showAnnotation(alertObj.param);
                        }
                    }
                } else {
                    if (alertObj.action === "showAnnotation"
                        && alertObj.state === IN_ALERT_RANGE) {

                        chartObj.hideAnnotation && chartObj.hideAnnotation(alertObj.param);
                    }

                    alertObj.state = OUT_OF_ALERT_RANGE;
                }
            }
        };

        if (args.multiValueGauge) {

            dataNum = (args.hcInstance && args.hcInstance.options
                && args.hcInstance.options && args.hcInstance.options.series
                && args.hcInstance.options.series[0] && args.hcInstance.options.series[0].data
                && args.hcInstance.options.series[0].data.length) || 0;

            dataNum = Math.min(values.length, dataNum);

            //check for each data point if the value corresponding to
            // it is within the range of any alertObj
            for (; i < dataNum; i += 1) {
                if (!chartObj.__state.lastSetValues || values[i] !== chartObj.__state.lastSetValues[i]) {
                    checkBounds(values[i]);
                }
            }

        } else {
            if (!chartObj.__state.lastSetValues || values[0] !== chartObj.__state.lastSetValues[0]) {
                checkBounds(values[0]);
            }
        }

        chartObj.__state.lastSetValues = values;
    };

    var initializeFrameworks = function (event) {

        if (event.sender.options.renderer !== "javascript") {
            // Not a JS chart!
            return;
        }
        // Initialize the realtime framework.
        var
        chartObj = event.sender,
        args = chartObj.jsVars.instanceAPI,
        state = chartObj.__state, traverse = args,
        options = ((traverse = traverse.hcInstance) && (traverse = traverse.options)
            && (traverse = traverse.chart)) || {},
        refresh = pluckNumber(options.updateInterval, options.refreshInterval) * 1000,
        dataUrl = options.dataStreamURL,
        dataStamp = options.dataStamp,
        realtimeEnabled = args.realtimeEnabled && refresh
        && (dataUrl !== undefined) && args.hcInstance.options.chart,

        requestData = function () {
            var url = dataUrl;
            if (dataUrl.indexOf("?") === -1) {
                url += ("?num=" + (mathRandom()));
            } else {
                url += ("&num=" + (mathRandom()));
            }
            if (dataStamp) {
                /* if (dataUrl.indexOf("?") === -1) {
                    dataUrl += ("?dataStamp=" + dataStamp);
                } else { */
                url += ("&dataStamp=" + dataStamp);
            //}
            }
            state._rtAjaxObj.get(url);
        };

        // validate interval
        if (refresh < 10) {
            refresh = 10;
        }

        // clear any previous timeout
        clearTimeout(state._toRealtime);
        state._rtAjaxObj && state._rtAjaxObj.abort();

        if (realtimeEnabled) {
            state._rtPaused = false;
            state._rtDataUrl = dataUrl;
            chartObj.__state.lastSetValues = null;

            state._rtAjaxObj = new global.ajax(function (responseText, wrapper, data, url) {

                var updateObj = args.linearDataParser && args.linearDataParser(responseText);

                if(chartObj.isActive() && updateObj && args.hcInstance && args.hcInstance.series
                    && args.hcInstance.series[0] && args.hcInstance.series[0].realtimeUpdate) {

                    if (dataStamp) {
                        if (updateObj.dataStamp) {
                            dataStamp = updateObj.dataStamp;
                        } else {
                            dataStamp = null;
                        }
                    }

                    updateObj.interval = refresh < 1000 ? refresh : 1000;
                    args.hcInstance.series[0].realtimeUpdate(updateObj);
                    chartObj.jsVars._rtLastUpdatedData = chartObj.getDataJSON();

                    if (!state._rtPaused) {
                        state._toRealtime = setTimeout(requestData, refresh);
                    }
                }
                else {
                    clearTimeout(state._toRealtime);
                }

                global.raiseEvent('RealTimeUpdateComplete', {
                    data: responseText,
                    source: 'XmlHttpRequest',
                    url: url
                }, event.sender);

                try {
                    window.FC_ChartUpdated &&
                    window.FC_ChartUpdated(event.sender.id)
                }
                catch (err) {
                    setTimeout(function () {
                        throw (err);
                    }, 1);
                }

            }, function (resp, wrapper, data, url) {
                global.raiseEvent('RealTimeUpdateError', {
                    source: 'XmlHttpRequest',
                    url: url,
                    xmlHttpRequestObject: wrapper.xhr,
                    error: resp,
                    httpStatus: (wrapper.xhr && wrapper.xhr.status) ?
                    wrapper.xhr.status : -1
                }, event.sender);

                if(chartObj.isActive()) {
                    state._toRealtime = setTimeout(requestData, refresh);
                }
                else {
                    clearTimeout(state._toRealtime);
                }
            });

            state._toRealtime = setTimeout(requestData, refresh);

            chartObj.addEventListener("beforedispose", function () {
                clearTimeout(state._toRealtime);
            });

            chartObj.addEventListener("beforedataupdate", function () {
                chartObj.jsVars._rtLastUpdatedData = null;
            });
        }

        // remove the previously added listener to the realtime update event.
        chartObj.removeEventListener("RealTimeUpdateComplete", alertManager);

        /* check if the chart has any alert range(s)*/
        if (args.dataObj && args.dataObj.alerts && args.dataObj.alerts && args.dataObj.alerts.alert.length) {

            chartObj.addEventListener("RealTimeUpdateComplete", alertManager);
        }
    };

    global.addEventListener("drawcomplete", initializeFrameworks);

    // TODO: delete the following code shadeOffsetSchemes
    var shadeOffsetSchemes = {
        'gauge': {
            darkShadeOffset: 35,
            lightShadeOffset: 35,
            hambaShadeOffset: 90
        },
        'sparkcolumn': {
            darkShadeOffset: 45
        }
    };

    function GaugeColorManager (paletteId, themeColor, chartAPI) {

        //Theme color
        //Update flag theme, if we've to use theme color
        var isTheme = (getValidValue(themeColor) !==  undefined),
        _iterator = 0;

        this.paletteId = paletteId;
        this.themeColor = themeColor;
        this.isTheme = isTheme;
        this._iterator = _iterator;
        this.defaultGaugePaletteOptions = (chartAPI && chartAPI.defaultGaugePaletteOptions) || defaultGaugePaletteOptions;

    //this.shadeOffsetScheme = shadeOffsetScheme || shadeOffsetSchemes.gauge;
    }

    GaugeColorManager.prototype = {
        /**
         * getColor method cylic-iterates through the palette colors array
         * and returns a single color, based on user's selection of palette.
         */
        getColor: function() {
            var paletteId = this.paletteId;

            //Get the color
            var strColor = this.defaultGaugePaletteOptions.paletteColors[paletteId][this._iterator];
            //Increment iterator
            this._iterator += 1;
            //If _iterator is out of bound, reset it to 0
            if (this._iterator == (this.defaultGaugePaletteOptions.paletteColors[paletteId].length - 1)) {
                this._iterator = 0;
            }
            //Return color
            return strColor;
        },
        // ----------- Accessor functions to access colors for different elements ------------//
        /**
         * The following functions return default colors for a 2D Chart, based on the palette
         * selected by the user. Also, if the user has selected a single color theme, we calculate
         * the same and return accordingly.
         */
        get2DBgColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Background color for 2D Chart
            if (isTheme) {
                return (getLightColor(themeColor, 35) + COMMASTRING + getLightColor(themeColor, 10));
            }
            else {
                return this.defaultGaugePaletteOptions.bgColor[paletteId];
            }
        },
        get2DBgAlpha: function() {
            var paletteId = this.paletteId;
            //Background alpha for 2D Chart
            return this.defaultGaugePaletteOptions.bgAlpha[paletteId];
        },
        get2DBgAngle: function() {
            var paletteId = this.paletteId;
            //Background angle for 2D Chart
            return this.defaultGaugePaletteOptions.bgAngle[paletteId];
        },
        get2DBgRatio: function() {
            var paletteId = this.paletteId;
            //Background ratio for 2D Chart
            return this.defaultGaugePaletteOptions.bgRatio[paletteId];
        },

        getTickColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Tick mark color
            if (isTheme) {
                return (getDarkColor(themeColor, 90));
            } else {
                return this.defaultGaugePaletteOptions.tickColor[paletteId];
            }
        },

        getTrendDarkColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Trend dark color
            if (isTheme) {
                return (getDarkColor(themeColor, 90));
            } else {
                return this.defaultGaugePaletteOptions.trendDarkColor[paletteId];
            }
        },
        getTrendLightColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Trend dark color
            if (isTheme) {
                return (getLightColor(themeColor, this.defaultGaugePaletteOptions
                    .TrendLightShadeOffset));
            } else {
                return this.defaultGaugePaletteOptions.trendLightColor[paletteId];
            }
        },

        get2DCanvasBgColor: function() {
            var paletteId = this.paletteId;
            //Canvas background color for 2D Chart
            return this.defaultGaugePaletteOptions.canvasBgColor[paletteId];
        },
        get2DCanvasBgAngle: function() {
            var paletteId = this.paletteId;
            //Canvas background angle for 2D Chart
            return this.defaultGaugePaletteOptions.canvasBgAngle[paletteId];
        },
        get2DCanvasBgAlpha: function() {
            var paletteId = this.paletteId;
            //Canvas background alpha for 2D Chart
            return this.defaultGaugePaletteOptions.canvasBgAlpha[paletteId];
        },
        get2DCanvasBgRatio: function() {
            var paletteId = this.paletteId;
            //Canvas background ratio for 2D Chart
            return this.defaultGaugePaletteOptions.canvasBgRatio[paletteId];
        },
        get2DCanvasBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Canvas border color for 2D Chart
            if (isTheme) {
                return (getDarkColor(themeColor, 80));
            }
            else {
                return this.defaultGaugePaletteOptions.canvasBorderColor[paletteId];
            }
        },
        get2DCanvasBorderAlpha: function() {
            var paletteId = this.paletteId;
            //Canvas border alpha for 2D Chart
            return this.defaultGaugePaletteOptions.canvasBorderAlpha[paletteId];
        },

        get2DAltHGridColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Alternate horizontal grid color for 2D Chart
            if (isTheme) {
                return (getLightColor(themeColor, 20));
            } else {
                return this.defaultGaugePaletteOptions.altHGridColor[paletteId];
            }
        },
        get2DAltHGridAlpha: function() {
            var paletteId = this.paletteId;
            //Alternate horizontal grid alpha for 2D Chart
            return this.defaultGaugePaletteOptions.altHGridAlpha[paletteId];
        },
        get2DAltVGridColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Alternate vertical grid color for 2D Chart
            if (isTheme) {
                return (getLightColor(themeColor, 80));
            } else {
                return this.defaultGaugePaletteOptions.altVGridColor[paletteId];
            }
        },
        get2DAltVGridAlpha: function() {
            var paletteId = this.paletteId;
            //Alternate vertical grid alpha for 2D Chart
            return this.defaultGaugePaletteOptions.altVGridAlpha[paletteId];
        },
        get2DToolTipBgColor: function() {
            var paletteId = this.paletteId;
            //Tool Tip background Color for 2D Chart
            return this.defaultGaugePaletteOptions.toolTipBgColor[paletteId];
        },
        get2DToolTipBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Tool tip Border Color for 2D Chart
            if (isTheme) {
                return (getDarkColor(themeColor, 80));
            }
            else {
                return this.defaultGaugePaletteOptions.toolTipBorderColor[paletteId];
            }
        },
        get2DBaseFontColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Base Font for 2D Chart
            if (isTheme) {
                return (themeColor);
            } else {
                return this.defaultGaugePaletteOptions.baseFontColor[paletteId];
            }
        },
        get2DBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Chart Border Color
            if (isTheme) {
                return (getDarkColor(themeColor, 60));
            } else {
                return this.defaultGaugePaletteOptions.borderColor[paletteId];
            }
        },
        get2DBorderAlpha: function() {
            var paletteId = this.paletteId;
            //Chart Border Alpha 2D Chart
            return this.defaultGaugePaletteOptions.borderAlpha[paletteId];
        },
        get2DLegendBgColor: function() {
            var paletteId = this.paletteId;
            //Legend background Color for 2D Chart
            return this.defaultGaugePaletteOptions.legendBgColor[paletteId];
        },
        get2DLegendBorderColor: function() {
            //Legend Border Color
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            if (isTheme) {
                return (getDarkColor(themeColor, 80));
            } else {
                return this.defaultGaugePaletteOptions.legendBorderColor[paletteId];
            }
        },
        get2DPlotGradientColor: function() {
            var paletteId = this.paletteId;
            //Plot Gradient Color
            return this.defaultGaugePaletteOptions.plotGradientColor[paletteId];
        },
        get2DPlotBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Plot Border Color
            if (isTheme) {
                return (getDarkColor(themeColor, 85));
            } else {
                return this.defaultGaugePaletteOptions.plotBorderColor[paletteId];
            }
        },
        get2DPlotFillColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Plot Fill Color
            if (isTheme) {
                return (getDarkColor(themeColor, 85));
            } else {
                return this.defaultGaugePaletteOptions.plotFillColor[paletteId];
            }
        },
        get2DMsgLogColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Plot Fill Color
            if (isTheme) {
                return (getLightColor(themeColor, 80));
            } else {
                return this.defaultGaugePaletteOptions.msgLogColor[paletteId];
            }
        },
        // ----------------- CHART SPECIFIC COLORS ----------------------//
        // -------- ANGULAR GAUGE CHART ---------//
        getDialColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Dial color for angular gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 95) + ',FFFFFF,' + getDarkColor(themeColor, 95));
            } else {
                return this.defaultGaugePaletteOptions.dialColor[paletteId];
            }
        },
        getDialBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Dial color for angular gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 95) + ',FFFFFF,' + getDarkColor(themeColor, 95));
            } else {
                return this.defaultGaugePaletteOptions.dialBorderColor[paletteId];
            }
        },
        getPivotColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pivot color for angular gauge
            if (isTheme) {
                return (getLightColor(themeColor, 95) + ',FFFFFF,' + getLightColor(themeColor, 95));
            } else {
                return this.defaultGaugePaletteOptions.pivotColor[paletteId];
            }
        },
        getPivotBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pivot color for angular gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 95) + ',FFFFFF,' + getDarkColor(themeColor, 95));
            } else {
                return this.defaultGaugePaletteOptions.pivotBorderColor[paletteId];
            }
        },
        //------------- Linear Gauge ---------------------//
        getPointerBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pointer border color for linear gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 75));
            } else {
                return this.defaultGaugePaletteOptions.pointerBorderColor[paletteId];
            }
        },
        getPointerBgColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pointer background color for linear gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 75));
            } else {
                return this.defaultGaugePaletteOptions.pointerBgColor[paletteId];
            }
        },
        //---------------- Thermometer gauge ----------------------//
        getThmBorderColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pointer background color for linear gauge
            if (isTheme) {
                return (getDarkColor(themeColor, 90));
            } else {
                return this.defaultGaugePaletteOptions.thmBorderColor[paletteId];
            }
        },
        getThmFillColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pointer background color for linear gauge
            if (isTheme) {
                return (getLightColor(themeColor, 55));
            } else {
                return this.defaultGaugePaletteOptions.thmFillColor[paletteId];
            }
        },
        //---------------- Cylinder gauge ------------------------//
        getCylFillColor: function() {
            var paletteId = this.paletteId,
            isTheme = this.isTheme,
            themeColor = this.themeColor;
            //Pointer background color for linear gauge
            if (isTheme) {
                return (getLightColor(themeColor, 55));
            } else {
                return this.defaultGaugePaletteOptions.cylFillColor[paletteId];
            }
        },
        getPeriodColor: function () {
            //Period Color
            if (this.isTheme) {
                return (getLightColor(this.themeColor, 10));
            } else {
                return this.defaultGaugePaletteOptions.periodColor[this.paletteId];
            }
        },
        //Methods for win loss chart only
        getWinColor: function () {
            //Fill color for winning
            return this.defaultGaugePaletteOptions.winColor[this.paletteId];
        },
        getLossColor: function () {
            //Fill color for losing
            return this.defaultGaugePaletteOptions.lossColor[this.paletteId];
        },
        getDrawColor: function () {
            //Fill color for draw
            return this.defaultGaugePaletteOptions.drawColor[this.paletteId];
        },
        getScoreLessColor: function () {
            //Fill color for score less
            return this.defaultGaugePaletteOptions.scorelessColor[this.paletteId];
        },
        //Re-set method resets the iterator to
        reset: function() {
            this._iterator = 0;
        },
        /**
         * parseColorMix method parses the color mix formula and returns
         * an array of colors depending of the constituents specified in
         * the formula.
         *	@param	aColor		Actual color on which calculations will be based on.
         *	@param	mix			Formula containing the mix of colors.
         *						Example: ("943A0A","{light-50},FFFFFF,{color},{dark-25}")
         *	@return				Array of colors containing the required mix of colors (in RGB) - not HEX
         */
        parseColorMix: function (aColor, mix) {
            var
            //Create a return array
            rtnArr = [];

            //Remove all spaces from the formula
            mix = mix.replace(/\s/g, BLANKSTRING);
            //Convert to lower case for case insensitive comparison
            mix = mix.toLowerCase();
            //If mix is blank, undefined or null, return the single color
            if (mix == "" || mix == null || mix == undefined) {
                rtnArr = [aColor];
            } else {
                //Loop variables
                var i, j;
                var dashIndex, intensity;
                //Now, split into main tokens
                var tokens = mix.split(",");
                //Iterate through each token to check what it is.
                for (i=0; i<tokens.length; i++) {
                    //Remove { and } from token.
                    tokens[i] = tokens[i].replace("{", "");
                    tokens[i] = tokens[i].replace("}", "");
                    //Now, based on what token is, we take action
                    if (tokens[i] == "color") {
                        //If actual color
                        rtnArr.push(aColor);
                    } else if (tokens[i].substr(0, 5) == "light") {
                        //Need to find lighter shade
                        //First find the intensity, which the user has specified.
                        //Get dash index
                        dashIndex = tokens[i].indexOf("-");
                        intensity = ((dashIndex == -1) ? 1 : (tokens[i].substr(dashIndex+1, tokens[i].length-dashIndex)));
                        //Now in actual method, 0 means lightest and 1 means normal. So, we've to reverse
                        intensity = 100 - intensity;
                        //Push the lighter color in array
                        rtnArr.push(getLightColor(aColor, intensity));
                    } else if (tokens[i].substr(0, 4) == "dark") {
                        //Need to find darker shade
                        //First find the intensity, which the user has specified.
                        //Get dash index
                        dashIndex = tokens[i].indexOf("-");
                        intensity = (dashIndex == -1) ? 1 : (tokens[i].substr(dashIndex+1, tokens[i].length-dashIndex));
                        //Now in actual method, 0 means darkest and 1 means normal. So, we've to reverse
                        intensity = 100 - intensity;
                        //Push the darker color in array
                        rtnArr.push(getDarkColor(aColor, intensity));
                    } else {
                        //User has himself given a normal hex color code.
                        //So, convert and append
                        rtnArr.push(tokens[i]);
                    }
                }
            }
            //Return array
            return rtnArr;
        },
        /**
         * parseAlphaList method takes a list of alphas separated
         * by comma and returns an array of the individual alphas
         *	@param	strAlphas	List of alphas separated by comma e.g.,
         *						20,30,40 etc.
         *	@param	numColors	Number of colors for which we've to build
         *						the alpha list
         *	@return			An array whose each cell contains a single
         *						alpha value (validated).
         */
        parseAlphaList: function (strAlphas, numColors) {
            //Input list of alpha
            var arrInputAlphas = [];
            //Final list
            var arrAlphas = [];
            //Extract the input alphas
            arrInputAlphas = strAlphas.split(",");
            //Count of valid alphas
            var alpha,
            usedAlpha = 100;
            //Loop variable
            var i;
            //Change the alpha matrix to number (from string base)
            for (i=0; i<numColors; i++) {
                //Get the alpha
                alpha = pluckNumber(arrInputAlphas[i]);
                //Now, if the alpha is non-numeric or undefined, we set our own values
                //alpha = (isNaN(alpha) || (alpha == undefined)) ? 100 : Number(alpha);
                if (defined(alpha)) {
                    usedAlpha = alpha;
                }
                //Store it in the array
                arrAlphas[i] = usedAlpha;
            }
            //Return the array
            return arrAlphas.join();
        },
        /**
         * parseRatioList method takes a list of color division ratios
         * (on base of 100%) separated by comma and returns an array of
         * the individual ratios (on base of 255 hex).
         *	@param	strRatios	List of ratios (on base of 100%) separated by
         *						comma e.g., 20,40,40 or 5,5,90 etc.
         *	@param	numColors	Number of colors for which we've to build
         *						the ratio list
         *	@return				An array whose each cell contains a single
         *						ratio value (on base of 255 hex).
         */
        parseRatioList: function(strRatios, numColors) {
            //Arrays to store input and final ratio
            var arrInputRatios = [];
            var arrRatios = [];
            //Split the user input ratios
            arrInputRatios = strRatios.split(",");
            //Sum of ratios
            var sumRatio = 0;
            var ratio;
            //Loop variable
            var i;
            //First, check if all ratios are numbers and calculate sum
            for (i=0; i<numColors; i++) {
                //Get the ratio
                ratio = arrInputRatios[i];
                //Now, if the ratio is non-numeric or undefined, we set our own values
                ratio = (isNaN(ratio) || (ratio == undefined)) ? 0 : Math.abs(Number(ratio));
                //If ratio is greater than 100, restrict it to 100
                ratio = (ratio>100) ? 100 : ratio;
                //Allot it to final array
                arrRatios[i] = ratio;
                //Add to sum
                sumRatio += ratio;
            }
            //Total ratio inputted by user should not exceed 100
            sumRatio = (sumRatio>100) ? 100 : sumRatio;
            //If more colors are present than the number of ratios, we need to
            //proportionately append the rest of values
            if (arrInputRatios.length<numColors) {
                for (i=arrInputRatios.length; i<numColors; i++) {
                    arrRatios[i] = (100-sumRatio)/(numColors-arrInputRatios.length);
                }
            }
            //Now, convert ratio percentage to actual values from 0 to 255 (Hex base)
            arrRatios[-1] = 0;

            //Return the ratios array
            return arrRatios.join();
        }
    };
    GaugeColorManager.prototype.constructor = GaugeColorManager;

    var defaultOptions = Highcharts.setOptions({});
    defaultPlotOptions = defaultOptions.plotOptions;

    /**
     * @class MathExt
     * @author InfoSoft Global (P) Ltd.
     * @version 3.0
     *
     * Copyright (C) InfoSoft Global Pvt. Ltd. 2006

     * MathExt class bunches a group of mathematical functions
     * which will be used by other classes. All the functions in
     * this class are declared as static, as the methods do not
     * relate to any specific instance.
     */

    /**
     * Private constructor function so that instances of
     * this class cannot be initialized.
     */
    function MathExt () {
    //Nothing to do.
    }
    /**
     * numDecimals method returns the number of decimal places provided
     * in the given number.
     *	@param	num	Number for which we've to find the decimal places.
     *	@return	Number of decimal places found.
     */
    MathExt.prototype = {

        numDecimals: function (num) {
            // Fix for upperLimits or lowerLimits given in decimal
            num = toPrecision(num, 10);
            //Absolute value (to avoid floor disparity for negative num)
            num = Math.abs(num);
            //Get decimals
            var decimal = toPrecision((num-Math.floor(num)), 10);
            //Number of decimals
            var numDecimals = (String(decimal).length-2);
            //For integral values
            numDecimals = (numDecimals<0) ? 0 : numDecimals;
            //Return the length of string minus '0.'
            return numDecimals;
        },
        /**
         * toRadians method converts angle from degrees to radians
         * @param	angle	The numeric value of the angle in
         * 					degrees
         * @return			The numeric value of the angle in radians
         */
        toRadians: function (angle) {
            return (angle/180)*Math.PI;
        },
        /**
         * toDegrees method converts angle from radians to degrees
         * @param	angle	The numeric value of the angle in
         * 					radians
         * @returns			The numeric value of the angle in degrees
         */
        toDegrees: function (angle) {
            return (angle/Math.PI)*180;
        },
        /**
         * flashToStandardAngle method converts angles from Flash angle to normal angles (0-360).
         *	@param	ang		Angle to be converted
         *	@return			Converted angle
         */
        flashToStandardAngle: function (ang) {
            return -1*ang;
        },
        /**
         * standardToFlashAngle method converts angles from normal angle to Flash angles
         *	@param	ang		Angle to be converted
         *	@return			Converted angle
         */
        standardToFlashAngle: function (ang) {
            return -1*ang;
        },
        /**
         * flash180ToStandardAngle method changes a Flash angle (-180° to 180°) into standard
         * angle (0° to 360° CCW) wrt the positive x-axis using angle input.
         * @param   ang 	Angle in degrees (-180° to 180°).
         * @return  		Angle in degrees (0° to 360° CCW).
         **/
        flash180ToStandardAngle: function (ang) {
            var a = 360-(((ang%=360)<0) ? ang+360 : ang);
            return (a==360) ? 0 : a;
        },
        /**
         * getAngularPoint method calculates a point at a given angle
         * and radius from the given point.
         *	@param	fromX		From point's X co-ordinate
         *	@param	fromY		From point's Y co-ordinate
         *	@param	distance	How much distance (pixels) from current point?
         *	@param	angle		At what angle (degrees - standard) from current point
         */
        getAngularPoint: function(fromX, fromY, distance, angle) {
            //Convert the angle into radians
            angle = angle*(Math.PI/180);
            var xPos = fromX+(distance*Math.cos(angle));
            var yPos = fromY-(distance*Math.sin(angle));
            return ({
                x:xPos,
                y:yPos
            });
        },
        /**
         * remainderOf method calculates the remainder in
         * a division to the nearest twip.
         * @param	a	dividend in a division
         * @param	b	divisor in a division
         * @returns		Remainder in the division rounded
         * 				to the nearest twip.
         */
        remainderOf: function (a, b) {
            return roundUp(a%b);
        },
        /**
         * boundAngle method converts any angle in degrees
         * to its equivalent in the range of 0 to 360 degrees.
         * @param	angle	Angle in degrees to be procesed;
         *					can take negetive values.
         * @returns			Equivalent non-negetive angle in degrees
         *					less than or equal to 360 degrees
         */
        boundAngle: function (angle) {
            if (angle>=0) {
                return remainderOf(angle, 360);
            }
            else {
                return 360-remainderOf(Math.abs(angle), 360);
            }
        },
        /**
         * toNearestTwip method converts a numeric value by
         * rounding it to the nearest twip value ( one twentieth
         * of a pixel ) for propermost rendering in flash.
         * @param	num		Number to rounded
         * @returns			Number rounded upto 2 decimal places and
         *					second significant digit right of decimal
         *					point, if exists at all is 5.
         */
        toNearestTwip: function(num) {
            var n = num;
            var s = (n<0) ? -1 : 1;
            var k = Math.abs(n);
            var r = Math.round(k*100);
            var b = Math.floor(r/5);
            var t = Number(String(r-b*5));
            var m = (t>2) ? b*5+5 : b*5;
            return s*(m/100);
        },
        /**
         * roundUp method is used to format trailing decimal
         * places to the required precision, with default base 2.
         * @param		num		number to be formatted
         * @param		base	number of precision digits
         * @returns		formatted number
         */
        roundUp: function (num, base) {
            // precise to number of decimal places
            base = (base == undefined) ? 2 : base;
            var factor = Math.pow(10, base);
            num *= factor;
            num = Math.round(Number(String(num)));
            num /= factor;
            return num;
        }
    };

    MathExt.prototype.constructor = MathExt;
    window.MathExt = MathExt;



    var placeTitleOnSide = function (hcJSON, fcJSON, allowedWidth, height, defaultPadding, chartWidth, chartHeight) {
        // Caption Space Management
        var conf = hcJSON[FC_CONFIG_STRING],
        smartLabel = conf.smartLabel,
        FCChartObj = fcJSON.chart,
        chart = hcJSON.chart,
        capStyle, subCapStyle, captionObj, subCaptionObj, maxCaptionWidth = 0,
        titleObj = hcJSON.title, subTitleObj = hcJSON.subtitle,
        titleText = titleObj.text,
        subTitleText = subTitleObj.text,
        captionPadding = pluckNumber(FCChartObj.captionpadding, defaultPadding, 2),
        captionLineHeight = 0, subCaptionLineHeight = 0,
        subCaptionFontSize = 0, captionFontSize = 0,
        captionOnRight = pluckNumber(FCChartObj.captiononright, 0),
        captionPosition = getValidValue(FCChartObj.captionposition, 'top').toLowerCase(),
        HEIGHT_PADDING = 0,
        GUTTER_PADDING = 2,
        captionHeight = 0,
        captionMaxHeight = height,
        actualCaptionWidth, captionWidth = {
            left: 0,
            right: 0
        };


        // Finding the Caption and SubCaption Width.
        if (titleText !== BLANKSTRING) {//calculatethe single line's height
            capStyle = titleObj.style;
            captionLineHeight = pluckNumber(parseInt(capStyle.fontHeight, 10), parseInt(capStyle.lineHeight, 10), 12);
            captionFontSize = pluckNumber(parseInt(capStyle.fontSize, 10), 10);
        }
        if (subTitleText !== BLANKSTRING) {
            subCapStyle = subTitleObj.style;
            subCaptionLineHeight = pluckNumber(parseInt(subCapStyle.fontHeight, 10), parseInt(subCapStyle.lineHeight, 10), 12);
            subCaptionFontSize = pluckNumber(parseInt(subCapStyle.fontSize, 10), 10);
        }
        if (captionLineHeight > 0 || subCaptionLineHeight > 0) {
            smartLabel.setStyle(capStyle);
            captionObj = smartLabel.getSmartText(titleObj.text, allowedWidth, captionMaxHeight);
            // Force fully increase width to give a gutter in caption and subCaption
            if (captionObj.width > 0) {
                captionObj.width += GUTTER_PADDING;
                captionHeight = captionObj.height;
            }

            smartLabel.setStyle(subCapStyle);
            subCaptionObj = smartLabel.getSmartText(subTitleObj.text, allowedWidth, height - captionHeight);
            // Force fully increase width to give a gutter in caption and subCaption
            if (subCaptionObj.width > 0) {
                subCaptionObj.width += GUTTER_PADDING;
            }
            switch (captionPosition) {
                case 'middle':
                    titleObj.y = (height / 2) + ((captionFontSize -
                        (subCaptionFontSize > 0 ? subCaptionFontSize + HEIGHT_PADDING : 0)) / 2);
                    titleObj.y = (height / 2) - subCaptionObj.height / 2;
                    subTitleObj.y = titleObj.y  + HEIGHT_PADDING + subCaptionFontSize;
                    break;
                case 'bottom':
                    subTitleObj.y = height - chart.marginBottom - chart.marginTop;
                    titleObj.y = subTitleObj.y - (subCaptionObj.height > 0 ? subCaptionObj.height + HEIGHT_PADDING : 0);
                    break;
                default: // We put it on top by default
                    titleObj.y = captionFontSize - HEIGHT_PADDING;
                    subTitleObj.y = captionObj.height + subCaptionFontSize;
                    break;
            }
            maxCaptionWidth = Math.max(captionObj.width, subCaptionObj.width);
            // Replace the caption and subCaption text with the new wrapped text
            hcJSON.title.text = captionObj.text;
            hcJSON.subtitle.text = subCaptionObj.text;

            //Add caption padding, if either caption or sub-caption is to be shown
            if (maxCaptionWidth > 0) {
                maxCaptionWidth = maxCaptionWidth + captionPadding;
            }

            actualCaptionWidth = Math.min(maxCaptionWidth, allowedWidth);

            if (captionOnRight) {
                titleObj.align = subTitleObj.align = POSITION_RIGHT;
                captionWidth.right = actualCaptionWidth;
                titleObj.x = captionObj.width - maxCaptionWidth + captionPadding;
                subTitleObj.x = subCaptionObj.width - maxCaptionWidth + captionPadding;
            } else {
                titleObj.align = subTitleObj.align = POSITION_LEFT;
                captionWidth.left = actualCaptionWidth;
                titleObj.x = maxCaptionWidth - captionObj.width - captionPadding;
                subTitleObj.x = maxCaptionWidth - subCaptionObj.width - captionPadding;
            }
        }

        return captionWidth;
    },


    fixCaptionAlignment = function (hcJSON, fcJSON, width, leftLabel, rightLabel) {

        var HCChartObj = hcJSON.chart,
        FCChartObj = fcJSON.chart,
        titleObj = hcJSON.title,
        captionPadding = pluckNumber(FCChartObj.captionpadding, 2),
        captionOnRight = pluckNumber(FCChartObj.captiononright, 0),
        subTitleObj = hcJSON.subtitle,
        canvasWidth,
        GUTTER_PADDING = 2;

        HCChartObj.spacingRight = HCChartObj.spacingLeft = 0;

        if (!defined(leftLabel)) {
            leftLabel = 0;
        }
        if (!defined(rightLabel)) {
            rightLabel = 0
        }

        if (captionOnRight) {
            canvasWidth = (width - HCChartObj.marginRight);
            subTitleObj.align = titleObj.align = POSITION_LEFT;
            //labelsMaxWidth = HCChartObj.marginRight - captionWidth.right;
            titleObj.x = subTitleObj.x = canvasWidth + captionPadding + rightLabel + GUTTER_PADDING;
        } else {
            canvasWidth = (width - HCChartObj.marginLeft);
            subTitleObj.align = titleObj.align = POSITION_RIGHT;
            titleObj.x = subTitleObj.x = HCChartObj.spacingLeft - canvasWidth
            - captionPadding - leftLabel - GUTTER_PADDING;
        }
    };


    /**
     * @class GaugeAxis
     * @author InfoSoft Global (P) Ltd. www.InfoSoftGlobal.com
     * @version 3.0
     *
     * Copyright (C) InfoSoft Global Pvt. Ltd.
     *
     * GaugeAxis class represents the generic gauge axis for any single
     * gauge. The APIs and methods have been created
     * to support real-time update of gauge, when data feeds come in.
    var GaugeAxis = function (minValue, maxValue, stopMaxAtZero,
        setMinAsZero, numMajorTM, numMinorTM, adjustTM, tickValueStep, showLimits,
        nfFormatting, bFormatNumber, bFormatNumberScale, decimals, forceDecimals) {
     */
    var GaugeAxis = function (minValue, maxValue, stopMaxAtZero, scale, nfFormatting) {
        //Store as instance variables
        this.userMin = minValue;
        this.userMax = maxValue;
        //Default tick marks
        this.numMajorTM = pluckNumber(scale.majorTMNumber, -1);
        this.numMinorTM = pluckNumber(scale.minorTMNumber, 5);
        this.adjustTM = scale.adjustTM;
        this.tickValueStep = pluckNumber(scale.tickValueStep, 1);
        this.showLimits = pluckNumber(scale.showLimits, 1);
        this.showTickValues = pluckNumber(scale.showTickValues, 1);
        //Number formatting reference
        this.nf = nfFormatting;
        //Number formatting related properties
        //stopMaxAtZero and setMinAsZero
        this.stopMaxAtZero = stopMaxAtZero;
        this.setMinAsZero = !scale.setAdaptiveMin;
        // upperLimitDisplay text
        this.upperLimitDisplay = scale.upperLimitDisplay;
        // lowerLimitDisplay text
        this.lowerLimitDisplay = scale.lowerLimitDisplay;
        //Store flags whether max and min have been explicity specified by the user.
        this.userMaxGiven = (this.userMax == null || this.userMax == undefined || this.userMax == '') ? false:true;
        this.userMinGiven = (this.userMin == null || this.userMin == undefined || this.userMin == '') ? false:true;
        //Initialize tick marks container
        this.majorTM = [];
        this.minorTM = [];
        this.MathExt = new MathExt();
    }
    /**
     * setAxisCoords method sets the starting and ending axis position
     * The position can be pixels or angles. Here if the axis is reverse,
     * we can pass reverse startAxisPos and endAxisPos, depending on which
     * side we consider as start. getPosition() method will then automatically
     * return the right values based on the same.
     *	@param	startAxisPos	Start position (or angle) for that axis
     *	@param	endAxisPos		End position (or angle) for that axis
     *	@return					Nothing
     */
    GaugeAxis.prototype = {
        setAxisCoords: function (startAxisPos, endAxisPos){
            //Just store it
            this.startAxisPos = startAxisPos;
            this.endAxisPos = endAxisPos;
        },
        /**
         * calculateLimits method helps calculate the axis limits based
         * on the given maximum and minimum value.
         * 	@param	maxValue		Maximum numerical value present in data
         *	@param	minValue		Minimum numerical value present in data
         */
        calculateLimits: function (maxValue, minValue) {
            var isMinValid = true;
            var isMaxValid = true;
            //First check if both maxValue and minValue are proper numbers.
            //Else, set defaults as 0.9,0
            //For Max Value
            if(isNaN(maxValue)){
                maxValue = 0.9;
                isMaxValid = false;
            }
            //For Min Value
            if(isNaN(minValue)){
                minValue = 0;
                isMinValid = false;
            }
            //Or, if only 0 data is supplied
            if ((maxValue == minValue) && (maxValue == 0)){
                maxValue = 0.9;
            }
            //Get the maximum power of 10 that is applicable to maxvalue
            //The Number = 10 to the power maxPowerOfTen + x (where x is another number)
            //For e.g., in 99 the maxPowerOfTen will be 1 = 10^1 + 89
            //And for 102, it will be 2 = 10^2 + 2
            var maxPowerOfTen = Math.floor (Math.log (Math.abs (maxValue)) / Math.LN10);
            //Get the minimum power of 10 that is applicable to maxvalue
            var minPowerOfTen = Math.floor (Math.log (Math.abs (minValue)) / Math.LN10);
            //Find which powerOfTen (the max power or the min power) is bigger
            //It is this which will be multiplied to get the y-interval
            var powerOfTen = Math.max (minPowerOfTen, maxPowerOfTen);
            var y_interval = Math.pow (10, powerOfTen);
            //For accomodating smaller range values (so that scale doesn't represent too large an interval
            if (Math.abs (maxValue) / y_interval < 2 && Math.abs (minValue) / y_interval < 2) {
                powerOfTen --;
                y_interval = Math.pow (10, powerOfTen);
            }
            //If the y_interval of min and max is way more than that of range.
            //We need to reset the y-interval as per range
            var rangePowerOfTen = Math.floor (Math.log (maxValue - minValue) / Math.LN10);
            var rangeInterval = Math.pow (10, rangePowerOfTen);
            //Now, if rangeInterval is 10 times less than y_interval, we need to re-set
            //the limits, as the range is too less to adjust the axis for max,min.
            //We do this only if range is greater than 0 (in case of 1 data on chart).
            if (((maxValue - minValue) > 0) && ((y_interval / rangeInterval) >= 10)){
                y_interval = rangeInterval;
                powerOfTen = rangePowerOfTen;
            }
            //Calculate the y-axis upper limit
            var y_topBound = (Math.floor (maxValue / y_interval) + 1) * y_interval;
            //Calculate the y-axis lower limit
            var y_lowerBound;
            //If the min value is less than 0
            if (minValue<0){
                //Then calculate by multiplying negative numbers with y-axis interval
                y_lowerBound = - 1 * ((Math.floor (Math.abs (minValue / y_interval)) + 1) * y_interval);
            } else {
                //Else, simply set it to 0.
                if (this.setMinAsZero){
                    y_lowerBound = 0;
                } else {
                    y_lowerBound = Math.floor (Math.abs (minValue / y_interval) - 1) * y_interval;
                    //Now, if minValue>=0, we keep x_lowerBound to 0 - as for values like minValue 2
                    //lower bound goes negative, which is not required.
                    y_lowerBound = (y_lowerBound < 0) ?0 : y_lowerBound;
                }
            }
            //MaxValue cannot be less than 0 if stopMaxAtZero is set to true
            if (this.stopMaxAtZero && maxValue <= 0){
                y_topBound = 0;
            }
            //If he has provided it and it is valid, we leave it as the upper limit
            //Else, we enforced the value calculate by us as the upper limit.
            if (this.userMaxGiven == false || (this.userMaxGiven == true && Number(this.userMax) < maxValue  && isMaxValid)){
                this.max = y_topBound;
            } else {
                this.max = Number(this.userMax);
            }
            //Now, we do the same for y-axis lower limit
            if (this.userMinGiven == false || (this.userMinGiven == true && Number (this.userMin) > minValue && isMinValid)) {
                this.min = y_lowerBound;
            } else {
                this.min = Number (this.userMin);
            }
            //If min is greater than or equal to max then reset those
            if(this.min > this.max){
                if( (this.min ==  Number(this.userMin)) && (this.max ==  Number(this.userMax)) ){
                    var _min = this.min;
                    this.min = this.max;
                    this.max = _min;
                }else if( this.min ==  Number(this.userMin) ){
                    this.max = this.min + 1;
                }else if( this.max ==  Number(this.userMax) ){
                    this.min = this.max - 1;
                }
            }else if(this.min == this.max){
                this.max = this.min + 1;
            }
            //Store axis range
            this.range = Math.abs (this.max - this.min);
            //Store interval
            this.interval = y_interval;
            //Based on this scale, calculate the tick interval
            this.calcTickInterval();
        },
        /**
         * calcTickInterval method calculates the best division interval for the given/calculated
         * min, max specified and numMajorTM specified. Following two cases have been dealt with:
         * Case 1: If both min and max was calculated by us, we re-set them so that we get a best
         * interval based on numMajorTM. The idea is to have equal intervals without changing numMajorTM.
         * Case 2: We change numMajorTM based on the axis limits. Also, we change only if user has
         * opted to adjustTM.
         */
        calcTickInterval: function () {
            //We cannot have a numMajorTM less than 2, if explicitly specified
            if (this.numMajorTM!=-1 && this.numMajorTM<2){
                this.numMajorTM = 2;
            }
            //Case 1: User has not specified either max or min, but specified numMajorTM
            if (this.userMinGiven == false && this.userMaxGiven == false && this.numMajorTM!=-1){
                /**
                 * In this case, we first get apt divisible range based on min, max,
                 * numMajorTM and the calculated interval. Thereby, get the difference
                 * between original range and new range and store as delta.
                 * If max>0, add this delta to max. Else substract from min.
                 * In this case, we keep numMajorTM constant and vary the axis's limits.
                 */
                //If user has not specified any number of major tick marks, we default to 5.
                this.numMajorTM = (this.numMajorTM==-1)?5:this.numMajorTM;
                //Get the adjusted divisible range
                var adjRange = this.getDivisibleRange (this.min, this.max, this.numMajorTM, this.interval, true);
                //Get delta (Calculated range minus original range)
                var deltaRange = adjRange - this.range;
                //Update global range storage
                this.range = adjRange;
                //Now, add the change in range to max, if max > 0, else deduct from min
                if (this.max > 0){
                    this.max = this.max + deltaRange;
                }
                else {
                    this.min = this.min - deltaRange;
                }
            } else {
                /**
                 * Here, we adjust the number of tick marks based on max, min, if
                 * user has opted to adjustTM.
                 */
                //If the user has not specified any tick mark number, we assume a default of 5.
                this.numMajorTM = (this.numMajorTM==-1)?5:this.numMajorTM;
                //Since we're considering the upper and lower limits of axis as major tick marks,
                //so calculation is necessary only if there are more than 2 tick marks. Else, they
                //simple represent the upper and lower limit.
                //Also, we adjust number of tick marks only if user has opted for adjustTM
                if (this.adjustTM == true){
                    var counter = 0;
                    var multiplyFactor = 1;
                    var calcMajorTM;
                    while (1 == 1){
                        //Increment,Decrement numMajorTM
                        calcMajorTM = this.numMajorTM + (counter * multiplyFactor);
                        //Cannot be 0
                        calcMajorTM = (calcMajorTM == 0) ? 1 : calcMajorTM;
                        //Check whether this number of calcMajorTM satisfies our requirement
                        if (this.isRangeDivisible (this.range, calcMajorTM, this.interval)){
                            //Exit loop
                            break;
                        }
                        //Each counter comes twice: one for + count, one for - count
                        counter = (multiplyFactor == - 1 || (counter > this.numMajorTM)) ? ( ++ counter) : (counter);
                        if (counter > 25) {
                            //We do not go beyond 25 count to optimize.
                            //If the loop comes here, it means that divlines
                            //counter is not able to achieve the target.
                            //So, we assume no tick marks are possible and exit.
                            //Just store the tick mark for the upper and lower limits.
                            // OLD Code.
                            //calcMajorTM = 2;
                            calcMajorTM = this.numMajorTM;
                            break;
                        }
                        //Switch to increment/decrement mode. If counter
                        multiplyFactor = (counter <= this.numMajorTM) ? (multiplyFactor * - 1) : (1);
                    }
                    //Store the value in params
                    this.numMajorTM = (calcMajorTM > 1) ? calcMajorTM : this.numMajorTM;
                } else {
            //Do nothing. This case comes where user has opted not to adjust TM.
            }
            }
            //Store the major tick interval
            this.majorTickInt = (this.max - this.min)/(this.numMajorTM-1);
        },
        /**
         * isRangeDivisible method helps us judge whether the given range is
         * perfectly divisible for specified interval & numMajorTM.
         * To check that, we divide the given range into numMajorTM section.
         * If the decimal places of this division value is <= that of interval,
         * that means, this range fits in our purpose. We return a boolean value
         * accordingly.
         *	@param	range		Range of axis (Max - Min). Absolute value
         *	@param	numMajorTM	Number of tick marks to be plotted.
         *	@param	interval	Axis Interval (power of ten).
         *	@return				Boolean value indicating whether this range is divisible
         *						by the given number of tick marks.
         */
        isRangeDivisible: function (range, numMajorTM, interval) {
            //Get range division
            var rangeDiv = range/(numMajorTM-1);
            //Now, if the decimal places of rangeDiv and interval do not match,
            //it's not divisible, else it's divisible
            if (this.MathExt.numDecimals(rangeDiv) > this.MathExt.numDecimals(interval)){
                return false;
            } else {
                return true;
            }
        },
        /**
         * getDivisibleRange method calculates a perfectly divisible range based
         * on interval, numMajorTM, min and max specified.
         * We first get the range division for the existing range
         * and user specified number of tick marks. Now, if that division satisfies
         * our needs (decimal places of division and interval is equal), we do NOT
         * change anything. Else, we round up the division to the next higher value {big delta
         * in case of smaller values i.e., interval <1 and small delta in case of bigger values >1).
         * We multiply this range division by number of tick marks required and calculate
         * the new range.
         *	@param	min				Min value of axis
         *	@param	max				Max value of axis
         *	@param	numMajorTM		Number of major tick marks to be plotted.
         *	@param	interval		Axis Interval (power of ten).
         *	@param	interceptRange	Boolean value indicating whether we've to change the range
         *							by altering interval (based on it's own value).
         *	@return					A range that is perfectly divisible into given number of sections.
         */
        getDivisibleRange: function (min, max, numMajorTM, interval, interceptRange){
            //If numMajorTM<3, we do not need to calculate anything, so simply return the existing range
            if (numMajorTM<3){
                return this.range;
            }
            //Get the range division for current min, max and numMajorTM
            var range = Math.abs (max - min);
            var rangeDiv = range/(numMajorTM-1);
            //Now, the range is not divisible
            if (!this.isRangeDivisible(range, numMajorTM, interval)){
                //We need to get new rangeDiv which can be equally distributed.
                //If intercept range is set to true
                if (interceptRange){
                    //Re-adjust interval so that gap is not much (conditional)
                    //Condition check limit based on value
                    var checkLimit = (interval>1)?2:0.5;
                    if ((Number(rangeDiv)/Number(interval))<checkLimit){
                        //Decrease power of ten to get closer rounding
                        interval = interval/10;
                    }
                }
                //Adjust range division based on new interval
                rangeDiv = (Math.floor(rangeDiv/interval)+1)*interval;
                //Get new range
                range = rangeDiv*(numMajorTM-1);
            }
            //Return range
            return range;
        },
        /**
         * calculateTicks method calculates the tick values for the axis and stores
         * them in instance variables.
         *	@return			Nothing
         */
        calculateTicks: function () {
            //Initialize the containers - as for each call, we'll change old values
            this.majorTM = [];
            this.minorTM = [];
            //First, create each major tick mark and store it in this.majorTM
            var count = 0, tickValue, showValue, displayValue, i, j,
            minorTickInterval,
            numMajorTM = this.numMajorTM,
            numMinorTM = this.numMinorTM,
            NumberFormatter = this.nf,
            tickValueStep = this.tickValueStep,
            lowerLimitDisplay = parseUnsafeString(this.lowerLimitDisplay),
            upperLimitDisplay = parseUnsafeString(this.upperLimitDisplay),
            majorTickInt = this.majorTickInt,
            min = this.min,
            showTickValues = this.showTickValues,
            string = false,
            showLimits = pluckNumber(this.showLimits, showTickValues);
            for (; count < numMajorTM; count += 1) {
                //Converting to string and back to number to avoid Flash's rounding problems.
                //tickValue = Number(min + (majorTickInt * count));
                // Fix for showing more decimal places in tick marks labels
                tickValue = toPrecision(Number(min + (majorTickInt * count)), 10);
                //Whether to show this tick
                displayValue = NumberFormatter.scale(tickValue);
                string = false;
                if (count % tickValueStep !== 0 && count !== numMajorTM - 1) {
                    displayValue = BLANKSTRING;
                }
                else {
                    if (count == 0 || count == numMajorTM - 1) {
                        if (!showLimits) {
                            displayValue = BLANKSTRING;
                        }
                        else if (count == 0 && lowerLimitDisplay){
                            displayValue = lowerLimitDisplay;
                            string = true;
                        }
                        else if (count == numMajorTM - 1 && upperLimitDisplay){
                            displayValue = upperLimitDisplay;
                            string = true;
                        }
                    }
                    else if (!showTickValues) {
                        displayValue = BLANKSTRING;
                    }
                }

                //Push it into array
                this.majorTM.push({
                    displayValue: displayValue,
                    isString: string,
                    value: tickValue
                });
            }
            //Now, we'll store the values of each minor tick mark
            minorTickInterval = majorTickInt / (numMinorTM + 1);
            for (i = 0; i < numMajorTM - 1; i += 1) {
                for (j = 1; j <= numMinorTM; j += 1) {
                    this.minorTM.push(this.majorTM[i].value + minorTickInterval * j);
                }
            }
        },
        /**
         * returnDataAsTick method returns the data provided to the method
         * as a tick value object.
         *	@param	value		Value of tick line
         *	@param	showValue	Whether to show value of this div line
         *	@return				An object with the parameters of div line
         */
        returnDataAsTick: function (value, showValue) {
            //Create a new object
            var tickObject = {};
            //Set numerical value
            tickObject.value = value;
            //Set display value - formatted number.
            tickObject.displayValue = this.nf.dataLabels(value);
            //Whether we've to show value for this tick mark?
            tickObject.showValue = showValue;
            //Return the object
            return tickObject;
        },
        // ---------------- Public APIs for accessing data ------------------//
        /**
         * getMax method exposes the calculated max of this axis.
         *	@return		Calculated max for this axis.
         */
        getMax: function (){
            return this.max;
        },
        /**
         * getMin method exposes the calculated min of this axis.
         *	@return		Calculated min for this axis.
         */
        getMin: function (){
            return this.min;
        },
        /**
         * getMajorTM method returns the major tick values for the axis
         *	@return		Array of major tick values lines.
         */
        getMajorTM: function (){
            return this.majorTM;
        },
        /**
         * getMinorTM method returns the minor tick values for the axis
         *	@return		Array of minor tick values lines.
         */
        getMinorTM: function (){
            return this.minorTM;
        },
        /**
         * getAxisPosition method gets the pixel/angle position of a particular
         * point on the axis based on its value.
         *	@param	value		Numerical value for which we need pixel/angle axis position
         *	@return				The pixel position of the value on the given axis.
         */
        getAxisPosition: function (value) {
            //We can calculate only if axis co-ords have been defined
            if (this.startAxisPos==undefined || this.endAxisPos==undefined){
                throw new Error('Cannot calculate position, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.');
            }
            //Define variables to be used locally
            var numericalInterval;
            var axisLength;
            var relativePosition;
            var absolutePosition;
            //Get the numerical difference between the limits
            numericalInterval = (this.max - this.min);
            axisLength = (this.endAxisPos - this.startAxisPos);
            relativePosition = (axisLength / numericalInterval) * (value - this.min);
            //Calculate the axis position
            absolutePosition = this.startAxisPos + relativePosition;
            return absolutePosition;
        },
        /**
         * getValueFromPosition method gets the numerical value of a particular
         * point on the axis based on its axis position.
         *	@param	position	Position on the axis.
         *	@return				Numerical value for this position.
         */
        getValueFromPosition: function (position) {
            //We can calculate only if axis co-ords have been defined
            if (this.startAxisPos == undefined || this.endAxisPos == undefined){
                throw new Error('Cannot calculate value, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.');
            }
            //Define variables to be used locally
            var numericalInterval;
            //Deltas of axis w.r.t min and max
            var dd1;
            var dd2;
            var value;
            //Get the numerical difference between the limits
            numericalInterval = (this.max - this.min);
            //Get deltas of the position w.r.t both ends of axis.
            dd1 = position - this.startAxisPos;
            dd2 = this.endAxisPos - position;
            //Based on distribution of position on the axis scale, get value
            value = (dd1/(dd1+dd2))*numericalInterval + this.min;
            //Return it
            return value;
        }
    }


    /**
     * calculateScaleFactor method calculates the scaling required for the chart
     * required for dynamic scaling from original width and height
     */
    function getScaleFactor(origW, origH, canvasWidth, canvasHeight) {
        var scaleFactor;
        origH = pluckNumber(origH, canvasHeight);
        origW = pluckNumber(origW, canvasWidth);
        if (!origH || !origW) {
            scaleFactor = 1;
        }
        // Now, if the ratio of original width,height & stage width,height are same
        else if ((origW / canvasWidth) == (origH / canvasHeight)) {
            //In this case, the transformation value would be the same, as the ratio
            //of transformation of width and height is same.
            scaleFactor = canvasWidth / origW;
        } else {
            //If the transformation factors are different, we do a constrained scaling
            //We get the aspect whose delta is on the lower side.
            scaleFactor = Math.min((canvasWidth / origW), (canvasHeight / origH));
        }


        return scaleFactor;
    }



    ///********        ChartAPI        ********///



    chartAPI('gaugebase', {
        creditLabel: creditLabel,
        defaultGaugePaletteOptions : defaultGaugePaletteOptions,
        multiValueGauge: false,
        // Map different NumberFormattion attributes default value
        decimals: 2,
        formatnumberscale: 0,
        drawAnnotations: true,
        useScaleRecursively: true,

        init: function (container, dataObj, chartObj, callback) {

            var api = this, vars = chartObj.jsVars;

            // Store realtime data within chartAPI
            if (vars && vars._rtLastUpdatedData) {
                api.rtLatestSeriesData = vars._rtLastUpdatedData;
            } else {
                api.rtLatestSeriesData = null;
            }

            // call the original init function of base
            return chartAPI.base.init.apply(api, arguments);
        },

        chart: function (width, height) {
            var
            chartName = this.name,
            obj = this.dataObj || {},
            hc, is3d, defaultSeries = this.defaultSeriesType, plotOptions,
            FCChartObj = obj.chart || {}, showBorder, showGaugeBorder, HCChartObj;

            //set the default tooltip charecter seperator if not defined
            // We don't need to set "tooltipsepchar" here
            //obj.chart.tooltipsepchar = pluck(FCChartObj.tooltipsepchar, COMMASTRING);

            //creade defaule stub
            hc = HCstub(obj, width, height, this);
            // HighChart Chart object
            HCChartObj = hc.chart;


            //create the smartLabel instance
            hc.labels.smartLabel = hc[FC_CONFIG_STRING].smartLabel = this.smartLabel;
            //svae the width and height
            this.width = width;
            this.height = height;
            plotOptions = hc.plotOptions;

            // If roundedges is enabled
            HCChartObj.useRoundEdges  = FCChartObj.useroundedges == 1,

            //fiend defaultseries type depemding upon chart's name
            HCChartObj.defaultSeriesType = defaultSeries;
            ////palette////
            var paletteIndex = FCChartObj.palette > 0 && FCChartObj.palette < 6 ?
            FCChartObj.palette : pluckNumber(this.paletteIndex, 1);
            ////reduce by 1 for array positining
            paletteIndex -= 1;
            //save the palette index for further reference
            HCChartObj.paletteIndex = paletteIndex;

            // Initialize Color Manager for Widgets
            var colorM = this.colorM = new GaugeColorManager(paletteIndex, FCChartObj.palettethemecolor, this),
            // Creating a copy of colorrange to get the colorrange value
            colorArr = extend2({}, obj.colorrange);
            this.colorRangeGetter = new colorRange(colorArr.color, undefined,
                this.defaultGaugePaletteOptions.paletteColors[paletteIndex], this);



            // Full Chart as a hotspot
            if (pluck(FCChartObj.clickurl) !== undefined) {
                HCChartObj.link = FCChartObj.clickurl;
                HCChartObj.style.cursor = 'pointer';
                //change the point Click event ot make similar as FC
                hc.plotOptions.series.point.events.click = function () {
                    HCChartObj.events.click.call({
                        link : FCChartObj.clickurl
                    });
                };
            }

            //////////Chart font style////////////////////
            var inCanfontFamily = pluck(FCChartObj.basefont, 'Verdana'),
            inCanfontSize =  pluckFontSize(FCChartObj.basefontsize, 10),
            inCancolor = pluck(FCChartObj.basefontcolor, colorM.get2DBaseFontColor()),
            outCanfontFamily = pluck(FCChartObj.outcnvbasefont, inCanfontFamily),
            fontSize = pluckFontSize(FCChartObj.outcnvbasefontsize, inCanfontSize),
            outCanfontSize = fontSize + PXSTRING,
            outCancolor = pluck(FCChartObj.outcnvbasefontcolor, inCancolor).
            replace(/^#?([a-f0-9]+)/ig, '#$1'),
            outCanLineHeight, inCanLineHeight, axisTitleLineHeight;


            inCanfontSize =  inCanfontSize + PXSTRING;
            inCancolor = inCancolor.replace(/^#?([a-f0-9]+)/ig, '#$1');

            //create style for tredn tendtext
            //save it in the hc JSON for ferther refrence
            //TODO: replace trendStyle as outcanvasStyle
            this.trendStyle = this.outCanvasStyle = {
                fontFamily: outCanfontFamily,
                color: outCancolor,
                fontSize:  outCanfontSize
            };
            outCanLineHeight = setLineHeight(this.trendStyle);

            this.inCanvasStyle = {
                fontFamily: inCanfontFamily,
                fontSize:  inCanfontSize,
                color: inCancolor
            };

            inCanLineHeight = setLineHeight(this.inCanvasStyle);

            //legend
            hc.legend.itemStyle = {
                fontFamily: outCanfontFamily,
                fontSize:  outCanfontSize,
                lineHeight : outCanLineHeight,
                color: outCancolor
            };

            ///datalabels
            plotOptions.series.dataLabels.style = {
                fontFamily: inCanfontFamily,
                fontSize:  inCanfontSize,
                lineHeight : inCanLineHeight,
                color: inCancolor
            };
            //special attr for datalabels color
            // TODO: Do this after the style tag parsing.
            plotOptions.series.dataLabels.color = plotOptions.series.dataLabels.style.color;

            if (this.isDataLabelBold) {
                plotOptions.series.dataLabels.style.fontWeight = 'bold';
                delete plotOptions.series.dataLabels.style.lineHeight;
                setLineHeight(plotOptions.series.dataLabels.style);
            }

            ///tooltip
            hc.tooltip.style = {
                fontFamily: inCanfontFamily,
                fontSize:  inCanfontSize,
                lineHeight : inCanLineHeight,
                color: inCancolor
            };

            ///set the caption font style
            hc.title.style = {
                fontFamily: outCanfontFamily,
                color: outCancolor,
                fontSize:  (fontSize + 3) + PXSTRING,
                fontWeight: 'bold'
            };

            setLineHeight(hc.title.style);

            hc.subtitle.style = {
                fontFamily: outCanfontFamily,
                color: outCancolor,
                fontSize:  (fontSize + pluckNumber(this.subTitleFontSizeExtender, 1)) + PXSTRING,
                fontWeight: getValidValue(this.subTitleFontWeight, 'bold')
            };
            setLineHeight(hc.subtitle.style);


            //trendPointStyle
            hc.chart.trendPointStyle = {
                style: this.trendStyle
            };

            //Annotations default style
            hc.orphanStyles = {
                defaultStyle: {
                    style: extend2({}, this.inCanvasStyle)
                }
            };

            // Creating colorRangeStyle style
            hc.chart.colorRangeStyle = {
                style: {
                    fontFamily: inCanfontFamily,
                    fontSize:  inCanfontSize,
                    lineHeight : inCanLineHeight,
                    color: inCancolor
                }
            };
            setLineHeight(hc.chart.colorRangeStyle);

            var canvasW = width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasH = height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            origW, origH, autoScale, scaleFactor;

            //**decide the scale factor**//

            HCChartObj.origW = origW = pluckNumber(FCChartObj.origw, width),
            HCChartObj.origH = origH = pluckNumber(FCChartObj.origh, height);
            //Whether to auto-scale itself with respect to previous size
            HCChartObj.autoScale = autoScale = pluckNumber(FCChartObj.autoscale , 1);

            if (autoScale) {
                scaleFactor = getScaleFactor(origW, origH, width, height);
            }
            else {
                scaleFactor = 1
            }
            this.scaleFactor = HCChartObj.scaleFactor = scaleFactor;

            //create the gaugeAxis if requared
            if (this.createGaugeAxis) {
                this.createGaugeAxis(obj, hc, {
                    fontFamily: outCanfontFamily,
                    fontSize:  outCanfontSize,
                    lineHeight : outCanLineHeight,
                    color: outCancolor
                });
            }

            //////set styles//////////
            this.parseStyles(hc);

            //after applying the style do the

            // Deleting background style for not to effect the background cosmetics
            // for 3.2.2 relelease.
            delete hc.xAxis.labels.style.backgroundColor;
            delete hc.xAxis.labels.style.borderColor;

            delete hc.yAxis[0].labels.style.backgroundColor;
            delete hc.yAxis[0].labels.style.borderColor;

            delete hc.yAxis[1].labels.style.backgroundColor;
            delete hc.yAxis[1].labels.style.borderColor;

            // Point configuration to show label tooltext and data values
            this.showTooltip = pluckNumber(FCChartObj.showtooltip, this.showTooltip, 1);
            this.tooltipSepChar = pluck(FCChartObj.tooltipsepchar, COMMASPACE);
            this.showValues = pluckNumber(FCChartObj.showvalues, FCChartObj.showvalue, this.showValues, 1);
            this.seriesNameInToolTip = pluckNumber(FCChartObj.seriesnameintooltip, 1);
            if (!this.showTooltip) {
                hc.tooltip.enabled = false;
            }

            //TODO: Apply Style Object

            hc.plotOptions.series.connectNullData = pluckNumber(FCChartObj.connectnulldata, 0);

            // ------------------------- COSMETICS -----------------------------//
            //Background properties - Gradient
            // create the back-ground color
            ////Finaly Set the Plot and Background color[must be modifyed al last as margins may be changed any where]
            HCChartObj.backgroundColor = {
                FCcolor : {
                    color : pluck(FCChartObj.bgcolor, colorM.get2DBgColor()),
                    alpha : pluck(FCChartObj.bgalpha, colorM.get2DBgAlpha()),
                    angle : pluck(FCChartObj.bgangle, colorM.get2DBgAngle()),
                    ratio : pluck(FCChartObj.bgratio, colorM.get2DBgRatio())
                }
            };

            showBorder = pluckNumber(FCChartObj.showborder, is3d ? 0 : 1);

            HCChartObj.borderWidth = showBorder ? pluckNumber(FCChartObj.borderthickness, 1) : 0;


            //Border Properties of chart
            HCChartObj.borderColor = convertColor(pluck(FCChartObj.bordercolor, colorM.get2DBorderColor()),
                pluck(FCChartObj.borderalpha, colorM.get2DBorderAlpha()));

            // Manage canvas cosmetics
            HCChartObj.plotBackgroundColor = HCChartObj.plotBorderColor = COLOR_TRANSPARENT;
            HCChartObj.plotBorderWidth = 0;
            HCChartObj.plotShadow = 0;

            // Chart background image
            /* Attributes for customize bg image
            bgImage (String)
            bgImageAlpha	(0-100)
            bgImageDisplayMode	(none, stretch, center, fill, fit, tile )
            bgImageVAlign	(top, middle, bottom)
            bgImageHAlign	(left, middle, right)
            bgImageScale	(0-300)
             */
            var bgImageDisplayMode, bgImageVAlign, bgImageHAlign,
            TILE = 'tile',
            FILL = 'fill',
            FIT = 'fit';
            HCChartObj.bgSWF = pluck(FCChartObj.bgimage, FCChartObj.bgswf);
            HCChartObj.bgSWFAlpha = pluckNumber(FCChartObj.bgimagealpha, FCChartObj.bgswfalpha, 100);
            // Set background swf param
            bgImageDisplayMode = pluck(FCChartObj.bgimagedisplaymode, "none").toLowerCase();
            bgImageVAlign = getValidValue(FCChartObj.bgimagevalign, BLANKSTRING).toLowerCase();
            bgImageHAlign = getValidValue(FCChartObj.bgimagehalign, BLANKSTRING).toLowerCase();
            //when background mode is tile, fill and fit then default value of vertical alignment and horizontal alignment will be middle and middle
            if (bgImageDisplayMode == TILE || bgImageDisplayMode == FILL || bgImageDisplayMode == FIT) {
                if (bgImageVAlign != POSITION_TOP && bgImageVAlign != POSITION_MIDDLE && bgImageVAlign != POSITION_BOTTOM) {
                    bgImageVAlign = POSITION_MIDDLE;
                }
                if (bgImageHAlign != POSITION_LEFT && bgImageHAlign != POSITION_MIDDLE && bgImageHAlign != POSITION_RIGHT) {
                    bgImageHAlign = POSITION_MIDDLE;
                }
            }
            else {
                if (bgImageVAlign != POSITION_TOP && bgImageVAlign != POSITION_MIDDLE && bgImageVAlign != POSITION_BOTTOM) {
                    bgImageVAlign = POSITION_TOP;
                }
                if (bgImageHAlign != POSITION_LEFT && bgImageHAlign != POSITION_MIDDLE && bgImageHAlign != POSITION_RIGHT) {
                    bgImageHAlign = POSITION_LEFT;
                }
            }
            HCChartObj.bgImageDisplayMode = bgImageDisplayMode;
            HCChartObj.bgImageVAlign = bgImageVAlign;
            HCChartObj.bgImageHAlign = bgImageHAlign;
            HCChartObj.bgImageScale = pluckNumber(FCChartObj.bgimagescale, 100);

            // LOGO URL (foreground) logo parameters
            HCChartObj.logoURL = getValidValue(FCChartObj.logourl);
            HCChartObj.logoPosition = pluck(FCChartObj.logoposition, 'tl').toLowerCase();
            HCChartObj.logoAlpha = pluckNumber(FCChartObj.logoalpha, 100);
            HCChartObj.logoLink = getValidValue(FCChartObj.logolink);
            HCChartObj.logoScale = pluckNumber(FCChartObj.logoscale, 100);
            HCChartObj.logoLeftMargin = pluckNumber(FCChartObj.logoleftmargin, 0);
            HCChartObj.logoTopMargin = pluckNumber(FCChartObj.logotopmargin, 0);

            //Delay in rendering annotations that are over the chart
            HCChartObj.annRenderDelay = getValidValue(FCChartObj.annrenderdelay);

            //Tool Tip - Show/Hide, Background Color, Border Color, Separator Character
            var tooltipStyle = hc.tooltip.style;
            hc.tooltip.backgroundColor = convertColor(pluck(tooltipStyle.backgroundColor,
                FCChartObj.tooltipbgcolor, FCChartObj.hovercapbgcolor, FCChartObj.hovercapbg,
                colorM.get2DToolTipBgColor()), pluck(FCChartObj.tooltipbgalpha, 100));
            hc.tooltip.borderColor = convertColor(pluck(tooltipStyle.borderColor,
                FCChartObj.tooltipbordercolor, FCChartObj.hovercapbordercolor, FCChartObj.hovercapborder,
                colorM.get2DToolTipBorderColor()), pluck(FCChartObj.tooltipborderalpha, 100));

            hc.tooltip.shadow = FCChartObj.showtooltipshadow == ONESTRING ? {
                enabled: true,
                opacity: pluckNumber(mathMax(FCChartObj.tooltipbgalpha,FCChartObj.tooltipborderalpha), 100) / 100
            } : false;
            hc.tooltip.borderWidth = pluckNumber(FCChartObj.tooltipborderthickness, 1);
            if (FCChartObj.tooltipborderradius) {
                hc.tooltip.borderRadius = pluckNumber(FCChartObj.tooltipborderradius, 1);
            }
            hc.tooltip.style.padding =
            pluckNumber(FCChartObj.tooltippadding, this.tooltippadding, 2);
            if (FCChartObj.tooltipcolor) {
                tooltipStyle.color = getFirstColor(FCChartObj.tooltipcolor);
            }

            // delete following styles to prevent IE to draw double border of the tooltext.
            tooltipStyle.backgroundColor = undefined;
            tooltipStyle.borderColor = undefined;
            tooltipStyle.border = undefined;

            // Whether to rotate the values
            HCChartObj.rotateValues = pluckNumber(FCChartObj.rotatevalues, 0);
            // placevaluesinside
            HCChartObj.placeValuesInside = pluckNumber(FCChartObj.placevaluesinside, 0);
            // valuePosition for line and area
            HCChartObj.valuePosition = FCChartObj.valueposition;
            // valuePosition for line and area
            HCChartObj.valuePadding = pluckNumber(FCChartObj.valuepadding, 4);

            // Plot shadow effect. Note that this is overridden in the if-block
            // below.
            hc.plotOptions.series.shadow = pluckNumber(FCChartObj.showshadow,
                FCChartObj.showcolumnshadow,
                this.defaultPlotShadow,
                defaultPaletteOptions.showShadow[paletteIndex]);


            if (HCChartObj.useRoundEdges) {
                hc.plotOptions.series.shadow = pluckNumber(FCChartObj.showshadow,
                    FCChartObj.showcolumnshadow, 1);
                hc.plotOptions.series.borderRadius = 1;
                hc.tooltip.borderRadius = 2;
            }

            //Title
            hc.title.text = parseUnsafeString(FCChartObj.caption);

            //SubTitle
            hc.subtitle.text = parseUnsafeString(FCChartObj.subcaption);

            ///////// tooltip Options//////////////
            if (FCChartObj.showtooltip == ZEROSTRING) { //area/line ancor conflict
                hc.tooltip.enabled =  false;
            }

            //set the plotspace ppercent has effecton column only
            var plotSpacePercent = pluckNumber(FCChartObj.plotspacepercent, 20);
            if (plotSpacePercent > 80 || plotSpacePercent < 0) {
                plotSpacePercent = 20;
            }
            //set the plot space percent
            this.plotSpacePercent = hc.plotOptions.series.groupPadding = plotSpacePercent / 200;

            this.parseExportOptions(hc);

            //-------------------------- Realtime properties -------------------------------//
            HCChartObj.dataStreamURL = pluck(FCChartObj.datastreamurl, "");
            HCChartObj.refreshInterval = pluckNumber(FCChartObj.refreshinterval, 1);
            HCChartObj.dataStamp = FCChartObj.datastamp;

            //-------------------------- Gauge specific properties --------------------------//
            //Gauge Border properties
            showGaugeBorder = pluckNumber(FCChartObj.showgaugeborder, 1);
            HCChartObj.gaugeBorderColor = pluck(FCChartObj.gaugebordercolor, this.gaugeBorderColor, '333333');
            HCChartObj.gaugeBorderThickness = showGaugeBorder ? pluckNumber(FCChartObj.gaugeborderthickness, this.gaugeBorderThickness, 2) : 0;
            HCChartObj.gaugeBorderAlpha = pluck(FCChartObj.gaugeborderalpha, HUNDREDSTRING);
            //Gauge fill color
            HCChartObj.gaugeFillColor = pluck(FCChartObj.gaugefillcolor, FCChartObj.ledbgcolor, '000000');
            //Whether to use same fill color?
            HCChartObj.useSameFillColor = pluckNumber(FCChartObj.usesamefillcolor, 0);
            //Same color for back ground
            HCChartObj.useSameFillBgColor = pluckNumber(FCChartObj.usesamefillbgcolor, HCChartObj.useSameFillColor);

            //Gauge fill properties
            // (BULLET and Linear Gauge)
            HCChartObj.colorRangeFillMix = getFirstDefinedValue(FCChartObj.colorrangefillmix,
                FCChartObj.gaugefillmix, this.colorRangeFillMix,
                '{light-10},{dark-10},{light-10},{dark-10}');
            HCChartObj.colorRangeFillRatio = getFirstDefinedValue(FCChartObj.colorrangefillratio,
                FCChartObj.gaugefillratio, this.colorRangeFillRatio, FCChartObj.gaugefillratio,
                '0,10,80,10');
            //Gauge Border properties
            HCChartObj.showColorRangeBorder = pluckNumber(FCChartObj.showcolorrangeborder,
                FCChartObj.showgaugeborder, this.showColorRangeBorder, 0);
            HCChartObj.colorRangeBorderColor = pluck(FCChartObj.colorrangebordercolor,
                FCChartObj.gaugebordercolor, '{dark-20}');
            HCChartObj.colorRangeBorderThickness = showGaugeBorder ? pluckNumber(FCChartObj.colorrangeborderthickness,
                FCChartObj.gaugeborderthickness, 1) : 0;
            HCChartObj.colorRangeBorderAlpha = pluckNumber(FCChartObj.colorrangeborderalpha,
                FCChartObj.gaugeborderalpha, 100);
            HCChartObj.roundRadius = pluckNumber(FCChartObj.roundradius,
                FCChartObj.gaugeroundradius, 0);
            //Round radius - if gauge is to be drawn as rounded
            HCChartObj.showShadow = pluckNumber(FCChartObj.showshadow, 1);

            //-------------------------- Gauge specific properties --------------------------//
            HCChartObj.gaugeType = pluckNumber(FCChartObj.gaugetype, this.gaugeType, 1);
            //HCObj.scale.reverseScale = (HCChartObj.gaugeType === 2 || HCChartObj.gaugeType === 3) ? 1 : 0;


            if (this.preSeriesAddition) {
                this.preSeriesAddition(hc, obj, width, height);
            }

            //create the Data serias first
            this.series(obj, hc, chartName, width, height);

            //this function do the after series addition works like:
            // showsum for stacking
            //marimekko conf
            if (this.postSeriesAddition) {
                this.postSeriesAddition(hc, obj, width, height);
            }

            // Configure Axis add all the ticks and trend points
            if (this.configureAxis) {
                this.configureAxis(hc, obj);
            }

            /*
             *Manage the space
             */
            if (this.spaceManager) {
                this.spaceManager(hc, obj, width, height);
            }

            // Create macro literals
            this.updateSnapPoints && this.updateSnapPoints(hc);

            // Create macro literals
            this.latestDataUpdater && this.latestDataUpdater(hc, obj, width, height);

            if (window.console && window.console.log && window.FC_DEV_ENVIRONMENT) {
                console.log(hc);
            }
            //return the converted object
            return hc;
        },

        // Update HC JSON with the last real-time updated value, if its there.
        // will help to render the Chart with latest real-time data updated
        latestDataUpdater: function (hc) {
            var chartInstance = this.chartInstance,
            lastUpdatedData,
            series = hc.series &&  hc.series,
            data = series && series[0] && series[0].data,
            i, length, dataObj;

            if ((lastUpdatedData = (chartInstance && chartInstance.jsVars &&
                chartInstance.jsVars._rtLastUpdatedData)) && data) {
                for (i = 0, length = lastUpdatedData.values && lastUpdatedData.values.length; i < length; i += 1) {
                    dataObj = data[i];
                    if (dataObj) {
                        dataObj.y = lastUpdatedData.values[i];
                        dataObj.displayValue = lastUpdatedData.labels[i];
                        dataObj.toolText = lastUpdatedData.toolTexts[i];
                    }
                }
            }
        },

        styleApplicationDefinition_font: function (HC, toObj, style) {
            var styleobject, x, y, isDataValuess = false, i, len, styleobjectI,
            fontStyleMap = this.styleMapForFont;

            switch (toObj) {//fiend the toobject of HC depending upon toobject string of FC
                case 'caption':
                    styleobject = HC.title;
                    break;

                case 'datalabels':
                    styleobject = HC.plotOptions.series.dataLabels;
                    break;

                case 'value':
                    styleobject = HC.plotOptions.series.dataLabels;
                    break;

                case 'datavalues':
                    styleobject = HC.plotOptions.series.dataLabels;
                    isDataValuess = true;
                    break;

                case 'subcaption':
                    styleobject = HC.subtitle;
                    break;

                case 'tooltip':
                    styleobject = HC.tooltip;
                    break;

                case 'trendvalues':
                    styleobject = HC.chart.trendPointStyle;
                    break;

                case 'xaxisname':
                    styleobject = HC.xAxis.title;
                    break;

                case 'vlinelabels':
                    styleobject = {
                        style : HC[FC_CONFIG_STRING].divlineStyle
                    };
                    break;

                case 'gaugelabels':
                    styleobject = HC.chart.colorRangeStyle;
                    break;

                case 'tickvalues':
                    styleobject = HC.scale.tickValues;
                    break;

                case 'limitvalues':
                    styleobject = HC.scale.limitValues;
                    break;

                case 'openvalue':
                    styleobject = HC.chart.openValue;
                    break;

                case 'closevalue':
                    styleobject = HC.chart.closeValue;
                    break;

                case 'highlowvalue':
                    styleobject = HC.chart.highLowValue;
                    break;

                case 'legend':
                    styleobject = {
                        style : HC.legend.itemStyle
                    };
                    break;

                default:
                    //to prevent error send a dummy styleObj
                    HC.orphanStyles[toObj] = styleobject = {
                        text: '',
                        style : {}
                    };
                    break;
            }

            if (typeof styleobject === 'object') {
                if (styleobject instanceof Array) {
                    for (i = 0, len = styleobject.length; i < len; i += 1) {
                        styleobjectI = styleobject[i];
                        for (x in style) {//add all style attr into the hc object
                            y = x.toLowerCase();
                            if (typeof fontStyleMap[y] === 'function') {
                                fontStyleMap[y](style[x], styleobjectI, isDataValuess);
                            }
                        }
                        setLineHeight(styleobjectI.style);
                    }
                }
                else {
                    for (x in style) {//add all style attr into the hc object
                        y = x.toLowerCase();
                        if (typeof fontStyleMap[y] === 'function') {
                            fontStyleMap[y](style[x], styleobject, isDataValuess);
                        }
                    }
                    setLineHeight(styleobject.style);
                }
            }
        },

        createGaugeAxis: function (FCObj, HCObj, labelStyle) {
            var FCChartObj = FCObj.chart,
            colorM = this.colorM,
            numberFormatter = this.numberFormatter,
            axisPosition = this.isHorizontal ? (pluckNumber(FCChartObj.ticksbelowgauge, FCChartObj.ticksbelowgraph,
                this.ticksbelowgauge, 1) ? AXISPOSITION_BOTTOM : AXISPOSITION_TOP) : (pluckNumber(FCChartObj.ticksonright,
                this.ticksOnRight, 1) ? AXISPOSITION_RIGHT : AXISPOSITION_LEFT),
            // TODO: try to use HighhChart axis obj
            // Tick properties
            majorTMColor = pluck(FCChartObj.majortmcolor, colorM.getTickColor()),
            majorTMAlpha = pluckNumber(FCChartObj.majortmalpha, 100),
            majorTMHeight = pluckNumber(pluckNumber(FCChartObj.majortmheight) * this.scaleFactor, this.majorTMHeight, 6),
            tickValueStep = pluckNumber(FCChartObj.tickvaluestep, FCChartObj.tickvaluesstep , 1),
            showTickMarks = pluckNumber(FCChartObj.showtickmarks, 1),
            connectTickMarks = showTickMarks ? pluckNumber(FCChartObj.connecttickmarks, this.connectTickMarks, 1) : 0,
            showTickValues = pluckNumber(FCChartObj.showtickvalues, showTickMarks),
            majorTMThickness = pluckNumber(FCChartObj.majortmthickness, 1),
            upperlimit = pluckNumber(numberFormatter.getCleanValue(FCChartObj.upperlimit)),
            lowerlimit = pluckNumber(numberFormatter.getCleanValue(FCChartObj.lowerlimit)),
            reverseScale = pluckNumber(FCChartObj.reversescale, 0) == 1;

            //reverse the scale if it is vertical
            if(!this.isHorizontal) {
                reverseScale = !reverseScale;
            }

            //Cannot be less than 1
            tickValueStep = tickValueStep < 1 ? 1 : tickValueStep;

            HCObj.scale = {
                min: null,
                max: null,
                axisPosition : axisPosition,
                //Tick properties
                showTickMarks: showTickMarks,
                // Whether to display ticks values or not
                showTickValues: showTickValues,
                // Whether to display the Limits
                showLimits: pluckNumber(FCChartObj.showlimits, showTickValues),
                //Whether to automatically adjust TM
                adjustTM: Boolean(pluckNumber(FCChartObj.adjusttm, 1)),
                majorTMNumber: pluckNumber(FCChartObj.majortmnumber, -1),
                majorTMColor: convertColor(majorTMColor, majorTMAlpha),
                majorTMHeight: showTickMarks ? majorTMHeight : 0,
                majorTMThickness: majorTMThickness,
                minorTMNumber: pluckNumber(FCChartObj.minortmnumber, this.minorTMNumber, 4),
                minorTMColor: convertColor(pluck(FCChartObj.minortmcolor, majorTMColor),
                    pluckNumber(FCChartObj.minortmalpha, majorTMAlpha)),
                minorTMHeight: showTickMarks ? pluckNumber(pluckNumber(FCChartObj.minortmheight,
                    FCChartObj.minortmwidth) * this.scaleFactor, Math.round(majorTMHeight / 2)) : 0,
                minorTMThickness: pluckNumber(FCChartObj.minortmthickness, 1),
                //Padding between tick mark start position and gauge
                tickMarkDistance: pluckNumber(pluckNumber(FCChartObj.tickmarkdistance, FCChartObj.tickmarkgap) *
                    this.scaleFactor, this.tickMarkDistance, 3),
                //Tick value distance
                tickValueDistance: pluckNumber(pluckNumber(FCChartObj.tickvaluedistance, FCChartObj.displayvaluedistance) *
                    this.scaleFactor, 2) + 2,//text gutter
                placeTicksInside: pluckNumber(FCChartObj.placeticksinside, 0),
                placeValuesInside: pluckNumber(FCChartObj.placevaluesinside, 0),
                //Tick value step
                tickValueStep: tickValueStep,
                // CONFIGURATION //
                // Adaptive yMin - if set to true, the min will be based on the values
                // provided. It won't be set to 0 in case of all positive values
                setAdaptiveMin: pluckNumber(FCChartObj.setadaptivemin, 0),
                // The upper and lower limits of y and x axis
                upperLimit: upperlimit,
                lowerLimit: lowerlimit,
                //Display values for upper and lower limit
                upperLimitDisplay: getValidValue(FCChartObj.upperlimitdisplay),
                lowerLimitDisplay: getValidValue(FCChartObj.lowerlimitdisplay),
                // Whether to draw the recerse LED Gauge or not
                reverseScale: reverseScale,
                connectorColor: convertColor(pluck(FCChartObj.connectorcolor, majorTMColor), pluckNumber(FCChartObj.connectoralpha, majorTMAlpha)),
                connectorThickness: connectTickMarks ? pluckNumber(FCChartObj.connectorthickness, majorTMThickness) : 0,
                majorTM: [],
                minorTM: [],
                trendPoint : [],
                labels: {
                    style: extend2({}, labelStyle)
                },
                tickValues: {
                    style: extend2({}, labelStyle)
                },
                limitValues: {
                    style: extend2({}, labelStyle)
                }
            };

        },

        configureAxis: function (HCObj, FCObj) {
            var FCChartObj = FCObj.chart,
            series = HCObj.series[0],
            pAxis,
            min, max,
            trendPointArr,
            trendPointObj,
            colorM = this.colorM,
            trendPointLength,
            i, startValue, endValue,
            markerRadius, dashStyle,
            colorRangeGetter = this.colorRangeGetter,
            colorArrTemp = colorRangeGetter && colorRangeGetter.colorArr,
            length = colorArrTemp && colorArrTemp.length,
            firstColor = colorArrTemp && colorArrTemp[0],
            lastColor = colorArrTemp && colorArrTemp[length - 1],
            minDataValue = this.minDataValue,
            maxDataValue = this.maxDataValue,
            scale = HCObj.scale,
            lowerLimit = scale.lowerLimit,
            upperLimit = scale.upperLimit;
            if (series) {
                if(defined(minDataValue) && defined(maxDataValue)) {
                    lowerLimit = lowerLimit <= minDataValue ? lowerLimit : firstColor && firstColor.minvalue;
                    upperLimit = upperLimit >= maxDataValue ? upperLimit : lastColor && lastColor.maxvalue;
                }
                else {
                    lowerLimit = pluckNumber(lowerLimit, firstColor && firstColor.minvalue);
                    upperLimit = pluckNumber(upperLimit, lastColor && lastColor.maxvalue);
                }





                pAxis = new GaugeAxis(lowerLimit, upperLimit, false, scale, this.numberFormatter);
                pAxis.calculateLimits(this.maxDataValue, this.minDataValue);
                //Calcuate tick marks - based on the initial data.
                pAxis.calculateTicks();
                //Store copy of tick marks in local array
                scale.majorTM = pAxis.getMajorTM();
                scale.minorTM = pAxis.getMinorTM();
                // Store the limits
                min = scale.min = pAxis.min;
                max = scale.max = pAxis.max;

                //if the chart has trend point then add it
                if (FCObj.trendpoints && (trendPointArr = FCObj.trendpoints.point)
                    && (trendPointLength = trendPointArr.length) > 0) {
                    scale.trendPoint = [];
                    for (i = 0; i < trendPointLength; i += 1) {
                        trendPointObj = trendPointArr[i];
                        dashStyle = pluckNumber(trendPointObj.dashed, 0) ?
                        getDashStyle(pluck(Math.max(trendPointObj.dashlen, trendPointObj.thickness), 4), pluck(trendPointObj.dashgap, 3), pluckNumber(trendPointObj.thickness, 1))
                        : undefined;


                        startValue = pluckNumber(trendPointObj.startvalue, trendPointObj.value);
                        endValue = pluckNumber(trendPointObj.endvalue, startValue);
                        if (startValue <= max && startValue >= min && endValue <= max && endValue >= min) {
                            scale.trendPoint.push({
                                style : extend2(extend2(HCObj.chart.trendPointStyle.style),
                                {
                                    //color : parseColor(pluck(trendPointObj.bordercolor, trendPointObj.color, colorM.getTrendDarkColor()))
                                    }),
                                startValue : startValue,
                                endValue : endValue,
                                displayValue : getValidValue(parseUnsafeString(trendPointObj.displayvalue), BLANKSTRING),
                                showOnTop: pluckNumber(trendPointObj.showontop, FCChartObj.ticksbelowgauge, FCChartObj.ticksbelowgraph, 1),
                                color: pluck(trendPointObj.color, colorM.getTrendLightColor()),
                                alpha: pluckNumber(trendPointObj.alpha, 99),
                                thickness: pluckNumber(trendPointObj.thickness, 1),
                                dashStyle: dashStyle,
                                //Marker properties
                                useMarker: pluckNumber(trendPointObj.usemarker, 0),
                                markerColor: convertColor(pluck(trendPointObj.markercolor,
                                    trendPointObj.color, colorM.getTrendLightColor()), 100),
                                markerBorderColor: convertColor(pluck(trendPointObj.markerbordercolor,
                                    trendPointObj.bordercolor, colorM.getTrendDarkColor()), 100),
                                markerRadius: pluckNumber(pluckNumber(trendPointObj.markerradius) * this.scaleFactor, 5),
                                markerToolText: getFirstValue(trendPointObj.markertooltext),
                                trendValueDistance : pluckNumber(pluckNumber(trendPointObj.trendvaluedistance,
                                    FCChartObj.trendvaluedistance) * this.scaleFactor, scale.tickValueDistance),
                                //calcullated
                                isZone : startValue !== endValue,

                                //extra for angular gauge
                                valueInside : pluckNumber(trendPointObj.valueinside, FCChartObj.placevaluesinside, 0),
                                showBorder : pluckNumber(trendPointObj.showborder, 1),
                                borderColor : convertColor(pluck(trendPointObj.bordercolor, trendPointObj.color, colorM.getTrendDarkColor()),
                                    pluckNumber(trendPointObj.borderalpha, trendPointObj.alpha, 100)),
                                radius : pluckNumber(pluckNumber(trendPointObj.radius) * this.scaleFactor),
                                innerRadius: pluckNumber(pluckNumber(trendPointObj.innerradius) * this.scaleFactor)

                            });

                            parseColor(pluck(trendPointObj.bordercolor, trendPointObj.color, colorM.getTrendDarkColor()))
                        }
                    }
                }
            }
        },

        // Space-Management for placing the vertical tick marks
        placeTickMark: function (hcJSON, minCanvasWidth, minCanvasHeight) {
            var smartLabel = this.smartLabel,
            HCChartObj = hcJSON.chart, canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight = this.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            scale = hcJSON.scale,
            min = scale.min,
            max = scale.max,
            axisPosition = scale.axisPosition,
            minorTMHeight = scale.minorTMHeight,
            majorTMHeight = scale.majorTMHeight,
            showLimits = scale.showLimits,
            showTickValues = scale.showTickValues,
            tickMarkDistance = scale.tickMarkDistance,
            tickValueDistance = scale.tickValueDistance,
            tickMaxHeight = Math.max(majorTMHeight, minorTMHeight),
            placeTicksInside = scale.placeTicksInside,
            placeValuesInside = scale.placeValuesInside,
            reverseScale = scale.reverseScale,
            distance = 0,
            labelX = 0,
            labelY = 0,
            i = 1,
            tickObj,
            lastIndex = scale.majorTM.length - 1,
            isHorizontal = (axisPosition === 2 || axisPosition === 4) ? false : true,
            smartTickLabelObj,
            style,
            fontSize,
            lineHeight,
            lineHeightHalf,
            labelShiftX = 6,
            maxDistance = isHorizontal ? canvasHeight - minCanvasHeight : canvasWidth - minCanvasWidth,
            maxLabelsUsedSpace = 0,
            TMvalueDistance,
            maxTextW,
            nonTextSpace,
            maxTextH,
            tickValuesStyle = scale.tickValues.style,
            limitValuesStyle = scale.limitValues.style;

            if (scale.majorTM[0] && scale.majorTM[1]) {
                TMvalueDistance = scale.majorTM[1].value - scale.majorTM[0].value;
            }

            if (!placeTicksInside) {
                distance += tickMarkDistance + tickMaxHeight;
            }


            if (showTickValues || showLimits) {

                smartLabel.setStyle(limitValuesStyle);
                fontSize = pluckNumber(parseInt(limitValuesStyle.fontSize, 10), 10);
                lineHeight = pluckNumber(parseInt(limitValuesStyle.lineHeight, 10), 12);
                lineHeightHalf = lineHeight / 2;

                if (!placeValuesInside) {
                    distance += tickValueDistance;
                }

                if (axisPosition === 3) {
                    labelY = fontSize;
                }

                if (isHorizontal) {
                    maxTextH = maxDistance - distance;
                    maxTextW = ((canvasWidth / (max - min)) * TMvalueDistance / 2) + 6;// shift the text little outer
                }
                else {
                    maxTextW = maxDistance - distance;
                    maxTextH = ((canvasHeight / (max - min)) * TMvalueDistance) + lineHeightHalf; //shift the text little outer
                }


                if (scale.majorTM[0]){
                    tickObj = scale.majorTM[0];
                    if(tickObj.isString) {
                        if (tickObj.displayValue) {
                            smartTickLabelObj = smartLabel.getSmartText(tickObj.displayValue, maxTextW, maxTextH);
                            tickObj.displayValue = smartTickLabelObj.text;
                            tickObj._oriText = smartTickLabelObj.oriText;
                            if (!isHorizontal) {
                                maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, smartTickLabelObj.width);
                                tickObj.labelY =  fontSize - (reverseScale ? smartTickLabelObj.height - lineHeightHalf : lineHeightHalf);
                                tickObj.labelX = labelX;
                            }
                            else {
                                maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, smartTickLabelObj.height);
                                tickObj.labelY = ((axisPosition === 1 && !placeValuesInside) ||
                                    (axisPosition === 3 && placeValuesInside)) ? fontSize - smartTickLabelObj.height : labelY;
                                labelShiftX = Math.min(6, smartTickLabelObj.width / 2);
                            }
                        }
                    }
                    else {
                        i = 0;
                    }
                    if (isHorizontal) {
                        if (reverseScale) {
                            tickObj.labelX = labelShiftX;
                            tickObj.align = POSITION_RIGHT;
                        }
                        else {
                            tickObj.labelX = -labelShiftX;
                            tickObj.align = POSITION_LEFT;
                        }
                    }
                }
                if (scale.majorTM[lastIndex]){
                    tickObj = scale.majorTM[lastIndex];
                    if(tickObj.isString) {
                        if (tickObj.displayValue) {
                            smartTickLabelObj = smartLabel.getSmartText(tickObj.displayValue, maxTextW, maxTextH);
                            tickObj.displayValue = smartTickLabelObj.text;
                            tickObj._oriText = smartTickLabelObj.oriText;
                            if (!isHorizontal) {
                                maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, smartTickLabelObj.width);
                                tickObj.labelY =  fontSize - (reverseScale ? lineHeightHalf : smartTickLabelObj.height - lineHeightHalf);
                                tickObj.labelX = labelX;
                            }
                            else {
                                maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, smartTickLabelObj.height);
                                tickObj.labelY = ((axisPosition === 1 && !placeValuesInside) ||
                                    (axisPosition === 3 && placeValuesInside)) ? fontSize - smartTickLabelObj.height : labelY;
                                labelShiftX = Math.min(6, smartTickLabelObj.width / 2);

                            }
                        }
                    }
                    else {
                        labelShiftX = 6;
                        lastIndex += 1
                    }
                    if (isHorizontal) {
                        if (reverseScale) {
                            tickObj.labelX = -labelShiftX;
                            tickObj.align = POSITION_LEFT;
                        }
                        else {
                            tickObj.labelX = labelShiftX;
                            tickObj.align = POSITION_RIGHT;
                        }
                    }
                }


                //calculate nonLimitLabels
                for (; i < lastIndex; i++) {

                    if (i == 0 || i == lastIndex - 1) {
                        smartLabel.setStyle(limitValuesStyle);
                        fontSize = pluckNumber(parseInt(limitValuesStyle.fontSize, 10), 10);
                        lineHeight = pluckNumber(parseInt(limitValuesStyle.lineHeight, 10), 12);
                        if (isHorizontal) {
                            labelY = ((axisPosition === 1 && placeValuesInside) ||
                                (axisPosition === 3 && !placeValuesInside)) ? fontSize : 0;
                        }
                    } else {
                        smartLabel.setStyle(tickValuesStyle);
                        fontSize = pluckNumber(parseInt(tickValuesStyle.fontSize, 10), 10);
                        lineHeight = pluckNumber(parseInt(tickValuesStyle.lineHeight, 10), 12);
                        if (isHorizontal) {
                            labelY = ((axisPosition === 1 && placeValuesInside) ||
                                (axisPosition === 3 && !placeValuesInside)) ? fontSize : 0;
                        }
                    }

                    tickObj = scale.majorTM[i];
                    if (tickObj.displayValue) {
                        tickObj.labelX = pluckNumber(tickObj.labelX, labelX);
                        if (!isHorizontal) {
                            smartTickLabelObj = smartLabel.getOriSize(tickObj.displayValue);
                            maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, smartTickLabelObj.width);
                            tickObj.labelY = fontSize - (smartTickLabelObj.height / 2);
                        }
                        else {
                            maxLabelsUsedSpace = Math.max(maxLabelsUsedSpace, lineHeight);
                            tickObj.labelY = labelY;
                        }
                    }
                }

            }

            nonTextSpace = distance;
            if (!placeValuesInside) {
                distance += maxLabelsUsedSpace;
            }

            distance = Math.min(maxDistance, distance);

            if (!placeValuesInside) {
                scale._labelUsedSpace = distance - nonTextSpace;
            }
            else {
                scale._labelUsedSpace = maxLabelsUsedSpace
            }

            switch (axisPosition) {
                case 1 : // TOP
                    HCChartObj.marginTop += distance;
                    break;
                case 2 : // RIGHT
                    HCChartObj.marginRight += distance;
                    break;
                case 3 : // BOTTOM
                    HCChartObj.marginBottom += distance;
                    break;
                case 4 : // LEFT
                    HCChartObj.marginLeft += distance
                    break;
            }
            return distance;
        },

        // eiMethods contains all the methods that we want to be defined on the
        // main chart object (FusionCharts). Will be used primarily for setting
        // and fetching chart data.
        eiMethods: {

            feedData: function (dataStr) {

                var jsVars = this.jsVars,
                instanceAPI = jsVars.instanceAPI, traverse, updateObj;

                if (this.isActive() && instanceAPI && instanceAPI.linearDataParser
                    && (updateObj = instanceAPI.linearDataParser(dataStr))
                    && (traverse = instanceAPI.hcInstance)
                    && (traverse = traverse.series) && (traverse = traverse[0])
                    && traverse.realtimeUpdate && updateObj) {
                    traverse.realtimeUpdate(updateObj)
                    jsVars._rtLastUpdatedData = this.getDataJSON();

                    // This event is also raised when the edit mode is enabled and
                    // user completes one drag operation.
                    global.raiseEvent('RealTimeUpdateComplete', {
                        data: dataStr,
                        source: 'feedData',
                        url: null
                    }, jsVars.fcObj);

                    try {
                        window.FC_ChartUpdated &&
                        window.FC_ChartUpdated(jsVars.fcObj.id)
                    }
                    catch (err) {
                        setTimeout(function () {
                            throw (err);
                        }, 1);
                    }


                    return true;
                }

                return false;
            },

            getData: function () {
                var traverse, dataObj,
                data = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.data);

                dataObj = data && data[0];

                if (dataObj) {
                    return pluckNumber(dataObj.value, dataObj.y);
                }

                return null;
            },

            setData: function (value) {
                this.feedData("&value=" + value);
            },

            stopUpdate: function () {

                var state = this.__state;

                clearTimeout(state._toRealtime);
                state._rtAjaxObj && state._rtAjaxObj.abort();

                state._rtPaused = true;
            },

            restartUpdate: function () {
                var state = this.__state;

                if (state._rtDataUrl) {
                    state._rtPaused = false;
                    state._rtAjaxObj.get(state._rtDataUrl);
                }
            },

            clearChart: function () {
                var jsVars = this.jsVars, traverse, min, series;
                if ((traverse = jsVars.instanceAPI) && (traverse = traverse.hcInstance)
                    && (series = traverse.series) && (traverse = series[0])
                    && (traverse = traverse.chart) && (traverse = traverse.options)
                    && (traverse = traverse.scale)) {
                    min = traverse.min
                    if (!isNaN(min)) {
                        // TODO: run this in a loop for every pointer in case
                        // of angular and linear. If that can't be done then
                        // override this eiMethod for each of them.
                        this.feedData("&showLabel=0&value=" + min)
                    }
                }

            },

            getDataJSON: function () {
                var i = 0, traverse, len, dataObj, values = [], labels = [], toolTexts = [],
                data = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.data);

                if (!data || !data.length) {
                    len = 0;
                } else {
                    len = data.length;
                }

                for (;i < len; i += 1) {
                    dataObj = data[i];
                    values.push(pluckNumber(dataObj.value, dataObj.y));
                    labels.push((dataObj.dataLabel && dataObj.dataLabel.textStr) || "");
                    toolTexts.push(dataObj.toolText || "");
                }

                return {
                    values: values,
                    labels: labels,
                    toolTexts: toolTexts
                }
            }
        },

        linearDataParser: function (updateStr /*updateObj, returnObj*/) {
            /* Commands to handle:
             * label, value, toolText, showLabel, link, color, vLine and related params(?),
             * clear, stopUpdate, pointerId related updates,
             */
            var commandArr, i = 0, len, itemArr, updateObj = {}, returnObj = {};
            commandArr = updateStr.split("&");
            for (len = commandArr.length; i < len; i += 1) {
                itemArr = commandArr[i].split("=");
                // no need to process improper data strings as of now.
                if (itemArr[0] === "" || itemArr[1] === undefined || itemArr[1] === "" ) {
                    continue;
                }

                switch (itemArr[0]) {
                    case "label":
                        updateObj.labels = itemArr[1].split("|");
                        break;

                    case "value":
                        updateObj.values = itemArr[1].split("|");
                        break;

                    case "showLabel":
                        updateObj.showLabels = itemArr[1].split("|");
                        break;

                    case "toolText":
                        updateObj.toolTexts = itemArr[1].split("|");
                        break;

                    case "link":
                        updateObj.links = itemArr[1].split("|");
                        break;

                    case "color":
                        updateObj.colors = itemArr[1].split("|");
                        break;

                    case "dataStamp":
                        updateObj.dataStamp = itemArr[1];
                        break;

                    default:
                        returnObj[itemArr[0]] = itemArr[1];

                }
            }
            return updateObj;

        },
        // For the Bulb Gauge or the Gauge where xml contains only one value
        // inside <value> element we don't need to call the different Point function
        // series is enough to handle that
        series : function (FCObj, HCObj, chartName, width, height) {
            var series = {
                data : []
            },
            dataObj, i, ln;
            //dislable legend
            HCObj.legend.enabled = false;


            if (FCObj.pointers && FCObj.pointers.pointer) {
                dataObj = FCObj.pointers.pointer;
            }
            else {
                dataObj = FCObj.value;
            }

            if (! (dataObj instanceof Array) ) {
                if (typeof dataObj !== 'object') {
                    dataObj = [{
                        value: dataObj
                    }];
                }
                else {
                    dataObj = [dataObj];
                }
            }

            ln = this.multiValueGauge ? dataObj.length : 1;
            for (i = 0; i < ln; i += 1) {
                series.data.push(this.getPointStub(dataObj[i], i, HCObj, FCObj));
            }

            HCObj.series[0] = series
        },

        pointValueWatcher: function (valueY) {
            if (valueY !== null) {
                this.maxDataValue = this.maxDataValue > valueY ? this.maxDataValue : valueY;
                this.minDataValue = this.minDataValue < valueY ? this.minDataValue : valueY;
            }
        },

        updateSnapPoints: function(hc) {

            var
            instance = this,
            optionsChart = hc.chart,
            cw = instance.width,
            ch = instance.height,
            mgnB = optionsChart.marginBottom,
            mgnL = optionsChart.marginLeft,
            mgnR = optionsChart.marginRight,
            mgnT = optionsChart.marginTop,

            snaps = extend(instance.snapLiterals || (instance.snapLiterals = {}), {
                chartstartx : 0,
                chartstarty: 0,
                chartwidth: cw,
                chartheight: ch,
                chartendx: cw,
                chartendy: ch,

                chartbottommargin: mgnB,
                chartleftmargin: mgnL,
                chartrightmargin: mgnR,
                charttopmargin: mgnT,

                canvasstartx: mgnL,
                canvasstarty: mgnT,
                canvaswidth: cw - mgnL - mgnR,
                canvasheight: ch - mgnT - mgnB,
                canvasendx: cw - mgnR,
                canvasendy: ch - mgnB
            });

            snaps.gaugestartx = snaps.canvasstartx;
            snaps.gaugestarty = snaps.canvasstarty;
            snaps.gaugeendx = snaps.canvasendx;
            snaps.gaugeendy = snaps.canvasendy;

            snaps.gaugecenterx = snaps.canvascenterx =
            mgnL + (snaps.canvaswidth / 2);
            snaps.gaugecentery = snaps.canvascentery =
            mgnT + (snaps.canvasheight / 2);
        }

    }, chartAPI.base);




    //linearScaleGauge

    chartAPI('linearscalegauge', {

        //TODO: fix the spacemanagement issue for vertical axis with long limit labels.
        spaceManager: function (hcJSON, fcJSON, width, height) {
            var HCChartObj = hcJSON.chart,
            FCChartObj = fcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartRight = HCChartObj.marginRight,
            chartLeft = HCChartObj.marginLeft,
            chartTop = HCChartObj.marginTop,
            chartBottom = HCChartObj.marginBottom,
            minCanW = canvasWidth * 0.3,
            minCanH = canvasHeight * 0.3,
            tickDimensions, captionWidth,
            rightLabel = 0,
            canvasLeftMargin = pluckNumber(FCChartObj.canvasleftmargin),
            maxCaptionWidth = pluckNumber(FCChartObj.canvasleftmargin, canvasWidth * 0.40),
            canvasRightMargin = pluckNumber(FCChartObj.canvasrightmargin);

            //manage title Space
            if (this.manageTitleSpace) {
                captionWidth = this.manageTitleSpace(hcJSON, fcJSON, canvasWidth / 2, canvasHeight / 2);
            //captionWidth = this.manageTitleSpace(hcJSON, fcJSON, maxCaptionWidth, canvasHeight / 2);
            }

            //manage scaleSpace
            if (this.placeTickMark) {
                tickDimensions = this.placeTickMark(hcJSON, minCanW, minCanH);
            }

            //manageDataLabelsSpace
            if (this.placeDataLabels) {
                rightLabel = this.placeDataLabels(hcJSON, minCanW, minCanH, chartTop, chartRight, chartBottom, chartLeft, tickDimensions);
            }


            //manage other things if requared
            if (this.postDataLabelsPlacement) {
                this.postDataLabelsPlacement(hcJSON, minCanW, minCanH);
            }

            // Manage Caption alignment and canvasRight and left margins
            this.fixCaptionAlignment && this.fixCaptionAlignment(captionWidth, hcJSON, fcJSON, width, 0, rightLabel);

        },
        //manage space for title and subtitle at top
        manageTitleSpace : function (hcJSON, fcJSON, minCanvasWidth, minCanvasHeight){
            var HCChartObj = hcJSON.chart,canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight = this.height - (HCChartObj.marginTop + HCChartObj.marginBottom);
            return titleSpaceManager(hcJSON, fcJSON, canvasWidth,  canvasHeight - minCanvasHeight);

        },
        //can place one dataLabels at bottom
        placeDataLabels: function(hcJSON, minCanW, minCanH, chartTopSpace, chartRightSpace, chartBottomSpace, chartLeftSpace) {
            var smartLabel = this.smartLabel,
            HCChartObj = hcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  this.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartBottom = HCChartObj.marginBottom,
            smartDataLabel,
            dataLabels = hcJSON.plotOptions.series.dataLabels,
            style = dataLabels.style,
            fontSize = pluckNumber(parseInt(style.fontSize, 10), 10),
            lineHeight = pluckNumber(parseInt(style.lineHeight, 10), 12),
            maxAllowedHeight = canvasHeight - minCanH,
            valuePadding = HCChartObj.valuePadding,
            heightUsed = 0,
            point = hcJSON.series[0].data[0];
            if (point && point.displayValue !== BLANKSTRING) {
                smartLabel.setStyle(style);
                if (point.isLabelString) {
                    smartDataLabel = smartLabel.getSmartText(point.displayValue, canvasWidth, maxAllowedHeight - valuePadding);
                    point.displayValue = smartDataLabel.text;
                }
                else {
                    smartDataLabel = smartLabel.getOriSize(point.displayValue);
                }
                //special fix for space string
                //TODO: will be removed when smartLabel will be able to handle it
                if (point.displayValue === ' ') {
                    smartDataLabel = {
                        height : lineHeight
                    }
                }

                if (smartDataLabel.height > 0) {
                    heightUsed = smartDataLabel.height + valuePadding;
                }
                if (heightUsed > maxAllowedHeight) {
                    var ExtraSpace = heightUsed - maxAllowedHeight;
                    valuePadding = ExtraSpace < valuePadding ? valuePadding - ExtraSpace : 0;
                    heightUsed = maxAllowedHeight;
                }
                HCChartObj.marginBottom += heightUsed;
                dataLabels.align = POSITION_CENTER;
                HCChartObj.valuePadding = chartBottom - chartBottomSpace + fontSize + valuePadding;
            }
            return heightUsed;
        },
        //rearrange limit labels
        postDataLabelsPlacement : function (hcJSON, minCanvasWidth, minCanvasHeight) {
            var smartLabel = this.smartLabel,
            HCChartObj = hcJSON.chart, canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight = this.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            scale = hcJSON.scale,
            min = scale.min,
            max = scale.max,
            axisPosition = scale.axisPosition,
            style = scale.limitValues.style,
            reverseScale = scale.reverseScale,
            tickObj,
            lastIndex = scale.majorTM.length - 1,
            isHorizontal = (axisPosition === 2 || axisPosition === 4) ? false : true,
            smartTickLabelObj,
            fontSize = pluckNumber(parseInt(style.fontSize, 10), 10),
            lineHeight = pluckNumber(parseInt(style.lineHeight, 10), 12),
            lineHeightHalf = lineHeight / 2,
            labelShiftX,
            TMvalueDistance,
            maxTextW,
            maxTextH;

            if (scale.majorTM[0] && scale.majorTM[1]) {
                TMvalueDistance = scale.majorTM[1].value - scale.majorTM[0].value;
            }


            if (isHorizontal) {
                maxTextH = scale._labelUsedSpace;
                maxTextW = ((canvasWidth / (max - min)) * TMvalueDistance / 2) + 6;// shift the text little outer
            }
            else {
                maxTextW = scale._labelUsedSpace;
                maxTextH = ((canvasHeight / (max - min)) * TMvalueDistance) + lineHeightHalf; //shift the text little outer
            }

            smartLabel.setStyle(style);

            if (scale.majorTM[0] && scale.majorTM[0].isString) {
                tickObj = scale.majorTM[0];
                if (tickObj.displayValue) {
                    smartTickLabelObj = smartLabel.getSmartText(tickObj._oriText, maxTextW, maxTextH);
                    tickObj.displayValue = smartTickLabelObj.text;
                    if (!isHorizontal) {
                        tickObj.labelY =  fontSize - (reverseScale ? smartTickLabelObj.height - lineHeightHalf : lineHeightHalf);
                    }
                    else {
                        labelShiftX = Math.min(6, smartTickLabelObj.width / 2);
                        if (reverseScale) {
                            tickObj.labelX = labelShiftX;
                        }
                        else {
                            tickObj.labelX = -labelShiftX;
                        }
                    }
                }
            }

            if (scale.majorTM[lastIndex] && scale.majorTM[lastIndex].isString) {
                tickObj = scale.majorTM[lastIndex];
                if (tickObj.displayValue) {
                    smartTickLabelObj = smartLabel.getSmartText(tickObj._oriText, maxTextW, maxTextH);
                    tickObj.displayValue = smartTickLabelObj.text;
                    if (!isHorizontal) {
                        tickObj.labelY =  fontSize - (reverseScale ? lineHeightHalf : smartTickLabelObj.height - lineHeightHalf);
                    }
                    else {
                        labelShiftX = Math.min(6, smartTickLabelObj.width / 2);
                        if (reverseScale) {
                            tickObj.labelX = -labelShiftX;
                        }
                        else {
                            tickObj.labelX = labelShiftX;
                        }
                    }
                }
            }
        },

        getPointStub: function (dataObj, i, HCObj, FCObj, label) {
            var numberFormatter = this.numberFormatter,
            itemValue = numberFormatter.getCleanValue(dataObj.value),
            dataLink = getValidValue(dataObj.link),
            setToolText = dataObj.tooltext,
            setDisplayValue = getValidValue(parseUnsafeString(dataObj.displayvalue)),
            formatedVal = numberFormatter.dataLabels(itemValue),
            colorCodeObj,
            toolText, displayValue,
            FCChartObj = FCObj.chart,
            isLabelString;
            //create the tooltext
            if (!this.showTooltip) {
                toolText = false;
            }
            else if (setToolText !== undefined) {
                toolText = parseUnsafeString(setToolText);
                isLabelString = true;
            }
            else {//determine the dispalay value then
                toolText = formatedVal === null ? false :
                (label !== undefined) ? label + this.tooltipSepChar + formatedVal : formatedVal;
            }
            //create the displayvalue
            if (!pluckNumber(dataObj.showvalue, this.showValues)) {
                displayValue = BLANKSTRING;
            }
            else if (setDisplayValue !== undefined) {
                displayValue = setDisplayValue;
            }
            else {//determine the dispalay value then
                displayValue = getValidValue(formatedVal, ' ');
            }

            if (this.pointValueWatcher) {
                this.pointValueWatcher(itemValue);
            }

            if (this.getPointColorObj) {
                colorCodeObj = this.getPointColorObj(FCChartObj, itemValue)
            }

            return {
                y: itemValue,
                displayValue : displayValue,
                toolText : toolText,
                isLabelString : isLabelString,
                color: convertColor(colorCodeObj.code, colorCodeObj.alpha),
                link: dataLink,
                colorRange: colorCodeObj,
                doNotSlice: true
            };
        },

        //retuen the point color as an object
        getPointColorObj: function (FCChartObj, itemValue) {
            return this.colorRangeGetter.getColorObj(itemValue);
        }
    }, chartAPI.gaugebase);

    //LEDGauge
    chartAPI('led', {
        singleValued : true,
        isDataLabelBold: true,
        preSeriesAddition : function (HCJSON, FCJSON, width, height) {
            var FCChartObj = FCJSON.chart,
            HCChartObj = HCJSON.chart;
            //LED Gap & size
            HCChartObj.ledGap = pluckNumber(FCChartObj.ledgap, 2);
            HCChartObj.ledSize = pluckNumber(FCChartObj.ledsize, 2);
        }
    },chartAPI.linearscalegauge);

    /* VLED Charts */
    chartAPI('vled', {
        defaultSeriesType : 'led',
        defaultPlotShadow: 1,
        standaloneInit: true,
        realtimeEnabled: true,
        chartleftmargin: 15,
        chartrightmargin: 15,
        charttopmargin: 10,
        chartbottommargin: 10,
        showTooltip : 0,
        connectTickMarks: 0,
        creditLabel: creditLabel
    }, chartAPI.led);

    /* HLED Charts */
    chartAPI('hled', {
        defaultPlotShadow: 1,
        standaloneInit: true,
        defaultGaugePaletteOptions : defaultGaugePaletteOptions,
        creditLabel: creditLabel,
        isHorizontal: true,
        connectTickMarks: 1,
        realtimeEnabled: true
    }, chartAPI.vled);

    /* BULLET Charts */
    chartAPI('bullet', {
        creditLabel: creditLabel,
        defaultSeriesType: 'bullet',
        defaultPlotShadow: 1,
        drawAnnotations: true,
        realtimeEnabled: false,
        subTitleFontSizeExtender: 0,
        subTitleFontWeight: 'normal',
        connectTickMarks: 0,
        minorTMNumber: 0,
        majorTMHeight: 4,
        chartleftmargin: 10,
        chartrightmargin: 15,
        charttopmargin: 5,
        chartbottommargin: 5,
        isDataLabelBold: true,

        defaultGaugePaletteOptions : merge(defaultGaugePaletteOptions, {
            //Store colors now
            paletteColors: [["A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"],
            ["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"],
            ["04C2E3","66E7FD","9CEFFE","CEF8FF"],
            ["FA9101", "FEB654", "FED7A0", "FFEDD5"],
            ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]],
            //Store other colors
            // ------------- For 2D Chart ---------------//
            //We're storing 5 combinations, as we've 5 defined palettes.
            bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
            bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],

            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],

            baseFontColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
            tickColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
            trendColor: ["545454", "60634E", "415D6F", "845001", "68001B"],

            plotFillColor: ["545454", "60634E", "415D6F", "845001", "68001B"],

            borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50]

        }),

        preSeriesAddition: function (HCObj, FCObj, width, height) {
            var colorRangeGetter = this.colorRangeGetter,
            colorArr = colorRangeGetter.colorArr,
            length = colorArr.length,
            HCChartObj = HCObj.chart, FCChartObj = FCObj.chart,
            showGaugeBorder, value;
            if (length && this.pointValueWatcher) {
                value = pluckNumber(colorArr[0].minvalue);
                if (defined(value)) {
                    this.pointValueWatcher(value);
                }
                value = pluckNumber(colorArr[length - 1].maxvalue);
                if (defined(value)) {
                    this.pointValueWatcher(value);
                }
            }

            showGaugeBorder = pluckNumber(FCChartObj.showgaugeborder, FCChartObj.showcolorrangeborder, 0);
            HCChartObj.colorRangeBorderThickness = showGaugeBorder ? pluckNumber(FCChartObj.colorrangeborderthickness,
                FCChartObj.gaugeborderthickness, this.gaugeBorderThickness, 2) : 0;

        },

        postSeriesAddition: function (HCObj, FCObj, width, height) {
            var HCChartObj = HCObj.chart,
            series = HCObj.series[0],
            FCChartObj = FCObj.chart,
            targetObj = {
                value: FCObj.target
            };

            series.data.push(extend2(this.getPointStub(targetObj, 0, HCObj, FCObj),
            {
                borderColor: convertColor(pluck(FCChartObj.targetcolor, this.colorM.get2DPlotFillColor()),
                    getValidValue(FCChartObj.targetalpha, 100)),
                borderWidth: pluckNumber(FCChartObj.targetthickness, 3),
                targetThickness: pluckNumber(FCChartObj.targetthickness, 3),
                targetFillPercent: pluckNumber(FCChartObj.targetfillpercent, 60)
            }));
        },

        getPointStub: function (dataObj, i, HCObj, FCObj, label) {
            var numberFormatter = this.numberFormatter,
            colorM = this.colorM,
            getColorRange = this.getColorRange,
            smartLabel = this.smartLabel,
            itemValue = numberFormatter.getCleanValue(dataObj.value),
            dataLink = getValidValue(dataObj.link),
            setToolText = dataObj.tooltext,
            setDisplayValue = getValidValue(parseUnsafeString(dataObj.displayvalue)),
            formatedVal = numberFormatter.dataLabels(itemValue),
            colorCodeObj = this.colorRangeGetter.getColorObj(itemValue),
            FCChartObj = FCObj.chart,
            toolText, displayValue,
            plotBorderColor, plotFillColor = pluck(FCChartObj.plotfillcolor, colorM.get2DPlotFillColor()),
            plotAsDot = pluckNumber(FCChartObj.plotasdot, 0);

            //create the tooltext
            if (!this.showTooltip) {
                toolText = BLANKSTRING;
            }
            else if (setToolText !== undefined) {
                toolText = parseUnsafeString(setToolText);
            }
            else {//determine the dispalay value then
                toolText = formatedVal === null ? false :
                (label !== undefined) ? label + this.tooltipSepChar + formatedVal : formatedVal;
            }
            //create the displayvalue
            if (!pluckNumber(dataObj.showvalue, this.showValues)) {
                displayValue = BLANKSTRING;
            }
            else if (setDisplayValue !== undefined) {
                displayValue = setDisplayValue;
            }
            else {//determine the dispalay value then
                displayValue = getValidValue(formatedVal, ' ');
            }
            if (this.pointValueWatcher) {
                this.pointValueWatcher(itemValue);
            }

            if (/\{/.test((plotBorderColor = pluck(FCChartObj.plotbordercolor,  '{dark-20}')))){
                plotBorderColor = colorM.parseColorMix(plotFillColor, plotBorderColor).join();
            }

            return {
                y: itemValue,
                displayValue : displayValue,
                toolText : toolText,
                plotAsDot: plotAsDot,
                plotFillPercent: pluck(FCChartObj.plotfillpercent, plotAsDot ? 25 : 40),
                color: convertColor(plotFillColor, pluckNumber(FCChartObj.plotfillalpha, 100)),
                borderColor: convertColor(plotBorderColor,
                    pluckNumber(FCChartObj.plotborderalpha, 100)),
                borderWidth: pluckNumber(FCChartObj.showplotborder, 0) ? pluckNumber(FCChartObj.plotborderthickness, 1) : 0,
                link: dataLink,
                colorRange: colorCodeObj,
                doNotSlice: true
            };
        }
    }, chartAPI.linearscalegauge);

    /* VBULLET Charts */
    chartAPI('vbullet', {
        creditLabel: creditLabel,
        defaultSeriesType: 'bullet',
        gaugeType: 4,
        ticksOnRight: 0,
        standaloneInit: true
    }, chartAPI.bullet);

    /* HBULLET Charts */
    chartAPI('hbullet', {
        creditLabel: creditLabel,
        defaultSeriesType: 'bullet',
        gaugeType: 1,
        standaloneInit: true,
        isHorizontal: true,
        defaultCaptionPadding : 5,
        //can place one dataLabels at Right
        placeDataLabels: function(hcJSON, minCanW, minCanH, chartTopSpace, chartRightSpace, chartBottomSpace, chartLeftSpace) {
            var smartLabel = this.smartLabel,
            HCChartObj = hcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  this.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartRight = HCChartObj.marginRight,
            smartDataLabel,
            dataLabels = hcJSON.plotOptions.series.dataLabels,
            style = dataLabels.style,
            fontSize = pluckNumber(parseInt(style.fontSize, 10), 10),
            maxAllowedWidth = canvasWidth - minCanW,
            valuePadding = HCChartObj.valuePadding,
            widthUsed = 0,
            point = hcJSON.series[0].data[0];
            if (point && point.displayValue !== BLANKSTRING) {
                smartLabel.setStyle(style);
                if (point.isLabelString) {
                    smartDataLabel = smartLabel.getSmartText(point.displayValue, maxAllowedWidth - valuePadding, canvasHeight);
                    point.displayValue = smartDataLabel.text;
                }
                else {
                    smartDataLabel = smartLabel.getOriSize(point.displayValue);
                }

                if (smartDataLabel.height > 0) {
                    widthUsed = smartDataLabel.width + valuePadding;
                }

                if (widthUsed > maxAllowedWidth) {
                    var ExtraSpace = widthUsed - maxAllowedWidth;
                    valuePadding = ExtraSpace < valuePadding ? valuePadding - ExtraSpace : 0;
                    widthUsed = maxAllowedWidth;
                }
                HCChartObj.marginRight += widthUsed;
                dataLabels.align = POSITION_LEFT;
                dataLabels.x = 0;
                dataLabels.y = fontSize - (smartDataLabel.height / 2);
            // This aligh the displayValue on right of the chart
            // When captionOnRight is given for HBullet chart
            //HCChartObj.valuePadding = chartRight - chartRightSpace + valuePadding;
            }
            return widthUsed;
        },
        //manage space for title and subtitle at top
        manageTitleSpace : function (hcJSON, fcJSON, minCanvasWidth, minCanvasHeight) {
            var HCChartObj = hcJSON.chart,
            FCChartObj = fcJSON.chart,
            canvasWidth = this.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight = this.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            captionPadding = pluckNumber(FCChartObj.captionpadding, 2),
            //return titleSpaceManager(hcJSON, fcJSON, canvasWidth,  canvasHeight - minCanvasHeight);
            // IF canvasMargins are given for Bullet Graph
            // We use the sapce in canvasMargin to draw the caption.
            canvasMargin = pluckNumber(pluckNumber(FCChartObj.captiononright, 0) ?
                FCChartObj.canvasrightmargin : FCChartObj.canvasleftmargin);
            if (defined(canvasMargin)) {
                canvasMargin -= captionPadding;
            }
            var maxCaptionWidth = pluckNumber(canvasMargin, canvasWidth - minCanvasWidth);

            return placeTitleOnSide(hcJSON, fcJSON, maxCaptionWidth, canvasHeight,
                this.defaultCaptionPadding, this.width, this.height);

        },

        fixCaptionAlignment: function (captionWidth, hcJSON, fcJSON, width, leftLabel, rightLabel) {
            var HCChartObj = hcJSON.chart,
            FCChartObj = fcJSON.chart,
            canvasLeftMargin = pluckNumber(FCChartObj.canvasleftmargin),
            canvasRightMargin = pluckNumber(FCChartObj.canvasrightmargin),
            captionPadding = 0;

            HCChartObj.marginRight += captionWidth.right;
            HCChartObj.marginLeft += captionWidth.left;

            //Before doing so, we take into consideration, user's forced canvas margins (if any defined)
            if (defined(canvasLeftMargin)) {
                HCChartObj.spacingLeft = HCChartObj.marginLeft = canvasLeftMargin;
                HCChartObj.spacingLeft -= (captionWidth.left + captionPadding - 1);
            }
            if (defined(canvasRightMargin)) {
                HCChartObj.spacingRight = HCChartObj.marginRight = canvasRightMargin;
                HCChartObj.spacingRight -= (captionWidth.right + captionPadding - 1);
            }

            fixCaptionAlignment(hcJSON, fcJSON, this.width, leftLabel, rightLabel);

        }

    }, chartAPI.bullet);





    /* Linear Gauge */
    chartAPI('lineargauge', {
        creditLabel: creditLabel,
        defaultSeriesType: 'lineargauge',
        multiValueGauge: true,
        realtimeEnabled: true,
        gaugeType: 1,
        chartleftmargin: 15,
        chartrightmargin: 15,
        charttopmargin: 10,
        chartbottommargin: 10,
        colorRangeFillMix: '{light-10},{dark-20},{light-50},{light-85}',
        colorRangeFillRatio: '0,8,84,8',
        isDataLabelBold: true,
        eiMethods: jQuery.extend({}, chartAPI.gaugebase.eiMethods, {
            getData: function (index) {
                var traverse, len, dataObj,
                data = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.data);

                if (!data || !data.length) {
                    len = 0;
                } else {
                    len = data.length;
                }

                if (index !== undefined && index > 0 && index <= len) {
                    dataObj = data[index - 1];
                    return pluckNumber(dataObj.value, dataObj.y);
                } else {
                    return null;
                }

            },
            getDataForId: function (id) {
                var traverse, dataObj,
                dataById = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.dataById);

                if (dataById[id] && dataById[id].point) {
                    dataObj = dataById[id].point
                    return pluckNumber(dataObj.value, dataObj.y);
                } else {
                    return null;
                }

            },
            setData: function (index, value) {
                var traverse, len, feedStr = "&value=", i = 0,
                data = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.data);

                if (!data || !data.length) {
                    len = 0;
                } else {
                    len = data.length;
                }

                if (index > 0 && index <= len) {
                    i = index;
                    while (--i) {
                        feedStr += "|";
                    }
                    feedStr += value;

                    this.feedData(feedStr);
                }
            },
            setDataForId: function (id, value) {
                var traverse,
                dataById = (traverse = this.jsVars) && (traverse = traverse.instanceAPI)
                && (traverse = traverse.hcInstance) && (traverse = traverse.series)
                && (traverse = traverse[0]) && (traverse = traverse.dataById);

                if (dataById[id] && (dataById[id].index !== undefined)) {
                    this.setData((dataById[id].index + 1), value);
                }
            }
        }),
        placeDataLabels: function(hcJSON, minCanW, minCanH, chartTopSpace, chartRightSpace, chartBottomSpace, chartLeftSpace, tickDimension) {
            var api = this,
            //options = api.options,
            scaleObj = hcJSON.scale,
            smartLabel = api.smartLabel,
            HCChartObj = hcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = api.width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  api.height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartBottom = HCChartObj.marginBottom,
            smartDataLabel, extraSpace,
            dataLabels = hcJSON.plotOptions.series.dataLabels,
            style = dataLabels.style,
            trendStyle = hcJSON.scale && hcJSON.scale.labels && hcJSON.scale.labels.style,
            fontSize = pluckNumber(parseInt(style.fontSize, 10), 10),
            lineHeight = pluckNumber(parseInt(style.lineHeight, 10), 12),
            maxAllowedHeight = canvasHeight - minCanH,
            maxAllowedWidth = canvasWidth - minCanW,
            valuePadding = HCChartObj.valuePadding,
            heightUsed = 0, heightUsedBottom = 0, heightUsedTop = 0,
            heightReducedBottom = 0, heightReducedTop = 0,
            widthUsed = 0,
            data = (hcJSON.series && hcJSON.series[0] && hcJSON.series[0].data) || [],
            trendPoints = (hcJSON.scale && hcJSON.scale.trendPoint) || [],
            i = 0, len = data.length, point;

            smartLabel.setStyle(style);
            for (; i < len; i += 1) {
                point = data[i];
                if (point && point.displayValue !== BLANKSTRING) {

                    // Add pointer radius in value-padding
                    HCChartObj.valuePadding = valuePadding = valuePadding + point.radius *
                    (point.sides <= 3 ? 0.5 : (point.sides % 2 ? 1.1 - (1 / point.sides) : 1));

                    if (api.isHorizontal) {
                        if (point.isLabelString) {
                            smartDataLabel = smartLabel.getSmartText(point.displayValue, canvasWidth, maxAllowedHeight - valuePadding);
                            point.displayValue = smartDataLabel.text;
                        }
                        else {
                            smartDataLabel = smartLabel.getOriSize(point.displayValue);
                        }
                        //special fix for space string
                        //TODO: will be removed when smartLabel will be able to handle it
                        if (point.displayValue === ' ') {
                            smartDataLabel = {
                                height : lineHeight
                            }
                        }

                        if (smartDataLabel.height > 0) {
                            heightUsed = smartDataLabel.height + valuePadding;
                        }
                        if (heightUsed > maxAllowedHeight) {
                            extraSpace = heightUsed - maxAllowedHeight;
                            valuePadding = extraSpace < valuePadding ? valuePadding - extraSpace : 0;
                            heightUsed = maxAllowedHeight;
                        }
                        if (HCChartObj.pointerOnOpp) {
                            if (scaleObj.axisPosition === AXISPOSITION_BOTTOM) {
                                heightReducedBottom = Math.max(tickDimension, heightReducedBottom);
                                heightUsed = Math.max(tickDimension, heightUsed);
                            }

                            heightUsedBottom = Math.max(heightUsedBottom, heightUsed);
                        } else {
                            if (scaleObj.axisPosition === AXISPOSITION_TOP) {
                                heightReducedTop = Math.max(tickDimension, heightReducedTop);
                                heightUsed = Math.max(tickDimension, heightUsed);
                            }

                            heightUsedTop = Math.max(heightUsed, heightUsedTop);
                        }
                        dataLabels.align = POSITION_CENTER;
                    //HCChartObj.valuePadding = chartBottom - chartBottomSpace + fontSize + valuePadding;

                    } else {

                        // TODO: need to implement the label space management of
                        // vertical gauge properly including trendLabels as well.
                        // Refer to the isHorizontal section.
                        if (point.isLabelString) {
                            smartDataLabel = smartLabel.getSmartText(point.displayValue, maxAllowedWidth - valuePadding, canvasHeight);
                            point.displayValue = smartDataLabel.text;
                        }
                        else {
                            smartDataLabel = smartLabel.getOriSize(point.displayValue);
                        }

                        if (smartDataLabel.width > 0) {
                            widthUsed = smartDataLabel.width + valuePadding;
                        }

                        if (widthUsed > maxAllowedWidth) {
                            extraSpace = widthUsed - maxAllowedWidth;
                            valuePadding = extraSpace < valuePadding ? valuePadding - extraSpace : 0;
                            widthUsed = maxAllowedWidth;
                        }

                        if (HCChartObj.pointerOnOpp) {
                            if (scaleObj.axisPosition === AXISPOSITION_RIGHT) {
                                HCChartObj.marginRight -= tickDimension;
                                HCChartObj.marginRight += Math.max(tickDimension, widthUsed);
                            } else {
                                HCChartObj.marginRight += widthUsed;
                            }
                        } else {
                            if (scaleObj.axisPosition === AXISPOSITION_LEFT) {
                                HCChartObj.marginLeft -= tickDimension;
                                HCChartObj.marginLeft += Math.max(tickDimension, widthUsed);
                            } else {
                                HCChartObj.marginLeft += widthUsed;
                            }
                        }

                        dataLabels.align = POSITION_CENTER;
                    //HCChartObj.valuePadding = chartBottom - chartBottomSpace + fontSize + valuePadding;
                    }
                }
            }

            smartLabel.setStyle(trendStyle);
            for (i = 0, len = trendPoints.length; i < len; i += 1) {
                point = trendPoints[i];
                if (point && point.displayValue !== BLANKSTRING) {

                    // Add pointer radius in value-padding
                    HCChartObj.valuePadding = valuePadding = valuePadding + point.markerRadius * 0.5; // it will always have three sides

                    if (api.isHorizontal) {
                        smartDataLabel = smartLabel.getOriSize(point.displayValue);

                        if (smartDataLabel.height > 0) {
                            heightUsed = smartDataLabel.height + valuePadding;
                        }
                        if (heightUsed > maxAllowedHeight) {
                            extraSpace = heightUsed - maxAllowedHeight;
                            valuePadding = extraSpace < valuePadding ? valuePadding - extraSpace : 0;
                            heightUsed = maxAllowedHeight;
                        }
                        if (point.showOnTop) {
                            if (scaleObj.axisPosition === AXISPOSITION_TOP) {
                                heightReducedTop = Math.max(tickDimension, heightReducedTop);
                                heightUsed = Math.max(tickDimension, heightUsed);
                            }

                            heightUsedTop = Math.max(heightUsedTop, heightUsed);
                        } else {
                            if (scaleObj.axisPosition === AXISPOSITION_BOTTOM) {
                                heightReducedBottom = Math.max(tickDimension, heightReducedBottom);
                                heightUsed = Math.max(tickDimension, heightUsed);
                            }

                            heightUsedBottom = Math.max(heightUsed, heightUsedBottom);
                        }
                        dataLabels.align = POSITION_CENTER;
                    //HCChartObj.valuePadding = chartBottom - chartBottomSpace + fontSize + valuePadding;

                    }
                }
            }

            if (api.isHorizontal) {
                HCChartObj.marginBottom += (heightUsedBottom - heightReducedBottom);
                HCChartObj.marginTop += (heightUsedTop - heightReducedTop);
                heightUsed = heightUsedTop + heightUsedBottom - heightReducedBottom - heightReducedTop;
            }

            return heightUsed;
        },
        preSeriesAddition: function (HCObj, FCObj, width, height) {
            var HCChartObj = HCObj.chart,
            FCChartObj = FCObj.chart,
            colorM = this.colorM,
            scale = HCObj.scale;
            //Pointer properties
            HCChartObj.pointerRadius = pluckNumber(FCChartObj.pointerradius, 10),
            HCChartObj.pointerBgColor = pluck(FCChartObj.pointerbgcolor, FCChartObj.pointercolor, colorM.getPointerBgColor()),
            HCChartObj.pointerBgAlpha = pluckNumber(FCChartObj.pointerbgalpha, 100),
            HCChartObj.pointerBorderColor = pluck(FCChartObj.pointerbordercolor, colorM.getPointerBorderColor()),
            HCChartObj.pointerBorderThickness = pluckNumber(FCChartObj.pointerborderthickness, 1),
            HCChartObj.pointerBorderAlpha = pluckNumber(FCChartObj.pointerborderalpha, 100),
            HCChartObj.pointerSides = pluckNumber(FCChartObj.pointersides, 3);
            HCChartObj.showGaugeLabels = pluckNumber(FCChartObj.showgaugelabels, 1);
            HCChartObj.showPointerShadow = pluckNumber(FCChartObj.showpointershadow, FCChartObj.showshadow, 1);
            HCChartObj.valuePadding = pluckNumber(FCChartObj.valuepadding, 2);

            if (this.isHorizontal) {
                HCChartObj.pointerOnOpp = pluckNumber(FCChartObj.pointerontop,
                    (scale.axisPosition == AXISPOSITION_TOP ? 0 : 1)) ? 0 : 1;
                HCChartObj.gaugeType = scale.reverseScale ? GAUGETYPE_HORIZONTAL_REVERSED : GAUGETYPE_HORIZONTAL;
                HCChartObj.valueAbovePointer = pluckNumber(FCChartObj.valueabovepointer, HCChartObj.pointerOnOpp ? 0 : 1, 1);
                if (HCChartObj.valueAbovePointer === HCChartObj.pointerOnOpp) {
                    HCChartObj.valueInsideGauge = 1;
                } else {
                    HCChartObj.valueInsideGauge = 0;
                }
            } else {
                HCChartObj.pointerOnOpp = pluckNumber(FCChartObj.pointeronright,
                    (scale.axisPosition == AXISPOSITION_RIGHT ? 0 : 1));
                HCChartObj.gaugeType = scale.reverseScale ? GAUGETYPE_VERTICAL_REVERSED : GAUGETYPE_VERTICAL;
            }
        },

        getPointStub: function (dataObj, i, HCObj, FCObj, label) {
            var numberFormatter = this.numberFormatter,
            colorM = this.colorM,
            getColorRange = this.getColorRange,
            smartLabel = this.smartLabel,
            HCChartObj = HCObj.chart,
            itemValue = numberFormatter.getCleanValue(dataObj.value),
            dataLink = getValidValue(dataObj.link),
            setToolText = dataObj.tooltext,
            setDisplayValue = getValidValue(parseUnsafeString(dataObj.displayvalue)),
            formatedVal = numberFormatter.dataLabels(itemValue),
            colorCodeObj = this.colorRangeGetter.getColorObj(itemValue),
            FCChartObj = FCObj.chart,
            toolText, displayValue, sides, isLabelString = false;

            //create the tooltext
            if (!this.showTooltip) {
                toolText = BLANKSTRING;
            }
            else if (setToolText !== undefined) {
                toolText = parseUnsafeString(setToolText);
                isLabelString = true;
            }
            else {//determine the dispalay value then
                toolText = formatedVal === null ? false :
                (label !== undefined) ? label + this.tooltipSepChar + formatedVal : formatedVal;
            }
            //create the displayvalue
            if (!pluckNumber(dataObj.showvalue, this.showValues)) {
                displayValue = BLANKSTRING;
            }
            else if (setDisplayValue !== undefined) {
                displayValue = setDisplayValue;
            }
            else {//determine the dispalay value then
                displayValue = getValidValue(formatedVal, ' ');
            }
            sides = pluckNumber(dataObj.sides, HCChartObj.pointerSides);
            if (sides < 3) {
                sides = 3;
            }

            if (this.pointValueWatcher) {
                this.pointValueWatcher(itemValue);
            }


            return {
                y: itemValue,
                displayValue : displayValue,
                id: pluck(dataObj.id, 'pointer_' + i),
                editable: pluck(dataObj.editable, FCChartObj.editmode),
                isLabelString: isLabelString,
                toolText: toolText,
                plotFillPercent: pluck(FCChartObj.plotfillpercent, 40),
                color: convertColor(pluck(dataObj.color, dataObj.bgcolor, HCChartObj.pointerBgColor),
                    pluckNumber(dataObj.alpha, dataObj.bgalpha, HCChartObj.pointerBgAlpha)),
                borderColor: convertColor(pluck(dataObj.bordercolor, HCChartObj.pointerBorderColor),
                    pluckNumber(FCChartObj.showplotborder, 1) ? HCChartObj.pointerBorderAlpha : 0),
                borderWidth: pluckNumber(dataObj.borderthickness, HCChartObj.pointerBorderThickness),
                radius: pluckNumber(dataObj.radius, HCChartObj.pointerRadius),
                sides: sides,
                link: dataLink,
                colorRange: colorCodeObj,
                doNotSlice: true
            };
        }
    }, chartAPI.linearscalegauge);

    // HLinearGauge //
    chartAPI('hlineargauge', {
        creditLabel: creditLabel,
        defaultSeriesType: 'lineargauge',
        standaloneInit: true,
        isHorizontal: true
    }, chartAPI.lineargauge);

    // VLinearGauge //
    chartAPI('vlineargauge', {
        creditLabel: creditLabel,
        defaultSeriesType: 'lineargauge',
        connectTickMarks: 0,
        standaloneInit: true
    }, chartAPI.lineargauge);


    // VLinearGauge //
    chartAPI('thermometer', {
        creditLabel: creditLabel,
        defaultSeriesType: 'thermometer',
        connectTickMarks: 0,
        tickMarkDistance: 0,
        standaloneInit: true,
        realtimeEnabled: true,
        isDataLabelBold: true,
        defaultPlotShadow : 0,

        defaultGaugePaletteOptions : merge(defaultGaugePaletteOptions, {
            thmBorderColor: ['545454', '60634E', '415D6F', '845001', '68001B'],
            thmFillColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0']
        }),

        preSeriesAddition: function (HCObj, FCObj, width, height) {
            var HCChartObj = HCObj.chart,
            FCChartObj = FCObj.chart,
            colorM = this.colorM,
            scale = HCObj.scale,
            gaugeBorderAlpha;


            //-------------------------- Gauge specific properties --------------------------//
            HCChartObj.thmOriginX = pluckNumber(FCChartObj.thmoriginx, FCChartObj.gaugeoriginx);
            HCChartObj.thmOriginY = pluckNumber(FCChartObj.thmoriginy, FCChartObj.gaugeoriginy);
            HCChartObj.thmBulbRadius = pluckNumber(FCChartObj.thmbulbradius);
            HCChartObj.thmHeight = pluckNumber(FCChartObj.thmheight, FCChartObj.gaugeheight);

            //Special for LED
            //Gauge fill color & alpha
            HCChartObj.gaugeFillColor = pluck(FCChartObj.gaugefillcolor, FCChartObj.thmfillcolor, colorM.getThmFillColor());
            HCChartObj.gaugeFillAlpha = pluckNumber(FCChartObj.gaugefillalpha, FCChartObj.thmfillalpha, HUNDREDSTRING);

            //Gauge Border properties
            gaugeBorderAlpha = pluckNumber(FCChartObj.gaugeborderalpha,
                pluckNumber(FCChartObj.showgaugeborder, 1) ? 40 : 0);
            // We are using 40 for default alpha of Thermometer Gauge Border
            HCChartObj.gaugeBorderColor = convertColor(pluck(FCChartObj.gaugebordercolor, colorM.getThmBorderColor()),
                gaugeBorderAlpha);
            HCChartObj.gaugeBorderThickness = pluckNumber(FCChartObj.gaugeborderthickness, 1);

            // Thermometer Glass color
            HCChartObj.thmGlassColor = pluck(FCChartObj.thmglasscolor, getLightColor(HCChartObj.gaugeFillColor, 30));

            // Whether to use 3D lighting effect for thermometer gauge or not
            HCChartObj.use3DLighting = !pluckNumber(FCChartObj.use3dlighting, 1);

        },
        //retuen the point color as an object
        getPointColorObj: function (FCChartObj, itemValue) {
            return {
                code: pluck(FCChartObj.gaugefillcolor, FCChartObj.thmfillcolor, this.colorM.getThmFillColor()),
                alpha: pluckNumber(FCChartObj.gaugefillalpha, FCChartObj.thmfillalpha, 100)
            }
        },

        getPointStub: chartAPI.linearscalegauge,

        //can place one dataLabels at bottom
        placeDataLabels: chartAPI.linearscalegauge,
        //manage space for title and subtitle at top
        manageTitleSpace: chartAPI.linearscalegauge,

        //TODO: fix the spacemanagement issue for vertical axis with long limit labels.
        spaceManager: function (hcJSON, fcJSON, width, height) {
            var HCChartObj = hcJSON.chart,
            FCChartObj = fcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartRight = HCChartObj.marginRight,
            chartLeft = HCChartObj.marginLeft,
            chartTop = HCChartObj.marginTop,
            chartBottom = HCChartObj.marginBottom,
            minCanW = canvasWidth * 0.3,
            minCanH = canvasHeight * 0.3,
            thmOriginX = HCChartObj.thmOriginX,
            thmOriginY = HCChartObj.thmOriginY,
            thmBulbRadius = HCChartObj.thmBulbRadius,
            thmHeight = HCChartObj.thmHeight,
            xDefined = defined(thmOriginX),
            yDefined = defined(thmOriginY),
            rDefined = defined(thmBulbRadius),
            hDefined = defined(thmHeight),
            cos50 = 0.643,
            sin50 = 0.766,
            scale = hcJSON.scale,
            isOnLeft = scale.axisPosition === 4,
            scaleWidth = 0,
            marginDewToX = 0,
            thmWidth, bulbHeight, thmhalfWidth, titleHeight = 0;

            //manage title Space
            if (this.manageTitleSpace) {
                canvasHeight -= titleHeight = this.manageTitleSpace(hcJSON, fcJSON, canvasWidth / 2, canvasHeight / 2);
            }

            //manage scaleSpace
            if (this.placeTickMark) {
                canvasWidth -= scaleWidth = this.placeTickMark(hcJSON, pluckNumber(canvasWidth - (thmBulbRadius * 2), canvasWidth * 0.3), minCanH);
            }

            //if Not defined the radius then calculate it.
            if (!rDefined) {
                HCChartObj.thmBulbRadius = thmBulbRadius =  Math.min(canvasWidth / 2, pluckNumber(thmHeight, canvasHeight) * 0.13);
                rDefined = true;
            }

            if (rDefined) {
                thmhalfWidth =  thmBulbRadius * cos50;
                minCanW = thmWidth = 2 * thmhalfWidth;
                if (xDefined) {
                    if (isOnLeft) {
                        HCChartObj.marginRight += marginDewToX = (canvasWidth - thmOriginX - thmhalfWidth);
                    }
                    else {
                        HCChartObj.marginLeft += marginDewToX = thmOriginX - thmhalfWidth;
                    }
                }
                else {
                    if (isOnLeft) {
                        HCChartObj.marginRight += marginDewToX = (Math.min(thmBulbRadius, canvasWidth / 2) - thmhalfWidth);
                    }
                    else {
                        HCChartObj.marginLeft += marginDewToX = (Math.min(thmBulbRadius, canvasWidth / 2) - thmhalfWidth);
                    }
                }
                canvasWidth -= marginDewToX;
            }

            //Shift the drawing to the left as much as possible
            HCChartObj.marginRight += canvasWidth - thmWidth;

            if (yDefined) {
                minCanH = thmOriginY - titleHeight + thmBulbRadius;
            }

            //manageDataLabelsSpace
            if (this.placeDataLabels) {
                canvasHeight -= this.placeDataLabels(hcJSON, minCanW, minCanH, chartTop, chartRight, chartBottom, chartLeft);
            }

            if (!hDefined) {
                if (yDefined) {
                    HCChartObj.thmHeight = thmHeight =  Math.max(thmOriginY - titleHeight + thmBulbRadius - thmhalfWidth, 3 * thmBulbRadius);
                }
                else {
                    HCChartObj.thmHeight = thmHeight =  Math.max(canvasHeight - thmhalfWidth, 3 * thmBulbRadius);
                }
                hDefined = true;
            }
            //now increase the top margin
            if (yDefined) {
                HCChartObj.marginTop += thmOriginY - titleHeight + thmBulbRadius - thmHeight;
            }
            else {
                HCChartObj.marginTop += canvasHeight - thmHeight;
            }
            //now increase the bottom margin
            bulbHeight = thmBulbRadius * (1 + sin50);
            HCChartObj.marginBottom += bulbHeight;
            HCChartObj.valuePadding += bulbHeight;



            //manage other things if requared
            if (this.postDataLabelsPlacement) {
                this.postDataLabelsPlacement(hcJSON, minCanW, minCanH);
            }

        }
    }, chartAPI.gaugebase);


    // Cylinder //
    chartAPI('cylinder', {
        creditLabel: creditLabel,
        defaultSeriesType: 'cylinder',
        connectTickMarks: 0,
        tickMarkDistance: 2,
        standaloneInit: true,
        charttopmargin: 10,
        chartbottommargin: 10,
        chartrightmargin: 10,
        chartleftmargin: 10,
        isDataLabelBold: true,
        realtimeEnabled: true,

        defaultGaugePaletteOptions : merge(defaultGaugePaletteOptions, {
            cylFillColor: ['CCCCCC', 'ADB68F', 'E1F5FF', 'FDB548', 'FF7CA0'],
            periodColor: ['EEEEEE', 'ECEEE6', 'E6ECF0', 'FFF4E6', 'FFF2F5']
        }),

        preSeriesAddition: function (HCObj, FCObj, width, height) {
            var HCChartObj = HCObj.chart,
            FCChartObj = FCObj.chart,
            colorM = this.colorM,
            scale = HCObj.scale,
            gaugeBorderAlpha;


            //-------------------------- Gauge specific properties --------------------------//

            //Cylinder fill color
            HCChartObj.cylFillColor = pluck(FCChartObj.gaugefillcolor, FCChartObj.cylfillcolor, colorM.getCylFillColor());

            //Cylinder Glass color
            HCChartObj.cylGlassColor = pluck(FCChartObj.cylglasscolor, 'FFFFFF');

        },

        //retuen the point color as an object
        getPointColorObj: function (FCChartObj, itemValue) {
            return {
                code: pluck(FCChartObj.gaugefillcolor, FCChartObj.thmfillcolor, this.colorM.getCylFillColor()),
                alpha: pluckNumber(FCChartObj.gaugefillalpha, FCChartObj.thmfillalpha, 100)
            }
        },

        getPointStub: chartAPI.linearscalegauge,

        //can place one dataLabels at bottom
        placeDataLabels: chartAPI.linearscalegauge,

        //manage space for title and subtitle at top
        manageTitleSpace : chartAPI.linearscalegauge,

        //TODO: fix the spacemanagement issue for vertical axis with long limit labels.
        spaceManager: function (hcJSON, fcJSON, width, height) {
            var HCChartObj = hcJSON.chart,
            FCChartObj = fcJSON.chart,
            //labelStyle = series.dataLabels.style,
            canvasWidth = width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasHeight =  height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            chartRight = HCChartObj.marginRight,
            chartLeft = HCChartObj.marginLeft,
            chartTop = HCChartObj.marginTop,
            chartBottom = HCChartObj.marginBottom,
            minCanW = canvasWidth * 0.2,
            minCanH = canvasHeight * 0.3,
            cylYScale = pluckNumber(FCChartObj.cylyscale, 30),
            scaleFactor = this.scaleFactor;


            //manage title Space
            if (this.manageTitleSpace) {
                canvasHeight -= this.manageTitleSpace(hcJSON, fcJSON, canvasWidth / 2, canvasHeight / 2);
            }

            //manage scaleSpace
            if (this.placeTickMark) {
                canvasWidth -= this.placeTickMark(hcJSON, minCanW, minCanH);
            }

            //manageDataLabelsSpace
            if (this.placeDataLabels) {
                // Reducing canvasHeight base border 8px.
                canvasHeight -= this.placeDataLabels(hcJSON, minCanW, minCanH,
                    chartTop, chartRight, chartBottom, chartLeft) + 8;
            }

            //manage other things if requared
            if (this.postDataLabelsPlacement) {
                this.postDataLabelsPlacement(hcJSON, minCanW, minCanH);
            }

            //HCChartObj.cylOriginX = getValidValue(FCChartObj.cyloriginx);
            //HCChartObj.cylOriginY = getValidValue(FCChartObj.cyloriginy);
            //HCChartObj.cylRadius = getValidValue(FCChartObj.cylradius);
            HCChartObj.cylHeight = getValidValue(FCChartObj.cylheight);
            //Y-Scale cannot be more than 50 or less than 0
            if (cylYScale > 50 || cylYScale < 0) {
                //Set to 30
                cylYScale = 30;
            }
            //Put in range 0-1
            HCChartObj.cylYScale = cylYScale = cylYScale / 100;


            //----------------------------------------------------------------------------//
            //We finally have the maximum space to be alloted
            //Restrict to a minimum of 10
            var maxRadius = Math.max(canvasWidth / 2, 5),
            cylRadius,
            cylHeight;

            //Allot the radius
            cylRadius = pluckNumber(getValidValue(FCChartObj.cylradius) * scaleFactor, maxRadius);
            //Now, calculate the maximum possible height
            var maxVerticalHeight = canvasHeight - ((cylRadius * cylYScale) * 2);

            //Now, over-ride user values, and apply scale factor
            cylHeight = pluckNumber(getValidValue(FCChartObj.cylheight) * scaleFactor, maxVerticalHeight);

            HCChartObj.marginLeft = pluckNumber(getValidValue(FCChartObj.cyloriginx) * scaleFactor, HCChartObj.marginLeft);

            HCChartObj.marginRight = width - (HCChartObj.marginLeft + (cylRadius * 2));

            var yScaleRadius = HCChartObj.yScaleRadius = (cylRadius * cylYScale),
            cylinderTotalHeight = HCChartObj.cylinderTotalHeight = yScaleRadius * 2 + cylHeight,
            remaningSpace = canvasHeight - cylinderTotalHeight + HCChartObj.marginTop;
            HCChartObj.marginTop = pluckNumber((getValidValue(FCChartObj.cyloriginy) * scaleFactor) - cylHeight, yScaleRadius + remaningSpace);

            HCChartObj.marginBottom = height - (HCChartObj.marginTop + cylHeight);

            HCChartObj.cylRadius = cylRadius;
            HCChartObj.cylHeight = cylHeight;
            HCChartObj.yScaleRadius = yScaleRadius;

        }

    }, chartAPI.gaugebase);

    /* Angulargauge Charts */
    //helper function
    function angularGaugeSpaceManager (startAngle, endAngle, canvasW, canvasH,
        radius, centerX, centerY, compositPivotRadius, yPosExtra, yNegExtra) {
        var rediusDefined = defined(radius),
        centerXDefined = defined(centerX),
        centerYDefined = defined(centerY),
        PI2 = Math.PI * 2,
        PI = Math.PI,
        PIby2 = Math.PI / 2,
        PI3by2 = PI + PIby2,
        calculatedRadus,
        returnObj = {
            radius : radius,
            centerX : centerX,
            centerY : centerY
        },
        leftX, topY, rightX, bottomY, pivotCalRequard = false,
        startX, startY, endX, endY, tempRadius,
        resultantEnd, range, positiveLength, negativeLength,
        scale, startAbs = startAngle % PI2;
        if (startAbs < 0) {
            startAbs += PI2;
        }
        compositPivotRadius = compositPivotRadius || 0;
        if (compositPivotRadius && compositPivotRadius < canvasW / 2 && compositPivotRadius < canvasH / 2) {
            pivotCalRequard = true
        }
        if (yPosExtra > canvasH / 2) {//max half height will be setteled
            yPosExtra = canvasH / 2;
        }
        if (yNegExtra > canvasH / 2) {//max half height will be setteled
            yNegExtra = canvasH / 2;
        }
        startX = Math.cos(startAngle);
        startY = Math.sin(startAngle);
        endX = Math.cos(endAngle);
        endY = Math.sin(endAngle);
        leftX = Math.min(startX, endX, 0);
        rightX = Math.max(startX, endX, 0);
        topY = Math.min(startY, endY, 0);
        bottomY = Math.max(startY, endY, 0);
        if (!rediusDefined || !centerXDefined || !centerYDefined) {
            scale = endAngle - startAngle;
            resultantEnd = startAbs + scale;
            if (resultantEnd > PI2 || resultantEnd < 0) {
                rightX = 1;
            }
            if (scale > 0) {
                if ((startAbs < PIby2 && resultantEnd > PIby2) || resultantEnd > PI2 + PIby2) {
                    bottomY = 1;
                }
                if ((startAbs < PI && resultantEnd > PI) || resultantEnd > PI2 + PI) {
                    leftX = -1;
                }
                if ((startAbs < PI3by2 && resultantEnd > PI3by2) || resultantEnd > PI2 + PI3by2) {
                    topY = -1;
                }
            }
            else {
                if ((startAbs > PIby2 && resultantEnd < PIby2) || resultantEnd < - PI3by2) {
                    bottomY = 1;
                }
                if ((startAbs > PI && resultantEnd < PI) || resultantEnd < - PI) {
                    leftX = -1;
                }
                if ((startAbs > PI3by2 && resultantEnd < PI3by2) || resultantEnd < - PIby2) {
                    topY = -1;
                }
            }
            //now decide the x, y and radius
            if (!centerXDefined) {
                range =  rightX - leftX;
                tempRadius = canvasW / range;
                centerX = -tempRadius * leftX;
                calculatedRadus = tempRadius;
                if (pivotCalRequard) {
                    if (canvasW - centerX < compositPivotRadius) {
                        centerX = canvasW - compositPivotRadius;
                        positiveLength = canvasW - centerX;
                        negativeLength = -centerX;
                        calculatedRadus = leftX ? Math.min(positiveLength / rightX, negativeLength / leftX):
                        positiveLength / rightX;
                    }
                    else if (centerX < compositPivotRadius){
                        centerX = compositPivotRadius;
                        positiveLength = canvasW - centerX;
                        negativeLength = -centerX;
                        calculatedRadus = leftX ? Math.min(positiveLength / rightX, negativeLength / leftX):
                        positiveLength / rightX;
                    }
                }
                returnObj.centerX = centerX;
            }
            else if (!rediusDefined) {
                positiveLength = canvasW - centerX;
                negativeLength = -centerX;
                calculatedRadus = leftX ? Math.min(positiveLength / rightX, negativeLength / leftX):
                positiveLength / rightX;
            }

            if (!centerYDefined) {
                range =  bottomY - topY;
                tempRadius = canvasH / range;
                centerY = -tempRadius * topY;
                if (pivotCalRequard) {
                    if (canvasH - centerY < compositPivotRadius) {
                        centerY = canvasH - compositPivotRadius;
                        positiveLength = canvasH - centerY;
                        negativeLength = -centerY;
                        calculatedRadus = Math.min(calculatedRadus, topY ? Math.min(positiveLength / bottomY,
                            negativeLength / topY) : positiveLength / bottomY);
                    }
                    else if (centerY < compositPivotRadius){
                        centerY = compositPivotRadius;
                        positiveLength = canvasH - centerY;
                        negativeLength = -centerY;
                        calculatedRadus = Math.min(calculatedRadus, topY ? Math.min(positiveLength / bottomY,
                            negativeLength / topY) : positiveLength / bottomY);
                    }
                }
                //yAxisExtra
                if (canvasH - centerY < yPosExtra) {
                    centerY = canvasH - yPosExtra;
                    positiveLength = canvasH - centerY;
                    negativeLength = -centerY;
                    calculatedRadus = Math.min(calculatedRadus, topY ? Math.min(positiveLength / bottomY,
                        negativeLength / topY) : positiveLength / bottomY);
                }
                else if (centerY < yNegExtra){
                    centerY = yNegExtra;
                    positiveLength = canvasH - centerY;
                    negativeLength = -centerY;
                    calculatedRadus = Math.min(calculatedRadus, topY ? Math.min(positiveLength / bottomY,
                        negativeLength / topY) : positiveLength / bottomY);
                }
                calculatedRadus = Math.min(calculatedRadus, tempRadius);
                returnObj.centerY = centerY;
            }
            else if (!rediusDefined) {
                positiveLength = canvasH - centerY;
                negativeLength = -centerY;
                calculatedRadus = Math.min(calculatedRadus, topY ? Math.min(positiveLength / bottomY,
                    negativeLength / topY) : positiveLength / bottomY);
            }
            returnObj.maxRadius = calculatedRadus;
            if (returnObj.maxRadius <= 0) {
                returnObj.maxRadius = Math.min(canvasW / 2, canvasH / 2);
            }
        }
        return returnObj;
    }


    chartAPI('angulargauge', {
        standaloneInit: true,
        drawAnnotations: true,
        defaultSeriesType : 'angulargauge',
        creditLabel: creditLabel,
        isAngular: true,
        eiMethods: chartAPI.lineargauge.eiMethods,
        multiValueGauge: true,
        realtimeEnabled: true,
        defaultGaugePaletteOptions : merge(defaultGaugePaletteOptions, {
            dialColor: ['999999,ffffff,999999', 'ADB68F,F3F5DD,ADB68F', 'A2C4C8,EDFBFE,A2C4C8', 'FDB548,FFF5E8,FDB548', 'FF7CA0,FFD1DD,FF7CA0'],
            dialBorderColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0'],
            pivotColor: ['999999,ffffff,999999', 'ADB68F,F3F5DD,ADB68F', 'A2C4C8,EDFBFE,A2C4C8', 'FDB548,FFF5E8,FDB548', 'FF7CA0,FFD1DD,FF7CA0'],
            pivotBorderColor: ['999999', 'ADB68F', 'A2C4C8', 'FDB548', 'FF7CA0']
        }),
        subTitleFontSizeExtender: 0,
        charttopmargin : 5,
        chartrightmargin : 5,
        chartbottommargin : 5,
        chartleftmargin : 5,
        defaultPlotShadow : 1,
        gaugeBorderColor : '{dark-20}',
        gaugeBorderThickness : 1,

        updateSnapPoints: function(hc) {
            chartAPI.gaugebase.updateSnapPoints.apply(this, arguments);

            var series = hc.series[0],
            snaps = this.snapLiterals;

            snaps.gaugestartangle = hc.chart.gaugeStartAngle;
            snaps.gaugeendangle = hc.chart.gaugeEndAngle;

            snaps.chartcenterx = snaps.gaugecenterx = series.gaugeOriginX;
            snaps.chartcentery = snaps.gaugecentery = series.gaugeOriginY;
            snaps.gaugeinnerradius = series.gaugeInnerRadius;
            snaps.gaugeouterradius = series.gaugeOuterRadius;
        },

        preSeriesAddition: function (hc, obj, width, height){
            //***** determine the start and end angle *****//

            var FCChartObj = obj.chart,
            scaleAngle = pluckNumber(FCChartObj.gaugescaleangle, 180),
            startAngle = pluckNumber(FCChartObj.gaugestartangle),
            endAngle = pluckNumber(FCChartObj.gaugeendangle),
            startDefined = defined(startAngle), tempAngle,
            //arc on 360deg is not possable SVG limitation so reduce the scale
            circleHandler = hasSVG ? 0.001 : 0.01,
            endDefined= defined(endAngle);

            /*
             *All angle should be in range of -360 to 360 of traditional methode
             *At the end convert them in computer graphics methode
             * relation among them is [scaleAngle = startAngle - endAngle;]
             */

            if (scaleAngle > 360 || scaleAngle < -360) {
                scaleAngle = scaleAngle > 0 ? 360 : -360;
            }
            if (endAngle > 360 || endAngle < -360) {
                endAngle = endAngle % 360;
            }
            if (startAngle > 360 || startAngle < -360) {
                startAngle = startAngle % 360;
            }

            //booth defined
            if (startDefined && endDefined) {
                //override the scale
                scaleAngle = startAngle - endAngle;
                //validate scale and EndAngle
                if (scaleAngle > 360 || scaleAngle < -360) {
                    scaleAngle = scaleAngle % 360;
                    endAngle = startAngle - scaleAngle;
                }
            }
            else if (startDefined) {//StartAngle Defined
                //derive endAngle
                endAngle = startAngle - scaleAngle;
                //if derived end angle cross the limit
                if (endAngle > 360 || endAngle < -360) {
                    endAngle = endAngle % 360;
                    startAngle += endAngle > 0 ? -360 : 360;
                }
            }
            else if (endDefined) {//endAngle Defined
                //derive StartAngle
                startAngle = endAngle + scaleAngle;
                //if derived start angle cross the limit
                if (startAngle > 360 || startAngle < -360) {
                    startAngle = startAngle % 360;
                    endAngle += startAngle > 0 ? -360 : 360;
                }
            }
            else {//booth will be derived
                if (scaleAngle === 360) {
                    startAngle = 180;
                    endAngle = - 180;
                }
                else  if (scaleAngle === -360) {
                    startAngle = -180;
                    endAngle = -180;
                }
                else {
                    tempAngle = scaleAngle / 2;
                    startAngle = 90 + tempAngle;
                    endAngle = startAngle - scaleAngle;
                }

            }
            //Full 360 can't be drawn by arc[limitation]
            if (Math.abs(scaleAngle) === 360) {
                scaleAngle += scaleAngle > 0 ? -circleHandler : circleHandler;
                endAngle = startAngle - scaleAngle;
            }

            //convert all the angles into clockwise cordinate
            endAngle = 360 - endAngle;
            startAngle = 360 - startAngle;
            scaleAngle = -scaleAngle;

            //if start angle cross the limit
            if (startAngle > 360 || endAngle > 360 ) {
                startAngle -= 360;
                endAngle -= 360;
            }
            //convert into red
            hc.chart.gaugeStartAngle = startAngle = startAngle * deg2rad;
            hc.chart.gaugeEndAngle = endAngle = endAngle * deg2rad;
            hc.chart.gaugeScaleAngle = scaleAngle = scaleAngle * deg2rad;

        },

        series : function (FCObj, HCObj, chartName, width, height) {
            var series = {
                data : [],
                // for single series the color will be added point by point from palette
                colorByPoint: true
            },
            // FusionCharts Chart Obj
            FCChartObj = FCObj.chart,
            HCChartObj = HCObj.chart,
            NumberFormatter = this.numberFormatter,
            colorM = this.colorM,
            // Value
            itemValue,
            //Whether to show the value below the chart
            showValue = series.showValue = pluckNumber(FCChartObj.showvalue , FCChartObj.showrealtimevalue , 0),
            // Length of the default colors
            //TODO: have to calculate it
            scaleFactor = this.scaleFactor,
            compositPivotRadius = 0,
            dialArr = FCObj.dials && FCObj.dials.dial;

            //attrubutes to be retrived before the points parse
            var editMode = pluckNumber(FCChartObj.editmode, 0),
            pivotRadius = compositPivotRadius = pluckNumber(getValidValue(FCChartObj.pivotradius) * scaleFactor, 5);



            series.pivotRadius = pivotRadius;


            //*****   parse the point   ******//

            var index = 0, length = dialArr && dialArr.length, dialObj, rearExtension,
            displayValue, isLabelString, pointShowValue, valueY, displayValueCount = 0;

            if (length) {
                for (; index < length; index += 1) {
                    dialObj = dialArr[index];
                    itemValue = NumberFormatter.getCleanValue(dialObj.value);

                    if (this.pointValueWatcher) {
                        this.pointValueWatcher(itemValue);
                    }


                    rearExtension = pluckNumber(getValidValue(dialObj.rearextension) * scaleFactor, 0);
                    compositPivotRadius = Math.max(compositPivotRadius, rearExtension);
                    displayValue = getValidValue(NumberFormatter.dataLabels(itemValue), BLANKSTRING);
                    pointShowValue = pluckNumber(dialObj.showvalue, showValue);
                    valueY = pluckNumber(getValidValue(dialObj.valuey) * scaleFactor);
                    isLabelString = pluck(dialObj.tooltext, dialObj.hovertext) ? true : false;
                    if (pointShowValue && !defined(valueY)) {
                        displayValueCount += 1;
                    }


                    //Create the dial object
                    series.data.push({
                        y: itemValue,
                        id: pluck(dialObj.id, index),
                        color: {
                            FCcolor : {
                                color: pluck(dialObj.color, dialObj.bgcolor, colorM.getDialColor()),
                                angle : 90
                            }
                        },
                        showValue: pointShowValue,
                        editMode: pluckNumber(dialObj.editmode, editMode),
                        borderColor: convertColor(pluck(dialObj.bordercolor, colorM.getDialBorderColor()),
                            pluckNumber(dialObj.borderalpha, 100)),
                        borderThickness: pluckNumber(dialObj.borderthickness, 1),
                        baseWidth: pluckNumber(getValidValue(dialObj.basewidth) * scaleFactor, pivotRadius * 1.6),
                        topWidth: pluckNumber(getValidValue(dialObj.topwidth) * scaleFactor, 0),
                        rearExtension: rearExtension,
                        valueX: pluckNumber(getValidValue(dialObj.valuex) * scaleFactor),
                        valueY: valueY,
                        radius: pluckNumber(getValidValue(dialObj.radius) * scaleFactor),
                        link: pluck(dialObj.link, BLANKSTRING),
                        isLabelString: isLabelString,
                        toolText: pluck(dialObj.tooltext, dialObj.hovertext, displayValue),
                        displayValue: pointShowValue ? displayValue : BLANKSTRING,
                        doNotSlice: true
                    });
                }
            }
            series.displayValueCount = displayValueCount;
            series.compositPivotRadius = compositPivotRadius;
            HCObj.series[0] = series;

        },

        postSeriesAddition: function(hc, obj, width, height){

            var hcChartObj = hc.chart,
            FCChartObj = obj.chart,
            series = hc.series[0],
            colorM = this.colorM,
            pvColor;



            //Whether to show value below or above
            series.valueBelowPivot = pluckNumber(FCChartObj.valuebelowpivot ,  0);

            //**** calculate the tick marks and axis min max ****//
            // based on the startAngle, endAngle and scaleAngle,
            // calculate the tick space.







            //-------------------------- Gauge specific properties --------------------------//

            //Gauge fill properties
            series.gaugeFillMix = FCChartObj.gaugefillmix;
            series.gaugeFillRatio = FCChartObj.gaugefillratio;
            //Set defaults
            if (series.gaugeFillMix == undefined){
                series.gaugeFillMix = '{light-10},{light-70},{dark-10}';
            }
            if (series.gaugeFillRatio == undefined){
                series.gaugeFillRatio = ',6';
            }else if (series.gaugeFillRatio != ''){
                //Append a comma before the ratio
                series.gaugeFillRatio = ',' + series.gaugeFillRatio;
            }

            //Parse the color, alpha and ratio array for each color range arc.
            pvColor = colorM.parseColorMix(
                pluck(FCChartObj.pivotfillcolor, FCChartObj.pivotcolor, FCChartObj.pivotbgcolor, colorM.getPivotColor()),
                pluck(FCChartObj.pivotfillmix, '{light-10},{light-30},{dark-20}'));
            series.pivotFillAlpha = colorM.parseAlphaList(pluck(FCChartObj.pivotfillalpha, HUNDREDSTRING), pvColor.length);
            series.pivotFillRatio = colorM.parseRatioList(pluck(FCChartObj.pivotfillratio, ZEROSTRING), pvColor.length);
            series.pivotFillColor = pvColor.join();
            series.pivotFillAngle = pluckNumber(FCChartObj.pivotfillangle, 0);
            series.isRadialGradient = pluck(FCChartObj.pivotfilltype, 'radial').toLowerCase() == 'radial';
            //Pivot border properties
            series.showPivotBorder = pluckNumber(FCChartObj.showpivotborder, 0);
            series.pivotBorderThickness = pluckNumber(FCChartObj.pivotborderthickness, 1);
            series.pivotBorderColor = convertColor(
                pluck(FCChartObj.pivotbordercolor, colorM.getPivotBorderColor()),
                series.showPivotBorder == 1 ? pluck(FCChartObj.pivotborderalpha, HUNDREDSTRING) : ZEROSTRING);

            // Putting the parseColorMin function in chartAPI to be use later in drawing of color range
            this.parseColorMix = colorM.parseColorMix;
            this.parseAlphaList = colorM.parseAlphaList;
            this.parseRatioList = colorM.parseRatioList;

        },

        spaceManager: function(HCObj, FCObj, width, height){
            var HCChartObj = HCObj.chart,
            FCChartObj  = FCObj.chart,
            scale = HCObj.scale,
            series = HCObj.series[0],
            displayValueCount = series.displayValueCount,
            valueStyle = scale.tickValues.style,
            labelHeight = pluckNumber(parseInt(valueStyle.lineHeight, 10), 12),
            labelFontSize = pluckNumber(parseInt(valueStyle.fontSize, 10), 10),
            baseLineDistance = labelFontSize * 0.8,//assumed and tested that it gose well for all font
            gaugeSpacingObj,
            displayValueLineHeight = pluckNumber(parseInt(HCObj.plotOptions.series.dataLabels.style.lineHeight, 10), 12),
            pivotRadius = series.pivotRadius,
            canvasW = width - (HCChartObj.marginRight + HCChartObj.marginLeft),
            canvasH = height - (HCChartObj.marginTop + HCChartObj.marginBottom),
            scaleFactor = this.scaleFactor,
            compositPivotRadius = series.compositPivotRadius,
            centerX, centerY,
            startAngle = HCChartObj.gaugeStartAngle,
            endAngle = HCChartObj.gaugeEndAngle,
            scaleAngle = HCChartObj.gaugeScaleAngle,
            innerRadiusFactor,
            yPosExtra = displayValueCount * displayValueLineHeight + 2 + pivotRadius,
            yNegExtra = 0,
            valueBelowPivot = series.valueBelowPivot;
            if (/^\d+\%$/.test(FCChartObj.gaugeinnerradius)) {
                innerRadiusFactor = parseInt(FCChartObj.gaugeinnerradius, 10) / 100;
            }
            else {
                innerRadiusFactor = 0.7;
            }

            //manage the space for caption
            canvasH -=  titleSpaceManager(HCObj, FCObj, canvasW,
                canvasH / 2);

            if (!valueBelowPivot) {
                yNegExtra = yPosExtra;
                yPosExtra = 0;
            }
            // gaugeOuterRadius does not have any default value.
            series.gaugeOuterRadius = pluckNumber(Math.abs(getValidValue(FCChartObj.gaugeouterradius) * scaleFactor));
            //Asume gauge inner radius to be a default of 70% of gauge outer radius
            series.gaugeInnerRadius = pluckNumber(Math.abs(getValidValue(FCChartObj.gaugeinnerradius) * scaleFactor), series.gaugeOuterRadius * innerRadiusFactor);

            gaugeSpacingObj = angularGaugeSpaceManager (HCChartObj.gaugeStartAngle, HCChartObj.gaugeEndAngle,
                canvasW, canvasH, series.gaugeOuterRadius,
                pluckNumber((getValidValue(FCChartObj.gaugeoriginx) * scaleFactor) - HCChartObj.marginLeft),
                pluckNumber((getValidValue(FCChartObj.gaugeoriginy) * scaleFactor) - HCChartObj.marginTop), Math.max(compositPivotRadius, labelFontSize),
                yPosExtra, yNegExtra);

            centerX = series.gaugeOriginX = gaugeSpacingObj.centerX;
            centerY = series.gaugeOriginY = gaugeSpacingObj.centerY;

            var maxRadius = gaugeSpacingObj.maxRadius,
            maxTickHeight = 0, newRadius,
            majorTM = scale.majorTM, TMIndex = 0, TMlength = majorTM.length,
            labelStr, smartLabel = HCObj.labels.smartLabel, smartText, stWidth, stHeight, stHeightHalf,
            TMObj, minValue = scale.min, valueRange = scale.max - scale.min,
            cosThita, sinThita, labelX, labelY,
            xPos = canvasW - centerX,
            xNeg = centerX,
            yPos = canvasH - centerY,
            yNeg = centerY,
            placeValuesInside = scale.placeValuesInside,
            limitingValue = Math.cos(89.99 * deg2rad),
            limitingNegValue = -limitingValue,
            yPosLimit = 0.5,
            yNegLimit = -0.5,
            outerRadiusDefined = defined(series.gaugeOuterRadius),
            tickValueDistance = scale.tickValueDistance,
            showTickValues = scale.showTickValues,
            showLimits = scale.showLimits,
            tempOuterRadius = pluckNumber(series.gaugeOuterRadius, gaugeSpacingObj.maxRadius),
            tempInnerRadius = pluckNumber(series.gaugeInnerRadius, tempOuterRadius * innerRadiusFactor),
            calculatedRadius = tempOuterRadius,
            minRadius = tempOuterRadius * 0.2,
            LabelInsideRadius,
            labelWidth,
            maxY,
            usedY,
            textHeight,
            minLabelWidthForWrapping = labelHeight * 1.5,
            angleRange = endAngle - startAngle, angle, angleValueFactor = angleRange / valueRange;
            
            //if any label is visiable
            if (showTickValues || showLimits) {
                if (placeValuesInside){
                    if(tempInnerRadius > tickValueDistance + labelHeight) {
                        LabelInsideRadius = tempInnerRadius - tickValueDistance;
                    }
                    else {
                        LabelInsideRadius = tempInnerRadius;
                        tickValueDistance = 0;
                    }

                }
                else {
                    calculatedRadius += tickValueDistance;
                    if (!outerRadiusDefined){
                        //if (minRadius + tickValueDistance < maxRadius) {
                        minRadius += tickValueDistance;
                    //calculatedRadius += tickValueDistance;
                    //}else {
                    //    nospaceForTickValueDistance = true;
                    //    tickValueDistance = 0;
                    //}
                    }
                }




                //manage the space for tick mark and labels and decide the radius from;
                smartLabel.setStyle(valueStyle);
                for (;TMIndex < TMlength; TMIndex += 1) {
                    TMObj = majorTM[TMIndex];
                    angle = startAngle + ((TMObj.value - minValue) * angleValueFactor);
                    cosThita = Math.cos(angle);
                    sinThita = Math.sin(angle);
                    labelStr = TMObj.displayValue;
                    smartText = smartLabel.getOriSize(labelStr);
                    stWidth = smartText.width;
                    stHeight = smartText.height;
                    stHeightHalf = stHeight / 2;


                    if (stWidth > 0 && stHeight > 0) {
                        //TMObj.y = labelHeight - stHeight / 2;
                        TMObj.x = 0;
                        //labels are inside
                        if (placeValuesInside) {
                            TMObj.align = cosThita > limitingValue ? POSITION_RIGHT :
                            (cosThita < limitingNegValue ? POSITION_LEFT : POSITION_CENTER);

                            if (TMObj.isString) {
                                labelX = LabelInsideRadius * cosThita;
                                labelY = LabelInsideRadius * sinThita;
                                labelWidth = Math.abs(labelX);
                                if (labelWidth < stWidth) {
                                    smartText = smartLabel.getSmartText(labelStr,
                                        Math.max(labelWidth, labelHeight), minLabelWidthForWrapping);
                                    TMObj.displayValue = smartText.text;
                                    stWidth = smartText.width;
                                    stHeight = smartText.height;
                                    stHeightHalf = stHeight / 2;
                                }
                            }

                            //set the text Y
                            if (cosThita > limitingValue || cosThita < limitingNegValue) {
                                TMObj.y = labelFontSize - stHeightHalf;
                                TMObj.y -= stHeight * 0.4 * sinThita
                            }
                            else {
                                TMObj.y = baseLineDistance - (sinThita < 0 ? 0 : stHeight * 0.9);
                            }

                        }
                        //labels are outsides
                        else {
                            
                            TMObj.align = cosThita > limitingValue ? POSITION_LEFT :
                            (cosThita < limitingNegValue ? POSITION_RIGHT : POSITION_CENTER);
                            labelX = calculatedRadius * cosThita;
                            labelY = calculatedRadius * sinThita;
                            
                            //adjust the heights for non defined outer radius
                            if (!outerRadiusDefined) {
                                if (labelY > 0) {
                                    textHeight = stHeightHalf + stHeightHalf * sinThita;
                                    if (yPos < labelY + textHeight) {
                                        labelY = yPos - textHeight;
                                        calculatedRadius = Math.max(labelY / sinThita, minRadius);
                                    }
                                }
                                else if (labelY < 0) {
                                    textHeight = stHeightHalf - stHeightHalf * sinThita;
                                    if (yNeg < -labelY + textHeight) {
                                        labelY = textHeight - yNeg;
                                        calculatedRadius = Math.max(labelY / sinThita, minRadius);
                                    }
                                }
                            }

                            if (cosThita > limitingValue) {//at right half
                                
                                if (labelX + stWidth > xPos) {//labels are going out
                                    if (!outerRadiusDefined) {//Adjust radius
                                        labelX  = xPos - stWidth;
                                        calculatedRadius = Math.max(labelX / cosThita, minRadius);
                                        labelX = calculatedRadius * cosThita;
                                        if (TMObj.isString && labelX + stWidth > xPos) {
                                            smartText = smartLabel.getSmartText(labelStr, xPos - labelX, minLabelWidthForWrapping);
                                            TMObj.displayValue = smartText.text;
                                            stHeight = smartText.height;
                                            stHeightHalf = stHeight / 2;
                                            stWidth = smartText.width;
                                            labelX  = xPos - stWidth;
                                            calculatedRadius = Math.max(labelX / cosThita, minRadius);
                                        }
                                    }
                                    else if (TMObj.isString) {//adjust the labels
                                        smartText = smartLabel.getSmartText(labelStr, xPos - labelX, minLabelWidthForWrapping);
                                        TMObj.displayValue = smartText.text;
                                        stHeight = smartText.height;
                                        stHeightHalf = stHeight / 2;
                                    }
                                }
                                //set the text Y
                                TMObj.y = labelFontSize - stHeightHalf + stHeight * 0.4 * sinThita;
                                
                            }
                            else if (cosThita < limitingNegValue) {//at left half
                                
                                if (stWidth - labelX > xNeg) {
                                    if (!outerRadiusDefined) {//Adjust radius
                                        labelX  = stWidth - xNeg;
                                        calculatedRadius = Math.max(labelX / cosThita, minRadius);
                                        labelX = calculatedRadius * cosThita;
                                        if (TMObj.isString && stWidth - labelX > xNeg) {
                                            smartText = smartLabel.getSmartText(labelStr, xNeg + labelX, minLabelWidthForWrapping);
                                            TMObj.displayValue = smartText.text;
                                            stWidth = smartText.width;
                                            stHeight = smartText.height;
                                            stHeightHalf = stHeight / 2;
                                            labelX  = stWidth - xNeg;
                                            calculatedRadius = Math.max(labelX / cosThita, minRadius);
                                        }
                                    }
                                    else if (TMObj.isString) {
                                        smartText = smartLabel.getSmartText(labelStr, xNeg + labelX, minLabelWidthForWrapping);
                                        TMObj.displayValue = smartText.text;
                                        stHeight = smartText.height;
                                        stHeightHalf = stHeight / 2;
                                    }
                                }
                                //set the text Y
                                TMObj.y = labelFontSize - stHeightHalf + stHeight * 0.4 * sinThita;
                                
                            }
                            else {
                                
                                if (sinThita > 0) {
                                    maxY = yPos;
                                    usedY = stHeight + labelY;
                                }
                                else {
                                    maxY = yNeg;
                                    usedY = stHeight - labelY;
                                }
                                if (!outerRadiusDefined) {
                                    if (usedY > maxY) {
                                        calculatedRadius = Math.max(maxY - stHeight, minRadius);
                                        usedY = stHeight + calculatedRadius;
                                    }
                                    if (TMObj.isString && (usedY > maxY) || (stWidth > canvasW)) {
                                        smartText = smartLabel.getSmartText(labelStr, canvasW,
                                            Math.max(maxY - minRadius, labelHeight));
                                        TMObj.displayValue = smartText.text;
                                        stHeight = smartText.height;
                                        stHeightHalf = stHeight / 2;
                                        calculatedRadius = Math.max(maxY - stHeight, minRadius);
                                    }

                                }
                                else if (TMObj.isString && (usedY > maxY) || (stWidth > canvasW)) {
                                    smartText = smartLabel.getSmartText(labelStr, canvasW,
                                        Math.max(stHeight - usedY + maxY, labelHeight));
                                    TMObj.displayValue = smartText.text;
                                    stHeight = smartText.height;
                                    stHeightHalf = stHeight / 2;
                                }

                                //set the text Y
                                TMObj.y = baseLineDistance - (sinThita > 0 ? 0 : stHeight * 0.9);

                            }

                        }
                    }
                }
                if(!placeValuesInside) {
                    series.gaugeOuterRadius = calculatedRadius - tickValueDistance;
                }
                if (series.gaugeOuterRadius <= 0) {
                    series.gaugeOuterRadius = Math.abs(minRadius);
                }
            }

            //calculate the space for tick marks
            //TODO: calculate the space for tick mark when it gose outside
            /* if (series.showTickMarks) {
                    if (series.placeTicksInside) {
                        maxTickHeight = Math.max(series.majorTMHeight, series.minorTMHeight);
                        maxTickHeight = maxTickHeight > 0 ? maxTickHeight : 0;
                    }
                    else {
                        maxTickHeight = Math.min(series.majorTMHeight, series.minorTMHeight);
                        maxTickHeight = maxTickHeight < 0 ? Math.abs(maxTickHeight) : 0;
                    }
                    calculatedRadius = maxRadius - maxTickHeight;
                }*/

            
            


            //Asume gauge inner radius to be a default of 70% of gauge outer radius
            series.gaugeInnerRadius = pluckNumber(series.gaugeInnerRadius, series.gaugeOuterRadius * innerRadiusFactor);
        }
    }, chartAPI.gaugebase);



    /* Bulb Charts */
    chartAPI('bulb', {
        defaultSeriesType : 'bulb',
        defaultPlotShadow: 1,
        standaloneInit: true,
        drawAnnotations: true,
        defaultGaugePaletteOptions :defaultGaugePaletteOptions,
        charttopmargin : 10,
        chartrightmargin : 10,
        chartbottommargin : 10,
        chartleftmargin : 10,
        realtimeEnabled: true,
        isDataLabelBold : true,

        preSeriesAddition: function (HCObj, FCObj, width, height) {
            var HCChartObj = HCObj.chart,
            FCChartObj = FCObj.chart,
            colorM = this.colorM,
            scale = HCObj.scale,
            gaugeBorderAlpha;

            HCChartObj.colorRangeGetter = this.colorRangeGetter;
            HCChartObj.defaultColors = defaultGaugePaletteOptions.paletteColors[0];
            HCChartObj.defaultColLen = HCChartObj.defaultColors.length;

        },

        // Function that produce the point color
        getPointColor: function (color, alpha, is3d) {
            var colorObj, innerColor, outerColor,
            innerAlpha = pluck(alpha, '60'),
            outerAlpha = pluck(alpha, HUNDREDSTRING);
            if(is3d) {
                color = getFirstColor(color);
                innerColor = getLightColor(color, 65);
                outerColor = getDarkColor(color, 65);
                colorObj = {
                    FCcolor : {
                        gradientUnits : 'objectBoundingBox',
                        cx: 0.4,
                        cy: 0.4,
                        r: '80%',
                        color :  innerColor + COMMASTRING + outerColor,
                        //alpha : '60' + COMMASTRING + '100',
                        alpha : innerAlpha + COMMASTRING + outerAlpha,
                        ratio : BGRATIOSTRING,
                        radialGradient : true
                    }
                };
            }
            else {
                colorObj = convertColor(color, alpha);
            }
            return colorObj;
        },

        getPointStub: function (dataObj, i, HCObj, FCObj, label) {
            var HCChartObj = HCObj.chart,
            numberFormatter = this.numberFormatter,
            itemValue = numberFormatter.getCleanValue(dataObj.value),
            dataLink = getValidValue(dataObj.link),
            setToolText = dataObj.tooltext,
            setDisplayValue = getValidValue(parseUnsafeString(dataObj.displayvalue)),
            formatedVal = numberFormatter.dataLabels(itemValue),
            colorCodeObj = this.colorRangeGetter.getColorObj(itemValue),
            toolText, displayValue,
            FCChartObj = FCObj.chart,
            colorM = this.colorM,
            isLabelString,
            colorObj = colorCodeObj.colorObj || colorCodeObj.prevObj;

            if (colorCodeObj.isOnMeetPoint) {
                colorObj = colorCodeObj.nextObj;
            }

            var colorName = parseUnsafeString(pluck(colorObj.label, colorObj.name)),
            //-------------------------- Gauge specific properties --------------------------//
            //Gauge fill alpha
            gaugeFillAlpha = pluck(FCChartObj.gaugefillalpha, colorObj.alpha, HUNDREDSTRING),
            //Gauge Border properties
            gaugeBorderColor =  pluck(colorObj.bordercolor, FCChartObj.gaugebordercolor, getDarkColor(colorObj.code, 70)),
            gaugeBorderAlpha =  pluckNumber(colorObj.borderalpha, FCChartObj.gaugeborderalpha, '90') * gaugeFillAlpha / 100, // default dark- 30
            gaugeBorderThickness = pluckNumber(FCChartObj.showgaugeborder, 0) ? pluckNumber(FCChartObj.gaugeborderthickness, 1) : 0,
            is3D = HCChartObj.is3D = pluckNumber(FCChartObj.is3d, 1),
            fillColor = this.getPointColor(colorObj.code, gaugeFillAlpha, is3D);

            HCChartObj.gaugeFillAlpha = gaugeFillAlpha;

            gaugeBorderColor = convertColor(/\{/.test(gaugeBorderColor) ?
                colorM.parseColorMix(pluck(colorObj.bordercolor, colorObj.code), gaugeBorderColor)[0]
                : gaugeBorderColor, gaugeBorderAlpha);

            //create the tooltext
            if (!this.showTooltip) {
                toolText = false;
            }
            else if (setToolText !== undefined) {
                toolText = parseUnsafeString(setToolText);
                isLabelString = true;
            }
            else {//determine the dispalay value then
                toolText = formatedVal === null ? false :
                (label !== undefined) ? label + this.tooltipSepChar + formatedVal : formatedVal;
            }
            //create the displayvalue
            if (!pluckNumber(dataObj.showvalue, this.showValues)) {
                displayValue = BLANKSTRING;
            }
            else if (setDisplayValue !== undefined) {
                displayValue = setDisplayValue;
            }
            else {//determine the dispalay value then
                displayValue = getValidValue(formatedVal, ' ');
            }

            if (this.pointValueWatcher) {
                this.pointValueWatcher(itemValue);
            }


            return {
                y: itemValue,
                displayValue : displayValue,
                toolText : toolText,
                isLabelString : isLabelString,
                colorName: colorName,
                color: fillColor,
                borderWidth: gaugeBorderThickness,
                borderColor: gaugeBorderColor,
                colorRange: colorCodeObj,
                link: dataLink,
                doNotSlice: true
            };
        },

        spaceManager: function (hcJSON, fcJSON, width, height) {
            var conf = hcJSON[FC_CONFIG_STRING],
            smartLabel = conf.smartLabel,
            series = hcJSON.series[0],
            labelTextObj,
            point = series && series.data[0],
            labelStyle,
            chart = hcJSON.chart,
            //labelStyle = series.dataLabels.style,
            FCChartObj = fcJSON.chart, 
            scaleFactor = chart.scaleFactor = this.scaleFactor,
            canvasWidth = width - (chart.marginRight + chart.marginLeft),
            canvasHeight = height - (chart.marginTop + chart.marginBottom),
            chartRight = chart.marginRight,
            chartLeft = chart.marginLeft,
            chartTop = chart.marginTop,
            valuePadding = pluckNumber(FCChartObj.valuepadding, 4),
            titleSpace,
            maxLabelHeight,
            radiusGiven,
            valueHeight = 0,
            dataLabel = point.displayValue,
            useColorNameAsValue = (chart.useColorNameAsValue = pluckNumber(FCChartObj.usecolornameasvalue, 0)) == 1,
            gaugeRadius, gaugeOriginX, gaugeOriginY;


            //Gauge origin X, Y
            chart.gaugeOriginX = pluckNumber(FCChartObj.gaugeoriginx, FCChartObj.bulboriginx, -1);
            chart.gaugeOriginY = pluckNumber(FCChartObj.gaugeoriginy, FCChartObj.bulboriginy, -1);
            chart.gaugeRadius = pluckNumber(FCChartObj.gaugeradius, FCChartObj.bulbradius, -1);

            radiusGiven = chart.gaugeRadius !== -1;

            // Place the the Caption first
            canvasHeight -= titleSpace = titleSpaceManager(hcJSON, fcJSON, canvasWidth,
                canvasHeight * 0.3);
            chartTop += titleSpace;

            // Take the maximum height that label can use
            maxLabelHeight = (canvasHeight * 0.7) - valuePadding;


            // Setting the style for of the Label in series
            chart.dataLabels = {
                style: hcJSON.plotOptions.series.dataLabels.style
            };
            labelStyle = chart.dataLabels.style;

            // Set the smartLabel Style
            smartLabel.setStyle(labelStyle);

            if (useColorNameAsValue) {
                dataLabel = point.colorName;
            }
            if (chart.placeValuesInside == 1) {
                // Take the maximum available sapace for the Bulb
                gaugeRadius = radiusGiven ? chart.gaugeRadius * scaleFactor : Math.min(canvasWidth, canvasHeight) / 2;
                // Calculate largest available space for the Label text inside the Bulb
                maxLabelHeight = Math.sqrt(Math.pow(gaugeRadius * 2, 2) / 2);
                // Wrapping the first label to the whole drawing widht
                labelTextObj = smartLabel.getSmartText(dataLabel, maxLabelHeight, maxLabelHeight);
            //point.displayValue = labelTextObj.text;
            } else {
                maxLabelHeight = (radiusGiven ? canvasHeight - (chart.gaugeRadius * 2) * scaleFactor : (canvasHeight * 0.7)) - valuePadding;
                // Wrapping the first label to the whole drawing widht
                labelTextObj = smartLabel.getSmartText(dataLabel, canvasWidth, maxLabelHeight);
                valueHeight = labelTextObj.height;
                //Calculate radius based on margins and whether we've to show value outside
                gaugeRadius = (Math.min(canvasWidth, canvasHeight - valueHeight)) / 2;
            //point.displayValue = labelTextObj.text;
            }
            if (useColorNameAsValue) {
                point.displayValue = labelTextObj.text;
            }


            chart.valuePadding = valuePadding;
            chart.valueTextHeight = labelTextObj.height;
            chart.labelLineHeight = parseInt(labelStyle.lineHeight);

            //Calculate our default origin X & Y
            gaugeOriginX = chartLeft + (canvasWidth / 2);
            gaugeOriginY = chartTop + (canvasHeight - valueHeight) / 2;

            //Over-ride (if user has not specified)
            if (!radiusGiven) {
                gaugeRadius = gaugeRadius;
            } else {
                //Apply scaling factor
                gaugeRadius = chart.gaugeRadius * scaleFactor;
            }
            if (chart.gaugeOriginX == -1) {
                gaugeOriginX = gaugeOriginX;
            } else {
                //Apply scaling factor
                gaugeOriginX = chart.gaugeOriginX * scaleFactor;
            }
            if (chart.gaugeOriginY == -1) {
                gaugeOriginY = gaugeOriginY;
            } else {
                //Apply scaling factor
                gaugeOriginY = chart.gaugeOriginY * scaleFactor;
            }

            chart.gaugeRadius = gaugeRadius;
            chart.gaugeOriginX = gaugeOriginX;
            chart.gaugeOriginY = gaugeOriginY;

        }

    }, chartAPI.gaugebase);

    /* Drawingpad Charts */
    chartAPI('drawingpad', {
        standaloneInit: true,
        defaultSeriesType : 'drawingpad',
        defaultPlotShadow: 1,
        drawAnnotations: true,
        chartleftmargin: 0,
        charttopmargin: 0,
        chartrightmargin: 0,
        chartbottommargin: 0,
        defaultGaugePaletteOptions :defaultGaugePaletteOptions,
        series : function (FCObj, HCObj, chartName, width, height) {
            var series = {
                data : [],
                // for single series the color will be added point by point from palette
                colorByPoint: true
            }, seriesArr;
            // disable the legend (special case for pie)
            HCObj.legend.enabled = false;

            HCData = series.data;

            HCObj.chart.plotBackgroundColor = COLOR_TRANSPARENT;
            HCObj.chart.plotBorderColor = COLOR_TRANSPARENT;

            //add data using chart speciffic function
            seriesArr = series;

            //if the returned series is an array of series (case: pareto)
            if (seriesArr instanceof Array) {
                HCObj.series = HCObj.series.concat(seriesArr)
            }
            //all other case there will be only1 series
            else {
                HCObj.series.push(seriesArr);
            }

            ///configure the axis
            this.configureAxis(HCObj, FCObj);
            ///////////Trend-lines /////////////////
            if (FCObj.trendlines) {
                createTrendLine (FCObj.trendlines, HCObj.yAxis, HCObj[FC_CONFIG_STRING],
                    false, this.isBar);
            }

        },
        spaceManager: function () {

        },
        creditLabel: creditLabel
    }, chartAPI.bulb);


    /* Funnel Charts */
    chartAPI('funnel', {
        standaloneInit: true,
        defaultSeriesType : 'funnel',
        defaultPlotShadow: 1,
        subTitleFontSizeExtender: 0,
        tooltippadding: 4,
        drawAnnotations: true,
        defaultGaugePaletteOptions : defaultGaugePaletteOptions,
        isDataLabelBold : false,

        preSeriesAddition : function (HCObj, fcObj, width, height) {
            var FCChartObj = fcObj.chart,
            colorM = this.colorM,
            dataLebelsOptions = HCObj.plotOptions.series.dataLabels;

            dataLebelsOptions.connectorWidth = pluckNumber(FCChartObj.smartlinethickness, 1);
            dataLebelsOptions.connectorColor = convertColor(pluck(FCChartObj.smartlinecolor, colorM.get2DBaseFontColor()),
                pluckNumber(FCChartObj.smartlinealpha, 100));

            //enable the legend for the pie
            if (pluckNumber(FCChartObj.showlegend, 0)) {
                HCObj.legend.enabled = true;
                HCObj.legend.reversed =
                !Boolean(pluckNumber(FCChartObj.reverselegend , 0));
            }
            else {
                HCObj.legend.enabled = false;
            }
            HCObj.plotOptions.series.point.events.legendItemClick = FCChartObj.interactivelegend ===
            ZEROSTRING ? falseFN : function () {
                this.slice();
                return false;
            }
        },

        series : function (FCObj, HCObj, chartName, width, height) {
            if (FCObj.data && FCObj.data.length > 0) {
                var series = {
                    data : [],
                    // for single series the color will be added point by point from palette
                    colorByPoint: true,
                    showInLegend: true
                }, seriesArr;




                //add data using chart speciffic function
                seriesArr = this.point(chartName, series, FCObj.data, FCObj.chart, HCObj);

                HCObj.series.push(seriesArr);


            }
        },

        point : function (chartName, series, data, FCChartObj, HCObj) {
            var name, index, dataValue, dataObj,
            conf = HCObj[FC_CONFIG_STRING],
            setColor, setAlpha, setRatio, setPlotBorderColor, setPlotBorderAlpha,
            sumValue = 0, displayValueText, labelText, toolText, pValue, value,
            TTValue, dataIndex = 0, filteredData = [], displayValue,
            // thickness of pie slice border
            setBorderWidth = pluck(FCChartObj.plotborderthickness , ONESTRING),
            // whether to use 3d lighing effect on pie
            use3DLighting = pluckNumber(FCChartObj.use3dlighting, 1),
            // whether to show the zero values on pie
            showZeroPies = pluckNumber(FCChartObj.showzeropies, 1),
            // Flag to decide, whether we show pie label, tolltext and values
            labelsEnabled = true,
            colorIndex,
            yScale,
            HCChartObj = HCObj.chart,
            isPyramid = this.isPyramid,
            showPercentInToolTip = pluckNumber(FCChartObj.showpercentintooltip, 1),
            showLabels = pluckNumber(FCChartObj.showlabels, 1),
            showValues = pluckNumber(FCChartObj.showvalues, 1),
            showPercentValues = pluckNumber(FCChartObj.showpercentvalues, FCChartObj.showpercentagevalues, 0),
            toolTipSepChar = pluck(FCChartObj.tooltipsepchar, FCChartObj.hovercapsepchar, COMMASPACE),
            labelSepChar = pluck(FCChartObj.labelsepchar, toolTipSepChar),
            piebordercolor = pluck(FCChartObj.plotbordercolor, FCChartObj.piebordercolor),
            smartLabel = this.smartLabel,
            NumberFormatter = this.numberFormatter,
            length = data.length,
            smartTextObj, labelMaxWidth = 0,
            dataLebelsOptions = HCObj.plotOptions.series.dataLabels,
            colorM = this.colorM,
            hcDataObj,
            isSliced = pluckNumber(FCChartObj.issliced, 0),
            noOFSlicedElement = 0,
            pointSliced,
            percentOfPrevious, prevValue, streamlinedData,
            pointShadow = {
                apply: FCChartObj.showshadow == ONESTRING,
                opacity: 1
            };

            series.isPyramid = isPyramid;
            streamlinedData = series.streamlinedData = pluckNumber(FCChartObj.streamlineddata, 1);
            series.is2d = pluckNumber(FCChartObj.is2d, 0);
            series.isHollow = pluckNumber(FCChartObj.ishollow, streamlinedData ? 1 : 0);
            percentOfPrevious = pluckNumber(FCChartObj.percentofprevious, 0);
            yScale = pluckNumber(this.isPyramid ? FCChartObj.pyramidyscale : FCChartObj.funnelyscale);

            series.labelDistance = Math.abs(pluckNumber(FCChartObj.labeldistance, FCChartObj.nametbdistance, 50));
            series.showLabelsAtCenter = pluckNumber(FCChartObj.showlabelsatcenter, 0);
            if (yScale >= 0 && yScale <= 40) {
                series.yScale = yScale / 200;
            }
            else {
                series.yScale = 0.2;
            }

            // If both the labels and the values are disable then disable the datalabels
            if (!showLabels && !showValues) {
                HCObj.plotOptions.series.dataLabels.enabled = false;

                // If labels, values and tooltex are disabled then don't need to calculate
                // labels and tooltext
                if (HCObj.tooltip.enabled === false) {
                    labelsEnabled = false;
                }
            }

            series.useSameSlantAngle = pluckNumber(FCChartObj.usesameslantangle, streamlinedData ? 0 : 1);

            var countPoint, itemValue, highestValue;

            for (index = 0, countPoint = 0; index < length; index += 1) {
                dataObj = data[index];
                // vLine
                if (data[index].vline) {
                    continue;
                }
                dataObj.value = itemValue = NumberFormatter.getCleanValue(dataObj.value, true);
                //if valid data then only add the point
                if (itemValue !== null) {
                    highestValue = highestValue || itemValue;
                    //save the malid value so that no further parsePointValue needed
                    dataObj.value = itemValue;
                    filteredData.push(dataObj)
                    sumValue += itemValue;
                    countPoint += 1;
                    highestValue = Math.max(highestValue, itemValue);
                }
            }

            series.valueSum = sumValue;

            length = filteredData.length;

            if (!isPyramid && streamlinedData) {
                // sort the data
                filteredData.sort(function (a, b) {
                    return b.value - a.value ;
                });
            }

            //add the sum data for funnel streamlinedData ='0'
            if (!isPyramid && !streamlinedData) {
                dataIndex += 1;
                // Finally insert the value and other point cosmetics in HighChart's series.data array
                series.data.push({
                    showInLegend: false, // prevent legend item when no label
                    y: sumValue,
                    name: '',
                    shadow: pointShadow,
                    smartTextObj: smartTextObj,
                    color: setColor,
                    alpha: setAlpha,
                    borderColor: convertColor(setPlotBorderColor,
                        setPlotBorderAlpha),
                    borderWidth: setBorderWidth,
                    link : getValidValue(dataObj.link),
                    // Fix for the issue IE showing undefined label when streamlinedData='0'
                    displayValue: BLANKSTRING,
                    doNotSlice: pluck(FCChartObj.enableslicing, ONESTRING) != ONESTRING
                });
            }

            for (index = 0; index < filteredData.length; index += 1) {
                // numberFormatter.getCleanValue(dataObj.value, true);
                // individual data obj
                // for further manipulation
                dataObj = filteredData[index];

                // Taking the value
                // we multiply the value with 1 to convert it to integer
                dataValue = dataObj.value;
                prevValue = index ? filteredData[index - 1].value : dataValue;


                // Label provided with data point
                name = parseUnsafeString(pluck(dataObj.label, dataObj.name, BLANKSTRING));

                smartTextObj = smartLabel.getOriSize(name);

                // parsing slice cosmetics attribute supplied in data points
                // Color for each slice
                colorIndex = index && !isPyramid && streamlinedData ? index - 1 : index;
                setColor = pluck(dataObj.color,
                    HCObj.colors[colorIndex % HCObj.colors.length]);
                // Alpha for each slice
                setAlpha = pluck(dataObj.alpha, FCChartObj.plotfillalpha, HUNDREDSTRING);
                // each slice border color
                setPlotBorderColor = pluck(dataObj.bordercolor, piebordercolor, getLightColor(setColor, 25)).
                split(COMMASTRING)[0];
                // each slice border alpha
                setPlotBorderAlpha = FCChartObj.showplotborder != 1 ?
                ZEROSTRING : pluck(dataObj.borderalpha, FCChartObj.plotborderalpha,
                    FCChartObj.pieborderalpha, '80');


                // Used to set alpha of the shadow
                pointShadow.opacity = Math.max(setAlpha, setPlotBorderAlpha) / 100;

                pointSliced = pluckNumber(dataObj.issliced, isSliced);
                if (pointSliced) {
                    noOFSlicedElement += 1;
                    conf.preSliced = pointSliced;
                }

                hcDataObj = {
                    showInLegend: !(name === BLANKSTRING), // prevent legend item when no label
                    y: dataValue,
                    name: name,
                    shadow: pointShadow,
                    smartTextObj: smartTextObj,
                    color: setColor,
                    alpha: setAlpha,
                    borderColor: convertColor(setPlotBorderColor,
                        setPlotBorderAlpha),
                    borderWidth: setBorderWidth,
                    link : getValidValue(dataObj.link),
                    isSliced : pointSliced,
                    displayValue: BLANKSTRING,
                    doNotSlice: pluck(FCChartObj.enableslicing, ONESTRING) != ONESTRING
                };

                if (!index && !isPyramid && streamlinedData) {
                    hcDataObj.showInLegend = false;
                }

                // Finally insert the value and other point cosmetics in HighChart's series.data array
                series.data.push(hcDataObj);




                // Adding label, tooltext, and display value
                if(labelsEnabled) {
                    toolText = name;
                    pValue = NumberFormatter.percentValue(dataValue / (isPyramid || !streamlinedData ? sumValue : (percentOfPrevious ? prevValue : highestValue)) * 100);
                    value = NumberFormatter.dataLabels(dataValue) || BLANKSTRING;
                    TTValue = showPercentInToolTip === 1 ? pValue : value;
                    labelText = showLabels === 1 ? toolText : BLANKSTRING;
                    displayValueText = pluckNumber(dataObj.showvalue, showValues) === 1 ?
                    (showPercentValues === 1 ? pValue : value ) : BLANKSTRING;

                    displayValue = getValidValue(parseUnsafeString(dataObj.displayvalue));

                    if (displayValue) {
                        displayValueText = displayValue;
                    } else {
                        //create the datalabel str
                        if (displayValueText !== BLANKSTRING && labelText !== BLANKSTRING) {
                            displayValueText = labelText + labelSepChar + displayValueText;
                        }
                        else {
                            displayValueText = pluck(labelText, displayValueText) || BLANKSTRING;
                        }
                    }

                    //create the Tooltext
                    if (toolText != BLANKSTRING) {
                        toolText = toolText + toolTipSepChar + TTValue;
                    }
                    else {
                        toolText = TTValue;
                    }

                    series.data[dataIndex].displayValue = displayValueText;
                    series.data[dataIndex].toolText = pluck(parseUnsafeString(dataObj.tooltext), toolText);
                    dataIndex += 1;
                }
            }

            series.labelMaxWidth = labelMaxWidth;
            series.noOFSlicedElement = noOFSlicedElement;
            return series;
        },

        spaceManager: function (hcJSON, fcJSON, width, height) {
            var smartLabel = this.smartLabel,
            fcJSONChart = fcJSON.chart,
            hcJSONChart = hcJSON.chart,
            legendPos = pluck(fcJSONChart.legendposition, POSITION_BOTTOM).toLowerCase(),
            chartWorkingWidth = width - (hcJSONChart.marginRight + hcJSONChart.marginLeft),
            chartWorkingHeight = height - (hcJSONChart.marginTop + hcJSONChart.marginBottom),
            isPyramid = this.isPyramid,
            slicingHeight,
            canvasHeight,
            canvasMaxWidth,
            canvasWidth,
            SlicingDistance,
            series = hcJSON.series[0];

            if (series) {
                
                //for anotation macrows store temp conf
                var tempSnap = this._tempSnap = {
                    top3DSpace : 0,
                    bottom3DSpace : 0,
                    topLabelSpace : 0,
                    rightLabelSpace : 0
                };


                chartWorkingHeight -= titleSpaceManager(hcJSON, fcJSON, chartWorkingWidth,
                    chartWorkingHeight / 2);

                //if the legend is at the right then place it and deduct the width
                //if at bottom calculate the space for legend after the vertical axis placed
                if (hcJSON.legend.enabled){
                    if(legendPos === POSITION_RIGHT) {
                        chartWorkingWidth -= placeLegendBlockRight(hcJSON, fcJSON,
                            chartWorkingWidth / 2, chartWorkingHeight, true);
                    }
                    else {
                        chartWorkingHeight -= placeLegendBlockBottom(hcJSON, fcJSON,
                            chartWorkingWidth, chartWorkingHeight / 2, true);
                    }
                }
                SlicingDistance = chartWorkingHeight * 0.1
                slicingHeight = pluckNumber(fcJSONChart.slicingdistance, SlicingDistance);
                if (slicingHeight > 2 * SlicingDistance) {//space beyond management
                    SlicingDistance = 0;
                }
                else {
                    SlicingDistance = slicingHeight;
                }

                canvasHeight = chartWorkingHeight - SlicingDistance;
                //Note: actualu much less then original canWidth
                canvasMaxWidth = Math.min(2 * canvasHeight, chartWorkingWidth);

                hcJSONChart.marginTop += SlicingDistance / 2;
                hcJSONChart.marginBottom += SlicingDistance / 2;
                series.SlicingDistance = slicingHeight;



                // Find the label maximun width
                var dataArr = series.data,
                length = dataArr.length,
                i = isPyramid? 0 : 1,
                point,
                smartTextObj, labelMaxWidth,
                totalValue = 0,
                blankSpace = 3,
                labelDistance = series.labelDistance + blankSpace,
                showLabelsAtCenter = series.showLabelsAtCenter,
                currentValue,
                extraSpace,
                chartDrawingWidth,
                currentDiameter,
                newDaimeter,
                minWidthForChart = Math.min(canvasMaxWidth, chartWorkingWidth * 0.3),
                drawingWillExtend = canvasMaxWidth - minWidthForChart,
                maxWidthForLabel = chartWorkingWidth - minWidthForChart - labelDistance,
                labelStyle = hcJSON.plotOptions.series.dataLabels.style,
                lineHeight = pluckNumber(parseInt(labelStyle.lineHeight, 10), 10),
                labelMaxUsedWidth = 0,
                maxValue = dataArr[0].y,
                maxNoLabelCanDraw,
                sumValues = series.valueSum,
                ratioK,
                upperRadiusFactor = isPyramid ? 0 : 1,
                lowestRadiusFactor,
                valueRadiusIncrementRatio = 0.8 / maxValue,
                useSameSlantAngle = series.useSameSlantAngle == 1,
                nonStreamlinedData = !series.streamlinedData;
                smartLabel.setStyle(labelStyle);

                maxNoLabelCanDraw = chartWorkingHeight / (lineHeight * 1 + 4);



                // Wrapping the first label to the whole drawing widht
                if (!isPyramid && dataArr[0].displayValue) {
                    smartTextObj = smartLabel.getSmartText(dataArr[0].displayValue, chartWorkingWidth, lineHeight);
                    dataArr[0].displayValue = smartTextObj.text;
                    dataArr[0].labelWidht = smartLabel.getOriSize(smartTextObj.text).width;
                    // Reducing the chart height to place the top most label
                    hcJSONChart.marginTop += tempSnap.topLabelSpace = lineHeight + 4;
                }


                for(;i < length; i += 1) {
                    point = dataArr[i];
                    currentValue = point.y;
                    if (showLabelsAtCenter) {
                        smartTextObj = smartLabel.getSmartText(point.displayValue, chartWorkingWidth, lineHeight);

                    } else {
                        if (isPyramid) {
                            currentValue = totalValue + (point.y / 2);
                            ratioK = currentValue / sumValues;
                        }
                        else {
                            ratioK = nonStreamlinedData ? 0.2 + (valueRadiusIncrementRatio * totalValue) :
                            (useSameSlantAngle ? point.y / maxValue : Math.sqrt(point.y / maxValue));
                        }

                        currentDiameter = minWidthForChart * ratioK;
                        labelMaxWidth = maxWidthForLabel + ((minWidthForChart - currentDiameter) / 2);
                        smartTextObj = smartLabel.getSmartText(point.displayValue, labelMaxWidth, lineHeight);
                        point.displayValue = smartTextObj.text;
                        labelMaxUsedWidth = Math.max(labelMaxUsedWidth, smartTextObj.width);
                        if (drawingWillExtend > 0) {
                            if (smartTextObj.width > 0) {
                                extraSpace = labelMaxWidth - smartTextObj.width;
                            }
                            else {
                                extraSpace = labelMaxWidth +  labelDistance
                            }
                            newDaimeter =  (1 / (ratioK + 1)) * (currentDiameter + 2 * extraSpace + minWidthForChart);

                            drawingWillExtend = Math.min(drawingWillExtend, newDaimeter - minWidthForChart);
                        }
                        totalValue += point.y;
                    }
                }
                if (point) {
                    lowestRadiusFactor = isPyramid ? 1 : (nonStreamlinedData ? 0.2 :
                        (useSameSlantAngle ? point.y / maxValue : Math.sqrt(point.y / maxValue)));
                }
                chartDrawingWidth = minWidthForChart + drawingWillExtend;
                if (labelMaxUsedWidth > 0) {
                    //labelMaxUsedWidth += labelDistance;
                    hcJSONChart.marginRight += tempSnap.rightLabelSpace = (chartWorkingWidth - chartDrawingWidth);
                }
                else {
                    labelDistance = 0;
                }

                series.labelDistance = series.connectorWidth = labelDistance;
                //now the place the chart at the center
                /*  extraSpace = chartWorkingWidth - labelMaxUsedWidth - chartDrawingWidth;
                if (extraSpace > 0) {
                    //devide the extra space on booth the side
                    hcJSON.chart.marginRight += extraSpace / 2;
                    hcJSON.chart.marginLeft += extraSpace / 2;
                }*/
                if (!series.is2d) {
                    hcJSONChart.marginTop += tempSnap.top3DSpace = (chartDrawingWidth * series.yScale * upperRadiusFactor) / 2;
                    hcJSONChart.marginBottom += tempSnap.bottom3DSpace = (chartDrawingWidth * series.yScale * lowestRadiusFactor) / 2;
                }
            }
        },

        updateSnapPoints: function(hc) {
            chartAPI.gaugebase.updateSnapPoints.apply(this, arguments);

            var snaps = this.snapLiterals,
            adjSnaps = this._tempSnap;
             

            // Fix plotHeight to include all parts of drawing
            snaps.plotwidth = snaps.canvaswidth;
            snaps.plotsemiwidth = snaps.canvaswidth / 2;
            snaps.plotheight = snaps.canvasheight + adjSnaps.top3DSpace + 
            adjSnaps.bottom3DSpace;
            
            // Add plot positions.
            snaps.plotstartx = snaps.canvasstartx; 
            snaps.plotstarty = snaps.canvasstarty - adjSnaps.top3DSpace;
            snaps.plotendx = snaps.canvasendx;
            snaps.plotendy = snaps.canvasendy + adjSnaps.bottom3DSpace;
            
            // Make canvas-width include data-label space
            snaps.canvaswidth = snaps.canvaswidth + adjSnaps.rightLabelSpace;
            
            // Adjust canvas height to include extra labels on y-axis
            snaps.canvasheight = snaps.plotheight + adjSnaps.topLabelSpace;

            // Reposition canvas on axis.
            snaps.canvasstarty = snaps.plotstarty - adjSnaps.topLabelSpace;
            snaps.canvasendy = snaps.plotendy;
            snaps.canvasendx = snaps.canvasendx + adjSnaps.rightLabelSpace;

        },

        useSortedData: true,
        creditLabel : creditLabel
    }, chartAPI.gaugebase);


    /* Pyramid Charts */
    chartAPI('pyramid', {
        defaultGaugePaletteOptions : defaultGaugePaletteOptions,
        subTitleFontSizeExtender: 0,
        drawAnnotations: true,

        standaloneInit: true,
        defaultSeriesType : 'pyramid',
        defaultPlotShadow: 1,
        useSortedData: false,
        isPyramid : 1,
        creditLabel: creditLabel
    }, chartAPI.funnel);



    /* SparkBase Charts */
    chartAPI('sparkbase', {
        defaultPlotShadow: 0,
        useSortedData: false,
        subTitleFontSizeExtender: 0,
        subTitleFontWeight: 'normal',
        drawAnnotations: true,
        showYAxisValues: 0,
        numdivlines: 0,
        chartrightmargin: 3,
        chartleftmargin: 3,
        charttopmargin: 3,
        chartbottommargin: 3,
        decimals: 2,
        showTrendlineLabel: 0,
        zeroplanethickness: 0,
        tooltippadding: 1,
        useScaleRecursively: true,

        // Borrow style definition from gauge base
        styleApplicationDefinition_font: chartAPI.gaugebase.styleApplicationDefinition_font,

        defaultGaugePaletteOptions : merge(defaultGaugePaletteOptions, {
            //Store colors now
            paletteColors: [["555555", "A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"],
            ["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"],
            ["04C2E3", "66E7FD", "9CEFFE", "CEF8FF"],
            ["FA9101", "FEB654", "FED7A0", "FFEDD5"],
            ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]],
            //Store other colors
            // ------------- For 2D Chart ---------------//
            //We're storing 5 combinations, as we've 5 defined palettes.
            bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
            bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],

            canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            canvasBgAngle: [0, 0, 0, 0, 0],
            canvasBgAlpha: ["100", "100", "100", "100", "100"],
            canvasBgRatio: ["", "", "", "", ""],
            canvasBorderColor: ["BCBCBC", "BEC5A7", "93ADBF", "C97901", "FF97B1"],

            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            baseFontColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
            trendColor: ["666666", "60634E", "415D6F", "845001", "68001B"],
            plotFillColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
            borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50],
            periodColor: ["EEEEEE", "ECEEE6", "E6ECF0", "FFF4E6", "FFF2F5"],

            //Colors for win loss chart
            winColor: ["666666", "60634E", "025B6A", "A15E01", "FF97B1"],
            lossColor: ["CC0000", "CC0000", "CC0000", "CC0000", "CC0000"],
            drawColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
            scorelessColor: ["FF0000", "FF0000", "FF0000", "FF0000", "FF0000"]
        }),

        preSeriesAddition: function(hc, obj, width, height) {
            if (this.name == 'sparkwinloss') {
                var data = obj.data || (obj.dataset && obj.dataset[0] && obj.dataset[0].data),
                length,
                dataObj,
                winLossValueMap = {
                    w: 1,
                    l: -1,
                    d: 0.1
                };
                if ((length = data && data.length) > 0) {
                    while (length) {
                        length -= 1;
                        dataObj = data[length];
                        dataObj.value = winLossValueMap[dataObj.value.toLowerCase()];
                    }
                }
            }
            var HCChartObj = hc.chart,
            FCChartObj = obj.chart,

            // Initialize Color Manager for Widgets
            colorM = this.colorM = new GaugeColorManager(HCChartObj.paletteIndex, FCChartObj.palettethemecolor, this);


            // ------------------------- COSMETICS -----------------------------//
            //Background properties - Gradient
            // create the back-ground color
            ////Finaly Set the Plot and Background color[must be modifyed al last as margins may be changed any where]
            HCChartObj.backgroundColor = {
                FCcolor : {
                    color : pluck(FCChartObj.bgcolor, colorM.get2DBgColor()),
                    alpha : pluck(FCChartObj.bgalpha, colorM.get2DBgAlpha()),
                    angle : pluck(FCChartObj.bgangle, colorM.get2DBgAngle()),
                    ratio : pluck(FCChartObj.bgratio, colorM.get2DBgRatio())
                }
            };

            //Border Properties of chart
            HCChartObj.borderColor = convertColor(pluck(FCChartObj.bordercolor, colorM.get2DBorderColor()),
                pluck(FCChartObj.borderalpha, colorM.get2DBorderAlpha()));

            HCChartObj.borderWidth = pluckNumber(FCChartObj.showborder, this.showBorder, 0) ?
            pluckNumber(FCChartObj.borderthickness, 1) : 0;

            //Canvas Border properties
            HCChartObj.plotBorderColor = convertColor(pluck(FCChartObj.canvasbordercolor, colorM.get2DCanvasBorderColor()),
                pluckNumber(FCChartObj.showcanvasborder, 1) == 0 ? ZEROSTRING : pluck(FCChartObj.canvasborderalpha, HUNDREDSTRING));

            HCChartObj.plotBorderWidth = pluckNumber(FCChartObj.canvasborderthickness, 1);

            // Apply paletteThemeColor in all text color
            var fontColor = parseColor(pluck(FCChartObj.basefontcolor, colorM.get2DBaseFontColor()));
            hc.tooltip.style.color =
            hc.plotOptions.series.dataLabels.style.color =
            hc.title.style.color =
            hc.subtitle.style.color = fontColor;

            //Fill Color for high, low, open and close (SparkLine Charts)
            var openColor = HCChartObj.openColor = parseColor(pluck(FCChartObj.opencolor, '0099FF')),
            closeColor = HCChartObj.closeColor = parseColor(pluck(FCChartObj.closecolor, '0099FF'));
            HCChartObj.highColor = parseColor(pluck(FCChartObj.highcolor, '00CC00')),
            HCChartObj.lowColor = parseColor(pluck(FCChartObj.lowcolor, 'CC0000'));

            hc.chart.openValue = {
                style: extend2({}, hc.plotOptions.series.dataLabels.style)
            }
            setLineHeight(hc.chart.openValue.style);
            hc.chart.openValue.style.color = openColor;
            hc.chart.closeValue = {
                style: extend2({}, hc.plotOptions.series.dataLabels.style)
            }
            setLineHeight(hc.chart.openValue.style);
            hc.chart.closeValue.style.color = closeColor;
            hc.chart.highLowValue = {
                style: extend2({}, hc.plotOptions.series.dataLabels.style)
            }

            //////set styles//////////
            this.parseStyles(hc);

            if (this.showCanvas == 0) {
                HCChartObj.plotBackgroundColor = COLOR_TRANSPARENT;
            }
            if (!this.showCanvasBorder) {
                // Manage canvas cosmetics
                HCChartObj.plotBorderWidth = 0;
            }
            if (!HCChartObj.useRoundEdges) {
                HCChartObj.plotShadow = 0;
            }

            FCChartObj.zeroplanethickness = pluck(FCChartObj.zeroplanethickness, this.zeroplanethickness);
        },

        spaceManager: function (hcJSON, fcJSON, width, height) {
            var conf = hcJSON[FC_CONFIG_STRING],
            smartLabel = conf.smartLabel,
            FCChartObj = fcJSON.chart,
            series = hcJSON.series[0],
            chart = hcJSON.chart,
            canvasWidth = width - (chart.marginRight + chart.marginLeft),
            captionWidth,
            canvasLeftMargin = pluckNumber(FCChartObj.canvasleftmargin),
            canvasRightMargin = pluckNumber(FCChartObj.canvasrightmargin),
            valuePadding = hcJSON.valuePadding = pluckNumber(FCChartObj.valuepadding, 2),
            dataLabels = hcJSON.plotOptions.series.dataLabels,
            style = dataLabels.style,
            labelLineHeight = parseInt(style.lineHeight),
            maxCaptionWidth = canvasWidth * 0.40,
            sparkLineLabelsMaxWidth = canvasWidth,
            labelsMaxWidth = 0,
            leftLabel = 0, rightLabel = 0;


            if (series) {
                // Caption Space Management
                // Palce the Caption and subCaption on left or right hand side of the Gauge.
                captionWidth = placeTitleOnSide(hcJSON, fcJSON, maxCaptionWidth, height, undefined, width, height);
                sparkLineLabelsMaxWidth -= (captionWidth.left + captionWidth.right);
                canvasWidth = width - (chart.marginRight + chart.marginLeft);

                var openValueWidth = 0,
                closeValueWidth = 0,
                highLowValueWidth = 0,
                openValueObj,
                closeValueObj,
                highLowValueObj;
                // openValue
                smartLabel.setStyle(style);
                if (defined(chart.openValue.label)) {
                    smartLabel.setStyle(chart.openValue.style);
                    labelLineHeight = pluckNumber(parseInt(chart.openValue.style.lineHeight, 10), 10);
                    openValueObj = smartLabel.getSmartText(chart.openValue.label, sparkLineLabelsMaxWidth, labelLineHeight * 1.5);
                    if (openValueObj.width > 0) {
                        leftLabel = openValueWidth = openValueObj.width + valuePadding;
                        labelsMaxWidth += openValueWidth;
                        sparkLineLabelsMaxWidth -= openValueWidth;
                    }
                }
                // closeValue
                if (defined(chart.closeValue.label)) {
                    smartLabel.setStyle(chart.closeValue.style);
                    labelLineHeight = pluckNumber(parseInt(chart.closeValue.style.lineHeight, 10), 10)
                    closeValueObj = smartLabel.getSmartText(chart.closeValue.label, sparkLineLabelsMaxWidth, labelLineHeight * 1.5);
                    if (closeValueObj.width > 0) {
                        rightLabel = closeValueWidth = closeValueObj.width + valuePadding;
                        labelsMaxWidth += closeValueWidth;
                        sparkLineLabelsMaxWidth -= closeValueWidth;
                    }
                }
                // highLowValue
                if (defined(chart.highLowValue.label)) {
                    smartLabel.setStyle(chart.highLowValue.style);
                    labelLineHeight = pluckNumber(parseInt(chart.highLowValue.style.lineHeight, 10), 10)
                    highLowValueObj = smartLabel.getSmartText(chart.highLowValue.label, sparkLineLabelsMaxWidth, labelLineHeight * 1.5);
                    if (highLowValueObj.width > 0) {
                        rightLabel += highLowValueWidth = highLowValueObj.width + valuePadding;
                        labelsMaxWidth += highLowValueWidth;
                        sparkLineLabelsMaxWidth -= highLowValueWidth;
                    }
                }

                chart.marginRight += highLowValueWidth + closeValueWidth;
                chart.marginLeft += openValueWidth;

                //Before doing so, we take into consideration, user's forced canvas margins (if any defined)
                if (defined(canvasLeftMargin)) {
                    chart.spacingLeft = chart.marginLeft = canvasLeftMargin;
                    chart.spacingLeft -= captionWidth.left + openValueWidth;
                } else {
                    chart.marginLeft += captionWidth.left;
                }
                if (defined(canvasRightMargin)) {
                    chart.spacingRight = chart.marginRight = canvasRightMargin;
                    chart.spacingRight -= captionWidth.right + highLowValueWidth + closeValueWidth;
                } else {
                    chart.marginRight += captionWidth.right;
                }
                this.xAxisMinMaxSetter(hcJSON, fcJSON, canvasWidth);

                var xAxis = hcJSON.xAxis,
                xMin = xAxis.min,
                xMax = xAxis.max,
                periodLength = pluckNumber(FCChartObj.periodlength, 0),
                periodColor = convertColor(pluck(FCChartObj.periodcolor, this.colorM.getPeriodColor()),
                    pluckNumber(FCChartObj.periodalpha, 100)),
                i, flag = 1;

                if (periodLength > 0) {
                    for (i = xMin; i <= xMax; i += periodLength) {
                        if (flag) {
                            xAxis.plotBands.push({
                                color: periodColor,
                                from:  i,
                                to:	Math.min(xMax, i + periodLength),
                                zIndex: 1
                            });
                            flag = 0;
                        } else {
                            flag = 1;
                        }
                    }
                }

                fixCaptionAlignment(hcJSON, fcJSON, width, leftLabel, rightLabel);

            }
        }
    }, singleSeriesAPI);


    chartAPI('sparkline', {
        standaloneInit: true,
        defaultSeriesType : 'sparkline',
        creditLabel: creditLabel,
        showtooltip: 0,
        showCanvas: 0,
        point: chartAPI.linebase.point,
        lineThickness: 1,
        anchorRadius: 2,
        anchorBorderThickness: 0,

        postSeriesAddition: function(hc, obj, width, height) {
            var HCChartObj = hc.chart,
            FCChartObj = obj.chart,
            // Initialize Color Manager for Widgets
            colorM = this.colorM,
            series = hc.series && hc.series[0],
            hcDataArr = series && hc.series[0].data,
            index, length, fcDataArr, dataObj, fcDataObj,
            highValue = chartAPI.highValue,
            lowValue = chartAPI.lowValue,
            NumberFormatter = hc[FC_CONFIG_STRING].numberFormatter,
            //Fill Color for high, low, open and close
            openColor = HCChartObj.openColor,//parseColor(pluck(FCChartObj.opencolor, '0099FF')),
            closeColor = HCChartObj.closeColor,//parseColor(pluck(FCChartObj.closecolor, '0099FF')),
            highColor = HCChartObj.highColor,//parseColor(pluck(FCChartObj.highcolor, '00CC00')),
            lowColor = HCChartObj.lowColor,//parseColor(pluck(FCChartObj.lowcolor, 'CC0000')),
            //Period length and color
            periodLength = pluckNumber(FCChartObj.periodlength, -1),
            periodColor = pluck(FCChartObj.periodcolor, colorM.getPeriodColor()),
            periodAlpha = pluck(FCChartObj.periodalpha, HUNDREDSTRING),
            anchorColor = parseColor(pluck(FCChartObj.anchorcolor, colorM.get2DPlotFillColor())),
            //Whether to show anchors for open, close, high & low
            showOpenAnchor = pluckNumber(FCChartObj.showopenanchor, FCChartObj.drawanchors, FCChartObj.showanchors, 1),
            showCloseAnchor = pluckNumber(FCChartObj.showcloseanchor, FCChartObj.drawanchors, FCChartObj.showanchors, 1),
            showHighAnchor = pluckNumber(FCChartObj.showhighanchor, FCChartObj.drawanchors, FCChartObj.showanchors, 1),
            showLowAnchor = pluckNumber(FCChartObj.showlowanchor, FCChartObj.drawanchors, FCChartObj.showanchors, 1),
            //Whether to show values
            showOpenValue = pluckNumber(FCChartObj.showopenvalue, 1),
            showCloseValue = pluckNumber(FCChartObj.showclosevalue, 1),
            showHighLowValue = pluckNumber(FCChartObj.showhighlowvalue, 1),
            anchorAlpha = pluckNumber(FCChartObj.anchoralpha, 100),
            defAnchorAlpha = pluckNumber(FCChartObj.drawanchors, FCChartObj.showanchors, 0) == 1 ? pluckNumber(FCChartObj.anchoralpha, 100) : 0,
            highDisplayValue, lowDisplayValue, openDisplayValue, closeDisplayValue,
            hasValidValue = 0,
            lineColor = pluck(FCChartObj.linecolor, colorM.get2DPlotFillColor()),
            lineAlpha = pluckNumber(FCChartObj.linealpha, 100);


            if ((length = index = hcDataArr && hcDataArr.length) > 0) {
                fcDataArr = obj.data || (obj.dataset && obj.dataset[0] && obj.dataset[0].data);
                // set the line color and alpha to
                // HC seris obj with FusionCharts color format using FCcolor obj
                series.color = convertColor(lineColor, lineAlpha);

                while (index) {
                    index -= 1;
                    dataObj = hcDataArr[index];
                    fcDataObj = fcDataArr[index];

                    dataObj.color = convertColor(pluck(fcDataObj.color, lineColor),
                        pluckNumber(fcDataObj.alpha, lineAlpha));
                    dataObj.marker.fillColor = convertColor(pluck(dataObj.anchorbgcolor, anchorColor), pluckNumber(dataObj.anchorbgalpha, defAnchorAlpha));

                    if (dataObj.y == highValue) {
                        dataObj.marker.fillColor = convertColor(pluck(dataObj.anchorbgcolor, highColor), pluckNumber(dataObj.anchorbgalpha, anchorAlpha));
                        dataObj.marker.enabled = !!showHighAnchor;
                        highDisplayValue = NumberFormatter.dataLabels(dataObj.y);
                    }
                    if (dataObj.y == lowValue) {
                        dataObj.marker.fillColor = convertColor(pluck(dataObj.anchorbgcolor, lowColor), pluckNumber(dataObj.anchorbgalpha, anchorAlpha));
                        dataObj.marker.enabled = !!showLowAnchor;
                        lowDisplayValue = NumberFormatter.dataLabels(dataObj.y);
                    }

                    if (!pluckNumber(fcDataObj.showvalue, FCChartObj.showvalue, FCChartObj.showvalues, 0)) {
                        dataObj.displayValue = BLANKSTRING;
                    }
                    if(defined(dataObj.y)) {
                        hasValidValue = 1;
                    }
                }
                dataObj = hcDataArr[0];
                dataObj.marker.fillColor = convertColor(pluck(dataObj.anchorbgcolor, openColor), pluckNumber(dataObj.anchorbgalpha, anchorAlpha));
                dataObj.marker.enabled = !!showOpenAnchor;
                openDisplayValue = NumberFormatter.dataLabels(dataObj.y);

                dataObj = hcDataArr[length - 1];
                dataObj.marker.fillColor = convertColor(pluck(dataObj.anchorbgcolor, closeColor), pluckNumber(dataObj.anchorbgalpha, anchorAlpha));
                dataObj.marker.enabled = !!showCloseAnchor;
                closeDisplayValue = NumberFormatter.dataLabels(dataObj.y);
                HCChartObj.openValue.label = HCChartObj.closeValue.label = HCChartObj.highLowValue.label = BLANKSTRING;
                if (hasValidValue) {
                    HCChartObj.openValue.label = pluckNumber(FCChartObj.showopenvalue, 1) ? openDisplayValue : BLANKSTRING;
                    HCChartObj.closeValue.label = pluckNumber(FCChartObj.showclosevalue, 1) ? closeDisplayValue : BLANKSTRING;

                    HCChartObj.highLowValue.label = pluckNumber(FCChartObj.showhighlowvalue, 1) ?
                    '[' +
                    '<span style="color: '+ highColor +'">' + highDisplayValue + '</span>' +
                    '<span>|</span>' +
                    '<span style="color: '+ lowColor +'">' + lowDisplayValue + '</span>' +
                    ']'
                    : BLANKSTRING;
                }
            }
        }

    },  chartAPI.sparkbase);


    chartAPI('sparkcolumn', {
        standaloneInit: true,
        defaultSeriesType : 'column',
        creditLabel: creditLabel,
        showCanvasBorder: true,
        point: chartAPI.column2dbase.point,

        postSeriesAddition: function(hc, obj, width, height) {
            var HCChartObj = hc.chart,
            FCChartObj = obj.chart,
            // Initialize Color Manager for Widgets
            colorM = this.colorM,
            hcDataArr = hc.series && hc.series[0] && hc.series[0].data,
            length,
            dataObj,
            fcDataArr,
            fcDataObj,
            hightValue = chartAPI.highValue,
            lowValue = chartAPI.lowValue,

            plotFillAlpha = pluck(FCChartObj.plotfillalpha, HUNDREDSTRING),
            plotFillColor = pluck(FCChartObj.plotfillcolor, colorM.get2DPlotFillColor()),
            plotBorderAlpha = pluck(FCChartObj.plotborderalpha, HUNDREDSTRING),
            plotBorderColor = pluck(FCChartObj.plotbordercolor),
            //Fill Color for high column and low column
            highColor = pluck(FCChartObj.highcolor, plotFillColor),
            lowColor = pluck(FCChartObj.lowcolor, plotFillColor),
            highBorderColor = pluck(FCChartObj.highbordercolor, plotBorderColor),
            lowBorderColor = pluck(FCChartObj.lowbordercolor, plotBorderColor),
            plotBorderThickness = pluckNumber(FCChartObj.showplotborder, 0) ?
            pluckNumber(FCChartObj.plotborderthickness, 1) : 0;

            if ((length = hcDataArr && hcDataArr.length) > 0) {
                fcDataArr = obj.data || (obj.dataset && obj.dataset[0] && obj.dataset[0].data);

                while (length) {
                    length -= 1;
                    dataObj = hcDataArr[length];
                    fcDataObj = fcDataArr[length];
                    // Filtering color for SparkColumn
                    var  setColor = pluck(fcDataObj.color, plotFillColor),
                    setAlpha = pluck(fcDataObj.alpha, plotFillAlpha),
                    bdColor = pluck(fcDataObj.bordercolor, plotBorderColor),
                    bdAlpha = pluck(fcDataObj.borderalpha, plotBorderAlpha),
                    // Fill ratio of the data
                    setRatio = pluck(fcDataObj.ratio, FCChartObj.plotfillratio),
                    // defaultAngle depend upon item value
                    setAngle = pluck(360 - FCChartObj.plotfillangle, 90);

                    if (dataObj.y == hightValue) {
                        setColor = pluck(fcDataObj.color, highColor);
                        bdColor = pluck(fcDataObj.bordercolor, highBorderColor);
                    }
                    if (dataObj.y == lowValue) {
                        setColor = pluck(fcDataObj.color, lowColor);
                        bdColor = pluck(fcDataObj.bordercolor, lowBorderColor);
                    }

                    var colorArr = this.getColumnColor(fcDataObj, setColor,
                        setAlpha, bdColor, bdAlpha, setRatio,
                        setAngle, hc.chart.useRoundEdges);

                    dataObj.color = colorArr[0];
                    dataObj.borderColor = colorArr[1];
                    dataObj.borderWidth = plotBorderThickness;
                    if (!pluckNumber(fcDataObj.showvalue, FCChartObj.showvalue, FCChartObj.showvalues, 0)) {
                        dataObj.displayValue = BLANKSTRING;
                    }
                }
            }
        },

        //this function create the column color depending upon the configuration
        getColumnColor: function (fcDataObj, setColor, setAlpha, bdColor, bdAlpha, ratio, angle, isRoundEdges, isBar, is3d) {
            var bgColor, borderColor, colorArr, alphaArr, bdColorArr, color, alpha, bdAlphaArr;

            bdColor = pluck(bdColor, getDarkColor(setColor, 60));

            colorArr = setColor.split(COMMASTRING);
            alphaArr = setAlpha.split(COMMASTRING);
            bdColorArr = bdColor.split(COMMASTRING);
            bdAlphaArr = bdAlpha.split(COMMASTRING);
            if (is3d) {
                bgColor = {
                    FCcolor: {
                        color: colorArr[0],
                        alpha: alphaArr[0]
                    }
                };
            }
            else if (isRoundEdges) {
                color = colorArr[0];
                alpha = alphaArr[0]
                bgColor = {
                    FCcolor: {
                        color: getDarkColor(color, 75) + COMMASTRING + getLightColor(color, 25) + COMMASTRING +
                        getDarkColor(color, 80) + COMMASTRING + getLightColor(color, 65) + COMMASTRING + getDarkColor(color, 80),
                        alpha: alpha + COMMASTRING + alpha + COMMASTRING + alpha +
                        COMMASTRING + alpha + COMMASTRING + alpha,
                        ratio: "0,10,13,57,20",
                        angle: isBar ? "-180" : "0"
                    }
                };
                bdColorArr = [getDarkColor(color, 70)];
            }
            else {
                setAlpha = parseAlpha(setAlpha, colorArr.length);
                bgColor = {
                    FCcolor: {
                        color: setColor,
                        alpha: setAlpha,
                        ratio: ratio,
                        angle: isBar ? 180 - angle : angle
                    }
                };

            }
            borderColor = {
                FCcolor: {
                    color: bdColorArr[0],
                    alpha: bdAlphaArr[0]
                }
            }
            return [bgColor, borderColor];
        }
    },  chartAPI.sparkbase);


    chartAPI('sparkwinloss', {
        standaloneInit: true,
        defaultSeriesType : 'sparkwinloss',
        creditLabel: creditLabel,
        showCanvasBorder: false,
        showCanvas: 0,
        showtooltip: 0,

        postSeriesAddition: function(hc, obj, width, height) {
            var HCChartObj = hc.chart,
            FCChartObj = obj.chart,
            // Initialize Color Manager for Widgets
            colorM = this.colorM,
            hcDataArr = hc.series && hc.series[0] && hc.series[0].data,
            length,
            dataObj,
            fcDataArr,
            fcDataObj,

            plotFillAlpha = pluck(FCChartObj.plotfillalpha, HUNDREDSTRING),
            plotFillColor = pluck(FCChartObj.plotfillcolor, colorM.get2DPlotFillColor()),
            plotBorderAlpha = pluck(FCChartObj.plotborderalpha, HUNDREDSTRING),
            plotBorderColor = pluck(FCChartObj.plotbordercolor),
            //Fill Color for high column and low column
            plotBorderThickness = pluckNumber(FCChartObj.showplotborder, 0) ?
            pluckNumber(FCChartObj.plotborderthickness, 1) : 0,
            winColor = pluck(FCChartObj.wincolor, colorM.getWinColor()),
            lossColor = pluck(FCChartObj.losscolor, colorM.getLossColor()),
            drawColor = pluck(FCChartObj.drawcolor, colorM.getDrawColor()),
            scoreLessColor = pluck(FCChartObj.scorelesscolor, colorM.getScoreLessColor()),
            setColor = BLANKSTRING, setAlpha, bdColor, bdAlpha, setRatio, setAngle,
            numWon = 0, numLost = 0, numDraw = 0, displayValue = BLANKSTRING,
            pointColorMap = {
                '1': winColor,
                '-1': lossColor,
                '0.1': drawColor,
                'true': scoreLessColor
            };
            // Disable the tooltip of sparkWinLoss
            hc.tooltip.enabled = false;

            if ((length = hcDataArr && hcDataArr.length) > 0) {
                fcDataArr = obj.data || (obj.dataset && obj.dataset[0] && obj.dataset[0].data);

                while (length) {
                    length -= 1;
                    dataObj = hcDataArr[length];
                    fcDataObj = fcDataArr[length];

                    switch(fcDataObj.value) {
                        case 1:
                            setColor = pluck(fcDataObj.color, winColor, plotFillColor);
                            numWon += 1;
                            break;
                        case -1:
                            setColor = pluck(fcDataObj.color, lossColor, plotFillColor);
                            numLost += 1;
                            break;
                        case 0.1:
                            setColor = pluck(fcDataObj.color, drawColor, plotFillColor);
                            numDraw += 1;
                            break;
                    }
                    if (fcDataObj.scoreless == 1) {
                        setColor = pluck(fcDataObj.color, scoreLessColor, plotFillColor);
                    }

                    // Filtering color for SparkColumn
                    //setColor = pluck(fcDataObj.color, pointColorMap[fcDataObj.scoreless == 1 || dataObj.y], plotFillColor);
                    setAlpha = pluck(fcDataObj.alpha, plotFillAlpha);
                    bdColor = pluck(fcDataObj.bordercolor, plotBorderColor);
                    bdAlpha = pluck(fcDataObj.borderalpha, plotBorderAlpha);
                    // Fill ratio of the data
                    setRatio = pluck(fcDataObj.ratio, FCChartObj.plotfillratio);
                    // defaultAngle depend upon item value
                    setAngle = pluck(360 - FCChartObj.plotfillangle, 90);

                    var colorArr = this.getColumnColor(fcDataObj, setColor,
                        setAlpha, bdColor, bdAlpha, setRatio,
                        setAngle, hc.chart.useRoundEdges);

                    dataObj.color = colorArr[0];
                    dataObj.borderColor = colorArr[1];
                    dataObj.borderWidth = plotBorderThickness;
                    if (!pluckNumber(fcDataObj.showvalue, FCChartObj.showvalue, FCChartObj.showvalues, 0)) {
                        dataObj.displayValue = BLANKSTRING;
                    }
                }
                if (pluckNumber(FCChartObj.showvalue, 1) == 1) {
                    HCChartObj.closeValue.style = extend2({}, hc.plotOptions.series.dataLabels.style);
                    HCChartObj.closeValue.label = numWon + '-' + numLost + ((numDraw > 0) ? ('-' + numDraw) : BLANKSTRING);
                }
            }
        }
    },  chartAPI.sparkcolumn);



    /* RealTimeArea Charts */
    chartAPI('_realtimearea', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* RealTimeColumn Charts */
    chartAPI('_realtimecolumn', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* RealTimeLine Charts */
    chartAPI('_realtimeline', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* RealTimeLineDY Charts */
    chartAPI('_realtimelinedy', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* RealTimeStackedArea Charts */
    chartAPI('_realtimestackedarea', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* RealTimeStackedColumn Charts */
    chartAPI('_realtimestackedcolumn', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /* SparkWinLoss Charts */
    chartAPI('sparkwinloss', {
        creditLabel: creditLabel
    }, chartAPI.linebase);

    /*
     *Color Range API
     */

    var sortColorFN = function (a, b) {
        return a.minvalue - b.minvalue;
    };

    //**** Color Range Module ****//
    //we are modifing on the supplyed colorArr, so make sure it is a clone of original JSON
    //and no changes in other place will effect it
    function colorRange(colorArr, defaultObj, defuPaletteOptions, chartAPI) {
        var colorObj, colorObjNext, i, l, temp, newColorRange, j, newMin, nextIndex;
        if (!(defuPaletteOptions instanceof Array)){
            defuPaletteOptions = defaultGaugePaletteOptions.paletteColors[0];
        }
        if (colorArr && colorArr.length > 0) {
            //validate all color object
            //remove invalid obj
            for (i = colorArr.length - 1; i >= 0; i -= 1) {
                //for (i = colorArr.length; i > 0; i -= 1) {
                colorObj = colorArr[i];
                if (colorObj){
                    colorObj.minvalue = chartAPI.numberFormatter.getCleanValue(colorObj.minvalue);
                    colorObj.maxvalue = chartAPI.numberFormatter.getCleanValue(colorObj.maxvalue);

                    if (colorObj.label !== undefined) {
                        colorObj.label = parseUnsafeString(colorObj.label);
                    }

                    if (colorObj.name !== undefined) {
                        colorObj.name = parseUnsafeString(colorObj.name);
                    }

                    if (colorObj) {
                        if (colorObj.minvalue > colorObj.maxvalue) {//alter the value
                            temp = colorObj.minvalue;
                            colorObj.minvalue = colorObj.maxvalue;
                            colorObj.maxvalue = temp;
                        }
                        else if (!(colorObj.minvalue < colorObj.maxvalue)) {//remove the color obj
                            colorArr.splice(i, 1);
                        }
                    }
                }
            }
            //now sort colors
            colorArr.sort(sortColorFN);
            // Put the default Color if color not given in color Obj
            if (!colorArr[0].code) {
                colorArr[0].code = defuPaletteOptions[0];
            }
            // Put the default Alpha if Alpha not given in color Obj
            if (getValidValue(colorArr[0].alpha) == undefined) {
                colorArr[0].alpha = HUNDREDSTRING;
            }
            //now devide overlaping color ranges
            for (i = 0, l = colorArr.length - 1; i < l; i += 1) {
                nextIndex = i + 1;
                colorObj = colorArr[i];
                colorObjNext = colorArr[nextIndex];
                // Put the default Color if color not given in color Obj
                if (!colorObjNext.code) {
                    colorObjNext.code = defuPaletteOptions[nextIndex];
                }
                // Put the default Alpha if Alpha not given in color Obj
                if (getValidValue(colorObjNext.alpha) == undefined) {
                    colorObjNext.alpha = HUNDREDSTRING;
                }
                if (colorObj.maxvalue > colorObjNext.minvalue) {
                    if (colorObj.maxvalue > colorObjNext.maxvalue) {
                        newColorRange = extend2(colorObj);
                        newColorRange.maxvalue = colorObj.maxvalue;
                        newMin = newColorRange.minvalue = colorObjNext.maxvalue;
                        //insert newColorRange into proper position
                        for (j = i + 2; j < l && colorArr[j].minvalue < newMin; j += 1) {
                        //
                        }
                        colorArr.splice(j, 0, newColorRange);
                        l += 1;//legth increased
                    }
                    colorObj.maxvalue = colorObjNext.minvalue;
                }
            }

        }

        if (!(colorArr && colorArr.length > 0)) {
            if (!defaultObj) {
                defaultObj = {
                    code: '000000',
                    alpha: '100',
                    bordercolor: '000000',
                    borderalpha: '100'
                }
            }
            colorArr = [defaultObj];
            this.defaultAsigned = true;
        }

        this.colorArr = colorArr;
    }
    colorRange.prototype = {
        getColorObj : function (value) {
            var colorArr = this.colorArr, i = 0, l = colorArr.length, colorObj,
            prevColorObj, nextColorObj,
            returnedObj = {};
            for (; i < l; i += 1) {
                returnedObj.index = i;
                colorObj = colorArr[i];
                nextColorObj = colorArr[i + 1];
                if (value < colorObj.minvalue) {
                    returnedObj.nextObj = colorObj;
                    return returnedObj;
                }
                if (value >= colorObj.minvalue && value <= colorObj.maxvalue) {
                    returnedObj.colorObj = colorObj;
                    if (nextColorObj && value == nextColorObj.minvalue) {//at the border of two color point
                        returnedObj.nextObj = nextColorObj;
                        returnedObj.isOnMeetPoint = true;
                    }
                    return returnedObj;
                }
                returnedObj.prevObj = colorObj;
            }
            returnedObj.index = i - 1;
            return returnedObj;
        },
        getColorRangeArr : function (minValue, maxValue) {
            var temp, colorArr = this.colorArr, i, l, minColorObj, lastMaxValue,
            maxColorObj, returnArr = [], colorObj, lastColorObj;
            if (!this.defaultAsigned) {
                if (minValue > maxValue) {//Swap
                    temp = minValue
                    minValue = maxValue;
                    maxValue = temp;
                }
                if (minValue < maxValue) {
                    minColorObj = this.getColorObj(minValue);
                    maxColorObj = this.getColorObj(maxValue);
                    if (minColorObj && maxColorObj) {
                        lastMaxValue = minValue;
                        i = minColorObj.index;
                        l = maxColorObj.index;
                        for (; i <= l; i += 1) {
                            colorObj = extend2({}, colorArr[i]);
                            if (colorObj.minvalue !== lastMaxValue) {
                                colorObj.minvalue = lastMaxValue;
                            }
                            returnArr.push(colorObj);
                            lastColorObj = colorObj;
                            lastMaxValue = colorObj.maxvalue;
                        }
                        lastColorObj.maxvalue = maxValue;

                    }
                }
            }
            return returnArr;
        }
    };
    colorRange.prototype.constructor = colorRange;









    /* ***************************************************************************
     *                           Widgets Series for HC                           *
     *****************************************************************************/






    /* ****************************************************************************
     * Start Funnel series code                                                   *
     *****************************************************************************/

    /**
     * calcPoints method calculates and returns the
     * coordinates of four points of common tangency
     * between the upper and lower ellipses.
     * @param	a1			semi-major axis length of the upper ellipse
     * @param	b1			semi-minor axis length of the upper ellipse
     * @param	h1			height of upper ellipse center
     * @param	a2			semi-major axis length of the lower ellipse
     * @param	b2			semi-minor axis length of the lower ellipse
     * @param	h2			height of lower ellipse center
     * @returns				object holding point instances corresponding
     * 						to the 4 points of tangencies.
     */
    var calcPoints = function (a1, b1, h1, a2, b2, h2) {
        // calcuating parameters of formula
        var alpha = Math.pow(a2, 2)-Math.pow(a1, 2),
        beta = -2*(Math.pow(a2, 2)*h1-Math.pow(a1, 2)*h2),
        gamma = Math.pow(a1*b2, 2)+Math.pow(a2*h1, 2)-Math.pow(a2*b1, 2)-Math.pow(a1*h2, 2),
        k = Math.sqrt(Math.pow(beta, 2)-4*alpha*gamma),
        // getting the 2 y-intercepts for there are 2 pairs of tangents
        c1 = (-beta+k)/(2*alpha),
        c2 = (-beta-k)/(2*alpha),
        c, m1, m2, p1, p2, p3, p4, i, objPoints,
        oneHND = 100;
        // but we need only one pair and hence one value of y-intercept
        if (c1<h2 && c1>h1) {
            c = c2;
        } else if (c2<h2 && c2>h1) {
            c = c1;
        }
        // getting the slopes of the 2 tangents of the selected pair
        m1 = Math.sqrt((Math.pow(c-h1, 2)-Math.pow(b1, 2))/Math.pow(a1, 2));
        m2 = -m1;

        // getting the 4 points of tangency
        // right sided points
        //upper
        p1 = {
            x : Math.round((Math.pow(a1, 2)*m1/(c-h1)) * oneHND) / oneHND,
            y : Math.round(((Math.pow(b1, 2)/(c-h1))+h1) * oneHND) / oneHND
        };
        //lower
        p2 = {
            x : Math.round((Math.pow(a2, 2)*m1/(c-h2)) * oneHND) / oneHND,
            y :  Math.round(((Math.pow(b2, 2)/(c-h2))+h2) * oneHND) / oneHND
        };
        // left sided points
        //upper
        p3 = {
            x : Math.round((Math.pow(a1, 2)*m2/(c-h1)) * oneHND) / oneHND,
            y :   Math.round(((Math.pow(b1, 2)/(c-h1))+h1) * oneHND) / oneHND
        };
        //lower
        p4 = {
            x : Math.round((Math.pow(a2, 2)*m2/(c-h2)) * oneHND) / oneHND,
            y :  Math.round(((Math.pow(b2, 2)/(c-h2))+h2) * oneHND) / oneHND
        };
        // storing in object to be passed as a collection
        objPoints = {
            topLeft:p3,
            bottomLeft:p4,
            topRight:p1,
            bottomRight:p2
        };
        // checking for invalid situations
        for (i in objPoints) {
            if (isNaN(objPoints[i].x) || isNaN(objPoints[i].y)) {
                // means ... the funnel is extremely thin and points of tangencies coincide with ellipse ends
                if (i == 'topLeft' || i == 'bottomLeft') {
                    objPoints[i].x = -a1;
                } else {
                    objPoints[i].x = a1;
                }
                objPoints[i].y = h1;
            }
        }
        // object returned
        return objPoints;
    },
    getFunnel3DShapeArgs = function (x, y, R1, R2, h, r3dFactor, isHollow, renderer) {
        var y2 = y + h,
        R3 = R1 * r3dFactor, R4 = R2 * r3dFactor, shapearge,
        objPoints = calcPoints(R1, R3, y, R2, R4, y2),
        topLeft = objPoints.topLeft,
        bottomLeft = objPoints.bottomLeft,
        topRight = objPoints.topRight,
        bottomRight = objPoints.bottomRight,
        X1 = x + topLeft.x, X2 = x + topRight.x, X3 = x + bottomLeft.x, X4 = x + bottomRight.x,
        y3 = topLeft.y, y4 = bottomLeft.y,
        arc1 = renderer.getArcPath(x, y, X1, y3, X2, y3, R1, R3, 0, 0),
        arc2 = renderer.getArcPath(x, y, X1, y3, X2, y3, R1, R3, 1, 1),
        arc3 = renderer.getArcPath(x, y2, X4, y4, X3, y4, R2, R4, 1, 0),
        arc4 = renderer.getArcPath(x, y2, X4, y4, X3, y4, R2, R4, 0, 1);


        //getArcPath : function (cX, cY, startX, startY, endX, endY, rX, rY, isClockWise, isLargeArc)
        shapearge =  {
            front : [M, X1, y3].concat(arc1, [L, X4, y4], arc3, [Z]),

            back : [M, X1, y3].concat(arc2, [L, X4, y4], arc4, [Z]),
            silhuette  : [M, X1, y3].concat(arc2, [L, X4, y4], arc3, [Z])
        };
        if (!isHollow) {
            shapearge.top = [M, X1, y3].concat(arc1, [L, X2, y3],
                renderer.getArcPath(x, y, X2, y3, X1, y3, R1, R3, 0, 1), [Z])
        }

        return shapearge;
    },


    //helper function to draw Funnel && pyramid shape
    pyramidFunnelShape = (function () {
        //list of attr that will handled here
        var attrList = {
            y : true,
            R1 : true,
            R2 : true,
            h : true,
            r3dFactor : true,
            color : true,
            alpha : true,
            fill : true,
            stroke : true,
            strokeColor: true,
            strokeAlpha: true,
            'stroke-width' : true
        },
        getPyramid3DShapeArgs = function(x, y, R1, R2, h, r3dFactor, is2D, renderer, isFunnel, isHollow) {
            if (isObject(x)) {
                y = x.y;
                R1 = x.R1;
                R2 = x.R2;
                h = x.h;
                r3dFactor = x.r3dFactor;
                is2D = x.is2D;
                isHollow = x.isHollow;
                isFunnel = x.isFunnel;
                renderer = x.renderer;
                x = x.x;
            }
            var X1 = x - R1, X2 = x + R1, X3 = x - R2, X4 = x + R2, y2 = y + h, shapeArgs;
            if (is2D) {
                shapeArgs = {
                    silhuette  : [M, X1, y, L, X2, y, X4, y2, X3, y2, Z]
                }
                if(!isFunnel){
                    shapeArgs.lighterHalf = [M, X1, y, L, x, y, x, y2, X3, y2, Z];
                    shapeArgs.darkerHalf = [M, x, y, L, X2, y, X4, y2, x, y2, Z];
                }
            }
            else if (isFunnel){
                shapeArgs = getFunnel3DShapeArgs(x, y, R1, R2, h, r3dFactor, isHollow, renderer)
            }
            else {
                var R3 = R1 * r3dFactor, R4 = R2 * r3dFactor, lightLength = mathMin(5, R1),
                lightLengthH = mathMin(2, 2 * R3), lightLengthH1 = mathMin(2, lightLengthH),
                lightWidth = lightLengthH1 / r3dFactor;
                shapeArgs = {
                    top : [M, X1, y, L, x, y + R3, X2, y, x, y - R3,Z],
                    front : [M, X1, y, L, x, y + R3, X2, y, X4, y2, x, y2 + R4,
                    X3, y2, Z],
                    topLight : [M, X1, y + 0.5, L, x, y + R3 + 0.5, x, y + R3 - lightLengthH, X1 + lightWidth, y,  Z],// x, y + R3 - lightLengthH, Z],
                    topLight1 : [M, X2, y + 0.5, L, x, y + R3 + 0.5, x, y + R3 - lightLengthH1, X2 - lightWidth, y,  Z],// x, y + R3 - lightLengthH, Z],
                    silhuette  : [M, X1, y, L, x, y - R3, X2, y, X4, y2, x, y2 + R4,
                    X3, y2, Z],
                    centerLight : [M, x, y + R3, L, x, y2 + R4, x - 5, y2 + R4,
                    x - lightLength, y + R3, Z],
                    centerLight1 : [M, x, y + R3, L, x, y2 + R4, x + 5, y2 + R4,
                    x + lightLength, y + R3, Z]
                };
            }
            return shapeArgs;
        },
        attr = function (hash, val) {
            var key,
            value,
            element = this,
            color,
            alpha,
            colorObject,
            shapeChanged = false,
            colorChanged = false,
            lightColor,
            lightColor1,
            darkColor,
            topLightAttr = {},
            topLightAttr1 = {},
            frontAttr = {},
            topAttr = {},
            centerLightAttr = {},
            centerLightAttr1 = {},
            attr3D = this['_3dAttr'];

            // single key-value pair
            if (isString(hash) && defined(val)) {
                key = hash;
                hash = {};
                hash[key] = val;
            }

            // used as a getter: first argument is a string, second is undefined
            if (isString(hash)) {
                //if belongs from the list then handle here
                if (attrList[hash]) {
                    element = this['_3dAttr'][hash];
                }
                else {//else leve for the original attr
                    element = this['_attr'](hash);
                }

            // setter
            }
            else {
                for (key in hash) {
                    value = hash[key];

                    //if belongs from the list then handle here
                    if (attrList[key]) {
                        //store the att in attr3D for further use
                        attr3D[key] = value;
                        //if it is 'fill' or 'lighting3D' the redefine the colors for all the 3 elements
                        if (key === 'fill') {
                            if (value && value.linearGradient && value.stops && value.stops[0]) {
                                value = value.stops[0][1];
                            }

                            if (startsRGBA.test(value)) {
                                colorObject = Color(value);
                                color = colorObject.get('hex');
                                alpha = colorObject.get('a') * 100;
                            }
                            else if (value && value.FCcolor) {
                                color = value.FCcolor.color.split(COMMASTRING)[0];
                                alpha = value.FCcolor.alpha.split(COMMASTRING)[0]
                            }
                            else if (hexcode.test(value)) {
                                color = value.replace(dropHash, HASHSTRING);
                                alpha = pluckNumber(attr3D.alpha, 100);
                            }
                            attr3D.color = color;
                            attr3D.alpha = alpha;
                            colorChanged = true;
                        }
                        else if (key === 'color' || key === 'alpha') {
                            attr3D.fill = convertColor(attr3D.color, pluckNumber(attr3D.alpha, 100));
                            colorChanged = true;
                        }
                        else if (key === 'stroke' || key === 'strokeColor' || key === 'strokeAlpha') {
                            if (attr3D.is2D) {//stroke is only applicable on 2d shape
                                if (key === 'stroke') {
                                    if (value && value.linearGradient && value.stops && value.stops[0]) {
                                        value = value.stops[0][1];
                                    }

                                    if (startsRGBA.test(value)) {
                                        colorObject = Color(value);
                                        color = colorObject.get('hex');
                                        alpha = colorObject.get('a') * 100;
                                    }
                                    else if (value && value.FCcolor) {
                                        color = value.FCcolor.color.split(COMMASTRING)[0];
                                        alpha = value.FCcolor.alpha.split(COMMASTRING)[0]
                                    }
                                    else if (hexcode.test(value)) {
                                        color = value.replace(dropHash, HASHSTRING);
                                        alpha = pluckNumber(attr3D.alpha, 100);
                                    }
                                    attr3D.strokeColor = color;
                                    attr3D.strokeAlpha = alpha;
                                }
                                else {
                                    attr3D.stroke = convertColor(attr3D.strokeColor, pluckNumber(attr3D.strokeAlpha, 100));
                                }
                                if (attr3D.isFunnel) {
                                    this.funnel2D.attr('stroke', attr3D.stroke);
                                }
                                else {
                                    this.borderElement.attr('stroke', attr3D.stroke);
                                }
                            }
                        }
                        else  if (key === 'stroke-width'){
                            if (attr3D.is2D) {//stroke is only applicable on 2d shape
                                if (attr3D.isFunnel) {
                                    this.funnel2D.attr(key, value);
                                }
                                else {
                                    this.borderElement.attr(key, value);
                                }
                            }
                        }
                        else {
                            shapeChanged = true;
                        }
                    }
                    else {//else leave for the original attr
                        this['_attr'](key, value);
                    }
                }


                if (attr3D.is2D) {
                    if (shapeChanged) {
                        Shapeargs = getPyramid3DShapeArgs(attr3D.x, attr3D.y, attr3D.R1, attr3D.R2, attr3D.h, attr3D.r3dFactor, attr3D.is2D);
                        element.shadowElement.attr({
                            d : Shapeargs.silhuette
                        });
                        if (attr3D.isFunnel) {
                            element.funnel2D.attr({
                                d : Shapeargs.silhuette
                            });
                        }
                        else {
                            element.lighterHalf.attr({
                                d : Shapeargs.lighterHalf
                            });
                            element.darkerHalf.attr({
                                d : Shapeargs.darkerHalf
                            });
                            element.borderElement.attr({
                                d : Shapeargs.silhuette
                            });
                        }
                    }
                    //if color change requared
                    if (colorChanged) {
                        if (attr3D.isFunnel) {
                            element.funnel2D.attr('fill', convertColor(attr3D.color, pluckNumber(attr3D.alpha, 100)));
                        }
                        else {
                            var colorDark = getDarkColor(attr3D.color, 80),
                            colorLight = getLightColor(attr3D.color, 80);
                            element.lighterHalf.attr('fill', convertColor(colorLight, pluckNumber(attr3D.alpha, 100)));
                            element.darkerHalf.attr('fill', convertColor(colorDark, pluckNumber(attr3D.alpha, 100)));
                        }
                    }
                }
                else {
                    //if shape changed requared
                    if (shapeChanged) {
                        Shapeargs = getPyramid3DShapeArgs(attr3D.x, attr3D.y, attr3D.R1, attr3D.R2, attr3D.h, attr3D.r3dFactor, attr3D.is2D);
                        element.shadowElement.attr('d', Shapeargs.silhuette);
                        if (attr3D.isFunnel) {
                            element.front.attr('d', Shapeargs.front);
                            element.back.attr('d', Shapeargs.back);
                            if (element.top && Shapeargs.top) {
                                element.top.attr('d', Shapeargs.top);
                            }
                        }
                        else {
                            element.front.attr('d', Shapeargs.front);
                            element.top.attr('d', Shapeargs.top);
                            element.topLight.attr('d', Shapeargs.topLight);
                            element.topLight1.attr('d', Shapeargs.topLight1);
                            element.centerLight.attr('d', Shapeargs.centerLight);
                            element.centerLight1.attr('d', Shapeargs.centerLight1);
                        }
                    }
                    //if color change requared
                    if (colorChanged) {
                        color = attr3D.color;
                        alpha = attr3D.alpha;
                        if (attr3D.isFunnel) {
                            lightColor = getLightColor(color, 60);
                            darkColor = getDarkColor(color, 60);
                            element.back.attr('fill', {
                                FCcolor : {
                                    color : darkColor + COMMASTRING + lightColor + COMMASTRING + color,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + alpha,
                                    ratio : '0,60,40',
                                    angle : 0
                                }
                            });
                            element.front.attr('fill', {
                                FCcolor : {
                                    color : color + COMMASTRING + lightColor + COMMASTRING + darkColor,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + alpha,
                                    ratio : '0,40,60',
                                    angle : 0
                                }
                            });
                            if (element.top) {
                                element.top.attr('fill', {
                                    FCcolor : {
                                        color : lightColor + COMMASTRING + darkColor,
                                        alpha : alpha + COMMASTRING + alpha,
                                        ratio : '0,100',
                                        angle : -65
                                    }
                                });
                            }
                        }
                        else {
                            lightColor = getLightColor(color, 80);
                            lightColor1 = getLightColor(color, 70);
                            darkColor = getDarkColor(color, 80);
                            var zero100STR = '0,100',
                            lightAlphaSTR = '0,' + alpha,
                            lightShade = color + COMMASTRING + lightColor1,
                            slantAngle = -45,
                            lightShadeStop = (5 / (attr3D.R1 * attr3D.r3dFactor)) * 100;
                            //slantAngle = - math.atan(1 / attr3D.r3dFactor) / deg2rad

                            element.centerLight.attr('fill', {
                                FCcolor : {
                                    color : lightShade,
                                    alpha : lightAlphaSTR,
                                    ratio : zero100STR,
                                    angle : 0
                                }
                            });
                            element.centerLight1.attr('fill', {
                                FCcolor : {
                                    color : lightShade,
                                    alpha : lightAlphaSTR,
                                    ratio : zero100STR,
                                    angle : 180
                                }
                            });
                            element.topLight.attr('fill', {
                                FCcolor : {
                                    color : lightColor1 + COMMASTRING + lightColor1 + COMMASTRING + color + COMMASTRING + color,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + 0 + COMMASTRING + 0,
                                    ratio : '0,50,' + lightShadeStop + COMMASTRING + (50 - lightShadeStop),
                                    angle : slantAngle
                                }
                            });
                            element.topLight1.attr('fill', {
                                FCcolor : {
                                    color : lightColor1 + COMMASTRING + color + COMMASTRING + darkColor,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + alpha,
                                    ratio : '0,50,50',
                                    angle : 0
                                }
                            });
                            element.front.attr('fill', {
                                FCcolor : {
                                    color : color + COMMASTRING + color + COMMASTRING +
                                    darkColor + COMMASTRING + darkColor,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + alpha + COMMASTRING + alpha,
                                    ratio : '0,50,0,50',
                                    angle : 0
                                }
                            });
                            element.top.attr('fill', {
                                FCcolor : {
                                    color : lightColor + COMMASTRING + color + COMMASTRING + darkColor + COMMASTRING + darkColor,
                                    alpha : alpha + COMMASTRING + alpha + COMMASTRING + alpha + COMMASTRING + alpha,
                                    ratio : '0,25,30,45',
                                    angle : slantAngle
                                }
                            });
                        }
                    }
                }
            }
            return element;
        },

        shadow = function () {
            var silhuette = this.shadowElement;
            if (shadow) {
                silhuette.shadow.apply(silhuette, arguments);
            }
        };

        return function (x, y, R1, R2, h, r3dFactor, gStr, is2D, renderer, isFunnel, isHollow) {

            if (isObject(x)) {
                y = x.y;
                R1 = x.R1;
                R2 = x.R2;
                h = x.h;
                r3dFactor = x.r3dFactor;
                gStr = x.gStr;
                is2D = x.is2D;
                renderer = x.renderer;
                isHollow = x.isHollow;
                isFunnel = x.isFunnel;
                x = x.x;
            }
            r3dFactor = pluckNumber(r3dFactor, 0.15);
            var _3dAttr = {
                x : x,
                y : y,
                R1 : R1,
                R2 : R2,
                h : h,
                r3dFactor : r3dFactor,
                is2D : is2D,
                isHollow : isHollow,
                isFunnel : isFunnel,
                renderer : renderer
            },
            Shapeargs = getPyramid3DShapeArgs(_3dAttr),

            rect3D = renderer.g(gStr);


            rect3D.Shapeargs = Shapeargs;

            rect3D.shadowElement = renderer.path(Shapeargs.silhuette)
            .attr({
                fill : TRACKER_FILL
            })
            .add(rect3D);

            //modify the attr function of the group so that it can handle pyramid attrs
            //store the old function
            rect3D['_attr'] = rect3D.attr;
            rect3D.attr = attr;

            // Replace the shadow function with a modified version.
            rect3D.shadow = shadow;

            //store the 3d attr(requared in new attr function to change any related
            //                  attr modiffiaction)
            rect3D._3dAttr = _3dAttr;


            //add the new attr function
            if (isFunnel) {
                //if the drawing is a 2d drawing
                if (is2D) {
                    rect3D.funnel2D = renderer.path(Shapeargs.silhuette)
                    .add(rect3D);
                }
                else {
                    rect3D.back = renderer.path(Shapeargs.back)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.front = renderer.path(Shapeargs.front)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    if (Shapeargs.top) {//not hollow
                        rect3D.top = renderer.path(Shapeargs.top)
                        .attr({
                            'stroke-width' : 0
                        })
                        .add(rect3D);
                    }
                }
            }
            else {
                //if the drawing is a 2d drawing
                if (is2D) {
                    rect3D.lighterHalf = renderer.path(Shapeargs.lighterHalf)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.darkerHalf = renderer.path(Shapeargs.darkerHalf)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.borderElement = renderer.path(Shapeargs.silhuette)
                    .attr({
                        fill : TRACKER_FILL
                    })
                    .add(rect3D);
                }
                else {//else it should be 3d
                    rect3D.front = renderer.path(Shapeargs.front)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.centerLight = renderer.path(Shapeargs.centerLight)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.centerLight1 = renderer.path(Shapeargs.centerLight1)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.top = renderer.path(Shapeargs.top)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.topLight = renderer.path(Shapeargs.topLight)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                    rect3D.topLight1 = renderer.path(Shapeargs.topLight1)
                    .attr({
                        'stroke-width' : 0
                    })
                    .add(rect3D);
                }
            }

            return rect3D;
        };
    })();








    // 1 - Set default options
    defaultPlotOptions.funnel = merge(defaultPlotOptions.pie, {
        states: {
            hover: {}
        }
    });


    function getFunelPath (x, y, R1, R2, h) {
        var y2 = y + h;
        return [M, x - R1, y, L, x + R1, y, x + R2, y2, x - R2, y2, 'z'];
    }

    var FunnelPointClass = Highcharts.extendClass(seriesTypes.pie.prototype.pointClass, {
        /**
         * Set or toggle whether the slice is cut out from the pie
         * @param {Boolean} sliced When undefined, the slice state is toggled
         * @param {Boolean} redraw Whether to redraw the chart. True by default.
         */
        slice: function(sliced, redraw, animation) {
            var point = this,
            series = point.series,
            seriesOptions = series.options,
            SlicingDistance = seriesOptions.SlicingDistance,
            seriesOptionsHalf = SlicingDistance / 2;
            // if called without an argument, toggle
            sliced = point.sliced = defined(sliced) ? sliced : !point.sliced;
            if (sliced) {
                if (series.lastSlicedPoint){
                    series.lastSlicedPoint.sliced = false;
                }
                series.lastSlicedPoint = point;
            }
            else {
                series.lastSlicedPoint = undefined;
            }
            var previousPointTransLation = {
                translateY: sliced ? -seriesOptionsHalf : 0
            },
            nextPointTransLation = {
                translateY: sliced ? seriesOptionsHalf : 0
            },
            i = 0,
            noOFPrevPoint = 0,
            data = series.data,
            length = data.length,
            currentTransLation,
            dataObj;

            //setAnimation(animation, chart);

            // redraw is true by default
            redraw = pick(redraw, true);


            for (i = 0; i < length; i += 1) {
                dataObj = data[i];
                if (dataObj.graphic) {
                    if (dataObj.x < point.x) {
                        currentTransLation = previousPointTransLation;
                        noOFPrevPoint += 1;
                    }
                    else if (dataObj.x == point.x) {
                        if (!noOFPrevPoint) {
                            currentTransLation = {
                                translateY: sliced ? -seriesOptionsHalf / 2 : 0
                            };
                        }
                        else if (i == length - 1) {
                            currentTransLation = {
                                translateY: sliced ? seriesOptionsHalf / 2 : 0
                            };
                        }
                        else {
                            currentTransLation = {
                                translateY: 0
                            };
                        }
                    }
                    else {
                        currentTransLation = nextPointTransLation;
                    }

                    dataObj.graphic.animate(currentTransLation);
                    //for labels at center translate the labels
                    if (dataObj.dataLabelElement) {
                        dataObj.dataLabelElement.animate(currentTransLation);
                    }
                    //for tracker translate it
                    if (dataObj.tracker) {
                        dataObj.tracker.animate(currentTransLation);
                    }
                }
            }


        }
    }),

    // 3 - Create the OHLCSeries object
    Funnel = Highcharts.extendClass(seriesTypes.pie, {
        type: 'funnel',
        pointClass : FunnelPointClass,

        translate: function () {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            dataLen = data.length,
            width = chart.plotWidth,
            height = chart.plotHeight,
            drawingRadius = width / 2,
            isFunnel = series.type === 'funnel',
            drawingHeight = height,
            lastIndex = dataLen - 1,
            minValue = data[lastIndex].y,
            maxValue = data[0].y,
            unitHeight, lastRadius,
            newRadius, sliceHeight,
            y = 0,
            yScale = options.yScale,
            isHollow = options.isHollow,
            is2d = options.is2d,
            totalHeight = 0,
            renderer = chart.renderer,
            slicingGapPosition = {},
            streamlinedData = options.streamlinedData,
            labelDistance = series.options.labelDistance,
            widthHeightRatio = 0.8 / drawingHeight,
            xPos,
            noOfGap = 0,
            x = drawingRadius,
            showLabelsAtCenter = options.showLabelsAtCenter,
            blankSpace = 3,
            lineHeight = pluckNumber(parseInt(options.dataLabels.style.lineHeight), 12),
            fontSize = pluckNumber(parseInt(options.dataLabels.style.fontSize), 10),
            yShift = fontSize * 0.3;

            if (!streamlinedData) {
                unitHeight = drawingHeight / maxValue;
            }
            else {
                unitHeight = drawingHeight / (maxValue - minValue);
            }
            lastRadius = drawingRadius;
            each(data, function(point, i) {
                // set the shape
                if (i) {
                    //code for slicing drawing
                    if (point.isSliced) {
                        xPos = point.x;
                        if (xPos > 1 && !slicingGapPosition[xPos]) {
                            slicingGapPosition[xPos] = true;
                            noOfGap += 1;
                        }
                        if (xPos < lastIndex) {
                            slicingGapPosition[xPos + 1] = true;
                            noOfGap += 1;
                        }

                    }

                    if (!streamlinedData) {
                        totalHeight += sliceHeight = unitHeight * data[i].y;
                        newRadius = drawingRadius * (1 - (totalHeight * widthHeightRatio));
                    }
                    else{
                        if (options.useSameSlantAngle == 1) {
                            newRadius = drawingRadius * point.y / maxValue;
                        } else {
                            newRadius = drawingRadius * Math.sqrt(point.y / maxValue);
                        }
                        sliceHeight = unitHeight * (data[i - 1].y - point.y);
                    }
                    //funnel3d(x, y, R1, R2, h, r3dFactor, isHollow, gStr)
                    point.shapeArgs = {
                        x: x,
                        y: y,
                        R1: lastRadius,
                        R2: newRadius,
                        h: sliceHeight,
                        r3dFactor: yScale,
                        isHollow: isHollow,
                        gStr: 'point',
                        is2D: is2d,
                        renderer: renderer,
                        isFunnel: true
                    };
                    if (showLabelsAtCenter) {
                        point.labelAline = 'center';
                        //point.labelX = drawingWidth;
                        point.labelX = x;
                        point.labelY = (is2d ? y : y + (yScale * lastRadius)) + (sliceHeight / 2) + yShift;
                    }
                    else {
                        point.labelAline = 'left';
                        //point.labelX = drawingWidth;
                        point.labelX = x + labelDistance + newRadius + blankSpace;
                        point.labelY = y + yShift + sliceHeight;
                    }
                    y += sliceHeight;
                    lastRadius = newRadius;
                }
                else {
                    if (options.useSameSlantAngle == 1) {
                        newRadius = drawingRadius * data[0].y / maxValue;
                    } else {
                        newRadius = drawingRadius * Math.sqrt(data[0].y / maxValue);
                    }
                    if (point.labelWidht > newRadius * 2) {
                        point.labelAline = 'left';
                        point.labelX = 0;
                    }
                    else {
                        point.labelAline =  'center';
                        point.labelX = x;
                    }
                    point.labelY = (is2d ? y : y - (yScale * lastRadius))
                    - yShift - blankSpace ;
                }
                point.plotX = x;
                point.plotY = y;
            });
            //pass this calculation to the drawpoint
            series._temp = {
                slicingGapPosition : slicingGapPosition,
                noOfGap : noOfGap
            }

        },

        drawPoints: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            length = data.length - 1,
            point,
            seriesOptions = series.options,
            temp = series._temp || {},
            slicingGapPosition = temp.slicingGapPosition,
            noOfGap = temp.noOfGap,
            SlicingDistance = seriesOptions.SlicingDistance,
            perGapDistance,
            halfDistance = SlicingDistance / 2,
            DistanceAvailed = 0;
            if (noOfGap) {
                perGapDistance = Math.min(halfDistance * 1.5, SlicingDistance / noOfGap);
                DistanceAvailed = halfDistance;
            }

            for (; length >= 0; length -= 1) {
                point = data[length];
                if (point.shapeArgs) {
                    if (!point.graphic) {
                        point.graphic = pyramidFunnelShape(point.shapeArgs);
                    }
                    point.graphic.attr({
                        color : point.color,
                        alpha : point.alpha,
                        'stroke-width': point.borderWidth,
                        stroke: point.borderColor
                    })
                    .add(series.group)
                    .shadow(point.shadow.apply, undefined, point.shadow);
                    if (noOfGap) {
                        if (DistanceAvailed) {
                            point.graphic.attr({
                                translateY: DistanceAvailed
                            });
                            point._startTranslateY = DistanceAvailed;
                        }
                        if (slicingGapPosition[point.x]) {
                            DistanceAvailed -= perGapDistance;
                        }
                    }
                }
            }
        },

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options.dataLabels,
            dataLabelsGroup = series.dataLabelsGroup,
            labelX, labelY, labelAlign,
            connectorPath,
            renderer = chart.renderer,
            showLabelsAtCenter = series.options.showLabelsAtCenter,
            connectorAttr = {
                'stroke-width': options.connectorWidth,
                stroke: options.connectorColor
            },
            // TODO: verify the following code
            lineHeight =  Number(options.style.lineHeight.split(/px/)[0]),
            fontSize = pluckNumber(parseInt(options.style.fontSize), 10),
            yShift = fontSize * 0.3,
            yDisplacement = lineHeight * 0.3,
            totalHeight = chart.plotSizeY,
            lastPoint = {},
            lastplotY, lastConnectorEndY, connectorStartY, connectorEndY,
            i, point,
            blankSpace = 3,
            labelDistance = series.options.labelDistance,
            connectorEndX,
            connectorStartX;

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add();
                // clip for scroll
                if (chart.options.chart.hasScroll) {
                    dataLabelsGroup.clip(series.clipRect);
                }
            }

            for(i = data.length - 1; i >= 0; i -= 1) {
                point = data[i];
                labelY = point.labelY;
                labelX = point.labelX;
                labelAlign = point.labelAline;

                if (!showLabelsAtCenter) { // If labels to be place at center

                    //manage overlapping in height
                    connectorEndY = connectorStartY = labelY - yShift;
                    if (lastplotY !== undefined && lastConnectorEndY !== undefined && lastConnectorEndY - connectorStartY < lineHeight){
                        connectorEndY = lastConnectorEndY - lineHeight;
                        labelY = connectorEndY + yShift;
                    }
                    lastplotY = point.plotY;
                    lastConnectorEndY = connectorEndY;
                    // Drawing the connector for labels
                    // Check if the label is not blank and,
                    // label is not the first label of Funnel Chart
                    if ((typeof point.displayValue !== 'undefined' && point.displayValue !== BLANKSTRING) &&
                        !(i === 0 && series.type == 'funnel' )) {
                        connectorEndX = labelX - blankSpace;
                        connectorStartX = connectorEndX - labelDistance;
                        connectorPath = [M, connectorStartX, connectorStartY, L,
                        connectorEndX, connectorEndY];
                        renderer.path(connectorPath)
                        .attr(connectorAttr)
                        .add(point.graphic || dataLabelsGroup);
                    }

                    renderer.text(point.displayValue, labelX, labelY)
                    .attr({
                        align: labelAlign
                    })
                    .css(options.style)
                    .add(point.graphic || lastPoint.graphic || dataLabelsGroup);

                } else {
                    point.dataLabelElement = renderer.text(point.displayValue, labelX, labelY)
                    .attr({
                        align: labelAlign,
                        translateY: point._startTranslateY || 0
                    })
                    .css(options.style)
                    .add(point.graphic ? dataLabelsGroup : lastPoint.graphic);
                }


                lastPoint = point;
            }
        },


        drawTracker: function() {
            var series = this,
            chart = series.chart,
            renderer = chart.renderer,
            shapeArgs,
            tracker,
            trackerLabel = +new Date(),
            cursor = series.options.cursor,
            css = cursor && {
                cursor: cursor
            },
            i = series.data.length - 1,
            point,
            pointStyle,
            rel;

            for (; i >= 0; i -= 1) {
                point = series.data[i];
                tracker = point.tracker;
                if (point.graphic) {
                    shapeArgs = point.graphic.Shapeargs.silhuette;
                    if (tracker) {// update
                        tracker.attr(shapeArgs);

                    } else {
                        /**^
                         * Add cursor pointer if there has link
                         *modify the parent scope css variable with a local variable
                         */
                        if (point.link !== undefined) {
                            pointStyle = {
                                cursor : 'pointer',
                                '_cursor': 'hand'
                            };
                        }
                        else {
                            pointStyle = css;
                        }
                        /* EOP ^*/
                        point.tracker =
                        renderer.path(shapeArgs)
                        .attr({
                            isTracker: trackerLabel,
                            fill: TRACKER_FILL,
                            visibility: series.visible ? VISIBLE : HIDDEN,
                            zIndex: 1,
                            translateY: point._startTranslateY || 0
                        })
                        .on(hasTouch ? 'touchstart' : 'mouseover', (function (point) {
                            return function(event) {
                                rel = event.relatedTarget || event.fromElement;
                                if (chart.hoverSeries !== series && attr(rel, 'isTracker') !== trackerLabel) {
                                    series.onMouseOver();
                                }
                                point.onMouseOver();

                            };
                        })(point))
                        .on('mouseout', function(event) {
                            if (!series.options.stickyTracking) {
                                rel = event.relatedTarget || event.toElement;
                                if (attr(rel, 'isTracker') !== trackerLabel) {
                                    series.onMouseOut();
                                }
                            }
                        })
                        .css(pointStyle)
                        .add(chart.trackerGroup || point.graphic); // pies have point group - see issue #118
                    }
                }
            }
        },


        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;

            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');

                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }
            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        },
        //no init as derived from pie
        animate: function() {
            var series = this,
            i,
            point,
            graphic,
            l = series.data.length,
            animation = series.options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            //animate points
            for (i = 0; i < l; i += 1){
                point = series.data[i];
                graphic = point && point.graphic;
                if (graphic){
                    if (!graphic.isAnimating) { // apply it only for one of the series
                        graphic.isAnimating = true;
                        graphic.attr( {
                            alpha : 0,
                            strokeAlpha: 0
                        });
                        graphic.animate({
                            alpha : point.alpha,
                            strokeAlpha: Color(point.borderColor).get('a') * 100
                        }, animation);
                    }
                }
            }
            this.animate = null;
        }
    });

    // 4 - add the constractor
    seriesTypes.funnel = Funnel;



    /* ****************************************************************************
     * Start Pyramid series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.pyramid = merge(defaultPlotOptions.funnel, {
        states: {
            hover: {}
        }
    });




    // 3 - Create the OHLCSeries object
    var Pyramid = Highcharts.extendClass(seriesTypes.funnel, {
        type: 'pyramid',

        translate: function () {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            width = chart.plotWidth,
            height = chart.plotHeight,
            drawingWidth = width / 2,
            drawingHeight = height,
            unitHeight, lastRadius,
            newRadius, sliceHeight,
            renderer = chart.renderer,
            sumValues = options.valueSum,
            is2d = options.is2d,
            connectorWidth = options.connectorWidth,
            totalValues = 0,
            y = 0,
            xPos,
            slicingGapPosition = {},
            noOfGap = 0,
            lastIndex = data.length - 1,
            yScale = options.yScale,
            blankSpace = 3,
            labelDistance = series.options.labelDistance,
            showLabelsAtCenter = options.showLabelsAtCenter,
            fontSize = pluckNumber(parseInt(options.dataLabels.style.fontSize), 10),
            yShift = fontSize * 0.3,
            x = drawingWidth;
            unitHeight = drawingHeight / sumValues;
            lastRadius = 0;

            each(data, function(point) {


                //code for slicing drawing
                if (point.isSliced) {
                    xPos = point.x;
                    if (xPos && !slicingGapPosition[xPos]) {
                        slicingGapPosition[xPos] = true;
                        noOfGap += 1;
                    }
                    if (xPos < lastIndex) {
                        slicingGapPosition[xPos + 1] = true;
                        noOfGap += 1;
                    }

                }




                //(drawingWidth * totalValues / sumValues)
                totalValues += point.y;
                newRadius = drawingWidth * totalValues / sumValues;
                sliceHeight = unitHeight * point.y;
                point.shapeArgs =
                {
                    x: x,
                    y: y,
                    R1: lastRadius,
                    R2: newRadius,
                    h: sliceHeight,
                    r3dFactor: yScale,
                    gStr: 'point',
                    is2D: is2d,
                    renderer: renderer
                }

                if (showLabelsAtCenter) {
                    point.labelAline = 'center';
                    //point.labelX = drawingWidth;
                    point.labelX = x;
                    point.labelY = (is2d ? y : y + (yScale * lastRadius)) + (sliceHeight / 2) + yShift;
                }
                else {
                    point.labelAline = 'left';
                    //point.labelX = drawingWidth;
                    point.labelX = x + labelDistance + (lastRadius + newRadius) / 2 + blankSpace;
                    point.labelY = y + yShift + (sliceHeight / 2);
                }

                y += sliceHeight;
                point.plotX = x;
                point.plotY = y - sliceHeight / 2;
                lastRadius = newRadius;
            });
            series._temp = {
                slicingGapPosition: slicingGapPosition,
                noOfGap: noOfGap
            };
        }
    });

    // 4 - add the constractor
    seriesTypes.pyramid = Pyramid;




    /* ****************************************************************************
     * Start Bulb series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.bulb = merge(defaultPlotOptions.pie, {
        states: {
            hover: {}
        }
    });


    var Bulb = Highcharts.extendClass(seriesTypes.pie, {
        type: 'bulb',

        /**
         * Draw the markers
         */
        drawPoints: function() {
            var series = this,
            pointAttr,
            data = series.data,
            chart = series.chart,
            options = series.options,
            chartOptions = chart.options.chart,
            point,
            graphic,
            gaugeRadius = chartOptions.gaugeRadius,
            gaugeOriginX = chartOptions.gaugeOriginX,
            gaugeOriginY = chartOptions.gaugeOriginY;


            point = data[0];
            graphic = point.graphic;

            // only draw the point if y is defined
            if (point.y !== UNDEFINED && !isNaN(point.y)) {
                // shortcuts
                pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE];

                pointAttr = {
                    r: gaugeRadius,
                    fill: point.color,
                    stroke: point.borderColor,
                    'stroke-linecap': 'round',
                    'stroke-width': point.borderWidth
                };

                // Data Label x y
                point.plotX = gaugeOriginX;
                point.plotY = gaugeOriginY;
                // Gauge radius
                point.radius = gaugeRadius;

                if (graphic) { // update
                    graphic.animate({
                        x: gaugeOriginX,
                        y: gaugeOriginY,
                        r: gaugeRadius
                    });
                }
                else {
                    point.graphic = chart.renderer.symbol(
                        'circle',
                        gaugeOriginX,
                        gaugeOriginY,
                        gaugeRadius
                        )
                    .attr(pointAttr)
                    .add(series.chart.seriesGroup);
                }
            }
        },

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            chartOptions = chart.options.chart,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            labelY;

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .add();
            }

            if (!chartOptions.placeValuesInside) {
                labelY = point.plotY + point.radius + chartOptions.valuePadding + chartOptions.labelLineHeight * 1;
            } else {
                labelY = (point.plotY + chartOptions.labelLineHeight * 1) - chartOptions.valueTextHeight / 2

            }

            // only draw the point if y is defined
            if (point.y !== UNDEFINED && !isNaN(point.y)) {

                point.dataLabel = chart.renderer.text(point.displayValue, point.plotX, labelY)
                .attr({
                    align: 'center'
                })
                .css(options.dataLabels.style)
                .add(dataLabelsGroup);
            }
        },

        animate: function(init) {
            var series = this,
            i,
            point,
            graphic,
            l = series.data.length,
            animation = series.options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            //animate points

            point = series.data[0];
            graphic = point && point.graphic;
            if (graphic){
                if (!graphic.isAnimating) { // apply it only for one of the series
                    graphic.isAnimating = true;
                    graphic.attr( {
                        r : 0
                    });
                    graphic.animate({
                        r : point.radius
                    }, animation);
                }
            }
            this.animate = null;
        },
        realtimeUpdate: function (updateObj) {

            var series = this,
            chart = series.chart,
            options = chart.options,
            chartOptions = options.chart,
            point = series && series.data && series.data[0],
            colorObj = {}, fillColor, defaultPointColor,
            NumberFormatter = options.instanceAPI.numberFormatter,
            getPointColor = options.instanceAPI.getPointColor,
            colorRangeGetter = options.instanceAPI.colorRangeGetter,
            displayValue, tooltipText, colorRangeReturnedObj,
            values = updateObj.values || [],
            labels = updateObj.labels || [],
            toolTexts = updateObj.toolTexts || [],
            showLabels = updateObj.showLabels || [];

            if (point) {
                if (values[0]) {
                    colorRangeReturnedObj = colorRangeGetter.getColorObj(NumberFormatter.getCleanValue(values[0]));

                    colorObj = colorRangeReturnedObj.isOnMeetPoint ? colorRangeReturnedObj.nextObj : colorRangeReturnedObj.colorObj;

                    // color range not defined
                    // here will be more cases
                    if (!colorObj) {
                        colorObj = colorRangeReturnedObj.nextObj ||
                        colorRangeReturnedObj.prevObj;
                    }

                    defaultPointColor = chartOptions.defaultColors[colorRangeReturnedObj.index % options.defaultColLen];

                    fillColor = getPointColor(pluck(colorObj.code, defaultPointColor), chartOptions.gaugeFillAlpha, chartOptions.is3D);

                    // Update the Graphics
                    point.graphic.attr({
                        fill: fillColor
                    });
                }

                if (colorObj && chartOptions.useColorNameAsValue) {
                    displayValue = pluck(colorObj.name , colorObj.label, labels[0]);
                } else {
                    displayValue = pluck(labels[0], NumberFormatter.dataLabels(values[0]));
                }

                if (displayValue !== undefined) {
                    // Update the dataLabel text
                    if (showLabels[0] == 0) {
                        displayValue = "";
                    }
                    point.dataLabel.attr({
                        text: displayValue
                    });
                }

                displayValue = pluck(toolTexts[0], NumberFormatter.dataLabels(values[0]));

                if (displayValue !== undefined) {
                    point.toolText = displayValue;
                    chart.tooltip && chart.tooltip.refresh(point, true);
                }
            }
        },

        drawGraph: function () {

        },

        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;


            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');


                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }

            this.drawGraph();

            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        }

    });

    // 4 - add the constractor
    seriesTypes.bulb = Bulb;



    /* ****************************************************************************
     * Start LED series code (to render VLED and HLED chart type)                *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.led = merge(defaultPlotOptions.bulb, {
        states: {
            hover: {}
        }
    });


    //helper function to draw Funnel && pyramid shape
    var drawLED = (function () {
        //list of attr that will handled here
        var attrList = {
            value : true
        },
        blankArr = [],
        attr = function (hash, val) {
            var key,
            value,
            element = this,
            color,
            alpha,
            attr3D = this['_3dAttr'],
            lightedLed,
            lightedLedLength;

            // single key-value pair
            if (isString(hash) && defined(val)) {
                key = hash;
                hash = {};
                hash[key] = val;
            }

            // used as a getter: first argument is a string, second is undefined
            if (isString(hash)) {
                //if belongs from the list then handle here
                if (attrList[hash]) {
                    element = element['_3dAttr'][hash];
                }
                else {//else leve for the original attr
                    element = element['_attr'](hash);
                }

            // setter
            }else {
                for (key in hash) {
                    value = hash[key];

                    //if belongs from the list then handle here
                    if (attrList[key]) {
                        if (value >= attr3D.minValue && value <= attr3D.maxValue) {
                            //store for getter
                            attr3D[key] = value;
                            lightedLed = (value - attr3D.minValue) / attr3D.perLEDValueLength;
                            lightedLedLength  = (Math.round(lightedLed) * attr3D.sizeGapSum) - attr3D.ledGap;
                            if (attr3D.LEDCase) {
                                var colorArr = element.colorArr,i = 0, ln = colorArr.length, colorObj,
                                hoverZone, hideShowFN;
                                for (i = 0; i < ln; i += 1) {
                                    colorObj = colorArr[i];
                                    if (colorObj.maxLEDNoFrac <= lightedLed) {
                                        hideShowFN = attr3D.LEDLowerFN;
                                    }
                                    else if (!hoverZone) {
                                        hideShowFN = undefined;
                                        hoverZone = colorObj;
                                    }
                                    else {
                                        hideShowFN = attr3D.LEDUpperFN
                                    }
                                    if (hideShowFN) {
                                        colorObj[hideShowFN]();
                                        if (hideShowFN === 'show') {
                                            colorObj.attr(colorObj.oriShapeArg );
                                        }
                                    }
                                }
                                //fix FWXT-255 issue
                                if (!hoverZone) {
                                    hoverZone = colorObj;
                                }
                                hoverZone.show();
                                hoverZone.attr(hoverZone.hoverShapeArg );

                            }

                            //position the darkShade
                            //position the darkShade
                            if (element.darkShade) {
                                var darkShadeAttr = {};
                                if (attr3D.isXChange) {
                                    darkShadeAttr.width = attr3D.w - lightedLedLength;
                                    if (attr3D.isIncrement) {
                                        darkShadeAttr.x = attr3D.x + lightedLedLength;
                                    }
                                }
                                else {
                                    darkShadeAttr.height = attr3D.h - lightedLedLength;
                                    if (attr3D.isIncrement) {
                                        darkShadeAttr.y = attr3D.y + lightedLedLength;
                                    }
                                }
                                element.darkShade.attr(darkShadeAttr);
                            }
                        }
                    }
                    else {//else leave for the original attr
                        this['_attr'](key, value);
                    }
                }
            }
            return element;
        },

        shadow = function () {
        };

        //type [1=> L to R, 2=> T to B, 3 => R to L, 4 => B to T]
        return function (x, y, w, h, gStr, renderer, value, gaugeFillColor,
            gaugeBorderColor, gaugeBorderAlpha, gaugeBorderThickness, colorRangeManager,
            minValue, maxValue, useSameFillColor, useSameFillBgColor, ledSize, ledGap, type, shadow) {
            if (isObject(x)) {
                y = x.y;
                w = x.w;
                h = x.h;
                gStr = x.gStr;
                renderer = x.renderer;
                value = x.value;
                gaugeFillColor = x.gaugeFillColor;
                gaugeBorderColor = x.gaugeBorderColor;
                gaugeBorderAlpha = x.gaugeBorderAlpha;
                gaugeBorderThickness = x.gaugeBorderThickness;
                colorRangeManager = x.colorRangeManager;
                minValue = x.minValue;
                maxValue = x.maxValue;
                useSameFillColor = x.useSameFillColor;
                useSameFillBgColor = x.useSameFillBgColor;
                ledSize = x.ledSize;
                ledGap = x.ledGap;
                type = x.type;
                x = x.x;
            }
            if (!(value >= minValue && value <= maxValue)) {
                value = minValue;
            }
            gaugeFillColor = pluck(gaugeFillColor, 'FFFFFF');
            gaugeBorderColor = pluck(gaugeBorderColor, '000000').replace(dropHash, HASHSTRING);
            gaugeBorderAlpha = pluckNumber(gaugeBorderAlpha, 1);
            gaugeBorderThickness = pluck(gaugeBorderThickness, '000000');
            var wrapperAttr = {
                x : x,
                y : y,
                w : w,
                h : h,
                gStr : gStr,
                renderer : renderer,
                value : value,
                gaugeFillColor : gaugeFillColor,
                gaugeBorderColor : gaugeBorderColor,
                gaugeBorderAlpha : gaugeBorderAlpha,
                gaugeBorderThickness : gaugeBorderThickness,
                colorRangeManager : colorRangeManager,
                minValue : minValue,
                maxValue : maxValue,
                ledGap : ledGap,
                ledSize : ledSize,
                type : type,
                useSameFillColor : useSameFillColor,
                useSameFillBgColor : useSameFillBgColor
            },
            wrapper = renderer.g(gStr);


            //modify the attr function of the group so that it can handle pyramid attrs
            //store the old function
            wrapper['_attr'] = wrapper.attr;
            wrapper.attr = attr;

            // Replace the shadow function with a modified version.
            wrapper.shadow = shadow;

            //store the 3d attr(requared in new attr function to change any related
            //                  attr modiffiaction)
            wrapper._3dAttr = wrapperAttr;

            //draw cylender
            var colorRange = colorRangeManager.getColorRangeArr(minValue, maxValue),
            lastX = x, lastY = y, isIncrement = true, isXChange = true,
            LEDlength = (type === 2 || type === 4) ? h : w,
            sizeGapSum = ledGap + ledSize,
            ledGapHalf = ledGap / 2,
            ledGapQuarter = ledGapHalf / 2,
            remaningLength = LEDlength - ledSize,
            noOfLED,
            valueDistance = maxValue - minValue,
            perLEDValueLength,
            pathCommand,
            colorObj,
            i = 0, ln = colorRange.length,
            extraSpace = 0,
            colorLED,
            colorLEDLength,
            colorLedLengthPX,
            oriShapeArg,
            hoverShapeArg,
            colorRect,
            LEDDrawn = 0,
            LEDCase = 0,
            changeHoverArgs = false,
            LEDLowerFN = 'show',
            LEDUpperFN = 'show',
            LEDGapStartX = x,
            LEDGapStartY = y;

            if (useSameFillColor) {
                LEDCase += 1;
                LEDLOwerFN = 'hide';
            }
            if (useSameFillBgColor) {
                LEDCase += 2;
                LEDUpperFN = 'hide';
            }

            if (remaningLength < 0) {
                noOfLED = 1;
                ledSize = LEDlength;
            }
            else {
                noOfLED =  parseInt(remaningLength / sizeGapSum, 10) + 1;
                extraSpace = remaningLength % sizeGapSum;
                //devide the extra space amont all the LED
                ledSize += extraSpace / noOfLED;
                sizeGapSum = ledSize + ledGap;
            }
            perLEDValueLength = valueDistance / noOfLED;
            wrapper.colorArr = [];
            pathCommand = [];
            if (type === 1) {
                LEDGapStartX += sizeGapSum - (ledGap / 2);
            }
            else if (type === 2) {
                isXChange = false;
                LEDGapStartY += sizeGapSum - (ledGap / 2);

            }
            else if (type === 3) {
                lastX = x + w;
                isIncrement = false;
                LEDGapStartX += sizeGapSum - (ledGap / 2);

            }
            else {
                lastY = y + h;
                isIncrement = false;
                isXChange = false;
                LEDGapStartY += sizeGapSum - (ledGap / 2);

            }

            //store the attribute
            wrapperAttr.ledGap = ledGap;
            wrapperAttr.ledSize = ledSize;
            wrapperAttr.sizeGapSum = sizeGapSum;
            wrapperAttr.perLEDValueLength = perLEDValueLength;
            wrapperAttr.isIncrement = isIncrement;
            wrapperAttr.isXChange = isXChange;
            wrapperAttr.LEDLowerFN = LEDLowerFN,
            wrapperAttr.LEDUpperFN = LEDUpperFN;
            wrapperAttr.LEDCase = LEDCase;


            if (LEDCase) {
                if (LEDCase === 3) {
                    hoverShapeArg = {
                        x : x,
                        y : y,
                        width : w,
                        height : h
                    };
                }
                else {
                    changeHoverArgs = true;
                }
            }


            //draw all color range and create the path command for gap
            for (; i < ln; i += 1) {
                colorObj = colorRange[i];
                if (colorObj && defined(colorObj.maxvalue)){
                    colorLED = Math.round((colorObj.maxvalue - minValue) / perLEDValueLength);
                    colorLEDLength = colorLED - LEDDrawn;
                    LEDDrawn = colorLED;
                    if (colorLEDLength > 0) {
                        oriShapeArg = {
                            r : 0
                        };
                        if (changeHoverArgs) {
                            hoverShapeArg = {};
                        }

                        colorLedLengthPX =  colorLEDLength * sizeGapSum;
                        if (isXChange) {
                            oriShapeArg.y = lastY;
                            oriShapeArg.width = colorLedLengthPX - ledGap;
                            oriShapeArg.height = h;
                            if (isIncrement) {
                                oriShapeArg.x =  lastX;
                                lastX += colorLedLengthPX;
                            }
                            else {
                                oriShapeArg.x =  lastX - oriShapeArg.width;
                                lastX -= colorLedLengthPX;
                            }

                            if (changeHoverArgs) {
                                hoverShapeArg.width = oriShapeArg.x - x;
                                if ((isIncrement && LEDCase === 1) || (!isIncrement && LEDCase === 2)) {
                                    hoverShapeArg.x = x;
                                    hoverShapeArg.width += oriShapeArg.width;
                                }
                                else {
                                    hoverShapeArg.width = w - hoverShapeArg.width;
                                }
                            }
                            //fix FWXT-415
                            if (i === 0 || i === ln -1) {
                                oriShapeArg.width += ledGapQuarter;
                                if ((isIncrement && i === ln -1) || (!isIncrement && i === 0)) {
                                    oriShapeArg.x -=  ledGapQuarter;
                                }
                            }
                            else {
                                oriShapeArg.width += ledGapHalf;
                                oriShapeArg.x -=  ledGapQuarter;
                            }
                        }
                        else {
                            oriShapeArg.x = lastX;
                            oriShapeArg.width = w;
                            oriShapeArg.height = colorLedLengthPX - ledGap;
                            if (isIncrement) {
                                oriShapeArg.y =  lastY;
                                lastY += colorLedLengthPX;
                            }
                            else {
                                oriShapeArg.y =  lastY - oriShapeArg.height;
                                lastY -= colorLedLengthPX;
                            }
                            if (changeHoverArgs) {
                                hoverShapeArg.height = oriShapeArg.y - y;
                                if ((isIncrement && LEDCase === 1) || (!isIncrement && LEDCase === 2)) {
                                    hoverShapeArg.y = y;
                                    hoverShapeArg.height += oriShapeArg.height;
                                }
                                else {
                                    hoverShapeArg.height = h - hoverShapeArg.height;
                                }
                            }
                            //fix FWXT-415
                            if (i === 0 || i === ln -1) {
                                oriShapeArg.height += ledGapQuarter;
                                if ((isIncrement && i === ln -1) || (!isIncrement && i === 0)) {
                                    oriShapeArg.y -=  ledGapQuarter;
                                }
                            }
                            else {
                                oriShapeArg.height += ledGapHalf;
                                oriShapeArg.y -=  ledGapQuarter;
                            }
                        }

                        colorRect = renderer.rect(oriShapeArg)
                        .attr ({
                            'stroke-width' : 0,
                            fill : convertColor(pluck(colorObj.code, '000000'), pluckNumber(colorObj.alpha, 100))
                        })
                        .add(wrapper)
                        colorRect.oriShapeArg = oriShapeArg;
                        colorRect.hoverShapeArg = hoverShapeArg;
                        colorRect.maxLEDNo = colorLED;
                        colorRect.maxLEDNoFrac = (colorObj.maxvalue - minValue) / perLEDValueLength;
                        wrapper.colorArr.push(colorRect)
                    }
                }
            }

            //draw the dark rect
            wrapper.darkShade = renderer.rect(x, y, w, h, 0)
            .attr({
                'stroke-width': 0,
                fill : convertColor(gaugeFillColor, 50)
            })
            .add(wrapper);


            //Draw the path for the gap
            for (i = 1; i < noOfLED; i += 1) {
                if (isXChange) {
                    pathCommand.push(M, LEDGapStartX, LEDGapStartY, L, LEDGapStartX, LEDGapStartY + h);
                    LEDGapStartX += sizeGapSum;
                }
                else {
                    pathCommand.push(M, LEDGapStartX, LEDGapStartY, L, LEDGapStartX + w, LEDGapStartY);
                    LEDGapStartY += sizeGapSum;
                }
            }


            wrapper.LEDGap = renderer.path(pathCommand)
            .attr({
                stroke: convertColor(gaugeFillColor, 100),
                'stroke-width': ledGap
            })
            .add(wrapper);

            //draw the border on top of every of thing
            wrapper.border = renderer.path([M, x, y, L, x + w, y, x + w, y + h, x, y + h, Z])
            .attr({
                stroke: convertColor(gaugeBorderColor, gaugeBorderAlpha),
                'stroke-width': gaugeBorderThickness
            })
            .add(wrapper);

            wrapper.attr({
                value : value
            })

            return wrapper;
        };
    })();


    LED = Highcharts.extendClass(seriesTypes.bulb, {
        type: 'led',

        drawPoints: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            LEDType,
            scale = chart.options.scale,
            maxValue = scale.max,
            minValue = scale.min,
            point = data[0],
            chartAPI = this.chart.options.instanceAPI,
            group = series.group,
            chartOptions = chart.options.chart,
            pointValue = point.y;
            point.minValue = minValue;
            point.maxValue = maxValue;

            if (chartAPI.isHorizontal) {
                LEDType = scale.reverseScale ? 3 : 1;
            }
            else {
                LEDType = scale.reverseScale ? 4 : 2;
            }

            //draw the LED first
            point.graphic = drawLED(0, 0, chart.plotSizeX, chart.plotSizeY, 'points-group', chart.renderer, pointValue, chartOptions.gaugeFillColor,
                chartOptions.gaugeBorderColor, chartOptions.gaugeBorderAlpha, chartOptions.gaugeBorderThickness, chartAPI.colorRangeGetter,
                minValue, maxValue, chartOptions.useSameFillColor, chartOptions.useSameFillBgColor, chartOptions.ledSize, chartOptions.ledGap, LEDType, options.shadow)
            .add(group);
            point.graphic.border && point.graphic.border.shadow(options.shadow, undefined, options.shadow);

            //then draw the Scale
            drawScale(chart.plotWidth, chart.plotHeight, chart.renderer, series, group);

        },
        realtimeUpdate: function (updateObj) {
            var series = this,
            chart = series && series.chart,
            point = series && series.data && series.data[0],
            NumberFormatter = this.chart.options.instanceAPI.numberFormatter,
            animation = chart.options.plotOptions.series.animation,
            animationOptions = {
                duration: animation ? updateObj.interval : 0
            },
            displayValue, tooltipText,
            values = updateObj.values || [],
            labels = updateObj.labels || [],
            showLabels = updateObj.showLabels || [],
            toolTexts = updateObj.toolTexts || [],
            itemValue = NumberFormatter.getCleanValue(values[0]);

            if (point) {
                var  minValue = point.minValue,
                maxValue = point.maxValue;

                if (itemValue >= minValue && itemValue <= maxValue) {
                    // Update the Graphics
                    animation && $(point.graphic).stop(true, true);
                    point.value = itemValue;
                    point.graphic.animate({
                        value: itemValue
                    }, animationOptions);
                    displayValue = pluck(labels[0], NumberFormatter.dataLabels(itemValue), point.dataLabel.textStr);
                    if (showLabels[0] == 0) {
                        displayValue = "";
                    }
                    // Update the dataLabel text
                    point.dataLabel && (displayValue !== undefined) && point.dataLabel.attr({
                        text: displayValue
                    });

                    tooltipText = pluck(toolTexts[0], NumberFormatter.dataLabels(itemValue))
                    if (tooltipText !== undefined) {
                        point.toolText = tooltipText;
                        chart.tooltip && chart.tooltip.refresh(point, true);
                    }
                }
            }
        },
        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            width = chart.plotWidth,
            height = chart.plotHeight,
            valuePadding = chart.options.chart.valuePadding,
            dataLabels = options.dataLabels,
            style = dataLabels.style;

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .translate(chart.plotLeft, chart.plotTop)
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .add();
            }

            // only draw the point if y is defined
            if (point.y !== UNDEFINED && !isNaN(point.y)) {
                point.dataLabel = chart.renderer.text(point.displayValue, width / 2, height + valuePadding)
                .attr({
                    align: dataLabels.align || POSITION_CENTER
                })
                .css(style)
                .add(dataLabelsGroup);

            }
        },



        animate: function(init) {
            var series = this,
            point,
            graphic,
            animation = series.options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            //animate points
            if (!init) {
                point = series.data[0];
                var  minValue = point.minValue,
                maxValue = point.maxValue,
                value;
                graphic = point && point.graphic;
                if (graphic){
                    value =  graphic.attr('value');
                    graphic.attr( {
                        value : minValue
                    });
                    graphic.animate({
                        value : value
                    }, animation);
                }
            }
        },
        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;


            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');


                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }

            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        }
    });

    // 4 - add the constractor
    seriesTypes.led = LED;



    /* ****************************************************************************
     * Start Cylinder series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.cylinder = merge(defaultPlotOptions.bulb, {
        states: {
            hover: {}
        }
    });




    //helper function to draw CylenderShape shape
    var drawCylinder = (function () {
        //list of attr that will handled here
        var attrList = {
            fulidHRatio : true,
            color : true,
            alpha : true,
            fill : true
        },
        blankArr = [],
        attr = function (hash, val) {

            var key,
            value,
            element = this,
            color,
            alpha,
            colorObject,
            colorChanged = false,
            shapeChanged = false,
            attr3D = this['_3dAttr'];

            // single key-value pair
            if (isString(hash) && defined(val)) {
                key = hash;
                hash = {};
                hash[key] = val;
            }

            // used as a getter: first argument is a string, second is undefined
            if (isString(hash)) {
                //if belongs from the list then handle here
                if (attrList[hash]) {
                    element = element['_3dAttr'][hash];
                }
                else {//else leve for the original attr
                    element = element['_attr'](hash);
                }

            // setter
            } else {
                for (key in hash) {
                    value = hash[key];

                    //if belongs from the list then handle here
                    if (attrList[key]) {
                        //if it is 'fill' or 'lighting3D' the redefine the colors for all the 3 elements
                        if (key === 'fill') {
                            if (value && value.linearGradient && value.stops && value.stops[0]) {
                                value = value.stops[0][1];
                            }

                            if (startsRGBA.test(value)) {
                                colorObject = Color(value);
                                color = colorObject.get('hex');
                                alpha = colorObject.get('a') * 100;
                            }
                            else if (value && value.FCcolor) {
                                color = value.FCcolor.color.split(COMMASTRING)[0];
                                alpha = value.FCcolor.alpha.split(COMMASTRING)[0]
                            }
                            else if (hexcode.test(value)) {
                                color = value.replace(dropHash, HASHSTRING);
                            }
                            attr3D.fluidColor = pluck(color, attr3D.fluidColor, '000000');
                            attr3D.fluidAlpha = pluckNumber(alpha, attr3D.fluidAlpha, 100);
                            colorChanged = true;
                        }
                        else if (key === 'color') {
                            attr3D.fluidColor = pluck(value, attr3D.fluidColor, '000000');
                            colorChanged = true;
                        }
                        else if (key === 'alpha') {
                            attr3D.fluidAlpha = pluckNumber(value, attr3D.fluidAlpha, 100);
                            colorChanged = true;
                        }
                        else if (value >= 0 && value <= 1){
                            attr3D.fulidHRatio = value
                            shapeChanged = true;
                        }
                        if (colorChanged) {
                            var fluidDarkColor = getDarkColor(attr3D.fluidColor, 70),
                            fluidLightColor = getLightColor(attr3D.fluidColor, 70),
                            darkColor = getDarkColor(attr3D.conColor, 80),
                            lightColor = getLightColor(attr3D.conColor, 80),
                            alphaStr;
                            alpha = attr3D.fluidAlpha;
                            alphaStr = alpha + COMMASTRING + alpha;
                            //draw the fluid fill
                            element.fluid.attr({
                                'stroke-width' : 0,
                                fill : {
                                    FCcolor : {
                                        gradientUnits : 'objectBoundingBox',
                                        cx: 0.5,
                                        cy: 0,
                                        r: '100%',
                                        color :  fluidLightColor + COMMASTRING + fluidDarkColor,
                                        alpha : alphaStr,
                                        ratio : '0,100',
                                        radialGradient : true
                                    }
                                }
                            });

                            //draw the fluid top
                            element.fluidTop.attr({
                                'stroke-width' : 3,
                                stroke : convertColor(fluidLightColor, alpha),
                                fill : {
                                    FCcolor : {
                                        gradientUnits : 'objectBoundingBox',
                                        cx: 0.5,
                                        cy: 0.7,
                                        r: '100%',
                                        color :  fluidLightColor + COMMASTRING + fluidDarkColor,
                                        alpha : alphaStr,
                                        ratio : '0,100',
                                        radialGradient : true
                                    }
                                }
                            });

                            element.btnBorderLight.attr({
                                fill : {
                                    FCcolor : {
                                        color : lightColor + COMMASTRING + darkColor + COMMASTRING + lightColor +
                                        COMMASTRING + lightColor + COMMASTRING + darkColor + COMMASTRING +
                                        fluidDarkColor + COMMASTRING + darkColor + COMMASTRING + lightColor,
                                        alpha : '50,50,50,50,50,'+ (alpha * 0.7) + ',50,50',
                                        ratio : '0,15,0,12,0,15,43,15',
                                        angle : 0
                                    }
                                }
                            })
                        }
                        if (shapeChanged) {
                            var x = attr3D.x,
                            r = attr3D.r,
                            fluidStroke = attr3D.fluidStroke,
                            fluidStrHF = fluidStroke / 2,
                            hF = attr3D.h * attr3D.fulidHRatio,
                            x1 = x - r,
                            x2 = x + r,
                            x3 = x1 + fluidStrHF,
                            x4 = x2 - fluidStrHF,
                            y2 = attr3D.y + attr3D.h,
                            y3 = y2 - hF,
                            r2 = r * attr3D.r3dFactor,
                            r3 = r - fluidStrHF,
                            getArcPath = attr3D.renderer.getArcPath;
                            //draw the fluid fill
                            element.fluid.attr({
                                d : blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x2, y2, r, r2, 0, 0),
                                    [L, x2, y3], getArcPath(x, y3, x2, y3, x1, y3, r, r2, 1, 0),[Z])
                            });

                            //draw the fluid top
                            element.fluidTop.attr({
                                d : blankArr.concat([M, x3, y3], getArcPath(x, y3, x3, y3, x4, y3, r3, r2, 0, 0),
                                    [L, x4, y3], getArcPath(x, y3, x4, y3, x3, y3, r3, r2, 0, 0),[Z])
                            });
                        }
                    }
                    else {//else leave for the original attr
                        this['_attr'](key, value);
                    }
                }
            }
            return element;
        },

        shadow = function () {
        };

        return function (x, y, r, h, r3dFactor, gStr, renderer, fulidHRatio, conColor, conAlpha, fluidColor, fluidAlpha) {

            if (isObject(x)) {
                y = x.y;
                r = x.r;
                h = x.h;
                r3dFactor = x.r3dFactor;
                gStr = x.gStr;
                renderer = x.renderer;
                fulidHRatio = x.fulidHRatio;
                conColor = x.conColor;
                conAlpha = x.conAlpha;
                fluidColor = x.fluidColor;
                fluidAlpha = x.fluidAlpha;
                x = x.x;
            }
            r3dFactor = pluckNumber(r3dFactor, 0.15);
            if (!(fulidHRatio >= 0 && fulidHRatio <= 1)) {
                fulidHRatio = 0;
            }
            conColor = pluck(conColor, 'FFFFFF');
            conAlpha = pluckNumber(conAlpha, 30);
            fluidColor = pluck(fluidColor, '000000');
            fluidAlpha = pluckNumber(fluidAlpha, 100);
            var fluidStroke = 3,
            _3dAttr = {
                x : x,
                y : y,
                r : r,
                h : h,
                r3dFactor : r3dFactor,
                renderer : renderer,
                fulidHRatio : fulidHRatio,
                conColor : conColor,
                conAlpha : conAlpha,
                fluidStroke : fluidStroke,
                fluidColor : fluidColor,
                fluidAlpha : fluidAlpha
            },
            getArcPath = renderer.getArcPath,
            rect3D = renderer.g(gStr);


            //modify the attr function of the group so that it can handle pyramid attrs
            //store the old function
            rect3D['_attr'] = rect3D.attr;
            rect3D.attr = attr;

            // Replace the shadow function with a modified version.
            rect3D.shadow = shadow;

            //store the 3d attr(requared in new attr function to change any related
            //                  attr modiffiaction)
            rect3D._3dAttr = _3dAttr;

            //draw cylender
            var r2 = r * r3dFactor,
            fluidStrHF = fluidStroke / 2,
            r3 = r - fluidStrHF,
            y2 = y + h,
            hF = h * fulidHRatio,
            y3 = y2 - hF,
            x1 = x - r,
            x2 = x + r,
            x3 = x1 + fluidStrHF,
            x4 = x2 - fluidStrHF,
            xBt1 = x1 - 2,
            xBt2 = x2 + 2,
            rBt1 = r + 2,
            rBt2 = r2 + 2,
            yBt1 = y2 + 4,
            yBt2 = yBt1 + 0.001,
            yBt3 = yBt1 + 1,
            darkColor = getDarkColor(conColor, 80),
            darkColor1 = getDarkColor(conColor, 90),
            lightColor = getLightColor(conColor, 80),
            fluidDarkColor = getDarkColor(fluidColor, 70),
            fluidLightColor = getLightColor(fluidColor, 70),
            lightX = r * 0.85,
            x5 = x - lightX,
            x6 = x + lightX,
            lightY = Math.sqrt((1 - ((lightX * lightX) / (r * r))) * r2 * r2),
            y4 = y + lightY,
            y5 = y2 + lightY,
            y6 = y - 1;

            //draw the bottom border
            rect3D.btnBorder = renderer.path(blankArr.concat([M, xBt1, yBt1], getArcPath(x, yBt1, xBt1, yBt1, xBt2, yBt1, rBt1, rBt2, 0, 0),
                [L, xBt2, yBt2], getArcPath(x, yBt2, xBt2, yBt2, xBt1, yBt2, rBt1, rBt2, 0, 0),[Z]))
            .attr({
                'stroke-width' : 4,
                stroke : convertColor(darkColor, 80)
            })
            .add(rect3D);

            //draw the bottom border1
            rect3D.btnBorder1 = renderer.path(blankArr.concat([M, x1, yBt1], getArcPath(x, yBt1, x1, yBt1, x2, yBt1, r, r2, 0, 0),
                [L, x2, yBt2], getArcPath(x, yBt2, x2, yBt2, x1, yBt2, r, r2, 0, 0),[Z]))
            .attr({
                'stroke-width' : 4,
                stroke : convertColor(darkColor, 50)
            })
            .add(rect3D);

            //draw the bottom border light
            rect3D.btnBorderLight = renderer.path(blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x2, y2, r, r2, 0, 0),
                [L, x2, yBt3], getArcPath(x, yBt3, x2, yBt3, x1, yBt3, r, r2, 1, 0),[Z]))
            .attr({
                'stroke-width' : 0,
                fill : {
                    FCcolor : {
                        color : lightColor + COMMASTRING + darkColor + COMMASTRING + lightColor +
                        COMMASTRING + lightColor + COMMASTRING + darkColor + COMMASTRING +
                        fluidDarkColor + COMMASTRING + darkColor + COMMASTRING + lightColor,
                        alpha : '50,50,50,50,50,70,50,50',
                        ratio : '0,15,0,12,0,15,43,15',
                        angle : 0
                    }
                }
            })
            .add(rect3D);

            //draw the back side
            rect3D.back = renderer.path(blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x2, y2, r, r2, 1, 0),
                [L, x2, y], getArcPath(x, y, x2, y, x1, y, r, r2, 0, 0),[Z]))
            .attr({
                'stroke-width' : 1,
                stroke : convertColor(darkColor, 50),
                fill : {
                    FCcolor : {
                        color : lightColor + COMMASTRING + darkColor + COMMASTRING + lightColor +
                        COMMASTRING + darkColor + COMMASTRING + darkColor1 + COMMASTRING + darkColor1 + COMMASTRING + darkColor + COMMASTRING + lightColor,
                        alpha : '30,30,30,30,30,30,30,30',
                        ratio : '0,15,43,15,0,12,0,15',
                        angle : 0
                    }
                }
            })
            .add(rect3D);

            //draw the fluid fill
            rect3D.fluid = renderer.path(blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x2, y2, r, r2, 0, 0),
                [L, x2, y3], getArcPath(x, y3, x2, y3, x1, y3, r, r2, 1, 0),[Z]))
            .attr({
                'stroke-width' : 0,
                fill : {
                    FCcolor : {
                        gradientUnits : 'objectBoundingBox',
                        cx: 0.5,
                        cy: 0,
                        r: '100%',
                        color :  fluidLightColor + COMMASTRING + fluidDarkColor,
                        alpha : '100,100',
                        ratio : '0,100',
                        radialGradient : true
                    }
                }
            })
            .add(rect3D);

            //draw the fluid top
            rect3D.fluidTop = renderer.path(blankArr.concat([M, x3, y3], getArcPath(x, y3, x3, y3, x4, y3, r3, r2, 0, 0),
                [L, x4, y3], getArcPath(x, y3, x4, y3, x3, y3, r3, r2, 0, 0),[Z]))
            .attr({
                'stroke-width' : 3,
                stroke : convertColor(fluidLightColor, 100),
                fill : {
                    FCcolor : {
                        gradientUnits : 'objectBoundingBox',
                        cx: 0.5,
                        cy: 0.7,
                        r: '100%',
                        color :  fluidLightColor + COMMASTRING + fluidDarkColor,
                        alpha : '100,100',
                        ratio : '0,100',
                        radialGradient : true
                    }
                }
            })
            .add(rect3D);


            //draw the front side
            rect3D.front = renderer.path(blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x2, y2, r, r2, 0, 0),
                [L, x2, y], getArcPath(x, y, x2, y, x1, y, r, r2, 1, 0),[Z]))
            .attr({
                'stroke-width' : 1,
                stroke : convertColor(darkColor, 50),
                fill : {
                    FCcolor : {
                        color : lightColor + COMMASTRING + darkColor + COMMASTRING + lightColor +
                        COMMASTRING + lightColor + COMMASTRING + darkColor + COMMASTRING +
                        lightColor + COMMASTRING + darkColor + COMMASTRING + lightColor,
                        alpha : '30,30,30,30,30,30,30,30',
                        ratio : '0,15,0,12,0,15,43,15',
                        angle : 0
                    }
                }
            })
            .add(rect3D);

            //draw the front light left
            rect3D.frontLight = renderer.path(blankArr.concat([M, x1, y2], getArcPath(x, y2, x1, y2, x5, y5, r, r2, 0, 0),
                [L, x5, y4], getArcPath(x, y, x5, y4, x1, y, r, r2, 1, 0),[Z]))
            .attr({
                'stroke-width' : 0,
                stroke : '#' + darkColor,
                fill : {
                    FCcolor : {
                        color : lightColor + COMMASTRING + darkColor,
                        alpha : '40,0',
                        ratio : '0,100',
                        angle : 0
                    }
                }
            })
            .add(rect3D);

            //draw the front light right
            rect3D.frontLight1 = renderer.path(blankArr.concat([M, x6, y5], getArcPath(x, y2, x6, y5, x2, y2, r, r2, 0, 0),
                [L, x2, y], getArcPath(x, y, x2, y, x6, y4, r, r2, 1, 0),[Z]))
            .attr({
                'stroke-width' : 0,
                stroke : '#' + darkColor,
                fill : {
                    FCcolor : {
                        color : lightColor + COMMASTRING + darkColor,
                        alpha : '40,0',
                        ratio : '0,100',
                        angle : 180
                    }
                }
            })
            .add(rect3D);

            //draw the cylender top line
            rect3D.cylinterTop = renderer.path(blankArr.concat([M, x1, y6], getArcPath(x, y6, x1, y6, x2, y6, r, r2, 0, 0),
                [L, x2, y6], getArcPath(x, y6, x2, y6, x1, y6, r, r2, 0, 0),[Z]))
            .attr({
                'stroke-width' : 2,
                stroke : convertColor(darkColor, 40)

            })
            .add(rect3D);
            return rect3D;
        };
    })(),


    Cylinder = Highcharts.extendClass(seriesTypes.bulb, {
        type: 'cylinder',

        drawPoints: function() {
            var series = this,
            pointAttr,
            data = series.data,
            chart = series.chart,
            renderer = chart.renderer,
            gaugeHeight = chart.plotHeight,
            gaugeWidth = chart.plotWidth,
            scale = chart.options.scale,
            maxValue = scale.max,
            minValue = scale.min,

            options = series.options,
            chartOptions = chart.options.chart,

            graphic,
            colorRangeObj, fillColor,
            gaugeRadius = options.gaugeRadius,
            gaugeOriginX = options.gaugeOriginX,
            gaugeOriginY = options.gaugeOriginY,
            point = data[0],
            pointValue = pluckNumber(point.y, minValue),
            fulidHRatio = (pointValue - minValue) / (maxValue - minValue);

            point.minValue = minValue;
            point.maxValue = maxValue;
            point.fulidHRatio = fulidHRatio;

            //drawCylinder = new drawCylinder;
            //return function (x, y, r, h, r3dFactor, gStr, renderer, fulidHRatio, conColor, conAlpha, fluidColor, fluidAlpha) {
            point.graphic = drawCylinder(chartOptions.cylRadius, 0,
                chartOptions.cylRadius, chartOptions.cylHeight, chartOptions.cylYScale, 'points-group', chart.renderer, fulidHRatio, chartOptions.cylGlassColor, '100', chartOptions.cylFillColor, '100')
            .add(series.group);

            drawScale(chart.plotWidth, chart.plotHeight, chart.renderer, series, series.group);
        },

        realtimeUpdate: function (updateObj) {
            var series = this,
            point = series && series.data && series.data[0],
            chart = series.chart,
            NumberFormatter = chart.options.instanceAPI.numberFormatter,
            animation = chart.options.plotOptions.series.animation,
            animationOptions = {
                duration: animation ? updateObj.interval : 0
            },
            values = updateObj.values || [],
            displayValue, tooltipText,
            labels = updateObj.labels || [],
            showLabels = updateObj.showLabels || [],
            toolTexts = updateObj.toolTexts || [];

            if (point) {
                var  minValue = point.minValue,
                maxValue = point.maxValue,
                itemVal, fulidHRatio;

                itemVal = NumberFormatter.getCleanValue(values[0]);
                fulidHRatio = (itemVal - minValue) / (maxValue - minValue);

                if (itemVal === null || (!(fulidHRatio < 0 || fulidHRatio > 1))) {

                    // Update the Graphics
                    animation && $(point.graphic).stop(true, true);
                    point.graphic.animate({
                        fulidHRatio : fulidHRatio
                    }, animationOptions);

                    displayValue = pluck(labels[0], NumberFormatter.dataLabels(itemVal));
                    tooltipText = pluck(toolTexts[0], NumberFormatter.dataLabels(itemVal));

                    if (tooltipText !== undefined) {
                        point.toolText = tooltipText;
                        chart.tooltip && chart.tooltip.refresh(point, true);
                    }

                    if (point.dataLabel && displayValue !== undefined) {
                        if (showLabels[0] == 0) {
                            displayValue = "";
                        }
                        point.dataLabel.attr({
                            text: displayValue
                        });
                    }
                }
            }
        },

        //TODO: changed this by the LED drawDataLabels

        drawDataLabels: function() {

            var series = this,
            data = series.data,
            chart = series.chart,
            gaugeHeight = chart.plotHeight,
            gaugeWidth = chart.plotWidth,
            chartOptions = chart.options.chart,

            options = series.options,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            labelY, labelX,
            style = options.dataLabels.style,
            lineHeight = parseInt(style.lineHeight);

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .translate(chart.plotLeft, chart.plotTop)
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .add();
            }

            labelY = chart.plotHeight + chartOptions.yScaleRadius + chartOptions.valuePadding + lineHeight * 0.37;
            labelX = chart.plotWidth / 2;
            // only draw the point if y is defined
            if (point.y !== UNDEFINED && !isNaN(point.y)) {
                point.dataLabel = chart.renderer.text(point.displayValue, labelX, labelY)
                .attr({
                    align: 'center'
                })
                .css(style)
                .add(dataLabelsGroup);
                // Adjusting the chart label if goes out side the chart area
                // we try to keep the label inside viewport
                var labelBBox = point.dataLabel.getBBox(), labelWidth;
                if (labelBBox.x < 0) {
                    labelWidth = labelBBox.width - chart.plotLeft;
                    if(chart.chartWidth < labelWidth) {
                        labelWidth = chart.chartWidth - chart.plotLeft;
                    }
                    point.dataLabel.attr({
                        x : labelWidth/2
                    });
                }

            }

        },



        animate: function(init) {
            var series = this,
            point,
            graphic,
            animation = series.options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            //animate points

            point = series.data[0];
            graphic = point && point.graphic;
            if (graphic){
                if (!graphic.isAnimating) { // apply it only for one of the series
                    graphic.isAnimating = true;
                    graphic.attr( {
                        fulidHRatio : 0
                    });
                    graphic.animate({
                        fulidHRatio : point.fulidHRatio
                    }, animation);
                }
            }
            this.animate = null;
        },

        // Temporary disable tooltip by creating blank drawTracker()
        drawTracker: function () {

        },
        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;


            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');


                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }

            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        }
    });

    // 4 - add the constractor
    seriesTypes.cylinder = Cylinder;






    /* ****************************************************************************
     * Start Thermometer series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.thermometer = merge(defaultPlotOptions.bulb, {
        states: {
            hover: {}
        }
    });


    //helper function to draw Funnel && pyramid shape
    var drawThermometer = (function () {
        //list of attr that will handled here
        var attrList = {
            fulidHRatio : true,
            fluidColor : true,
            fluidAlpha : true,
            fluidFill : true
        },
        blankArr = [],
        attr = function (hash, val) {
            var key,
            value,
            element = this,
            color,
            alpha,
            colorObject,
            colorChanged = false,
            shapeChanged = false,
            attr3D = this['_3dAttr'],
            getArcPath = attr3D.renderer.getArcPath;

            // single key-value pair
            if (isString(hash) && defined(val)) {
                key = hash;
                hash = {};
                hash[key] = val;
            }

            // used as a getter: first argument is a string, second is undefined
            if (isString(hash)) {
                //if belongs from the list then handle here
                if (attrList[hash]) {
                    element = element['_3dAttr'][hash];
                }
                else {//else leve for the original attr
                    element = element['_attr'](hash);
                }

            // setter
            } else {
                for (key in hash) {
                    value = hash[key];

                    //if belongs from the list then handle here
                    if (attrList[key]) {
                        //if it is 'fill' or 'lighting3D' the redefine the colors for all the 3 elements
                        if (key === 'fluidFill') {
                            if (value && value.linearGradient && value.stops && value.stops[0]) {
                                value = value.stops[0][1];
                            }

                            if (startsRGBA.test(value)) {
                                colorObject = Color(value);
                                color = colorObject.get('hex');
                                alpha = colorObject.get('a') * 100;
                            }
                            else if (value && value.FCcolor) {
                                color = value.FCcolor.color.split(COMMASTRING)[0];
                                alpha = value.FCcolor.alpha.split(COMMASTRING)[0]
                            }
                            else if (hexcode.test(value)) {
                                color = value.replace(dropHash, HASHSTRING);
                            }
                            attr3D.fluidColor = pluck(color, attr3D.fluidColor, '000000');
                            attr3D.fluidAlpha = pluckNumber(alpha, attr3D.fluidAlpha, 100);
                            colorChanged = true;
                        }
                        else if (key === 'fluidColor') {
                            attr3D.fluidColor = pluck(value, attr3D.fluidColor, '000000');
                            colorChanged = true;
                        }
                        else if (key === 'fluidAlpha') {
                            attr3D.fluidAlpha = pluckNumber(value, attr3D.fluidAlpha, 100);
                            colorChanged = true;
                        }
                        else if (value >= 0 && value <= 1){
                            attr3D.fulidHRatio = value
                            shapeChanged = true;
                        }
                        if (colorChanged) {
                            var darkFlColor = getDarkColor(attr3D.fluidColor, attr3D.is2D ? 80 : 70);
                            //draw the Fluid
                            element.fluid.attr({
                                fill : convertColor(darkFlColor, attr3D.fluidAlpha)
                            });

                            //draw the Fluid
                            element.fluidTop.attr({
                                fill : convertColor(darkFlColor, attr3D.fluidAlpha)
                            });
                            //draw the Fluid
                            element.topLight.attr({
                                stroke : convertColor(darkFlColor, attr3D.fluidAlpha * 0.4)
                            });
                            //draw the Fluid
                            element.topLightBorder.attr({
                                fill : {
                                    FCcolor : {
                                        color : darkFlColor + COMMASTRING + darkFlColor,
                                        alpha : '0,' + (attr3D.fluidAlpha * 0.3),
                                        ratio : '0,80',
                                        angle : 90
                                    }
                                }
                            });

                        }
                        if (shapeChanged) {
                            var y6 = attr3D.scaleY + (attr3D.h * (1 - attr3D.fulidHRatio));
                            //draw the Fluid
                            element.fluid .attr({
                                d : attr3D.fluidPath.concat([L, attr3D.lx2, y6, attr3D.lx1, y6, Z])
                            });

                            //draw the Fluid
                            element.fluidTop.attr({
                                d : blankArr.concat([M, attr3D.lx1, y6], getArcPath(attr3D.x,
                                    y6, attr3D.lx1, y6, attr3D.lx2, y6, attr3D.lCylWidthHalf, 1, 1, 0),[Z])
                            });
                        }
                    }
                    else {//else leave for the original attr
                        this['_attr'](key, value);
                    }
                }
            }
            return element;
        },

        shadow = function (apply, group, options) {
            this.border.shadow(apply, group, options);
        };

        return function (x, y, r, h, gStr, renderer, fulidHRatio, conColor, conBorderColor, conBorderThickness, fluidColor, fluidAlpha, is2D) {

            if (isObject(x)) {
                y = x.y;
                r = x.r;
                h = x.h;
                gStr = x.gStr;
                renderer = x.renderer;
                fulidHRatio = x.fulidHRatio;
                conColor = x.conColor;
                conBorderColor = x.conBorderColor;
                conBorderThickness = x.conBorderThickness;
                fluidColor = x.fluidColor;
                fluidAlpha = x.fluidAlpha;
                is2D = x.is2D;
                x = x.x;
            }
            if (!(fulidHRatio >= 0 && fulidHRatio <= 1)) {
                fulidHRatio = 0;
            }
            conColor = pluck(conColor, 'FFFFFF');
            conBorderColor = pluck(conBorderColor, '#000000');

            conBorderThickness = pluckNumber(conBorderThickness, 1);
            fluidColor = pluck(fluidColor, '000000');
            fluidAlpha = pluckNumber(fluidAlpha, 100);
            var fluidStroke = 3,
            _3dAttr = {
                x : x,
                y : y,
                r : r,
                h : h,
                renderer : renderer,
                fulidHRatio : fulidHRatio,
                conColor : conColor,
                conBorderColor : conBorderColor,
                conBorderThickness : conBorderThickness,
                fluidStroke : fluidStroke,
                fluidColor : fluidColor,
                is2D: is2D,
                fluidAlpha : fluidAlpha
            },
            getArcPath = renderer.getArcPath,
            rect3D = renderer.g(gStr);


            //modify the attr function of the group so that it can handle pyramid attrs
            //store the old function
            rect3D['_attr'] = rect3D.attr;
            rect3D.attr = attr;

            // Replace the shadow function with a modified version.
            rect3D.shadow = shadow;

            //store the 3d attr(requared in new attr function to change any related
            //                  attr modiffiaction)
            rect3D._3dAttr = _3dAttr;

            //draw cylender
            var darkColor = getDarkColor(conColor, 80),
            darkFlColor = getDarkColor(fluidColor, is2D ? 80 : 70),
            lightColor = getLightColor(conColor, 80),
            cos50 = 0.643,
            sin50 = 0.766,
            cylinderWidthHalf = r * cos50,
            scaleTop = cylinderWidthHalf,
            topRoundR = cylinderWidthHalf * 0.33,
            topRoundRDistance = cylinderWidthHalf - topRoundR,
            bulbCenterDistance = r * sin50,
            x1 = x - cylinderWidthHalf,
            x2 = x + cylinderWidthHalf,
            x3 = x - topRoundRDistance,
            x4 = x + topRoundRDistance,
            scaleY = y + scaleTop,
            y1 = scaleY + h,
            y2 = y1 + bulbCenterDistance,
            y4 = y + topRoundR,
            y6 = scaleY + (h * (1 - fulidHRatio)),
            lCylWidthHalf = cylinderWidthHalf * 0.9,
            lR = r + lCylWidthHalf - cylinderWidthHalf,
            lx1 = x - lCylWidthHalf,
            lx2 = x + lCylWidthHalf,
            ly = y2 - Math.abs(Math.sqrt((lR * lR) - (lCylWidthHalf * lCylWidthHalf))),
            l1Distance = cylinderWidthHalf * 0.6,
            l1x = parseInt(x - l1Distance, 10),
            l2x = x + (cylinderWidthHalf / 2);


            //save the fluid path for further use
            _3dAttr.fluidPath = blankArr.concat([M, lx1, ly], getArcPath(x, y2, lx1, ly, lx2, ly, lR, lR, 0, 1));
            _3dAttr.scaleY = scaleY;
            _3dAttr.lx1 = lx1;
            _3dAttr.lx2 = lx2;
            _3dAttr.lCylWidthHalf = lCylWidthHalf;



            //draw the Fluid
            rect3D.topLight = renderer.path([M, lx1, scaleY, L, lx2, scaleY])
            .attr({
                'stroke-width' : 1,
                stroke : convertColor(darkFlColor, 40)
            })
            .add(rect3D);
            //draw the Fluid
            rect3D.topLightBorder = renderer.path([M, lx1, scaleY, L, lx2, scaleY, lx2, y4, lx1, y4, Z])
            .attr({
                'stroke-width' : 0,
                fill : {
                    FCcolor : {
                        color: darkFlColor + COMMASTRING + darkFlColor,
                        alpha: '40,0',
                        ratio: '0,80',
                        radialGradient: true,
                        gradientUnits : "objectBoundingBox",
                        cx : 0.5,
                        cy : 1,
                        r : '70%'
                    }
                }
            })
            .add(rect3D);
            //draw the Fluid
            rect3D.fluid = renderer.path(_3dAttr.fluidPath.concat([L, lx2, y6, lx1, y6, Z]))
            .attr({
                'stroke-width' : 0,
                fill : convertColor(darkFlColor, fluidAlpha)
            })
            .add(rect3D);

            //draw the Fluid
            rect3D.fluidTop = renderer.path(blankArr.concat([M, lx1, y6], getArcPath(x, y6, lx1, y6, lx2, y6, lCylWidthHalf, 1, 1, 0),[Z]))
            .attr({
                'stroke-width' : 0,
                fill : convertColor(darkFlColor, fluidAlpha)
            })
            .add(rect3D);

            //draw the border
            rect3D.border = renderer.path(blankArr.concat([M, x3, y], getArcPath(x3, y4, x3, y, x1, y4, topRoundR, topRoundR, 0, 0),
                [L, x1, y1], getArcPath(x, y2, x1, y1, x2, y1, r, r, 0, 1), [L, x2, y4],
                getArcPath(x4, y4, x2, y4, x4, y, topRoundR, topRoundR, 0, 0), [Z]))
            .attr({
                'stroke-width' : conBorderThickness,
                stroke : conBorderColor
            })
            .add(rect3D);

            if (!is2D) {
                //draw the right half
                rect3D.bulbBorderLight = renderer.path(blankArr.concat([M, x1, y1], getArcPath(x, y2, x1, y1, x2, y1, r, r, 0, 1),
                    getArcPath(x, y2, x2, y1, x1, y1, r, r, 0, 0),
                    getArcPath(x, y2, x1, y1, x2, y1, r, r, 1, 0),
                    [Z]))
                .attr({
                    'stroke-width' : 0,
                    stroke : '#00FF00',
                    fill : {
                        FCcolor : {
                            gradientUnits : 'objectBoundingBox',
                            cx: 0.5,
                            cy: 0.5,
                            r: '50%',
                            color :  darkColor + COMMASTRING + lightColor,
                            alpha : '0,50',
                            ratio : '78,30',
                            radialGradient : true
                        }
                    }
                })
                .add(rect3D);
                rect3D.bulbTopLight = renderer.path(blankArr.concat([M, x1, y1], getArcPath(x, y2, x1, y1, x2, y1, r, r, 0, 1),
                    getArcPath(x, y2, x2, y1, x1, y1, r, r, 0, 0),
                    getArcPath(x, y2, x1, y1, x2, y1, r, r, 1, 0),
                    [Z]))
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            gradientUnits : 'objectBoundingBox',
                            cx: 0.3,
                            cy: 0.1,
                            r: '100%',
                            color :  lightColor + COMMASTRING + darkColor,
                            alpha : '60,0',
                            ratio : '0,30',
                            radialGradient : true
                        }
                    }
                })
                .add(rect3D);
                rect3D.bulbCenterLight = renderer.path(blankArr.concat([M, x1, y1], getArcPath(x, y2, x1, y1, x2, y1, r, r, 0, 1),
                    getArcPath(x, y2, x2, y1, x1, y1, r, r, 0, 0),
                    getArcPath(x, y2, x1, y1, x2, y1, r, r, 1, 0),
                    [Z]))
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            gradientUnits : 'objectBoundingBox',
                            cx: 0.25,
                            cy: 0.7,
                            r: '100%',
                            color :  lightColor + COMMASTRING + darkColor,
                            alpha : '80,0',
                            ratio : '0,70',
                            radialGradient : true
                        }
                    }
                })
                .add(rect3D);
                //draw the left half light
                rect3D.cylLeftLight = renderer.path(blankArr.concat([M, x, y, L, x3, y], getArcPath(x3, y4, x3, y, x1, y4, topRoundR, topRoundR, 0, 0),
                    [L, x1, y1, x, y1, Z]))
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            color : lightColor + COMMASTRING + darkColor,
                            alpha : '50,0',
                            ratio : '0,80',
                            angle : 0
                        }
                    }
                })
                .add(rect3D);
                //draw the right half
                rect3D.cylRightLight = renderer.path(blankArr.concat([M, x1, y, L, x4, y], getArcPath(x4, y4, x4, y, x2, y4, topRoundR, topRoundR, 1, 0),
                    [L, x2, y1, x1, y1, Z]))
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            color : lightColor + COMMASTRING + darkColor + COMMASTRING + darkColor,
                            alpha : '50,0, 0',
                            ratio : '0,40,60',
                            angle : 180
                        }
                    }
                })
                .add(rect3D);
                //draw the middleLight left half
                rect3D.cylLeftLight1 = renderer.path([M, l1x, y4, L, x1, y4, x1, y1, l1x, y1, Z])
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            color : lightColor + COMMASTRING + darkColor,
                            alpha : '60,0',
                            ratio : '0,100',
                            angle : 180
                        }
                    }
                })
                .add(rect3D);
                //draw the middleLight left half
                rect3D.cylRightLight1 = renderer.path([M, l1x - 0.01, y4, L, l2x, y4, l2x, y1, l1x - 0.01, y1, Z])
                .attr({
                    'stroke-width' : 0,
                    fill : {
                        FCcolor : {
                            color : lightColor + COMMASTRING + darkColor,
                            alpha : '60,0',
                            ratio : '0,100',
                            angle : 0
                        }
                    }
                })
                .add(rect3D);
            }
            return rect3D;
        };
    })();



    var Thermometer = Highcharts.extendClass(seriesTypes.cylinder, {
        type: 'thermometer',

        drawPoints: function() {
            var series = this,
            data = series.data,
            chart = series.chart,

            renderer = chart.renderer,
            gaugeHeight = chart.plotHeight,
            gaugeWidth = chart.plotWidth,
            scale = chart.options.scale,
            maxValue = scale.max,
            minValue = scale.min,

            options = series.options,
            chartOptions = chart.options.chart,
            point = data[0],
            pointValue = pluckNumber(point.y, minValue),
            cos50 = 0.643,
            thmBulbRadius = chartOptions.thmBulbRadius,
            halfThmWidth = thmBulbRadius * cos50,
            fulidHRatio = (pointValue - minValue) / (maxValue - minValue),

            colorObj = Color(point.color),
            color = colorObj.get('hex').replace(dropHash, BLANKSTRING),
            alpha = colorObj.get('a') * 100;


            point.minValue = minValue;
            point.maxValue = maxValue;
            point.fulidHRatio = fulidHRatio;

            point.graphic = drawThermometer(0 + halfThmWidth, 0 - halfThmWidth,
                thmBulbRadius, chart.plotHeight, 'points-group', renderer, fulidHRatio,
                chartOptions.thmGlassColor,
                chartOptions.gaugeBorderColor,
                chartOptions.gaugeBorderThickness, color, alpha, chartOptions.use3DLighting)
            .add(series.group);

            point.graphic.shadow(options.shadow, false, options.shadow);

            drawScale(chart.plotWidth, chart.plotHeight, chart.renderer, series, series.group);
        },


        drawDataLabels: seriesTypes.led.prototype.drawDataLabels,


        animate: function(init) {
            var series = this,
            point,
            graphic,
            animation = series.options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            //animate points

            point = series.data[0];
            graphic = point && point.graphic;
            if (graphic){
                if (!graphic.isAnimating) { // apply it only for one of the series
                    graphic.isAnimating = true;
                    graphic.attr( {
                        fulidHRatio : 0
                    });
                    graphic.animate({
                        fulidHRatio : point.fulidHRatio
                    }, animation);
                }
            }
            this.animate = null;
        },

        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;


            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');


                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }

            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        }
    });

    // 4 - add the constractor
    seriesTypes.thermometer = Thermometer;




    /* ****************************************************************************
     * Start Linear Gauge series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.lineargauge = merge(defaultPlotOptions.bulb, {
        states: {
            hover: {}
        }
    });

    var linearGauge = Highcharts.extendClass(seriesTypes.bulb, {
        type: 'lineargauge',

        drawTracker: function () {
            seriesTypes.column.prototype.drawTracker.call(this);

            var series = this,
            chart = series.chart,
            data = series.data,
            scale = chart.options.scale,
            pxValueFactor = (scale.max - scale.min) / chart.plotWidth,

            pointerDragTrigger = function (event) {

                var end = event.type === 'dragend',
                point = event.data, chartObj, jsVars;

                if (end) {
                    chartObj = series.chart && series.chart.options &&
                    series.chart.options.instanceAPI && series.chart.options.instanceAPI.chartInstance;
                    jsVars = chartObj && chartObj.jsVars;

                    jsVars && (jsVars._rtLastUpdatedData = chartObj.getDataJSON());

                    global.raiseEvent('RealTimeUpdateComplete', {
                        data: "&value=" + point.updatedValStr,
                        source: 'editMode',
                        url: null
                    }, chartObj);

                    try {
                        window.FC_ChartUpdated &&
                        window.FC_ChartUpdated(chartObj.id);
                    }
                    catch (err) {
                        setTimeout(function () {
                            throw (err);
                        }, 1);
                    }


                    chart.tooltip && chart.tooltip.block(false)
                    && chart.tooltip.refresh(point, true);
                }
                else {
                    point.dragStartX = event.pageX;
                    point.dragStartY = event.pageY;

                    chart.tooltip && chart.tooltip.block(true);
                }
            },

            pointerOnDrag = function (event) {
                var point = event.data,
                diffX = point.dragStartX - event.pageX,
                pointVal = pluckNumber(point.value, point.y, scale.min),
                newVal = pointVal - (diffX * pxValueFactor), i = 0, values = [];

                if (newVal < scale.min) {
                    newVal = scale.min;
                } else if (newVal > scale.max) {
                    newVal = scale.max;
                }


                for(;i < point.index; i += 1) {
                    values.push("");
                }
                values.push(newVal);

                if (pointVal !== newVal && series.realtimeUpdate({
                    values: values
                })) {
                    point.updatedValStr = values.join("|");
                    point.dragStartX = event.pageX;
                }
            },

            i = (data && data.length) || 0;

            while (i--) {
                point = data[i];
                if (point.editable === "1" && point.tracker) {
                    point.index = i;
                    point.tracker.css({
                        cursor: 'pointer',
                        '_cursor': 'hand'
                    });

                    addEvent(point.tracker.element, 'dragstart dragend', pointerDragTrigger, point);
                    addEvent(point.tracker.element, 'drag', pointerOnDrag, point);
                }
            }

        },

        realtimeUpdate: function (updateObj/*type, dataObj*/, singleUpdate) {
            // Check if update has already happened.
            if (updateObj === this.lastUpdatedObj) {
                return false;
            }

            // this[dataObj.type + "DataParser"](updateStr, updateObj, returnObj);

            var series = this,
            chart = series.chart,
            scale = chart.options.scale,
            chartOptions = chart.options.chart,
            pointerOptions = chart.options.series && chart.options.series[0]
            && chart.options.series[0].data,
            animation = chart.options.plotOptions.series.animation,
            animationOptions = {
                duration: animation ? updateObj.interval : 0
            },
            data = series && series.data, point, i = 0,
            NumberFormatter = this.chart.options.instanceAPI.numberFormatter,
            displayValue, itemValue, translateObj,
            gaugeWidth = chart.plotWidth,
            gaugeHeight = chart.plotHeight,
            gaugeType = chartOptions.gaugeType,
            min = scale.min,
            max = scale.max,

            translateFnMap = {
                1: function (val) {
                    return {
                        x: (val - min) * gaugeWidth / (max - min)
                    }
                },
                2: function (val) {
                    return {
                        y: (val - min) * gaugeHeight / (max - min)
                    }
                },
                3: function (val) {
                    return {
                        x: (max - val) * gaugeWidth / (max - min)
                    }
                },
                4: function (val) {
                    return {
                        y: (max - val) * gaugeHeight / (max - min)
                    }
                }
            },

            values = updateObj.values || [],
            labels = updateObj.labels || [],
            toolTexts = updateObj.toolTexts || [],
            showLabels = updateObj.showLabels || [],
            l = Math.min(data.length, values.length), returnVal = false;

            if (singleUpdate) {
                point = data[singleUpdate.index];

                itemValue = NumberFormatter.getCleanValue(values[0]);
                if (point && (itemValue === null  || (itemValue <= max && itemValue >= min))) {

                    if (itemValue !== null) {
                        point.value = itemValue;
                        translateObj = translateFnMap[gaugeType](itemValue);
                        // Update the Graphics
                        animation && $(point.graphic).stop(true, true);
                        point.graphic.animate(translateObj, animationOptions);

                        if (point.tracker) {
                            animation && $(point.tracker).stop(true, true);
                            point.tracker.animate(translateObj, animationOptions)
                            point.plotX = point.origX + translateObj.translateX;
                            point.plotY = point.origY + translateObj.translateY;
                        }
                        returnVal = true;
                    }

                    displayValue = pluck(labels[0], NumberFormatter.dataLabels(itemValue));

                    if (point.dataLabel && displayValue !== undefined) {
                        // Update the dataLabel text
                        displayValue = (showLabels[0] == 0) ? "" : displayValue;

                        animation && $(point.dataLabel).stop(true, true);
                        point.dataLabel.animate(translateObj, animationOptions)
                        point.dataLabel.attr({
                            text: displayValue
                        });
                        returnVal = true;
                    }

                    displayValue = pluck(toolTexts[0],
                        ((pointerOptions && pointerOptions[singleUpdate.index] && pointerOptions[singleUpdate.index].isLabelString && pointerOptions[singleUpdate.index].toolText) || undefined),
                        NumberFormatter.dataLabels(itemValue));

                    if (displayValue !== undefined) {
                        point.toolText = displayValue;
                        chart.tooltip && chart.tooltip.refresh(point, true);
                        returnVal = true;
                    }

                }
            } else {
                for (; i < l; i += 1) {
                    point = data[i];

                    itemValue = NumberFormatter.getCleanValue(values[i]);
                    if (point && (itemValue === null  || (itemValue <= max && itemValue >= min))) {

                        if (itemValue !== null) {
                            point.value = itemValue;
                            translateObj = translateFnMap[gaugeType](itemValue);
                            // Update the Graphics
                            animation && $(point.graphic).stop(true, true);
                            point.graphic.animate(translateObj, animationOptions);

                            if (point.tracker) {
                                animation && $(point.tracker).stop(true, true);
                                point.tracker.animate(translateObj, animationOptions)
                                point.plotX = point.origX + translateObj.translateX;
                                point.plotY = point.origY + translateObj.translateY;
                            }
                            returnVal = true;
                        }

                        displayValue = pluck(labels[i], NumberFormatter.dataLabels(itemValue));

                        if (point.dataLabel && displayValue !== undefined) {
                            // Update the dataLabel text
                            displayValue = (showLabels[i] == 0) ? "" : displayValue;

                            animation && $(point.dataLabel).stop(true, true);
                            point.dataLabel.animate(translateObj, animationOptions)
                            point.dataLabel.attr({
                                text: displayValue
                            });
                            returnVal = true;
                        }

                        displayValue = pluck(toolTexts[i],
                            ((pointerOptions && pointerOptions[i] && pointerOptions[i].isLabelString && pointerOptions[i].toolText) || undefined),
                            NumberFormatter.dataLabels(itemValue));

                        if (displayValue !== undefined) {
                            point.toolText = displayValue;
                            chart.tooltip && chart.tooltip.refresh(point, true);
                            returnVal = true;
                        }
                    }
                }
                this.lastUpdatedObj = updateObj;
            }

            return returnVal; //returnObj;
        },
        translate: function () {
            var series = this,
            data = series.data,
            chart = series.chart,
            chartOptions = chart.options && chart.options.chart,
            scale = chart.options.scale,
            trendArray = (scale && scale.trendPoint) || [],
            chartAPI = chart.options.instanceAPI,
            height = chart.plotHeight,
            width = chart.plotWidth,
            gaugeType,
            min = scale.min,
            max = scale.max,
            valueRange = max - min,
            i = data.length,
            sx = 0,
            sy = 0,
            kx = 0,
            ky = 0,
            value,
            point,
            startValue = min;

            if (chartAPI.isHorizontal) {//left to right
                sx = width / valueRange;
                ky = chartOptions.pointerOnOpp ? height : 0;
                gaugeType = scale.reverseScale ? 3 : 1;
            }
            else {//top to bottom
                sy = height / valueRange;
                kx = chartOptions.pointerOnOpp ? width : 0;
                gaugeType = scale.reverseScale ? 4 : 2;
            }

            if (scale.reverseScale) {
                sx = -sx;
                sy = -sy;
                startValue = max
            }



            //add this gaugeType in Series Obj
            series.gaugeType = gaugeType;
            //add a value to x, y translator[*X, y will be on the center line of the gauge]
            series.valueTranslator = function(value) {
                value = pluckNumber(value, startValue) - startValue;
                return {
                    x: value * sx + kx,
                    y: value * sy + ky
                }
            }

            // do the translation
            while (i--) {
                point = data[i];
                value = pluckNumber(point.y, startValue) - startValue;
                point.plotX = point.origX = value * sx + kx;
                point.plotY = point.origY = value * sy + ky;
            }

            i = trendArray.length

            while (i--) {
                point = trendArray[i];
                value = point.startValue;
                point.plotX = point.origX = value * sx + kx;
                point.plotY = point.origY = value * sy + ky;
            }

        },

        drawPoints: function() {

            var series = this,
            data = series.data,
            i = data.length,
            chart = series.chart,
            scale = chart.options.scale,
            chartOptions = chart.options.chart,
            renderer = chart.renderer,
            showPointerShadow = chartOptions.showPointerShadow,
            showShadow = chartOptions.showShadow,
            trendArray = (scale && scale.trendPoint) || [],
            point, shadowObj,
            startAngle, y,
            gaugeType = series.gaugeType,
            pointOrientation = {
                'right': 0,
                'top': 0.5,
                'left': 1,
                'bottom': 1.5
            },
            orient, marker, getLabelConfig = function() {
                var point = this;
                return {
                    x: point.category,
                    y: point.y,
                    series: point.series,
                    point: point,
                    percentage: point.percentage,
                    total: point.total || point.stackTotal
                };
            },
            pointerOnOpp = chartOptions.pointerOnOpp;

            if (gaugeType === 1 ) { // horizontal gauge; left to right;
                orient = (pointerOnOpp) ? "top" : "bottom";

            } else if (gaugeType === 2) { // vertical gauge; top to bottom;
                orient = pointerOnOpp ? "left" : "right";

            } else if (gaugeType === 3) { // horizontal linear gauge; right to left;
                orient = (pointerOnOpp) ? "top" : "bottom";

            } else {  // vertical linear gauge; bottom to top;
                orient = pointerOnOpp ? "left" : "right";
            }

            if (series.dataById === undefined) {
                series.dataById = {};
            }

            while (i--) {
                point = data[i];
                startAngle = pointOrientation[orient] * Math.PI;
                point.shapeType = 'symbol';
                point.shapeArgs = {
                    symbol: "poly_" + point.sides,
                    x: point.plotX,
                    y: point.plotY,
                    radius: point.radius,
                    options: {
                        'startAngle': startAngle
                    }
                };

                point = data[i];
                if (point.id !== undefined) {
                    series.dataById[point.id] = {
                        index: i,
                        point: point
                    };
                }

                shadowObj = showPointerShadow ? {
                    opacity: (Math.max(point.bgalpha, point.borderalpha) / 100)
                } : null;

                point.graphic = renderer[point.shapeType](point.shapeArgs)
                .attr({
                    fill: point.color,
                    stroke: point.borderColor,
                    'stroke-width': point.borderWidth
                })
                .add(series.group)
                .shadow(shadowObj, undefined, shadowObj);
            }

            i = trendArray.length;
            while (i--) {
                point = trendArray[i];
                if (point.useMarker) {
                    if (point.showOnTop) {
                        orient = "bottom";
                        y = 0;
                    } else {
                        orient = "top";
                        y = chart.plotHeight;
                    }
                    startAngle = pointOrientation[orient] * Math.PI;
                    point.shapeType = 'symbol';
                    point.shapeArgs = {
                        symbol: "poly_3",
                        x: point.plotX,
                        y: y,
                        radius: point.markerRadius,
                        options: {
                            startAngle: startAngle
                        }
                    };

                    shadowObj = {
                        apply: showShadow,
                        opacity: 1
                    };
                    point.graphic = marker = renderer[point.shapeType](point.shapeArgs)
                    .attr({
                        fill: point.markerColor,
                        stroke: point.markerBorderColor,
                        'stroke-width': 1
                    })
                    .add(series.group)
                    .shadow(shadowObj.apply, undefined, shadowObj);

                    if (point.markerToolText !== '') {
                        (function (toolText) {
                            var toolTipPointObj =  {
                                series : {},
                                chart : chart,
                                id : point.id,
                                label : this.label,
                                options : this.options,
                                svgElm : this.svgElm,
                                toolText: toolText,
                                getLabelConfig : getLabelConfig
                            };
                            marker.on('mouseover', function(e) {
                                var plotLeft = chart.plotLeft,
                                plotTop = chart.plotTop;
                                toolTipPointObj.tooltipPos = [pluck(e.layerX,e.x) - plotLeft + 20, pluck(e.layerY, e.y) - plotTop - 15];
                                //show the tooltext
                                chart.tooltip.refresh(toolTipPointObj);
                            })
                            .on('mouseout', function (e) {
                                //hide the tooltip
                                chart.tooltip.hide();
                            })
                            .on('mousemove', function(e) {
                                var plotLeft = chart.plotLeft,
                                plotTop = chart.plotTop;
                                toolTipPointObj.tooltipPos = [pluck(e.layerX,e.x) - plotLeft + 20, pluck(e.layerY, e.y) - plotTop - 15];
                                //show the tooltext
                                chart.tooltip.refresh(toolTipPointObj);
                            });
                        })(point.markerToolText);
                    }

                }
            }
        },

        drawGraph: function () {
            var series = this,
            chart = series.chart,
            chartOptions = chart.options.chart,
            scale = chart.options.scale,
            chartAPI = chart.options.instanceAPI,
            gaugeType = series.gaugeType,
            height = chart.plotHeight,
            width = chart.plotWidth,
            min = scale.min,
            max = scale.max,
            colorArray = chartAPI.colorRangeGetter.getColorRangeArr(min, max),
            trendArray = (scale && scale.trendPoint) || [],
            gaugeFillMix = chartOptions.colorRangeFillMix,
            gaugeFillRatio = chartOptions.colorRangeFillRatio,
            gaugeBorderColor = chartOptions.colorRangeBorderColor,
            gaugeBorderAlpha = chartOptions.colorRangeBorderAlpha,
            gaugeBorderThickness = chartOptions.colorRangeBorderThickness,
            renderer = chart.renderer,
            showShadow = chartOptions.showShadow, shadow, i, len, trendObj,
            getRectXY, angle, color, colorObj, borderColor, xyObj,
            // Color Manager for widgets
            colorM = chartAPI.colorM,
            group = series.group;

            if (gaugeType === 1 ) { // horizontal gauge; left to right;
                getRectXY = function (minValue, maxValue) {
                    return {
                        x: ((minValue * width / (max - min))),
                        y: 0,
                        width: (maxValue - minValue) * width / (max - min),
                        height: height
                    }
                };
                angle = 270;

            } else if (gaugeType === 2) { // vertical gauge; top to bottom;
                getRectXY = function (minValue, maxValue) {
                    return {
                        x: 0,
                        y: (minValue * height / (max - min)),
                        width: width,
                        height: (maxValue - minValue) * height / (max - min)
                    }
                };
                angle = 180;

            } else if (gaugeType === 3) { // horizontal linear gauge; right to left;
                getRectXY = function (minValue, maxValue) {
                    return {
                        x: width - (maxValue * width / (max - min)),
                        y: 0,
                        width: (maxValue - minValue) * width / (max - min),
                        height: height
                    }
                }
                angle = 270;

            } else {  // vertical linear gauge; bottom to top;
                getRectXY = function (minValue, maxValue) {
                    return {
                        x: 0,
                        y: height - (maxValue * height / (max - min)),
                        width: width,
                        height: (maxValue - minValue) * height / (max - min)
                    }
                };
                angle = 180;
            }

            var colorGrp = renderer.g("range")
            .add(group);
            //draw the outer rectangle
            colorGrp.outerRect = renderer.rect(0, 0, width, height, 0)
            .add(colorGrp);

            for (i = 0, len = colorArray.length; i < len; i += 1) {
                colorObj = colorArray[i],
                xyObj = getRectXY((colorObj.minvalue - min), (colorObj.maxvalue - min));
                colorObj.x = xyObj.x;
                colorObj.y = xyObj.y;
                colorObj.width = xyObj.width;
                colorObj.height = xyObj.height;

                color = colorObj.code;
                borderColor = convertColor(getColorCodeString(color, gaugeBorderColor), gaugeBorderAlpha);

                shadow = showShadow ? (Math.max(colorObj.alpha, gaugeBorderAlpha) / 100) : null;

                colorGrp["colorBand" + i] = renderer.rect(xyObj.x, xyObj.y, xyObj.width, xyObj.height, 0)
                .attr({
                    'stroke-width': gaugeBorderThickness,
                    stroke: borderColor,
                    'fill': {
                        FCcolor: {
                            color: colorM.parseColorMix(color, gaugeFillMix).toString(),
                            ratio: gaugeFillRatio,
                            alpha: colorObj.alpha,
                            angle: angle
                        }
                    }

                })
                .add(colorGrp)
                .shadow(shadow, undefined, shadow);
            }

            for (i = 0, len = trendArray.length; i < len; i += 1) {
                trendObj = trendArray[i],

                xyObj = getRectXY((trendObj.startValue - min), (trendObj.endValue - min));

                if (trendObj.isZone) {
                    colorGrp["trendZone" + i] = renderer.rect(xyObj.x, xyObj.y, xyObj.width, xyObj.height, 0)
                    .attr({
                        'fill': {
                            FCcolor: {
                                color: trendObj.color,
                                alpha: trendObj.alpha
                            }
                        }
                    })
                    .add(colorGrp);
                }
                else {
                    var trendLinePath = renderer.crispLine(
                        [M, xyObj.x, xyObj.y, L, xyObj.x, (xyObj.y + xyObj.height)], trendObj.thickness);

                    colorGrp["trendLine" + i] = renderer.path(trendLinePath)
                    .attr({
                        stroke: convertColor(trendObj.color, trendObj.alpha),
                        'stroke-width': trendObj.thickness,
                        dashstyle: trendObj.dashStyle
                    })
                    .add(colorGrp);
                }
            }

            drawScale(chart.plotWidth, chart.plotHeight, chart.renderer, series, group);

        },
        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            scale = chart.options.scale,
            chartOptions = chart.options.chart,
            chartAPI = chart.options.instanceAPI,
            dataLabelsGroup = series.dataLabelsGroup,
            min = scale.min,
            max = scale.max,
            gaugeType = series.gaugeType,
            colorArr = chartAPI.colorRangeGetter.getColorRangeArr(min, max),
            numberFormatter = chartAPI.numberFormatter,
            colorRangeStyle = chartOptions.colorRangeStyle.style || {},
            colorObj,
            height = chart.plotHeight,
            width = chart.plotWidth,
            trendArr = (scale && scale.trendPoint) || [],
            pointerOnOpp = chartOptions.pointerOnOpp,
            valueInsideGauge = chartOptions.valueInsideGauge,
            showGaugeLabels = chartOptions.showGaugeLabels,
            style = options.dataLabels.style,
            colorArrLabel,
            i, length, pointerObj, getPointerLabelXY, getColorLabelXY, labelXY, trendObj,
            smartLabel = chart.renderer.smartLabel, smartText, testStrObj, minWidth, labelX, labelY,
            lineHeight = pluckNumber(parseInt(style.fontHeight, 10), parseInt(style.lineHeight, 10), 12),
            labelPadding = (chartOptions.valuePadding + (lineHeight * 0.5)), innerLabelPadding = 4,
            trendLabelPadding = chartOptions.valuePadding, oppTrendLabelPadding = labelPadding;
            // if label is below the pointer then we need to add extra pdding to compensate for lineheight.
            labelPadding = (valueInsideGauge === pointerOnOpp) ? labelPadding : labelPadding + (lineHeight / 2);
            smartLabel.setStyle(style);
            testStrObj = smartLabel.getOriSize("W");
            minWidth = testStrObj.width;

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .add(series.group);
            }

            if (gaugeType === 1 ) { // horizontal gauge; left to right;
                getPointerLabelXY = function (value, isInside, pointerOnOpp) {
                    var y;
                    if (pointerOnOpp) {
                        y = isInside ? (height - labelPadding) : (height + labelPadding);
                    } else {
                        y = isInside ? labelPadding : -labelPadding;
                    }
                    return {
                        x: (value * width / (max - min)),
                        y: y,
                        align: "center"
                    }
                };

                getColorLabelXY = function (minvalue, maxvalue) {
                    return {
                        x: (((minvalue - min) + (maxvalue - minvalue) / 2) * width / (max - min)),
                        y: (height / 2),
                        width: (maxvalue - minvalue) * width / (max - min),
                        height: height
                    }
                };

            } else if (gaugeType === 2) { // vertical gauge; top to bottom;
                getPointerLabelXY = function (value, isInside, pointerOnOpp) {
                    var x, align;
                    if (pointerOnOpp) {
                        if (isInside) {
                            align = "right";
                            x = width - labelPadding;
                        } else {
                            align = "left";
                            x = width + labelPadding;
                        }
                    }
                    else {
                        if (isInside) {
                            align = "left";
                            x = labelPadding;
                        }
                        else {
                            align = "right";
                            x = -labelPadding;
                        }
                    }
                    return {
                        x: x,
                        y: (value * height / (max - min)),
                        align: align
                    }
                };

                getColorLabelXY = function (minvalue, maxvalue) {
                    return {
                        y: (((minvalue - min) + (maxvalue - minvalue) / 2) * height / (max - min)),
                        x: (width / 2),
                        height: (maxvalue - minvalue) * height / (max - min),
                        width: width
                    }
                };

            }
            else if (gaugeType === 3) { // horizontal linear gauge; right to left;
                getPointerLabelXY = function (value, isInside, pointerOnOpp) {
                    var y;
                    if (pointerOnOpp) {
                        y = isInside ? height - labelPadding : height + labelPadding;
                    } else {
                        y = isInside ? labelPadding : -labelPadding;
                    }
                    return {
                        x: width - (value * width / (max - min)),
                        y: y,
                        align: "center"
                    }
                };

                getColorLabelXY = function (minvalue, maxvalue) {
                    return {
                        x: width - (((minvalue - min) + (maxvalue - minvalue) / 2) * width / (max - min)),
                        y: (height / 2),
                        width: (maxvalue - minvalue) * width / (max - min),
                        height: height
                    }
                };

            }
            else {  // vertical linear gauge; bottom to top;
                getPointerLabelXY = function (value, isInside, pointerOnOpp) {
                    var x, align;
                    if (pointerOnOpp) {
                        if (isInside) {
                            align = "right";
                            x = width - labelPadding;
                        } else {
                            align = "left";
                            x = width + labelPadding;
                        }
                    } else {
                        if (isInside) {
                            align = "left";
                            x = labelPadding;
                        } else {
                            align = "right";
                            x = -labelPadding;
                        }
                    }
                    return {
                        x: x,
                        y: height - (value * height / (max - min)),
                        align: align
                    }
                };

                getColorLabelXY = function (minvalue, maxvalue) {
                    return {
                        y: height - (((minvalue - min) + (maxvalue - minvalue) / 2) * height / (max - min)),
                        x: (width / 2),
                        height: (maxvalue - minvalue) * height / (max - min),
                        width: width
                    }
                };
            }

            if (data) {
                for (i = 0, length = data.length; i < length; i += 1) {
                    pointerObj = data[i];
                    if (pointerObj.showvalue != 0 && pointerObj.displayValue != BLANKSTRING) {
                        labelXY = getPointerLabelXY((pointerObj.y - min), valueInsideGauge, pointerOnOpp)

                        pointerObj.dataLabel = chart.renderer.text(pointerObj.displayValue, labelXY.x, labelXY.y)
                        .attr({
                            align: labelXY.align
                        })
                        .css(style)
                        .add(dataLabelsGroup);
                    }
                }
            }

            style = colorRangeStyle || {};
            smartLabel.setStyle(style);

            // Draw the colorRange labels
            if (colorArr && showGaugeLabels) {
                for (i = 0, length = colorArr.length; i < length; i += 1) {
                    colorObj = colorArr[i];
                    colorArrLabel = pluck(colorObj.label, colorObj.name);
                    if (defined(colorArrLabel)) {
                        labelXY = getColorLabelXY(colorObj.minvalue, colorObj.maxvalue);
                        if ((labelXY.width - innerLabelPadding) > minWidth && (labelXY.height - innerLabelPadding) > lineHeight) {
                            smartText = smartLabel.getSmartText(colorArrLabel, labelXY.width - innerLabelPadding, labelXY.height - innerLabelPadding);
                        }
                        else {
                            smartText = smartLabel.getSmartText(colorArrLabel, labelXY.width, labelXY.height);
                        }
                        chart.renderer.text(smartText.text, labelXY.x, labelXY.y + (lineHeight / 4) - ((smartText.height - lineHeight) / 2))
                        .attr({
                            align: 'center'
                        })
                        .css(style)
                        .add(dataLabelsGroup);
                    }
                }
            }
            if (trendArr) {

                for (i = 0, length = trendArr.length; i < length; i += 1) {
                    trendObj = trendArr[i];
                    labelXY = getPointerLabelXY(trendObj.startValue, 0, !trendObj.showOnTop);
                    labelY = trendObj.showOnTop ? -trendLabelPadding : height + oppTrendLabelPadding; // TODO: need to remove this hardcoding
                    labelX = trendObj.isZone ? getColorLabelXY(trendObj.startValue, trendObj.endValue).x : labelXY.x;
                    trendObj.dataLabel = chart.renderer.text(pluck(trendObj.displayValue, numberFormatter.dataLabels(trendObj.startValue)), labelX, labelY)
                    .attr({
                        align: labelXY.align
                    })
                    .css(style)
                    .add(dataLabelsGroup);
                }
            }
        },

        animate: function(init) {
            var series = this,
            chart = series.chart,
            chartOptions = chart.options.chart,
            gaugeType = series.gaugeType,
            animation = chartOptions.animation,
            data = (chart.series && chart.series[0] && chart.series[0].data) || [],
            gaugeHeight = chart.plotHeight,
            gaugeWidth = chart.plotWidth,

            i = 0, length = data.length, point, graphic, dataLabel,
            key = (gaugeType === 1 || gaugeType === 3) ? 'x' : 'y',
            attrObj = {}, animObj = {};

            if (animation && !isObject(animation)) {
                animation = {};
            }

            if (gaugeType === '3') {
                animObj[key] = gaugeWidth;
            }
            else if (gaugeType === '4') {
                animObj[key] = gaugeHeight;
            } else {
                animObj[key] = 0;
            }


            for (; i < length; i += 1) {
                point = series.data[i];
                graphic = point && point.graphic;
                attrObj[key] = point.shapeArgs[key];
                if (graphic){
                    if (!graphic.isAnimating) { // apply it only for one of the series
                        graphic.isAnimating = true;
                        graphic.attr(animObj);
                        graphic.animate(attrObj, animation);
                    }
                }

                dataLabel = point && point.dataLabel;
                if (dataLabel){
                    if (!dataLabel.isAnimating) { // apply it only for one of the series
                        dataLabel.isAnimating = true;
                        dataLabel.attr(animObj);
                        dataLabel.animate(attrObj, animation);
                    }
                }

            }
            this.animate = null;
        }
    });

    // 4 - add the constractor
    seriesTypes.lineargauge = linearGauge;


    /*******************************************************************
     * Start VBullet Graph Code
     * ********************************************************/


    // 1 - Set default options
    defaultPlotOptions.bullet = merge(defaultPlotOptions.bulb, {
        states: {
            hover: {}
        }
    });


    var Bullet = Highcharts.extendClass(seriesTypes.lineargauge, {
        type: 'bullet',
        translate: function () {
            var series = this,
            data = series.data,
            chart = series.chart,
            chartOptions = chart.options && chart.options.chart,
            scale = chart.options.scale,
            chartAPI = chart.options.instanceAPI,
            height = chart.plotHeight,
            width = chart.plotWidth,
            gaugeType,
            min = scale.min,
            max = scale.max,
            valueRange = max - min,
            i = data.length,
            sx = 0,
            sy = 0,
            kx = 0,
            ky = 0,
            value,
            point,
            startValue = min;

            if (chartAPI.isHorizontal) {//left to right
                sx = width / valueRange;
                ky = height / 2;
                gaugeType = scale.reverseScale ? 3 : 1;
            }
            else {//top to bottom
                sy = height / valueRange;
                kx = width / 2;
                gaugeType = scale.reverseScale ? 4 : 2;
            }

            if (scale.reverseScale) {
                sx = -sx;
                sy = -sy;
                startValue = max
            }



            //add this gaugeType in Series Obj
            series.gaugeType = gaugeType;
            //add a value to x, y translator[*X, y will be on the center line of the gauge]
            series.valueTranslator = function(value) {
                value = pluckNumber(value, startValue) - startValue;
                return {
                    x: value * sx + kx,
                    y: value * sy + ky
                }
            }

            // do the translation
            while (i--) {
                point = data[i];
                value = pluckNumber(point.y, startValue) - startValue;
                point.plotX = point.origX = value * sx + kx;
                point.plotY = point.origY = value * sy + ky;
            }
        },

        drawPoints: function () {
            var series = this,
            data = series.data,
            chart = series.chart,
            renderer = chart.renderer,
            gaugeHeight = chart.plotHeight,
            gaugeWidth = chart.plotWidth,
            scale = chart.options.scale,
            maxValue = scale.max,
            minValue = scale.min,
            point = data[0], target = data[1], startValue,
            plotY, startX, startY, endY, endX, plotHeight, plotWidth, targetWidth,
            targetHeight, targetBorderWidth = target.borderWidth, tooltipCorrection = 10,
            chartAPI = chart.options.instanceAPI,
            trackerX,
            trackerY,
            targetLength,
            tooltipPos,
            halfTargetLength,
            isHorizontal = chartAPI.isHorizontal,
            startPointPosition;

            startValue = Math.min(Math.max(minValue, 0), maxValue);
            startPointPosition = series.valueTranslator(startValue);

            if (defined(point.y)) {
                if (point.plotAsDot) {
                    // The bullet has to be centrally aligned.
                    //TODO: if we do not follow Flash in that case
                    //then the code should be following for better vies
                    //plotHeight = plotWidth = Math.min(gaugeHeight, gaugeWidth) * (point.plotFillPercent / 100);
                    plotHeight = plotWidth = (isHorizontal ? gaugeHeight : gaugeWidth) * (point.plotFillPercent / 100);
                    startX = point.plotX - (plotWidth / 2);
                    startY = point.plotY - (plotHeight / 2);
                    if (isHorizontal) {
                        point.animInitAttr = {
                            x : startPointPosition.x
                        };
                        point.animAttr = {
                            x : startX
                        };
                    }
                    else {
                        point.animInitAttr = {
                            y : startPointPosition.y
                        };
                        point.animAttr = {
                            y : startY
                        };
                    }
                } else {

                    startX = Math.min(point.plotX, startPointPosition.x);
                    startY = Math.min(point.plotY, startPointPosition.y);
                    plotHeight = Math.abs(point.plotY - startPointPosition.y);
                    plotWidth = Math.abs(point.plotX - startPointPosition.x);

                    if (isHorizontal) {
                        point.animInitAttr = {
                            x : startPointPosition.x,
                            width : 0
                        };
                        point.animAttr = {
                            x : startX,
                            width : plotWidth
                        };
                        plotHeight = gaugeHeight * (point.plotFillPercent / 100);
                        startY -= plotHeight / 2;
                    }
                    else {
                        point.animInitAttr = {
                            y : startPointPosition.y,
                            height : 0
                        };
                        point.animAttr = {
                            y : startY,
                            height : plotHeight
                        };
                        plotWidth = gaugeWidth * (point.plotFillPercent / 100);
                        startX -= plotWidth / 2;
                    }
                }

                point.shapeType = 'rect';


                point.shapeArgs = {
                    x: startX,
                    y: startY,
                    height: plotHeight,
                    width: plotWidth,
                    endY: endY,
                    r: 0
                }

                point.graphic = renderer[point.shapeType](point.shapeArgs)
                .attr({
                    'fill' : point.color,
                    'stroke' : point.borderColor,
                    'stroke-width': point.borderWidth
                })
                .add(series.group);
            }

            //draw the target
            if (defined(target.y)) {
                if (isHorizontal) {
                    targetLength = gaugeHeight * target.targetFillPercent / 100,
                    halfTargetLength = targetLength / 2;
                    endX = startX = target.plotX;
                    trackerY = startY = target.plotY - halfTargetLength;
                    endY = target.plotY + halfTargetLength;
                    targetHeight = targetLength;
                    targetWidth = targetBorderWidth;
                    trackerX = startX - (targetBorderWidth / 2);
                    tooltipPos = [startX + targetBorderWidth , target.plotY];
                }
                else {
                    targetLength = gaugeWidth * target.targetFillPercent / 100,
                    halfTargetLength = targetLength / 2;
                    trackerX = startX = target.plotX - halfTargetLength;
                    startY = endY = target.plotY;
                    endX = target.plotX + halfTargetLength;
                    targetHeight = targetBorderWidth;
                    targetWidth = targetLength;
                    trackerY = startY - (targetBorderWidth / 2);
                    tooltipPos = [target.plotX, startY + targetBorderWidth + tooltipCorrection];

                }


                target.shapeType = 'rect';//used in tracker
                target.tooltipPos = tooltipPos;

                target.trackerArgs = {
                    x: trackerX,
                    y: trackerY,
                    height: targetHeight,
                    width: targetWidth,
                    r: 0
                }

                target.shapeArgs = renderer.crispLine(
                    [M, startX, startY, L, endX, endY], targetBorderWidth);

                target.animInitAttr = {
                    d : [M, target.plotX, target.plotY, L, target.plotX, target.plotY]
                };
                target.animAttr = {
                    d : target.shapeArgs
                };

                target.graphic = renderer.path(target.shapeArgs)
                .attr({
                    stroke : target.borderColor,
                    'stroke-width': targetBorderWidth,
                    'stroke-linecap': 'round'
                })
                .add(series.group);
            }
        },

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            width = chart.plotWidth,
            height = chart.plotHeight,
            valuePadding = chart.options.chart.valuePadding,
            dataLabels = options.dataLabels,
            chartAPI = chart.options.instanceAPI,
            isHorizontal = chartAPI.isHorizontal,
            labelX, labelY,
            style = dataLabels.style;

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .translate(chart.plotLeft, chart.plotTop)
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .add();
            }

            // only draw the point if y is defined
            if (point.y !== UNDEFINED && !isNaN(point.y)) {
                if (isHorizontal) {
                    labelX = width + valuePadding + (dataLabels.x || 0);
                    labelY = (height / 2) + (dataLabels.y || 0);
                }
                else {
                    labelX = width / 2;
                    labelY = height + valuePadding;
                }


                point.dataLabel = chart.renderer.text(point.displayValue, labelX, labelY)
                .attr({
                    align: dataLabels.align || POSITION_CENTER
                })
                .css(style)
                .add(dataLabelsGroup);

            }
        },
        animate: function(init) {
            var series = this,
            data = series.data,
            options = series.options,
            point,
            graphic,
            animation = options.animation;

            if (animation && !isObject(animation)) {
                animation = {};
            }
            if (!init) {
                point = data[0];
                if (point && point.animInitAttr && point.animAttr) {
                    graphic = point && point.graphic;
                    if (graphic){
                        if (!graphic.isAnimating) { // apply it only for one of the series
                            graphic.isAnimating = true;
                            graphic.attr(point.animInitAttr);
                            graphic.animate(point.animAttr, animation);
                        }
                    }
                }

                point = data[1];
                if (point && point.animInitAttr && point.animAttr) {
                    graphic = point && point.graphic;
                    if (graphic){
                        if (!graphic.isAnimating) { // apply it only for one of the series
                            graphic.isAnimating = true;
                            graphic.attr(point.animInitAttr);
                            graphic.animate(point.animAttr, animation);
                        }
                    }
                }
                this.animate = null;
            }
        }
    });

    seriesTypes.bullet = Bullet;


    /*******************************************************************
     * Start HBullet Graph Code
     * ********************************************************/
    // 1 - Set default options
    defaultPlotOptions.hbullet = merge(defaultPlotOptions.bullet, {
        states: {
            hover: {}
        }
    });

    var hBullet = Highcharts.extendClass(seriesTypes.bullet, {
        type: 'hbullet',
        realtimeUpdate: function (updateObj) {
            var series = this,
            options = series && series.options,
            data = series && series.data,
            chart = series.chart,
            point, valueObj,
            NumberFormatter = chart.options.instanceAPI.numberFormatter,
            displayValue, itemValue, newWidth,
            gaugeWidth = options.gaugeWidth,
            gaugeOriginX = options.gaugeOriginX - chart.plotLeft,
            min = options.min, translateVal,
            max = options.max,
            values = updateObj.values || [],
            labels = updateObj.labels || [],
            toolTexts = updateObj.toolTexts || [],
            showLabels = updateObj.showLabels || [];


            if (data[0] && values[0]) {
                point = data[0];
                valueObj = values[0];
                itemValue = NumberFormatter.getCleanValue(values[0], true);
                if (point && itemValue <= max && itemValue >= min) {
                    if (point.plotasdot) {
                        translateVal = gaugeOriginX + (itemValue - min) * gaugeWidth / (max - min) - (point.shapeArgs["width"] / 2);
                        // Update the Graphics
                        point.graphic.animate({
                            x: translateVal
                        });
                    }
                    else {
                        newWidth = (itemValue - min) * gaugeWidth / (max - min);
                        translateVal = (itemValue - point.value) * gaugeWidth / (max - min);
                        // Update the Graphics
                        point.graphic.animate({
                            width: newWidth
                        });
                    }
                    displayValue = pluck(valueObj.label, NumberFormatter.dataLabels(itemValue));
                    point.toolText = displayValue;
                    point.value = itemValue;

                    if (point.dataLabel) {
                        // Update the dataLabel text
                        point.dataLabel.attr({
                            text: displayValue
                        });
                    }

                    if (point.tracker) {
                        point.tracker.animate({
                            width: newWidth
                        })
                        point.plotX += (translateVal / 2);
                    }
                }
            }

            if (data[1] && values[1]) {
                point = data[1];
                valueObj = values[1];
                itemValue = NumberFormatter.getCleanValue(isObject(valueObj) ? valueObj.value : valueObj, true);
                if (point && itemValue <= max && itemValue >= min) {
                    translateVal = gaugeOriginX + (itemValue - min) * gaugeWidth / (max - min) - (point.shapeArgs["width"] / 2);
                    // Update the Graphics
                    point.graphic.animate({
                        x: translateVal
                    });
                    displayValue = pluck(valueObj.label, NumberFormatter.dataLabels(itemValue));
                    point.toolText = displayValue;
                    point.value = itemValue;

                    if (point.tracker) {
                        point.tracker.animate({
                            x: translateVal
                        })
                        point.plotX = translateVal;
                    }
                }
            }
        }
    });

    seriesTypes.hbullet = hBullet;


    /* ****************************************************************************
     * Start Cylinder series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.drawingpad = merge(defaultPlotOptions.pie, {
        states: {
            hover: {}
        }
    });

    var DrawingPad = Highcharts.extendClass(seriesTypes.pie, {
        type: 'drawingpad',

        drawPoints: function() {
            var series = this,
            pointAttr,
            data = series.data,
            chart = series.chart,
            options = series.options,
            point,
            graphic,
            colorRangeObj, fillColor,
            gaugeRadius = options.gaugeRadius,
            gaugeOriginX = options.gaugeOriginX,
            gaugeOriginY = options.gaugeOriginY;

        },

        drawDataLabel: function () {

        },

        animate: function(init) {

        }
    });

    // 4 - add the constractor
    seriesTypes.drawingpad = DrawingPad;




    /* ****************************************************************************
     * Start SparkLine series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.sparkline = merge(defaultPlotOptions.line, {
        states: {
            hover: {}
        }
    });

    var sparkLine = Highcharts.extendClass(seriesTypes.line, {
        type: 'sparkline',

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            dataLabelStyle = options.dataLabels.style,
            lineHeight = parseInt(dataLabelStyle.lineHeight),
            chartOptions = chart.options.chart,
            valuePadding = chartOptions.valuePadding,
            closeValueWidth = 0,
            canvasMiddle = (chart.plotHeight / 2) + (lineHeight * 0.3);

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);
            }


            // draw the openValue
            //if (typeof options.openValue != 'undefined') {
            if (defined(chartOptions.openValue.label)) {
                point.openValue = chart.renderer.text(chartOptions.openValue.label, - valuePadding, canvasMiddle)
                .attr({
                    align: 'right'
                })
                .css(chartOptions.openValue.style)
                .add(dataLabelsGroup);
            }

            // draw the closeValue
            if (defined(chartOptions.closeValue.label)) {
                point.closeValue = chart.renderer.text(chartOptions.closeValue.label, chart.plotWidth + valuePadding, canvasMiddle)
                .attr({
                    align: 'left'
                })
                .css(chartOptions.closeValue.style)
                .add(dataLabelsGroup);
            }
            if (point.closeValue && point.closeValue.getBBox().width > 0) {
                closeValueWidth = point.closeValue.getBBox().width + valuePadding;
            }
            // draw the high low value
            if (defined(chartOptions.highLowValue.label)) {
                point.dataLabel = chart.renderer.text(chartOptions.highLowValue.label,
                    chart.plotWidth + valuePadding + closeValueWidth, canvasMiddle, 0)
                .attr({
                    align: 'left'
                })
                .css(chartOptions.highLowValue.style)
                .add(dataLabelsGroup);
            }
        }
    });

    // 4 - add the constractor
    seriesTypes.sparkline = sparkLine;


    /* ****************************************************************************
     * Start SparkLine series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.sparkwinloss = merge(defaultPlotOptions.column, {
        states: {
            hover: {}
        }
    });

    var sparkWinLoss = Highcharts.extendClass(seriesTypes.column, {
        type: 'sparkwinloss',

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            options = series.options,
            chartOptions = chart.options.chart,
            point = data[0],
            dataLabelsGroup = series.dataLabelsGroup,
            dataLabelStyle = options.dataLabels.style,
            lineHeight = parseInt(dataLabelStyle.lineHeight);

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                chart.renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);
            }


            // draw the openValue
            if (typeof chartOptions.closeValue.label != 'undefined') {
                point.dataLabel = chart.renderer.text(chartOptions.closeValue.label,
                    chart.plotWidth + chartOptions.valuePadding,
                    chart.plotHeight / 2 + (lineHeight * 0.3))
                .attr({
                    align: 'left'
                })
                .css(dataLabelStyle)
                .add(dataLabelsGroup);
            }
        }
    });

    // 4 - add the constractor
    seriesTypes.sparkwinloss = sparkWinLoss;




    /* ****************************************************************************
     * Start SparkLine series code                                                   *
     *****************************************************************************/

    // 1 - Set default options
    defaultPlotOptions.angulargauge = merge(defaultPlotOptions.pie, {
        states: {
            hover: {}
        }
    });


    var
    /**
     * roundUp method is used to format trailing decimal
     * places to the required precision, with default base 2.
     * @param		num		number to be formatted
     * @param		base	number of precision digits
     * @returns		formatted number
     */
    roundUp = function (num, base) {
        // precise to number of decimal places
        base = (base == undefined) ? 2 : base;
        var factor = Math.pow(10, base);
        num *= factor;
        num = Math.round(Number(String(num)));
        num /= factor;
        return num;
    },

    rotatePoint = function (x, y, cosF, sinF) {
        return [roundUp(x * cosF - y * sinF, 2), roundUp(y * cosF + x * sinF, 2)]
    },

    getAttrFunction = function (startAngle, endAngle) {
        var rotationStr = 'angle';
        return function (hash, val) {
            var key,
            value,
            elem,
            element = this,
            attr3D = this['_Attr'],
            d, red, newd, cosF, sinF, i, l, transformStr;

            if (!attr3D) {
                attr3D = element['_Attr'] = {};
            }


            // single key-value pair
            if (isString(hash) && defined(val)) {
                key = hash;
                hash = {};
                hash[key] = val;
            }

            // used as a getter: first argument is a string, second is undefined
            if (isString(hash)) {
                //if belongs from the list then handle here
                if (hash == rotationStr) {
                    element = element['_Attr'][hash];
                }
                else {//else leve for the original attr
                    element = element['_attr'](hash);
                }

            // setter
            }
            else {
                for (key in hash) {
                    value = hash[key];
                    //if belongs from the list then handle here
                    if (key == rotationStr) {
                        attr3D[key] = value;
                        red = value * deg2rad;
                        attr3D.tooltipPos[0] = attr3D.cx + (attr3D.toolTipRadius * Math.cos(red));
                        attr3D.tooltipPos[1] = attr3D.cy + (attr3D.toolTipRadius * Math.sin(red));

                        if (element.renderer.type === 'VML') {
                            elem = element.element;
                            d = pluck(attr3D.d, element.d.split(' '));
                            attr3D.d = d;
                            cosF = Math.cos(red);
                            sinF = Math.sin(red);
                            newd = [M].concat(rotatePoint(d[1], d[2], cosF, sinF),
                                [L], rotatePoint(d[4], d[5], cosF, sinF), rotatePoint(d[6], d[7], cosF, sinF),
                                rotatePoint(d[8], d[9], cosF, sinF),[Z]);
                            element._attr({
                                d : newd
                            });
                            //update the original colorOBJ
                            if (attr3D.color && attr3D.color.FCcolor) {
                                attr3D.color.FCcolor.angle = 0 - value;
                            }
                            each(elem.childNodes, function(child) {
                                var angle, key = 'angle';
                                if(defined(child.angle)) {
                                    angle = pluckNumber(child.angle, 0);
                                    if (!defined(child.FCColorAngle)) {
                                        child.FCColorAngle = angle;
                                    }
                                    else {
                                        angle = child.FCColorAngle;
                                    }
                                    angle -= value;

                                    if (docMode8) { // IE8 setAttribute bug
                                        child[key] = angle;
                                    } else {
                                        attr(child, key, angle);
                                    }
                                }
                            });
                        }
                        else {
                            element.rotate(value, 0, 0);
                        }
                    }
                    else {//else leave for the original attr
                        element['_attr'](key, value);
                    }
                }
            }
            return element;
        }
    },

    AngularGauge = Highcharts.extendClass(seriesTypes.pie, {
        type: 'angulargauge',


        /**
         * Draw the markers
         */
        drawPoints: function () {
            var series = this,
            pointAttr,
            data = series.data,
            chart = series.chart,
            chartOptions = chart.options.chart,
            scale = chart.options.scale,
            options = series.options,
            renderer = chart.renderer,
            x = Number(options.gaugeOriginX),
            y = Number(options.gaugeOriginY),
            startAngle = chartOptions.gaugeStartAngle,
            endAngle = chartOptions.gaugeEndAngle,
            minValue = scale.min,
            maxValue = scale.max,
            group = series.pointGroup,

            valueRange = maxValue - minValue,
            angleRange = endAngle - startAngle,
            i = 0, point, radius, baseWidth, topWidth, rearExtension, baseWidthHF, topWidthHF,
            ln = data && data.length,
            rotation,
            attrFN = getAttrFunction(startAngle, endAngle);

            if (series.dataById === undefined) {
                series.dataById = {}
            }
            for (; i < ln; i += 1) {
                point = data[i];
                if (defined(point.y)) {
                    if (point.id !== undefined) {
                        series.dataById[point.id] = {
                            index: i,
                            point: point
                        };
                    }
                    point.index = i;
                    radius = pluckNumber(point.radius, (Number(options.gaugeOuterRadius) + Number(options.gaugeInnerRadius)) / 2);
                    baseWidth = point.baseWidth;
                    baseWidthHF = baseWidth / 2;
                    topWidth = point.topWidth;
                    topWidthHF = topWidth / 2;
                    rearExtension = point.rearExtension;
                    if (point.y >= minValue && point.y <= maxValue) {
                        rotation = (startAngle + ((point.y - minValue) / valueRange) * angleRange) / deg2rad;
                    }
                    else {
                        rotation = startAngle;
                    }
                    //set the tooltip pos
                    point.tooltipPos = [x, y];


                    point.graphic = renderer.path([M, radius, -topWidthHF, L, radius, topWidthHF, -rearExtension, baseWidthHF, -rearExtension, -baseWidthHF, Z])
                    .attr({
                        fill: point.color,
                        stroke: point.borderColor,
                        'stroke-width': point.borderThickness
                    })
                    .add(group)
                    .shadow(options.shadow);
                    //replace attr function
                    point.graphic['_attr'] = point.graphic.attr;
                    point.graphic.attr = attrFN;
                    point.graphic['_Attr'] = {
                        tooltipPos : point.tooltipPos,
                        cx: x,
                        cy: y,
                        toolTipRadius: radius - rearExtension,
                        color : point.color
                    }


                    // Rotate the dial as per the angle
                    point.graphic.attr({
                        angle: rotation
                    })
                }
            }
        },

        //drawGraph: function (x, y, startAngle, endAngle, minValue, maxValue, colorRangeManager, gaugeOptions) {
        drawGraph: function () {
            var series = this,
            chart = series.chart,
            chartOptions = chart.options.chart,
            scale = chart.options.scale,
            options = series.options,
            renderer = series.chart.renderer,
            gaugeOuterRadius = options.gaugeOuterRadius,
            gaugeInnerRadius = options.gaugeInnerRadius,
            gaugeFillRatio = options.gaugeFillRatio,
            gaugeBorderColor = chartOptions.gaugeBorderColor,
            gaugeBorderThickness = chartOptions.gaugeBorderThickness,
            gaugeBorderAlpha = chartOptions.gaugeBorderAlpha,
            gaugeFillMix = options.gaugeFillMix,
            x = options.gaugeOriginX,
            y = options.gaugeOriginY,
            startAngle = chartOptions.gaugeStartAngle,
            endAngle = chartOptions.gaugeEndAngle,
            minValue = scale.min,
            maxValue = scale.max,
            chartAPI = chart.options.instanceAPI,
            colorRange = chartAPI.colorRangeGetter.getColorRangeArr(minValue, maxValue),
            i = 0, ln = colorRange.length,
            valueRange = maxValue - minValue,
            angleRange = endAngle - startAngle,
            colorObj, currencEndAngle, shapeArgs, isLargeArc,
            isClockWise = endAngle > startAngle ? 1 : 0,
            oppIsClockWise = 1 - isClockWise,
            lastAngle = startAngle,
            cosTh = Math.cos(startAngle),
            sinTh = Math.sin(startAngle),
            startX = x + (gaugeOuterRadius * cosTh),
            startY = y + (gaugeOuterRadius * sinTh),
            startX1 = x + (gaugeInnerRadius * cosTh),
            startY1 = y + (gaugeInnerRadius * sinTh),
            endX,
            endY,
            endX1,
            endY1,
            crColor, crAlpha, crRatio, ratioAA, shadowAlpha,
            trendPoint = scale.trendPoint;

            // Create the TM Group
            if (!series.trendPointGroup) {
                series.trendPointGroup = renderer.g('trendpoint')
                .add(series.group);
            }



            //draw all color Bands
            for (; i < ln; i += 1) {
                colorObj = colorRange[i];
                currencEndAngle = startAngle + (((Math.min(colorObj.maxvalue, maxValue) - minValue) / valueRange) * angleRange)
                cosTh = Math.cos(currencEndAngle);
                sinTh = Math.sin(currencEndAngle);
                endX = x + (gaugeOuterRadius * cosTh);
                endY = y + (gaugeOuterRadius * sinTh);
                endX1 = x + (gaugeInnerRadius * cosTh);
                endY1 = y + (gaugeInnerRadius * sinTh);
                isLargeArc = Math.abs(lastAngle - currencEndAngle) > Math.PI ? 1 : 0,
                shapeArgs = [M, startX, startY].concat(renderer.getArcPath(x, y,
                    startX, startY, endX, endY, gaugeOuterRadius, gaugeOuterRadius, isClockWise, isLargeArc),
                [L, endX1, endY1], renderer.getArcPath(x, y, endX1, endY1, startX1,
                    startY1, gaugeInnerRadius, gaugeInnerRadius, oppIsClockWise, isLargeArc), [Z]);

                //Parse the color, alpha and ratio array for each color range arc.
                crColor = chartAPI.parseColorMix(colorObj.code, gaugeFillMix);
                crAlpha = chartAPI.parseAlphaList(colorObj.alpha, crColor.length);
                crRatio = chartAPI.parseRatioList((gaugeInnerRadius / gaugeOuterRadius * 100) + gaugeFillRatio, crColor.length);

                var borderColor = colorObj.bordercolor,
                borderAlpha = pluckNumber(colorObj.borderAlpha, gaugeBorderAlpha);
                //Set border propeties
                //Which border color to use - between actual color and color mix specified?
                if (borderColor && borderColor.indexOf("{") == -1) {
                    borderColor = convertColor(borderColor, borderAlpha);
                }
                else {
                    borderColor = chartAPI.parseColorMix(colorObj.code, pluck(borderColor, gaugeBorderColor))[0];
                }
                borderColor = convertColor(borderColor, borderAlpha);
                //create the shadow element
                shadowAlpha = crAlpha.split(COMMASTRING);
                shadowAlpha = mathMax.apply(Math, shadowAlpha);
                shadowAlpha = mathMax(gaugeBorderThickness && borderAlpha || 0, shadowAlpha);



                renderer.path(shapeArgs)
                .attr({
                    fill:  {
                        FCcolor : {
                            gradientUnits : 'userSpaceOnUse',
                            cx: x,
                            cy: y,
                            r: gaugeOuterRadius,
                            color:  crColor.join(),
                            alpha: crAlpha,
                            ratio: crRatio,
                            defaultColor: colorObj.color,
                            defaultAlpha: colorObj.alpha,
                            radialGradient : true
                        }
                    },
                    'stroke-width': gaugeBorderThickness,
                    stroke: borderColor
                })
                .add(series.group)
                .shadow(options.shadow, undefined, {
                    opacity : shadowAlpha / 100
                });

                startX = endX;
                startY = endY;
                startX1 = endX1;
                startY1 = endY1;
                lastAngle = currencEndAngle;
            }


            // Create the TM Group
            if (!series.tickMarkGroup) {
                series.tickMarkGroup = renderer.g('tickMark')
                .add(series.group);
            }
            // Create the TM Group
            if (!series.trendMarkerGroup) {
                series.trendMarkerGroup = renderer.g('trendMarker')
                .add(series.group);
            }
            // Create the Point Group
            if (!series.pointGroup) {
                series.pointGroup = renderer.g('point')
                .translate(x, y)
                .add(series.group);
            }

            // Now draw the pivot
            renderer.circle(x, y, options.pivotRadius)
            .attr({
                fill: {
                    FCcolor : {
                        color: options.pivotFillColor,
                        alpha: options.pivotFillAlpha,
                        ratio: options.pivotFillRatio,
                        radialGradient: options.isRadialGradient,
                        gradientUnits : "objectBoundingBox",
                        angle: options.pivotFillAngle,
                        cx : 0.5,
                        cy : 0.5,
                        r : '50%'
                    }
                },
                'stroke-width': options.pivotBorderThickness,
                stroke: options.pivotBorderColor
            })
            .add(series.group)
            .shadow(options.shadow);

            var trendObj, trendStartAngle, trendEndAngle, trendRadius, trendInnerRadius, isZone,
            trendSymbol = 'poly_3', marker, textValue, textRadius, align, stHeight, trendValueDistance,
            limitingValue = Math.cos(89.99 * deg2rad),
            style, labelFontSize, baseLineDistance,
            limitingNegValue = -limitingValue, bboxObj,
            getLabelConfig = function() {
                var point = this;
                return {
                    x: point.category,
                    y: point.y,
                    series: point.series,
                    point: point,
                    percentage: point.percentage,
                    total: point.total || point.stackTotal
                };
            };

            //Now create all trend points
            //draw all color Bands
            for (i = 0, ln = trendPoint.length; i < ln; i += 1) {
                trendObj = trendPoint[i];
                isZone = trendObj.isZone;
                trendStartAngle = startAngle + (((trendObj.startValue - minValue) / valueRange) * angleRange);
                trendRadius = pluckNumber(trendObj.radius, gaugeOuterRadius);
                trendInnerRadius = pluckNumber(trendObj.innerRadius, isZone ? Math.max(gaugeInnerRadius-15, 0): gaugeInnerRadius);
                trendValueDistance = pluckNumber(trendObj.trendValueDistance, 0);

                cosTh = Math.cos(trendStartAngle);
                sinTh = Math.sin(trendStartAngle);
                startX = x + (trendRadius * cosTh);
                startY = y + (trendRadius * sinTh);
                startX1 = x + (trendInnerRadius * cosTh);
                startY1 = y + (trendInnerRadius * sinTh);

                if (isZone) {
                    trendEndAngle = startAngle + (((trendObj.endValue - minValue) / valueRange) * angleRange);
                    cosTh = Math.cos(trendEndAngle);
                    sinTh = Math.sin(trendEndAngle);
                    endX = x + (trendRadius * cosTh);
                    endY = y + (trendRadius * sinTh);
                    endX1 = x + (trendInnerRadius * cosTh);
                    endY1 = y + (trendInnerRadius * sinTh);
                    isClockWise = trendEndAngle > trendStartAngle ? 1 : 0;
                    oppIsClockWise = isClockWise ? 0 : 1;

                    isLargeArc = Math.abs(lastAngle - currencEndAngle) > Math.PI ? 1 : 0,
                    shapeArgs = [M, startX, startY].concat(renderer.getArcPath(x, y, startX, startY, endX, endY, trendRadius, trendRadius, isClockWise, isLargeArc),
                        [L, endX1, endY1], renderer.getArcPath(x, y, endX1, endY1, startX1, startY1, trendInnerRadius, trendInnerRadius, oppIsClockWise, isLargeArc), [Z]);

                    trendObj.graphic = renderer.path(shapeArgs)
                    .attr({
                        fill:  convertColor(trendObj.color, trendObj.alpha),
                        'stroke-width': trendObj.showBorder ? trendObj.thickness : 0,
                        stroke: trendObj.borderColor,
                        dashstyle: trendObj.dashStyle
                    })
                    .add(series.trendPointGroup);

                }
                else {
                    trendObj.graphic = renderer.path([M, startX, startY, L, startX1, startY1])
                    .attr({
                        'stroke-width': trendObj.showBorder ? trendObj.thickness : 0,
                        stroke: trendObj.borderColor,
                        'stroke-linecap': 'round',
                        dashstyle: trendObj.dashStyle
                    })
                    .add(series.tickMarkGroup);
                }

                //if it has marker then add it
                if (trendObj.useMarker) {
                    trendObj.markerElement = marker = renderer.symbol(trendSymbol, startX, startY, trendObj.markerRadius, {
                        startAngle : -trendStartAngle + Math.PI
                    })
                    .attr({
                        fill:  trendObj.markerColor,
                        'stroke-width': 1,
                        stroke: trendObj.markerBorderColor,
                        dashstyle: trendObj.dashStyle
                    })
                    .add(series.trendMarkerGroup);


                    if (trendObj.markerToolText !== '') {
                        (function (toolText) {
                            var toolTipPointObj =  {
                                series : {},
                                chart : chart,
                                id : trendObj.id,
                                label : this.label,
                                options : this.options,
                                svgElm : this.svgElm,
                                toolText: toolText,
                                getLabelConfig : getLabelConfig
                            };
                            marker.on('mouseover', function(e) {
                                var plotLeft = chart.plotLeft,
                                plotTop = chart.plotTop;
                                toolTipPointObj.tooltipPos = [pluck(e.layerX,e.x) - plotLeft + 20, pluck(e.layerY, e.y) - plotTop - 15];
                                //show the tooltext
                                chart.tooltip.refresh(toolTipPointObj);
                            })
                            .on('mouseout', function (e) {
                                //hide the tooltip
                                chart.tooltip.hide();
                            })
                            .on('mousemove', function(e) {
                                var plotLeft = chart.plotLeft,
                                plotTop = chart.plotTop;
                                toolTipPointObj.tooltipPos = [pluck(e.layerX,e.x) - plotLeft + 20, pluck(e.layerY, e.y) - plotTop - 15];
                                //show the tooltext
                                chart.tooltip.refresh(toolTipPointObj);
                            });
                        })(trendObj.markerToolText);
                    }
                }
                //draw the text if any
                if (trendObj.displayValue != '') {
                    textValue = (trendObj.endValue + trendObj.startValue) / 2;
                    trendEndAngle = startAngle + (((textValue - minValue) / valueRange) * angleRange);
                    cosTh = Math.cos(trendEndAngle);
                    sinTh = Math.sin(trendEndAngle);
                    if(trendObj.valueInside) {
                        textRadius = trendInnerRadius - 2 - trendValueDistance;
                        align = cosTh > limitingValue ? POSITION_RIGHT : (cosTh < limitingNegValue ? POSITION_LEFT : POSITION_CENTER);
                    }
                    else {
                        textRadius = trendRadius + 2 + trendValueDistance;
                        align = cosTh > limitingValue ? POSITION_LEFT : (cosTh < limitingNegValue ? POSITION_RIGHT : POSITION_CENTER);
                    }
                    startX = x + (textRadius * cosTh);
                    startY = y + (textRadius * sinTh);

                    style = trendObj.style;
                    labelFontSize = pluckNumber(parseInt(style.fontSize, 10), 10);
                    baseLineDistance = labelFontSize * 0.8,


                    trendObj.textElement = renderer.text(trendObj.displayValue, startX, startY)
                    .attr({
                        align: trendObj.align || align
                    })
                    .css(trendObj.style)
                    .add(series.trendMarkerGroup);

                    //adjust with the bbox
                    bboxObj = trendObj.textElement.getBBox();
                    stHeight = bboxObj.height;
                    //set the text Y
                    if (cosTh > limitingValue || cosTh < limitingNegValue) {
                        startY += labelFontSize - (stHeight / 2) + (stHeight * 0.4 * sinTh * (trendObj.valueInside ? -1 : 1));
                    }
                    else {
                        if(trendObj.valueInside) {
                            startY += baseLineDistance - (sinTh < 0 ? 0 : stHeight * 0.9);
                        }
                        else {
                            startY += baseLineDistance - (sinTh > 0 ? 0 : stHeight * 0.9);
                        }
                    }

                    trendObj.textElement.attr({
                        y : startY
                    });


                }
            }
        },
        //create the point itself as traker for it
        drawTracker: function () {
            var series = this,
            chart = series.chart,
            options = series.options,
            chartOptions = chart.options.chart,
            scale = chart.options.scale,
            x = options.gaugeOriginX,
            y = options.gaugeOriginY,
            startAngle = chartOptions.gaugeStartAngle,
            endAngle = chartOptions.gaugeEndAngle,
            trackerEventAdded,
            trackerLabel = +new Date(),
            cursor = series.options.cursor,
            css = cursor && {
                cursor: cursor
            },
            rel,
            angleValueFactor = (scale.max - scale.min) / (endAngle - startAngle),
            getPosition = function (el) {
                var p = {
                    left: el.offsetLeft,
                    top: el.offsetTop
                };
                el = el.offsetParent;
                while (el) {
                    p.left += el.offsetLeft;
                    p.top += el.offsetTop;
                    if (el !== doc.body && el !== doc.documentElement) {
                        p.left -= el.scrollLeft;
                        p.top -= el.scrollTop;
                    }
                    el = el.offsetParent;
                }
                return p;
            },
            chartPosition = getPosition(series.chart.container),
            getClickArcTangent = function (event, center, ref) {
                return mathATan2(center[1] - event.pageY + ref.top,
                    center[0] - event.pageX + ref.left);
            },

            dialDragTrigger = function (event) {
                // Record the angle of point of drag start with respect
                // to starting angle.
                series.rotationStartAngle = getClickArcTangent(event, [x, y], chartPosition);
                // Hide tooltip on dragstart

                if (series.chart.tooltip) {
                    if (event.type === 'dragstart') {
                        series.chart.tooltip.block(true);
                    }
                    else {
                        var chartObj = series.chart && series.chart.options &&
                        series.chart.options.instanceAPI && series.chart.options.instanceAPI.chartInstance,
                        jsVars = chartObj && chartObj.jsVars;

                        jsVars && (jsVars._rtLastUpdatedData = chartObj.getDataJSON());

                        global.raiseEvent('RealTimeUpdateComplete', {
                            data: "&value=" + event.data.updatedValStr,
                            source: 'editMode',
                            url: null
                        }, chartObj);

                        series.chart.tooltip.block(false);
                        series.chart.tooltip.refresh(event.data, true);
                    }
                }
            },

            dialDragHandler = function (event) {
                var point = event.data,
                newAngle = getClickArcTangent(event, [x, y], chartPosition),
                startAngle = series.rotationStartAngle,
                angleDelta;
                if (newAngle < 0 && startAngle > 0) {
                    angleDelta = mathAbs(newAngle) - series.rotationStartAngle;
                } else if (newAngle > 0 && startAngle < 0) {
                    angleDelta = mathAbs(series.rotationStartAngle) - newAngle;
                } else {
                    angleDelta = series.rotationStartAngle - newAngle;
                }
                var newVal = pluckNumber(point.value, point.y) - (angleDelta * angleValueFactor),
                values = [], i = 0, len = point.index;

                if (newVal < scale.min) {
                    newVal = scale.min;
                } else if (newVal > scale.max){
                    newVal = scale.max;
                }

                for(;i < len; i += 1) {
                    values.push("");
                }
                values.push(newVal);

                if (newVal !== point.value && series.realtimeUpdate({
                    values: values
                })){
                    point.updatedValStr = values.join("|");
                    series.rotationStartAngle = newAngle;
                }
            };


            each(series.data, function(point) {
                trackerEventAdded = point.trackerEventAdded;
                if (point.y !== null) {
                    if (!trackerEventAdded && point.graphic) {
                        /**^
                         * Add cursor pointer if there has link
                         *modify the parent scope css variable with a local variable
                         */

                        if (point.link !== undefined || point.editMode) {
                            var css = {
                                cursor : 'pointer',
                                '_cursor': 'hand'
                            };
                        }
                        /* EOP ^*/
                        point.graphic
                        .attr({
                            isTracker: trackerLabel
                        })
                        .on(hasTouch ? 'touchstart' : 'mouseover', function(event) {
                            rel = event.relatedTarget || event.fromElement;
                            if (chart.hoverSeries !== series && attr(rel, 'isTracker') !== trackerLabel) {
                                series.onMouseOver();
                            }
                            point.onMouseOver();
                        })
                        .on('mouseout', function(event) {
                            if (!series.options.stickyTracking) {
                                rel = event.relatedTarget || event.toElement;
                                if (attr(rel, 'isTracker') !== trackerLabel) {
                                    series.onMouseOut();
                                }
                            }
                        })
                        .css(css);
                        point.trackerEventAdded = true;

                        if (point.editMode) {
                            addEvent(point.graphic.element, 'dragstart dragend',
                                dialDragTrigger, point);

                            // rotate series upon drag.
                            addEvent(point.graphic.element, 'drag', dialDragHandler, point);
                        }
                    }
                }
            });
        },

        drawTickMarks: function () {
            var series = this,
            chart = series.chart,
            options = series.options,
            chartOptions = chart.options.chart,
            scale = chart.options.scale,
            renderer = chart.renderer,
            x = Number(options.gaugeOriginX),
            y = Number(options.gaugeOriginY),
            startAngle = chartOptions.gaugeStartAngle,
            endAngle = chartOptions.gaugeEndAngle,
            minValue = scale.min,
            maxValue = scale.max,
            innerRadius = Number(options.gaugeInnerRadius),
            outerRadius = Number(options.gaugeOuterRadius),
            valueRange = maxValue - minValue,
            angleRange = endAngle - startAngle,
            i = 0,
            majorTM = scale.majorTM,
            minorTM = scale.minorTM,
            length,
            TMObj,
            tickMarkGroup = series.tickMarkGroup,
            tmX, tmY, tmXs, tmYs, label, align = 'center',
            angle, cos = Math.cos, sin = Math.sin,
            minorTMHeight = Number(scale.minorTMHeight),
            majorTMHeight = Number(scale.majorTMHeight),
            placeTicksInside = scale.placeTicksInside,
            placeValuesInside = scale.placeValuesInside,
            tickValueDistance = scale.tickValueDistance,
            tmRadius, tmRadiusMi, tmRadiusMa, valueR, value,
            tickLabelsStyle,
            cosThita, sinThita;

            if (placeTicksInside) {
                tmRadius = innerRadius;
                tmRadiusMi = tmRadius + minorTMHeight;
                tmRadiusMa = tmRadius + majorTMHeight;
            }
            else {
                tmRadius = outerRadius;
                tmRadiusMi = tmRadius - minorTMHeight;
                tmRadiusMa = tmRadius - majorTMHeight;
            }

            if (placeValuesInside) {
                valueR = innerRadius - tickValueDistance;
            }
            else {
                valueR = outerRadius + tickValueDistance;
            }


            if (!series.majorTM) {
                series.majorTM = [];
            }
            if (!series.tmLabel) {
                series.tmLabel = [];
            }
            for (i = 0, length = majorTM.length; i < length; i += 1) {
                TMObj = majorTM[i];
                value = TMObj.value,
                label = TMObj.displayValue;
                //tmY = tickY + (reverseScale ? (minValue + value) : (maxValue - value)) * ratio;
                angle = ((value - minValue) * angleRange / valueRange) + startAngle;
                cosThita = cos(angle);
                sinThita = sin(angle);
                tmX = x + (tmRadius * cosThita);
                tmY = y + (tmRadius * sinThita);
                tmXs = x + (tmRadiusMa * cosThita);
                tmYs = y + (tmRadiusMa * sinThita);

                series.majorTM[i] = renderer.path([M, tmX, tmY, L, tmXs, tmYs])
                .attr({
                    stroke: convertColor(scale.majorTMColor, scale.majorTMAlpha),
                    'stroke-width': scale.majorTMThickness,
                    'stroke-linecap': 'round'
                })
                .add(tickMarkGroup);

                // Render Tick-Mark Values
                if (label !== '') {
                    tickLabelsStyle = (i == 0 || i == length -1) ? scale.limitValues.style : scale.tickValues.style;
                    tmX = x + (valueR * cosThita) + (TMObj.x || 0);
                    tmY = y + (valueR * sinThita) + (TMObj.y || 0);
                    // Render tickMark label text
                    series.tmLabel[i] = renderer.text(label, tmX, tmY)
                    .attr({
                        align: TMObj.align || align
                    })
                    .css(tickLabelsStyle)
                    .add(tickMarkGroup);
                }
            }


            if (!series.minorTM) {
                series.minorTM = [];
            }
            for (i = 0, length = minorTM.length; i < length; i += 1) {
                value = minorTM[i];
                angle = ((value - minValue) * angleRange / valueRange) + startAngle;
                tmX = x + (tmRadius * cos(angle));
                tmY = y + (tmRadius * sin(angle));
                tmXs = x + (tmRadiusMi * cos(angle));
                tmYs = y + (tmRadiusMi * sin(angle));

                series.majorTM[i] = renderer.path([M, tmX, tmY, L, tmXs, tmYs])
                .attr({
                    stroke: convertColor(scale.minorTMColor, scale.minorTMAlpha),
                    'stroke-width': scale.minorTMThickness,
                    'stroke-linecap': 'round'
                })
                .add(tickMarkGroup);
            }
        },

        drawDataLabels: function() {
            var series = this,
            data = series.data,
            chart = series.chart,
            seriesOpp = series.options,
            options = seriesOpp.dataLabels,
            dataLabelsGroup = series.dataLabelsGroup,
            labelX, labelY, labelAlign = 'center',
            renderer = chart.renderer,
            style = options.style,
            pivotRadius = seriesOpp.pivotRadius,
            lineHeight = pluckNumber(parseInt(style.lineHeight, 10), 12),
            isBelow = seriesOpp.valueBelowPivot,
            x = seriesOpp.gaugeOriginX,
            y = seriesOpp.gaugeOriginY,
            lastY = y + (isBelow ? lineHeight + pivotRadius + 2 : -pivotRadius - 2);//2 pix gutter

            // create a separate group for the data labels to avoid rotation
            if (!dataLabelsGroup) {
                dataLabelsGroup = series.dataLabelsGroup =
                renderer.g('data-labels')
                .attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: 6
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add();
            }
            each(data, function (point, i) {
                if (point.displayValue!= '') {
                    labelY = point.valueY;
                    labelX = pluckNumber(point.valueX, x);
                    if (!defined(labelY)) {
                        labelY = lastY;
                        lastY += isBelow ? lineHeight : -lineHeight
                    }
                    point.dataLabel = renderer.text(point.displayValue, labelX, labelY)
                    .attr({
                        align: labelAlign
                    })
                    .css(style)
                    .add(dataLabelsGroup);
                }
            });

        },
        realtimeUpdate: function(updateObj, singleUpdate) {
            var series = this,
            data = series.data,
            chart = series.chart,
            scale = chart.options.scale,
            chartOptions = chart.options.chart,
            point, i = 0,
            pointerOptions = chart.options.series && chart.options.series[0] && chart.options.series[0].data,
            NumberFormatter = chart.options.instanceAPI.numberFormatter,
            animation = chart.options.plotOptions.series.animation,
            animationDuration = animation ? updateObj.interval : 0,
            displayValue, itemValue,
            startAngle = chartOptions.gaugeStartAngle,
            endAngle = chartOptions.gaugeEndAngle,
            minValue = scale.min,
            maxValue = scale.max,
            valueRange = maxValue - minValue,
            angleRange = endAngle - startAngle,
            values = updateObj.values || [],
            labels = updateObj.labels || [],
            showLabels = updateObj.showLabels || [],
            toolTexts = updateObj.toolTexts || [],
            l = Math.min(values.length, data.length),
            returnVal = false;

            if (singleUpdate) {
                point = data[singleUpdate.index];

                itemValue = NumberFormatter.getCleanValue(values[0]);
                if (point && (itemValue === null || (itemValue <= maxValue && itemValue >= minValue))) {
                    // Update the Graphics
                    if (itemValue !== null) {
                        point.value = itemValue;
                        $(point.graphic).stop(true, true);
                        point.graphic.animate({
                            angle : (startAngle + ((itemValue - minValue) / valueRange) * angleRange) / deg2rad
                        }, {
                            duration: animationDuration
                        });
                        returnVal = true;
                    }

                    displayValue = pluck(labels[0], NumberFormatter.dataLabels(itemValue));
                    if (point.dataLabel && displayValue !== undefined) {
                        if (showLabels[0] == 0) {
                            displayValue = "";
                        }
                        // Update the dataLabel text
                        point.dataLabel.attr({
                            text: displayValue
                        });
                        returnVal = true;
                    }

                    displayValue = pluck(toolTexts[0],
                        ((pointerOptions && pointerOptions[singleUpdate.index] && pointerOptions[singleUpdate.index].isLabelString && pointerOptions[singleUpdate.index].toolText) || undefined),
                        NumberFormatter.dataLabels(itemValue));

                    if (displayValue !== undefined) {
                        point.toolText = displayValue;
                        chart.tooltip && chart.tooltip.refresh(point, true);
                        returnVal = true;
                    }
                }
            } else {
                for (; i < l; i += 1) {
                    point = data[i];
                    itemValue = NumberFormatter.getCleanValue(values[i]);

                    if (point && (itemValue === null || (itemValue <= maxValue && itemValue >= minValue))) {

                        if (itemValue !== null) {
                            // Update the Graphics
                            point.value = itemValue;
                            $(point.graphic).stop(true, true);
                            point.graphic.animate({
                                angle: (startAngle + ((itemValue - minValue) / valueRange) * angleRange) / deg2rad
                            }, {
                                duration: animationDuration
                            });
                            returnVal = true;
                        }


                        displayValue = pluck(labels[i], NumberFormatter.dataLabels(itemValue));

                        if (point.dataLabel && displayValue !== undefined) {
                            if (showLabels[i] == i) {
                                displayValue = "";
                            }
                            // Update the dataLabel text
                            point.dataLabel.attr({
                                text: displayValue
                            });
                            returnVal = true;
                        }

                        displayValue = pluck(toolTexts[i],
                            ((pointerOptions && pointerOptions[i] && pointerOptions[i].isLabelString && pointerOptions[i].toolText) || undefined),
                            NumberFormatter.dataLabels(itemValue));

                        if (displayValue !== undefined) {
                            point.toolText = displayValue;
                            chart.tooltip && chart.tooltip.refresh(point, true);
                            returnVal = true;
                        }
                    }
                }
            }
            return returnVal;
        },

        render: function() {
            var series = this,
            group,
            chart = series.chart,
            renderer = chart.renderer,
            options = series.options;
            // the group
            if (!series.group) {
                group = series.group = renderer.g('series');


                group.attr({
                    visibility: series.visible ? VISIBLE : HIDDEN,
                    zIndex: options.zIndex
                })
                .translate(chart.plotLeft, chart.plotTop)
                .add(chart.seriesGroup);

            }
            this.drawGraph();


            this.drawTickMarks();

            this.drawPoints();

            this.drawTracker();

            this.drawDataLabels();

            if (series.visible) {
                chart.currentSeriesIndex = series.index;
                if (chart.naviigator) {
                    placeNaviGator(chart);
                }
            }

            if (series.options.animation && series.animate) {
                series.animate();
            }

            series.isDirty = false; // means data is in accordance with what you see
        },
        animate : function (init) {
            var series = this,
            data = series.data,
            options = series.options,
            chart = series.chart,
            chartOptions = chart.options.chart,
            startAngle = chartOptions.gaugeStartAngle,
            angle,
            i = 0, point,
            ln = data && data.length;
            if (!init) {



                for (; i < ln; i += 1) {
                    point = data[i];
                    if (point.y) {
                        angle = point.graphic.attr('angle');
                        point.graphic.attr('angle', startAngle / deg2rad);
                        point.graphic.animate({
                            angle :angle
                        }, series.options.animation);
                    }
                }
                // delete this function to allow it only once
                series.animate = null;
            }
        }

    });

    // 4 - add the constractor
    seriesTypes.angulargauge = AngularGauge;
})();/*global Array: false, FusionCharts, window: false,
    FusionChartsDataFormats: false */

/**
 * The annotations module. Specifically designed for HighCharts
 * renderer.
 */
(function () {

    // Register the module with FusionCharts and alsoo get access to a global
    // variable within the core's scope.
    var global = FusionCharts(['private', 'modules.renderer.highcharts-annotations']);
    // Check whether the module has been already registered. If true, then
    // do not bother to re-register.
    if (global === undefined) {
        return;
    }

    var
    core = global.core,
    lib = global.hcLib,

    // Lots and lots and lots of constants!
    DEFAULT_COLOR = '#ff0000',
    DEFAULT_ALPHA = 100,
    DEFAULT_BORDER_STYLE = '1px solid ',
    TOOLTIP_REFRESH_MS = 150,
    ANNOTATIONS = 'annotations',
    ONE = '1',
    ZERO = '0',
    BOLD = 'bold',
    NORMAL = 'normal',
    ITALIC = 'italic',
    HIDDEN = 'hidden',
    NONE = 'none',
    ROUND = 'round',
    RADIAL = 'radial',
    DOLLER = '$',
    PLUSDOLLER = '+$',
    MINUSDOLLER = '-$',
    BLANK = '',
    PX = 'px',
    M = 'M',
    L = 'L',
    X = 'x',
    Y = 'y',
    NINETY = '90',
    STROKE_WEIGHT = 'stroke-weight',
    STROKE_LINECAP = 'stroke-linecap',
    STROKE_WIDTH = 'stroke-width',
    OBJECT_BOUNDING_BOX = 'objectBoundingBox',
    POLY_ = 'poly_',
    POSITION_TOP = 'top',
    POSITION_RIGHT = 'right',
    POSITION_BOTTOM = 'bottom',
    POSITION_LEFT = 'left',
    POSITION_CENTER = 'center',
    POSITION_MIDDLE = 'middle',

    // Flag to determine the renderer type.
    hasSVG = lib.hasSVG,

    // All the mathematical stuffs that we will need.
    mathMin = Math.min,
    mathMax = Math.max,
    mathSin = Math.sin,
    mathCos = Math.cos,
    mathPI = Math.PI,
    deg2rad = mathPI / 180,

    // All the library functions that needs us!
    extend = global.extend,
    pluck = lib.pluck,
    pluckNumber = lib.pluckNumber,
    convertColor = lib.graphics.convertColor,
    getDashStyle = lib.getDashStyle,
    getValidValue = lib.getValidValue,
    parseUnsafeString = lib.parseUnsafeString,
    setImageDisplayMode = lib.setImageDisplayMode,
    parseColor = lib.graphics.parseColor,
    setLineHeight = lib.setLineHeight,

    // Style object that indicates that there are no styles!
    superDefaultStyle = {
        style: {}
    },

    // Self explanatory!
    returnThis = function () {
        return this;
    },

    /**
     * Reduces the pain of writing loads of object structures while creating
     * FusionCharts specific color configurations
     */
    colorize = function (original, obj) {
        if (!obj) {
            return {
                FCcolor: original
            };
        }
        else {
            return extend(original.FCcolor, obj);
        }

    },

    normalizeAngles = function (startAngle, endAngle) {
        var angle;

        if (endAngle > 360 || endAngle < -360) {
            endAngle = endAngle % 360;
        }
        if (startAngle > 360 || startAngle < -360) {
            startAngle = startAngle % 360;
        }

        //override the scale
        angle = startAngle - endAngle;
        //validate scale and EndAngle
        if (angle > 360 || angle < -360) {
            angle = angle % 360;
            endAngle = startAngle - angle;
        }

        endAngle = 360 - endAngle;
        startAngle = 360 - startAngle;
        angle = -angle;

        //if start angle cross the limit
        if (startAngle > 360 || endAngle > 360 ) {
            startAngle -= 360;
            endAngle -= 360;
        }

        return {
            start: startAngle,
            end: endAngle,
            angle: angle
        }
    },

    /**
     * Create an object by replicating the numeric values within a reference
     * object and duplicating the positive and negative variants.
     *
     * @param {object} hash Reference object containing numeric values.
     * @param {string} positive ID prefix for positive variants.
     * @param {string} neutral ID prefix for unchanged variants.
     * @param {string} negative ID prefix for negatuve variants.
     *
     * @type object
     */
    prepareExpressionLiterals = function (hash, positive, neutral, negative) {

        var rehash = {}, key;
        // Iterate through the source hash and store the different variants
        // within a rehash object.
        for (key in hash) {
            rehash[neutral + key] = rehash[positive + key] = hash[key];
            rehash[negative + key] = hash[key] * -1;
        }
        return rehash;
    },

    /**
     * Parses an expression having both numeric constants and string variables.
     * The parsed result has the numeric portion scaled and the non numeric
     * portion added to the scaled value.
     *
     * @param {string} expr Is the source expression.
     * @param {number} scale Contains the numeric multiplier for the scalable
     * portion of the expression.
     * @param {number} def The default value to be returned in case the
     * expression is blank.
     * @param {object} hash The source expression literals. Expected to have
     * been created via prepareExpressionLiterals function.
     *
     * @type number
     */
    parseHybridScale = function (expr, scale, def, hash) {

        var
        scalable = 0, // initial value of accumulator set to zero
        unscalable = 0, // initial value of accumulator set to zero
        // if scale is undefined then scale is assumed to be no-scale (1)
        multiplier = scale == undefined ? 1 : scale,
        tokens, i;

        // Validate whether to return default value. Reduces parsing performance
        // overhead
        if (!expr || !expr.toString) {
            return def;
        }

        // Sanitize expression by removing all white-spaces across it.
        expr = expr.toLowerCase().replace(/\s/g, BLANK);

        // Calculate static elements.
        tokens = expr.match(/^[\+-]?\d+(\.\d+)?|[\+-]\d+(\.\d+)?/g);
        if (tokens) {
            for (i = 0; i < tokens.length; i += 1) {
                scalable = scalable + (Number(tokens[i]) || 0);
            }
            scalable = scalable * multiplier;
        }

        // Calculate dynamic macro elements.
        tokens = expr.match(/^[\+-]?(\$[a-z]+)|[\+-](\$[a-z]+)/g);
        if (tokens) {
            for (i = 0; i < tokens.length; i += 1) {
                unscalable = unscalable + (hash[tokens[i]] || 0);
            }
        }

        // Calculate dynamic numeric elements.
        tokens = expr.match(/^[\+-]?\$\d+(\.\d+)?|[\+-]\$\d+(\.\d+)?/g);
        if (tokens) {console.log(tokens)
            for (i = 0; i < tokens.length; i += 1) {
                unscalable = unscalable +
                    Number(tokens[i].replace(DOLLER, BLANK)) || 0;
            }
        }

        // Add the two components and reurn value.
        return scalable + unscalable;
    },

    showAnnotation = function (id) {
        var vars = this.jsVars,
            groupHash = vars.annotationGroupsById,
            group = groupHash && groupHash[id];

        if (group && group.wrapper) {
            group.wrapper.show();
        }
    },

    hideAnnotation = function (id) {
        var vars = this.jsVars,
            groupHash = vars.annotationGroupsById,
            group = groupHash && groupHash[id];

        if (group && group.wrapper) {
            group.wrapper.hide();
        }
    },

    Group = function (options, sharedOptions, chart, snapPoints) {
        var group = this;

        group.options = options;
        group.chart = chart;
        group.attrs = {};
        group.css = {};
        group.bounds = {};
        group.annotations = [];
        group.shared = sharedOptions;
        group.snaps = snapPoints || {};
        group.id = options.id || BLANK;

        (chart.annotations || (chart.annotations = [])).push(group);

        group.scale();

    };

    extend(Group.prototype, {
        scaleImageX: 1,
        scaleImageY: 1,
        scaleText: 1,
        scaleValue: 1,
        scaleValueComplement: 1,
        scaleX: 1,
        scaleY: 1
    });

    Group.prototype.scale = function () {
        var group = this,
            options = group.options,
            chart = group.chart,
            shared = group.shared,
            bounds = group.bounds,
            snaps = group.snaps,

            // Keep reference for xscale and yscale values calculated only from
            // shared options (root annotations tag). This is done to perform
            // xscale and yscale operations on x-y positions of groups but
            // ignore x-y position scaling when xscale and yscale is provided
            // at group level.
            rxs = shared.rootxscale,
            rys = shared.rootyscale,

            // Get current scaling factor for x and y directions.
            xs = bounds.xs = pluckNumber(options.xscale, shared.xscale, 100) / 100,
            ys = bounds.ys = pluckNumber(options.yscale, shared.yscale, 100) / 100,

            constrained,
            ow, oh,
            scaleW, scaleH,
            scaleValue, scaleValueComplement,
            scaleX, scaleY;

        // Set scale for images and text.
        // They are again auto-calculated in autoScale if-block.
        group.scaleText = group.scaleText * ys;
        group.scaleImageX = group.scaleImageX * xs;
        group.scaleImageY = group.scaleImageY * ys;

        // Check whether autoscaling is turned off. If yes, then we do not need
        // to perform scaling.
        if (pluck(options.autoscale, shared.autoscale) != ZERO) {

            // Procure origibal width as provided in group or shared options.
            // The shared options is expected to include original-width and
            // original-height of chart element.
            ow = pluckNumber(options.origw, shared.origw);
            oh = pluckNumber(options.origh, shared.origh);

            // Calculate scale factor with respect to current chart width and
            // height.
            scaleW = chart.chartWidth / ow;
            scaleH = chart.chartHeight / oh;

            // Calculate flag that checks whether scaling is done in a
            // constrained or unconstrained fashion.
            constrained = pluck(options.constrainedscale, shared.constrainedscale) != ZERO;

            // Select the primary scaling axis.
            scaleValue = scaleW < scaleH ? scaleW : scaleH;
            // Select the secondary scaling axis (but only when unconstrained
            // scaling is performed.)
            scaleValueComplement = constrained ? scaleValue :
                (scaleW < scaleH ? scaleH : scaleW);

            // Finally select the x and y scaling factors based on constrain
            // value.
            scaleX = constrained ? scaleValue : scaleW;
            scaleY = constrained ? scaleValue : scaleH;

            // Update the primary and secondary scale values within the group
            // object.
            group.scaleValue = group.scaleValue * scaleValue;
            group.scaleValueComplement = group.scaleValueComplement *
                scaleValueComplement;
            group.scaleX = group.scaleX * scaleX;
            group.scaleY = group.scaleX * scaleY;

            // Update the scale components within the bounds object.
            xs = bounds.xs = bounds.xs * scaleX;
            ys = bounds.ys = bounds.ys * scaleY;

            // Update the root-scaling values.
            rxs = rxs * scaleX;
            rys = rys * scaleY;

            // In case text scaling is turned on, use the y-scaling value to
            // control its font-size
            if (pluck(options.scaletext, shared.scaletext) == ONE) {
                group.scaleText = group.scaleText * scaleY;
            }

            // If image scaling is turned on, update the corresponding image
            // scaling numbers.
            if (pluck(options.scaleimages, shared.scaleimages) == ONE) {
                group.scaleImageX = group.scaleImageX * scaleX;
                group.scaleImageY = group.scaleImageY * scaleY;
            }
        }

        // Compute the xy position of the group bounds.
        bounds.x = parseHybridScale(pluck(options.x, options.xpos),
            rxs, 0, snaps) + pluckNumber(options.grpxshift,
            shared.grpxshift, 0);
        bounds.y = parseHybridScale(pluck(options.y, options.ypos),
            rys, 0, snaps) + pluckNumber(options.grpyshift,
            shared.grpyshift, 0);

        // Update the xy shifting values.
        group.xshift = pluckNumber(options.xshift, shared.xshift, 0);
        group.yshift = pluckNumber(options.yshift, shared.yshift, 0);
    };

    Group.prototype.draw = function () {
        var group = this,
            chart = group.chart,
            options = group.options,
            shared = group.shared,
            bounds = group.bounds;

        group.wrapper = chart.renderer.g(ANNOTATIONS)
            .attr({
                x: 0,
                y: 0,
                zIndex: pluck(options.showbelow, options.showbelowchart, shared.showbelow) != ZERO ? 0.5 : 6,
                visibility: options.visible == ZERO ? HIDDEN : BLANK
            })
            .translate(bounds.x, bounds.y)
            .add();

            if (options.items) {
                for (var i = 0; i < options.items.length; i += 1) {
                    new Shape(chart, options.items[i], group).draw();
                }
            }

            return group;
    };

    Shape = function (chart, options, group) {

        var shape = this;

        shape.chart = chart;
        shape.options = options;

        shape.group = group;
        (group.annotations || (group.annotations = [])).push(shape);

        shape.args = [];
        shape.attrs = {};
        shape.style = {};
        shape.bounds = {};

        shape.type = options.type && options.type.toLowerCase &&
            options.type.toLowerCase();

        shape.scale();
        shape.setup();
    };

    Shape.prototype.getAbsoluteBounds = function () {
        var
        shape = this,
        bounds = shape.bounds,

        x1 = bounds.x1,
        y1 = bounds.y1,
        x2 = bounds.x2,
        y2 = bounds.y2,
        x = mathMin(x1, x2),
        y = mathMin(y1, y2),
        w = mathMax(x1, x2) - x,
        h = mathMax(y1, y2) - y;

        return {
            x: x,
            width: w,
            y: y,
            height: h,
            r: bounds.r,
            unscaled: {
                width: w / bounds.xs,
                height: h / bounds.ys
            }
        };
    };

    Shape.prototype.scale = function () {
        var shape = this,
            group = shape.group,
            groupBounds = group.bounds,
            bounds = shape.bounds,
            options = shape.options,
            snaps = group.snaps,

            x1 = pluck(options.x, options.xpos),
            y1 = pluck(options.y, options.ypos),
            x2 = pluck(options.tox, options.toxpos),
            y2 = pluck(options.toy, options.toypos),

            xs = bounds.xs = groupBounds.xs,
            ys = bounds.ys = groupBounds.ys,
            dx = pluckNumber(options.xshift, group.xshift, 0),
            dy = pluckNumber(options.toyshuft, group.yshift, 0);

        // validate dimension
        shape.hasDimension = true;
        shape.hasDimensionX = true;
        shape.hasDimensionY = true;

        bounds.x1 = parseHybridScale(x1, xs, 0, snaps) + dx;
        if (x2 === undefined) {
            shape.hasDimension = false;
            shape.hasDimensionX = false;
            bounds.x2 = bounds.x1;
        }
        else {
            bounds.x2 = parseHybridScale(x2, xs, 0, snaps) + dx;
        }

        bounds.y1 = parseHybridScale(y1, ys, 0, snaps) + dy;
        if (y2 === undefined) {
            shape.hasDimension = false;
            shape.hasDimensionY = false;
            bounds.y2 = bounds.y1;
        }
        else {
            bounds.y2 = parseHybridScale(y2, ys, 0, snaps) + dy;
        }

        bounds.r = pluckNumber(options.radius, 0) * group.scaleValue;
    };

    Shape.prototype.setup = function () {
        var shape = this,
            options = shape.options,
            group = shape.group,
            groupOptions = group.options,
            attrs = shape.attrs,
            css = shape.style,

            scale = group.scaleValue,

            groupAlpha = pluck(groupOptions.fillalpha, group.options.alpha, DEFAULT_ALPHA),
            fillAlpha = shape.fillAlpha = pluckNumber(options.fillalpha, options.alpha, groupAlpha),
            fillColor = shape.fillColor = pluck(options.fillcolor, options.color, groupOptions.color, DEFAULT_COLOR),
            fillPattern = shape.fillPattern = pluck(options.fillpattern &&
                options.fillpattern.toLowerCase &&
                options.fillpattern.toLowerCase(), groupOptions.fillpattern &&
                groupOptions.fillpattern.toLowerCase &&
                groupOptions.fillpattern.toLowerCase()),

            bordered = options.showborder ? (options.showborder == ONE) :
                getValidValue(options.bordercolor),
            borderAlpha = shape.borderAlpha =
                pluckNumber(options.borderalpha, options.alpha, groupOptions.borderalpha, groupAlpha),

            dashed = shape.dashed = options.dashed == ONE;

        shape.link = pluck(options.link, groupOptions.link);
        shape.shadow = pluck(options.showshadow, groupOptions.showshadow) == ONE;

        attrs.stroke = bordered ?
            convertColor(pluck(options.bordercolor, fillColor),
                borderAlpha) : NONE;

        attrs[STROKE_LINECAP] = ROUND;

        attrs.fill = colorize({
            gradientUnits : OBJECT_BOUNDING_BOX,
            color: fillColor,
            alpha: fillAlpha,
            ratio: pluck(options.fillratio, groupOptions.fillratio),
            angle: 360 - pluckNumber(options.fillangle, 0),
            radialGradient: fillPattern === RADIAL
        });

        attrs[STROKE_WIDTH] = bordered ?
            pluckNumber(options.borderthickness, options.thickness, 2) * scale: 0;

        if (dashed) {
            attrs.dashstyle = getDashStyle(options.dashlen * scale, options.dashgap * scale,
                attrs[STROKE_WIDTH]);
        }

        if (shape.link) {
            css.cursor = 'pointer';
            css['_cursor'] = 'hand';
        }

        shape.toolText = parseUnsafeString(pluck(options.tooltext, group.options.tooltext));
    };

    Shape.prototype.draw = function () {
        var shape = this,
            chart = shape.chart,
            type = shape.type,
            attrs = shape.attrs,
            typeName,
            wrapper,
            shadow,
            tooltip, tooltipPoint, ttHoverId, ttRefresher,
            plotLeft = chart.plotLeft, plotTop = chart.plotTop;

        typeName = Shape.types[type] && Shape.types[type].call &&
            Shape.types[type].call(shape);

        if (typeName) {
            wrapper = shape.wrapper = chart.renderer[typeName].apply(chart.renderer, shape.args)
                .attr(attrs)
                .css(shape.style)
                .add(shape.group.wrapper);

            if (shape.shadow) {
                shadow = {
                    opacity: mathMax(shape.borderAlpha, attrs.fill.FCcolor.alpha) / 100
                };
                wrapper.shadow(shadow, undefined, shadow);
            }

            if (typeName === 'text') {
                wrapper.textBound();
            }

            if (shape.link) {
                wrapper.on('click', function () {
                    chart.options.instanceAPI.linkClickFN.call(shape)
                });
            }

            if (shape.toolText && (tooltip = chart.tooltip)) {
                tooltipPoint = {
                    tooltipPos: [20,20],
                    series: {},
                    svgElm: wrapper.svgElm,
                    point: shape,
                    getLabelConfig: returnThis
                };

                ttRefresher = function () {
                    tooltip.refresh(tooltipPoint);
                };

                wrapper.on('mousemove', function (e) {
                    tooltipPoint.tooltipPos[0] = (e.layerX || e.x) - plotLeft;
                    tooltipPoint.tooltipPos[1] = (e.layerY || e.y) - plotTop;
                    if (ttHoverId) {
                        ttHoverId = clearTimeout(ttHoverId);
                        ttHoverId = setTimeout(ttRefresher, TOOLTIP_REFRESH_MS);
                    }
                    else {
                        tooltip.refresh(tooltipPoint);
                        ttHoverId = -2;
                    }
                })
                .on('mouseout', function () {
                    ttHoverId = clearTimeout(ttHoverId);
                    tooltip.hide();
                })
            }
        }

        return shape;
    };

    Shape.keys = {};

    Shape.textAlignOptions = {
        'left': POSITION_LEFT,
        'right' : POSITION_RIGHT,
        'center': POSITION_CENTER
    };
    Shape.textVerticalAlignOptions = {
        'top': POSITION_TOP,
        'middle' : POSITION_MIDDLE,
        'bottom': POSITION_BOTTOM
    };
    Shape.textRotationOptions = {
        '0' : '0',
        '1': '270',
        'right': '90',
        'left': '270'
    };

    Shape.types = {
        rectangle: function () {
            var shape = this,
                args = shape.args,
                attrs = shape.attrs,
                absBounds = shape.getAbsoluteBounds(),

                halfWidth = absBounds.width * 0.5;

            // validate radius
            if (absBounds.r > halfWidth) {
                absBounds.r = halfWidth
            }

            args[0] = absBounds.x;
            args[1] = absBounds.y;
            args[2] = absBounds.width;
            args[3] = absBounds.height;
            args[4] = absBounds.r;

            return 'rect';
        },

        // TODO: Calculate tangentially increased thickness of line when scaled.
        line: function () {
            var shape = this,
                args = shape.args,
                options = shape.options,
                scale = shape.group.scaleValue,
                attrs = shape.attrs,
                bounds = shape.bounds;

            // Prepare path arguments.
            args[0] = [M, bounds.x1, bounds.y1, L, bounds.x2, bounds.y2];

            // The stroke color (originally calculated from border color) has to
            // be replaced with fill color. But as because the original fill
            // color is in a color format not supported by highcharts stroke
            // attribute, hence we need to recreate the color rgba string.
            attrs.stroke = convertColor(shape.fillColor, shape.fillAlpha);
            // The thickness of the line is determined by the stroke width that
            // we need to recalculate from "thickness" attribute. And we also
            // scale it.
            attrs[STROKE_WIDTH] = pluckNumber(options.thickness, 2) * scale;

            return 'path';
        },

        polygon: function () {
            var shape = this,
                args = shape.args,
                options = shape.options,
                bounds = shape.bounds;

            args[0] = POLY_ + pluckNumber(options.sides, 5);
            args[1] = bounds.x1;
            args[2] = bounds.y1;
            args[3] = bounds.r;
            args[4] = {
                startAngle: pluckNumber(options.startangle, 0) * deg2rad
            };

            return 'symbol';
        },

        circle: function () {
            var shape = this,
                args = shape.args,
                attrs = shape.attrs,
                options = shape.options,
                bounds = shape.bounds,
                cw = shape.chart.chartWidth,
                ch = shape.chart.chartHeight,
                scaleC = shape.group.scaleValueComplement,

                angles = normalizeAngles(pluckNumber(options.startangle, 0),
                    pluckNumber(options.endangle, 360)),
                r1 = bounds.r, r2;

            // In case radius is not provided, autocalculate one based on 30%
            // of constrained scaling of chart dimensions.
            if (!pluck(options.radius)) {
                // The radius, when re-calculated, is ensured to be scaled as
                // per scale values.
                bounds.r = cw < ch ? (cw * bounds.xs) : (ch * bounds.ys);
                bounds.r = r1 = bounds.r * 0.3; // 30% of chart dimension
            }

            // Select y-radius, for ovals. In case one is not provided, use the
            // normal radius. Ensure That the yradius picked is scaled as well.
            r2 = pluckNumber(options.yradius, r1 / scaleC) * scaleC;

            // For circle based shapes, if the gradient color fill pattern is
            // not provided, we will have to set the default to radial. The
            // actual default (as set in 'setup' of any shape) is linear.
            if (!shape.fillPattern) {
                attrs.fill.FCcolor.radialGradient = true;
                shape.fillPattern = RADIAL;
            }

            // Set gradient focus position in case it is radial
            if (shape.fillPattern === RADIAL) {
                attrs.fill.FCcolor.cx = attrs.fill.FCcolor.cy = 0.5;
            }

            // In case there is no fancy configuration and the shape has not
            // turned out to be oval, we can use the simple circle drawing API.
            // Else the process is much more complex.
            if (!(angles.angle % 360) && (r1 === r2)) {
                args[0] = bounds.x1;
                args[1] = bounds.y1;
                args[2] = bounds.r;

                return 'circle';
            }

            // Do drawing precaution of 360 degrees.
            if (!(angles.angle % 360)) {
                angles.start = angles.start - 0.001;
            }

            var
            // Procure reference to arcPath calculation function that is
            // specific to this renderer.
            getArcPath = shape.chart.renderer.getArcPath,

            // Convert all the angles to radians.
            startAngle = angles.start * deg2rad,
            endAngle = angles.end * deg2rad,
            arcAngle = angles.angle * deg2rad,

            // Convert the polar system of coordinates to xy system.
            cx = bounds.x1,
            cy = bounds.y1,
            sx = cx + mathCos(startAngle) * r1,
            sy = cy + mathSin(startAngle) * r2,
            ex = cx + mathCos(endAngle) * r1,
            ey = cy + mathSin(endAngle) * r2,

            // This poor little variable will carry the path.
            path;

            // Get the arc.
            path = getArcPath(cx, cy, sx, sy, ex, ey, r1, r2, 0,
                arcAngle >= mathPI ? 1 : 0);
            // Add the connector line to the base of the arc
            path.unshift(M, sx, sy);
            path.push('Z'); // Seal off!

            args[0] = path;
            return 'path';
        },

        arc: function () {
            var shape = this,
                options = shape.options,
                args = shape.args,
                attrs = shape.attrs,
                bounds = shape.bounds,
                cw = shape.chart.chartWidth,
                ch = shape.chart.chartHeight,
                scale = shape.group.scaleValue,

                angles = normalizeAngles(pluckNumber(options.startangle, 0),
                        pluckNumber(options.endangle, 360)),
                startAngle = angles.start,
                endAngle = angles.end;

            // In case radius is not provided, autocalculate one based on 30%
            // of constrained scaling of chart dimensions.
            if (!pluck(options.radius)) {
                // The radius, when re-calculated, is ensured to be scaled as
                // per scale values.
                bounds.r = cw < ch ? (cw * bounds.xs) : (ch * bounds.ys);
                bounds.r = bounds.r * 0.3; // 30% of chart dimension
            }

            // Bounds inner radius
            bounds.innerR = pluckNumber(options.innerradius, bounds.r * 0.8 / scale) * scale;

            // Swap if inner and outer radii are inconsistent.
            // Yes, even this is possible!
            if (bounds.innerR > bounds.r) {
                bounds.innerR = bounds.innerR + bounds.r;
                bounds.r = bounds.innerR - bounds.r;
                bounds.innerR = bounds.innerR - bounds.r;
            }

            // If the angle totals to 360, we need a minor fix for VML.
            if (!(angles.angle % 360) && !hasSVG) {
                endAngle = endAngle + 0.5;
                startAngle = startAngle - 0.5;
            }

            // For circle based shapes, if the gradient color fill pattern is
            // not provided, we will have to set the default to radial. The
            // actual default (as set in 'setup' of any shape) is linear.
            if (!shape.fillPattern) {
                attrs.fill.FCcolor.radialGradient = true;
                shape.fillPattern = RADIAL;
            }

            // Set gradient focus position in case it is radial
            if (shape.fillPattern === RADIAL) {
                attrs.fill.FCcolor.cx = attrs.fill.FCcolor.cy = 0.5;
            }

            args[0] = bounds.x1;
            args[1] = bounds.y1;
            args[2] = bounds.r;
            args[3] = bounds.innerR;
            args[5] = startAngle * deg2rad;
            args[4] = endAngle * deg2rad;

            return 'arc';
        },

        text: function () {
            var shape = this,
                chart = shape.chart,
                args = shape.args,
                css = shape.style,
                attrs = shape.attrs,
                group = shape.group,
                bounds = shape.bounds,
                options = shape.options,

                absBounds = shape.getAbsoluteBounds(),

                align = pluck(options.align, group.options.textalign,
                    POSITION_CENTER).toLowerCase(),
                valign = pluck(options.valign, group.options.textvalign,
                    POSITION_MIDDLE).toLowerCase(),

                text = parseUnsafeString(pluck(options.text, options.label)),
                smartLabel = shape.chart && shape.chart.renderer && shape.chart.renderer.smartLabel,
                smartText,

                wrap = pluck(options.wrap, group.options.wraptext) == ONE,
                wrapW, wrapH,

                rotateTextOption = pluck(options.rotatetext, group.options.rotatetext, ZERO)
                    .toLowerCase(),
                rotation = Shape.textRotationOptions[rotateTextOption],
                rotate = rotation != ZERO,
                xOrY = rotate ? X : Y,
                yOrX = rotate ? Y : X,

                orphanStyles = chart.options.orphanStyles,
                defaultStyle = extend({}, orphanStyles.defaultStyle.style || {}),
                userStyle = orphanStyles[group.id.toLowerCase()] || superDefaultStyle,
                userStyleColor = userStyle.style.color,
                rootStyle = extend(defaultStyle, userStyle.style),
                rootFontSize = parseFloat(rootStyle.fontSize),
                rotateFactor = rotation == NINETY ? -1 : 1,
                fontFamily = pluck(options.font, group.options.font,
                    rootStyle.fontFamily),
                fontSize = pluckNumber(options.fontsize, group.options.fontsize,
                    rootFontSize) * group.scaleText;

            if (wrap) {
                wrapW = pluckNumber(options.wrapwidth, shape.hasDimensionX ?
                        absBounds.width / bounds.xs : undefined);
                wrapH = pluckNumber(options.wrapheight, shape.hasDimensionY ?
                        absBounds.height / bounds.ys : undefined);
                // do the scaling for wrapping width
                wrapW && (wrapW = wrapW * bounds.xs);
                wrapH && (wrapH = wrapH * bounds.ys);
            }

            css.fontFamily = fontFamily;
            css.fontWeight = pluck(options.bold, options.isbold) == ONE ?
                BOLD : NORMAL;

            if (pluck(options.italic, options.isitalic) == ONE) {
                css.fontStyle = ITALIC;
            }

            if (options.bgcolor) {
                css.backgroundColor = parseColor(options.bgcolor);
            }

            if (options.bordercolor) {
                css.borderColor = parseColor(options.bordercolor);
                css.border = DEFAULT_BORDER_STYLE + css.borderColor;
            }

            if (options.fontcolor) {
                css.color = attrs.fill = parseColor(options.fontcolor);
            }
            else {
                css.color = parseColor(userStyleColor || attrs.fill.FCcolor.color)
            }

            css.fontSize = fontSize + PX;
            if (fontSize == rootFontSize) {
                css.lineHeight = rootStyle.lineHeight;
            }
            else {
                setLineHeight(css);
            }

            attrs.align = Shape.textAlignOptions[align] || POSITION_CENTER;
            attrs.rotation = parseInt(rotation);

            smartLabel.setStyle(css);
            smartText = smartLabel.getSmartText(text, wrapW, wrapH, false);

            switch (Shape.textVerticalAlignOptions[valign] || POSITION_MIDDLE) {
                case POSITION_TOP:
                    absBounds[xOrY] = absBounds[xOrY] +
                        (fontSize - smartText.height) * rotateFactor;
                    break;

                case POSITION_BOTTOM:
                    absBounds[xOrY] = absBounds[xOrY] + fontSize * rotateFactor
                    break;

                default:
                    absBounds[xOrY] = absBounds[xOrY] +
                        (fontSize - smartText.height * 0.5) * rotateFactor;
            }

            // left margin when left align or centered
            if (attrs.align === POSITION_LEFT) {
                absBounds[yOrX] = absBounds[yOrX] +
                    pluckNumber(options.leftmargin, 0);
            }
            else if (attrs.align === POSITION_CENTER) {
                absBounds[yOrX] = absBounds[yOrX] +
                    pluckNumber(options.leftmargin, 0) * 0.5;
            }

            args[0] = smartText.text;
            args[1] = absBounds.x;
            args[2] = absBounds.y;

            delete attrs.stroke;
            delete attrs[STROKE_WEIGHT];

            return 'text';
        },

        image: function () {
            var shape = this,
                chart = shape.chart,
                css = shape.style,
                chartWidth = chart.chartWidth,
                chartHeight = chart.chartHeight,
                options = shape.options,
                scaleX = shape.group.scaleImageX,
                scaleY = shape.group.scaleImageY,
                absBounds = shape.getAbsoluteBounds(),
                attrs = shape.attrs,
                args = shape.args,
                url = getValidValue(options.url),
                imageRef, xattr = {
                    width: 1,
                    height: 1
                };

            if (!url) {
                args[0] = absBounds.x;
                args[1] = absBounds.y;
                args[2] = absBounds.width;
                args[3] = absBounds.height;
                args[4] = absBounds.r;

                return 'rect';
            }

            imageRef = new Image();

            imageRef.onload = function () {

                xattr = setImageDisplayMode(NONE,
                    POSITION_TOP, POSITION_LEFT, 100, 0, chartWidth, chartHeight, imageRef);

                if (shape.wrapper) {
                    shape.wrapper.attr({
                        width: (shape.hasDimensionX ?
                            absBounds.unscaled.width : xattr.width) * scaleX,
                        height: (shape.hasDimensionY ?
                            absBounds.unscaled.height : xattr.height) * scaleY
                    });
                }

            };
            imageRef.src = url;

            args[0] = url;
            args[1] = absBounds.x;
            args[2] = absBounds.y;
            args[3] = (shape.hasDimensionX ?
                absBounds.unscaled.width : xattr.width) * scaleX;
            args[4] = (shape.hasDimensionY ?
                absBounds.unscaled.height : xattr.height) * scaleY;

            css.opacity = mathMax(shape.fillAlpha, shape.borderAlpha) / 100;

            delete attrs.stroke;
            delete attrs.fill;
            delete attrs[STROKE_LINECAP];

            return 'image';
        }
    };

    core.addEventListener('internal.hc.rendered', function (event, args) {

        var chartObj = event.sender,
            vars = chartObj.jsVars,
            data = args.dataObj || {},
            options = data.annotations,
            chart = args.hcInstance,
            groupById = vars.annotationGroupsById =  {},
            sharedOptions,
            macroLiterals,
            group;

        // We have nothing to do if chartApi does not say annotation is
        // required and if no annotation object has been found.
        if (!(args.drawAnnotations && chartObj.dataReady() &&
            data.chart && data.chart.showannotations != ZERO &&
            options && options.groups && options.groups.length)) {
            return;
        }

        sharedOptions = {
            showbelow: pluck(options.showbelow, options.showbelowchart),
            autoscale: options.autoscale,
            scaletext: options.scaletext,
            scaleimages: options.scaleimages,
            constrainedscale: options.constrainedscale,
            origw: pluck(options.origw, data.chart.origw, chart.chartWidth),
            origh: pluck(options.origh, data.chart.origh, chart.chartHeight),
            xshift: options.xshift,
            yshift: options.yshift,
            grpxshift: options.grpxshift,
            grpyshift: options.grpyshift,
            xscale: options.xscale,
            yscale: options.yscale,
            rootxscale: pluckNumber(options.xscale, 100) / 100,
            rootyscale: pluckNumber(options.yscale, 100) / 100
        };

        args.snapLiterals &&
            (macroLiterals = prepareExpressionLiterals(args.snapLiterals,
                PLUSDOLLER, DOLLER, MINUSDOLLER));

        for (var h = 0; h < options.groups.length; h += 1) {
            group = new Group(options.groups[h], sharedOptions, chart,
                macroLiterals).draw();

            // add the group to ID hash for easy lookup.
            if (group.id) {
                groupById[group.id] = group;
            }
        }

    });

    core.addEventListener('rendered', function (event, args) {

        var chartObj = event.sender,
            vars = chartObj.jsVars || {},
            hcObj = vars.hcObj,
            api = vars.instanceAPI;

        // We have nothing to do if chartApi does not say annotation is
        // required and if no annotation object has been found.
        if (!(hcObj && api && api.drawAnnotations)) {
            delete chartObj.showAnnotation;
            delete chartObj.hideAnnotation;
            return;
        }

        // Add extra API for showin and hiding annotations
        if (!chartObj.showAnnotation) {
            chartObj.showAnnotation = chartObj.ref.showAnnotation = showAnnotation;
        }
        if (!chartObj.hideAnnotation) {
            chartObj.hideAnnotation = chartObj.ref.hideAnnotation = hideAnnotation;
        }
     });

})();
