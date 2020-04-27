var maleData = {1994: {healthy: 0.62, unhealthy: 0.38},
    1996: {healthy: 0.64, unhealthy: 0.36},
    1998: {healthy: 0.54, unhealthy: 0.46},
    2000: {healthy: 0.56, unhealthy: 0.44},
    2002: {healthy: 0.55, unhealthy: 0.45},
    2004: {healthy: 0.49, unhealthy: 0.51},
    2006: {healthy: 0.50, unhealthy: 0.50},
    2008: {healthy: 0.47, unhealthy: 0.53},
    2010: {healthy: 0.46, unhealthy: 0.54},
    2012: {healthy: 0.44, unhealthy: 0.56},
    2014: {healthy: 0.63, unhealthy: 0.37},
    2016: {healthy: 0.33, unhealthy: 0.67}};

var femaleData = {
    1994: {healthy: 0.66, unhealthy: 0.34},
    1996: {healthy: 0.66, unhealthy: 0.34},
    1998: {healthy: 0.56, unhealthy: 0.44},
    2000: {healthy: 0.60, unhealthy: 0.40},
    2002: {healthy: 0.60, unhealthy: 0.40},
    2004: {healthy: 0.55, unhealthy: 0.45},
    2006: {healthy: 0.53, unhealthy: 0.47},
    2008: {healthy: 0.48, unhealthy: 0.52},
    2010: {healthy: 0.52, unhealthy: 0.48},
    2012: {healthy: 0.48, unhealthy: 0.52},
    2014: {healthy: 0.41, unhealthy: 0.59},
    2016: {healthy: 0.38, unhealthy: 0.62}
}
var svgHeight = 500;
var svgWidth = 500;
var healthyColor = '#007BBA';
var unhealthyColor = '#7CCDF4';
var gridViewSvg = null;
function codeAddress() {
    gridViewSvg = d3.select('#canvas')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        //.style('background-color', 'black')
        .style('display', 'block')
        .attr('class', 'gridViewSvg');
    displayGrid()
}

window.onload = codeAddress;


function displayGrid() {
    var year = document.getElementById("gridVisYearSelection").value;
    console.log(year);
    d3.selectAll(".gridViewSvg > *").remove();
    //label
    gridViewSvg.append('rect')
        .attr('x', 355)
        .attr('y', 30)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#7CCDF4');

    gridViewSvg.append('rect')
        .attr('x', 355)
        .attr('y', 50)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#007BBA');

    gridViewSvg.append('text')
        .attr('x', 373)
        .attr('y', 42)
        .text('Unhealthy')
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px");

    gridViewSvg.append('text')
        .attr('x', 373)
        .attr('y', 62)
        .text('Healthy')
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px");

    gridViewSvg.append('text')
        .attr('x', 17 * 10 / 2 - 2)
        .attr('y', 17 * 17 + 10)
        .text('Male')
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr('text-anchor', 'middle');

    gridViewSvg.append('text')
        .attr('x', 17 * 10 + 20 + (17 * 10) / 2 - 2)
        .attr('y', 17 * 17 + 9)
        .text('Female')
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr('text-anchor', 'middle');

    gridViewSvg.append('text')
        .attr('x', (17 * 20  + 20 - 4) / 2)
        .attr('y', 70)
        .text(year)
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "30px")
        .attr('text-anchor', 'middle');

    drawGrid(gridViewSvg, maleData[year].healthy, maleData[year].unhealthy, 0, 100, 10, 15, 2);
    drawGrid(gridViewSvg, femaleData[year].healthy, femaleData[year].unhealthy, 10 * (15 + 2) + 20, 100, 10, 15,2);
}
function drawGrid(svg, healthyPecentage, unhealthyPecentage, xPos, yPos, gridSize, rectWidth, rectMargin) {
    var totalNumRect = gridSize * gridSize;
    var numOfHealthy = Math.round(totalNumRect * healthyPecentage);
    var numOfUnhealthy = totalNumRect - numOfHealthy;
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var ith = row * gridSize + col;
            if (ith < numOfUnhealthy) {
                svg.append('rect')
                    .attr('x', xPos + col * (rectMargin + rectWidth))
                    .attr('y', yPos + row * (rectMargin + rectWidth))
                    .attr('width', rectWidth)
                    .attr('height', rectWidth)
                    .attr('fill', unhealthyColor);
            } else {
                svg.append('rect')
                    .attr('x', xPos + col * (rectMargin + rectWidth))
                    .attr('y', yPos + row * (rectMargin + rectWidth))
                    .attr('width', rectWidth)
                    .attr('height', rectWidth)
                    .attr('fill', healthyColor);
            }
        }
        //append label
        var unhealthyText = svg.append('text')
            .attr('x', xPos + (gridSize * (rectWidth + rectMargin) - rectMargin) / 2)
            .attr('y', yPos + rectWidth * 2)
            .text(Math.round(unhealthyPecentage * 100) + "%")
            .attr("font-size", "20px")
            .attr("font-family", "sans-serif")
            .attr("fill", "#EF8354")
            .attr('text-anchor', 'middle');

    }
}