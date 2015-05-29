//Format A

function drawChart(parameters) {
    var chart;
    nv.addGraph(function () {
        chart = nv.models.scatterChart()
                      .showDistX(false)
                      .showDistY(false)
                      .useVoronoi(true)
                      .color(d3.scale.category10().range())
                      .transitionDuration(300)
        //.sizeRange([1000, 5000])
        
        ;

        chart.xAxis.tickFormat(d3.format('.02f'));
        chart.yAxis.tickFormat(d3.format('.02f'));
        chart.tooltipContent(function (key) {
            return '<h2>' + key + '</h2>';
        });

        //chart.scatter.onlyCircles(false);
        
        var generatedData = randomData(1, 5);
        d3.select('#test1 svg')
            .datum(generatedData)
            .call(chart);

        var count = 0;
        var container = d3.select('#test1 svg defs');
        
        container.selectAll("circle")
        .data(generatedData)
        .enter()
        .append('svg:pattern')
            .attr('id', 'Pattern'+count++)
            .attr('patternUnits', 'objectBoundingBox')
            .attr('width', '1')
            .attr('height', '1')
            .append('svg:image')
            .attr('xlink:href', '../Content/nvd3/firefox.gif')
            .attr('x', '0')
            .attr('y', '0')
            .attr('width', '20')
            .attr('height', '20');


       
        
        
        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function (e) { ('New State:', JSON.stringify(e)); });

        return chart;
    });
}



function randomData(groups, points) { //# groups,# points per group
    var data = [],
        shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
        random = d3.random.normal();

    for (i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (j = 0; j < points; j++) {
            data[i].values.push({
                x: j+3,
                y: j+3,
                size: j*3,
                shape: shapes[2]
            });
        }
    }

    return data;
}