class Scatterplot {
    constructor(_config, _data, _categories ){
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 750,
            containerHeight: _config.containerHeight || 500,
            margin: {top: 10, right: 50, bottom: 40, left: 50}  
        }

        this.data = _data;
        this.categories = _categories;

        console.log(this.categories);

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

        vis.updateVis();

    }


    updateVis(){
        let vis = this;
        
        //Define the graph scaless
        //get the Max and Min values for the x and y data
        if(vis.categories.includes("urban_rural_status")){
            if(vis.categories[0] == "urban_rural_status"){
                const yMax = d3.max(vis.data.objects.counties.geometries, d => d.properties[vis.categories[1]]) * 1.075;
                console.log("yMax", yMax);

                vis.xScale = d3.scaleBand()
                                    .domain(["Rural", "Suburban", "Small City", "Urban"])
                                    .range([0, vis.width])
                                    .paddingInner(0.1);
    
                vis.yScale = d3.scaleLinear()
                    .domain([yMax, 0])
                    .range([vis.height, 0]);

            }
            else{
                const xMax = d3.max(vis.data.objects.counties.geometries, d => d.properties[vis.categories[0]]) * 1.075;

                vis.xScale = d3.scaleLinear()
                    .domain([0, xMax])
                    .range([0, vis.width]);
    
                vis.yScale = d3.scaleBand()
                                    .domain(["Rural", "Suburban", "Small City", "Urban"])
                                    .range([0, vis.width])
                                    .paddingInner(0.1);
            }
        }
        else{
            const xMax = d3.max(vis.data.objects.counties.geometries, d => d.properties[vis.categories[0]]);
            const yMax = d3.max(vis.data.objects.counties.geometries, d => d.properties[vis.categories[1]]);            

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
                .range([0, vis.height]);
        }

        //Define the Axes
        vis.xAxis = d3.axisBottom(vis.xScale);
        vis.yAxis = d3.axisLeft(vis.yScale);

        //Draw the Axes
        vis.xAxisGroup = vis.chart.append('g')
            .attr('class', 'axis x-axis')
            .attr("transform", "translate(0," + vis.height + ")") 
            .call(vis.xAxis);

        vis.yAxisGroup = vis.chart.append('g')
            .attr('class', 'axis y-axis')
            .call(vis.yAxis);

        
        // Label the Axes
        vis.xAxisLabel = vis.chart.append('text')
            .attr('class', 'x label')
            .attr("text-anchor", "end")
            .attr("x", vis.config.containerWidth)
            .attr("y", vis.config.containerHeight - 6)
            .text(vis.categories[0]);

        vis.yAxisLabel = vis.chart.append('text')
            .attr("class", "y label")
            .attr("text-anchor", "center")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(vis.categories[1]);


            /*

        vis.data.objects.counties.geometries.forEach(d => {
            if(vis.categories[1] == "urban_rural_status"){
                console.log("cy", vis.yScale(d.properties[vis.categories[1]]) + ( vis.yScale.bandwidth() / 2));
            }
            else{
                console.log("val", d.properties[vis.categories[1]]);
                console.log("cy", vis.yScale(d.properties[vis.categories[1]]));

            }

            if(vis.categories[0] == "urban_rural_status"){
                console.log("cx", vis.xScale(d.properties[vis.categories[0]]) + ( vis.xScale.bandwidth() / 2));
            }
            else{
                console.log("cx", vis.xScale(d.properties[vis.categories[0]]));
            }
        });
        */

        //Plot the Data on the chart
        vis.chart.selectAll('circle')
            .data(vis.data.objects.counties.geometries)
        .join('circle')
            .attr('fill', d =>{
                if(d.properties[vis.categories[0]] != -1 && d.properties[vis.categories[1]] != -1){
                    return 'black';
                }
                else{
                    return 'none';
                }
            })
            .attr('r', 3)
            .attr('cy', (d) => {
                if(vis.categories[1] == "urban_rural_status"){
                    return (vis.yScale(d.properties[vis.categories[1]]) + ( vis.yScale.bandwidth() / 2));
                }
                else{
                    return vis.yScale(d.properties[vis.categories[1]]);

                }}) 
            .attr('cx', (d) =>  {
                if(vis.categories[0] == "urban_rural_status"){
                    return (vis.xScale(d.properties[vis.categories[0]]) + ( vis.xScale.bandwidth() / 2));
                }
                else{
                    return vis.xScale(d.properties[vis.categories[0]]);
                }});

    }

    renderVis(){

    }

}