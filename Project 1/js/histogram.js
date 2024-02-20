class Histogram {
    constructor(_config, _data, _dataID ){
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 750,
            containerHeight: _config.containerHeight || 500,
            margin: {top: 40, right: 50, bottom: 10, left: 50}  
        }

        this.data = _data;
        this.category = _dataID;

        console.log(this.category);

        this.initVis();
    }

    initVis(){
        console.log('Draw Histogram');

        let vis = this;

        //set up the width and height of the area where visualizations will go- factoring in margins               
        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // Define 'svg' as a child-element (g) from the drawing area and include spaces
        // Add <svg> element (drawing space)
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight)

        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left}, ${vis.config.margin.top})`);

        //Define the graph scales
        let bands = this.calcBars();
        let countMax = d3.max(vis.data.histo, d => d.count);
        countMax = countMax * 1.075;

        vis.xScale = d3.scaleBand()
                            .domain(bands)
                            .range([0, vis.width])
                            .paddingInner(0.025);

        vis.yScale = d3.scaleLinear()
                            .domain([0, countMax + 5 ])
                            .range([vis.height, 0]);


        //Create the graph axes
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

        //Draw the bars

        vis.chart.selectAll('rect')
                .data(vis.data.histo)
            .join('rect')
                .attr('class', 'bar')
                .attr('fill', 'DarkOrchid')
                .attr('width', vis.xScale.bandwidth())
                .attr('height', d => vis.height - vis.yScale(d.count))
                .attr('y', d => vis.yScale(d.count))
                .attr('x', d => vis.xScale(d.band));
    }


    updateVis(){
        this.renderVis();
    }

    renderVis(){

    }

    calcBars(){
        this.data.histo = [];
        let range = d3.extent(this.data.objects.counties.geometries, d => d.properties[this.category]);
        let interval = (range[1] - range[0]) / 15;
        let x = range[0];
        let buckets = [];
        let bands = [];
        let label = "";

        // fill the array with labels for the groups
        while(x < range[1]){
            label = (x + interval).toFixed(1);
            buckets.push(x + interval)
            this.data.histo.push({band: label, count: 0});
            bands.push(label);
            x = x + interval;
        }

        console.log('Bands', bands);

        this.data.objects.counties.geometries.forEach(d => {
            x = d.properties[this.category]
            if(x < buckets[0]){this.data.histo[0].count++;}
            else if(x < buckets[1]){this.data.histo[1].count++;}
            else if(x < buckets[2]){this.data.histo[2].count++;}
            else if(x < buckets[3]){this.data.histo[3].count++;}
            else if(x < buckets[4]){this.data.histo[4].count++;}
            else if(x < buckets[5]){this.data.histo[5].count++;}
            else if(x < buckets[6]){this.data.histo[6].count++;}
            else if(x < buckets[7]){this.data.histo[7].count++;}
            else if(x < buckets[8]){this.data.histo[8].count++;}
            else if(x < buckets[9]){this.data.histo[9].count++;}
            else if(x < buckets[10]){this.data.histo[10].count++;}
            else if(x < buckets[11]){this.data.histo[11].count++;}
            else if(x < buckets[12]){this.data.histo[12].count++;}
            else if(x < buckets[13]){this.data.histo[13].count++;}
            else{this.data.histo[14].count++;}
        });

        return bands;


    }

}