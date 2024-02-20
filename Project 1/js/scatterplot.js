class Scatterplot {
    constructor(_config, _data ){
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 750,
            containerHeight: _config.containerHeight || 500,
            margin: {top: 40, right: 50, bottom: 10, left: 50}  
        }

        this.data = _data;

        this.initVis();
    }

    initVis(){
        console.log('Draw Scatterplot');

        let vis = this;

        //set up the width and height of the area where visualizations will go- factoring in margins               
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // Define 'svg' as a child-element (g) from the drawing area and include spaces
        // Add <svg> element (drawing space)
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);


        //Define the graph scales

        //get the Max and Min values for the x and y data
        const xMax = d3.max(vis.data.objects.counties.geometries, d => d.properties.attr1);
        const yMax = d3.max(vis.data.objects.counties.geometries, d => d.properties.attr2);
        let scaleMax = 100;

        if(xMax >= yMax){
            scaleMax = xMax * 1.075;
        }
        else{
            scaleMax = yMax * 1.075;
        }

        vis.xScale = d3.scaleLinear()
            .domain([0, scaleMax])
            .range([0, vis.width]);

        vis.yScale = d3.scaleLinear()
            .domain([scaleMax, 0])
            .range([vis.height, 0]);

        //Define the Axes
        vis.xAxis = d3.axisTop(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        //Draw the Axes
        vis.xAxisGroup = vis.chart.append('g')
            .attr('class', 'axis x-axis') 
            .call(vis.xAxis);

        vis.yAxisGroup = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

        //Plot the Data on the chart
        vis.chart.selectAll('circle')
            .data(vis.data.objects.counties.geometries)
        .join('circle')
            .attr('fill', 'black')
            .attr('r', 3)
            .attr('cy', (d) => vis.yScale(d.properties.attr2) ) 
            .attr('cx',(d) =>  vis.xScale(d.properties.attr1) );

    }


    updateVis(){
        this.renderVis();
    }

    renderVis(){

    }

}