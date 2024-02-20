console.log("Enter Main")
let data, correlationGraph, distribution_1, distribution_2, map_1, map_2

Promise.all(
    [
        d3.csv('data/national_health_data.csv'),
        d3.json('data/counties-10m.json')
    ]).then( data => {
        const countyData = data[0];
        const geoData = data[1];

        console.log("DATA READ");

        //Combine the datasets

        geoData.objects.counties.geometries.forEach(d => {
            for (let i = 0; i < countyData.length; i++) {
              if (d.id === countyData[i].cnty_fips) {
                d.properties.poverty_perc = +countyData[i].poverty_perc;
                d.properties.median_household_income = +countyData[i].median_household_income;
                d.properties.education_less_than_high_school_percent = +countyData[i].education_less_than_high_school_percent;
                d.properties.air_quality = +countyData[i].air_quality;
                d.properties.park_access = +countyData[i].park_access;
                d.properties.percent_inactive = +countyData[i].percent_inactive;
                d.properties.percent_smoking = +countyData[i].percent_smoking;
                d.properties.elderly_percentage = +countyData[i].elderly_percentage;
                d.properties.number_of_hospitals = +countyData[i].number_of_hospitals;
                d.properties.number_of_primary_care_physicians = +countyData[i].number_of_primary_care_physicians;
                d.properties.percent_no_heath_insurance = +countyData[i].percent_no_heath_insurance;
                d.properties.percent_high_blood_pressure = +countyData[i].percent_high_blood_pressure;
                d.properties.percent_coronary_heart_disease = +countyData[i].percent_coronary_heart_disease;
                d.properties.percent_stroke = +countyData[i].percent_stroke;
                d.properties.percent_high_cholesterol = +countyData[i].percent_high_cholesterol;


                if(d.properties.percent_smoking != -1){d.properties.attr1 = d.properties.percent_smoking;}
                if(d.properties.elderly_percentage != -1){d.properties.attr2 = d.properties.elderly_percentage;}
              }
        
            }
          });

        console.log(geoData);

        //DECLARE GRAPHS
        correlationGraph = new Scatterplot({
            'parentElement': '#correlation',
            'containerHeight': 280,
            'containerWidth': 280
        }, geoData);

        distribution_1 = new Histogram({
            'parentElement': '#distribution_1',
            'containerHeight': 280,
            'containerWidth': 500
        }, geoData, "attr1");

        distribution_2 = new Histogram({
            'parentElement': '#distribution_2',
            'containerHeight': 280,
            'containerWidth': 500
        }, geoData, "attr2");

        map_1 = new MapView({
            'parentElement': '#map_1',
            'containerHeight': 400,
            'containerWidth': 650
        }, geoData, "attr1");

        map_2 = new MapView({
            'parentElement': '#map_2',
            'containerHeight': 400,
            'containerWidth': 650
        }, geoData, "attr2");


    }).catch(error => {
        console.log(error);
    });

/*
d3.csv('data/national_health_data.csv')
    .then( _data => {
        data = _data;
        console.log("Data Read");
        console.log(data);

        //PROCESS DATA
        data.forEach(d => {
            //Convert strings to numbers
            d.poverty_perc = +d.poverty_perc;
            d.median_household_income = +d.median_household_income;
            d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
            d.air_quality = +d.air_quality;
            d.park_access = +d.park_access;
            d.percent_inactive = +d.percent_inactive;
            d.percent_smoking = +d.percent_smoking;
            d.elderly_percentage = +d.elderly_percentage;
            d.number_of_hospitals = +d.number_of_hospitals;
            d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
            d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
            d.percent_high_blood_pressure = +d.percent_high_blood_pressure;
            d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
            d.percent_stroke = +d.percent_stroke;
            d.percent_high_cholesterol = +d.percent_high_cholesterol;

            if(d.percent_smoking != -1){d.attr1 = d.percent_smoking;}
            if(d.elderly_percentage != -1){d.attr2 = d.elderly_percentage;}
        });


        //DECLARE GRAPHS
        correlationGraph = new Scatterplot({
            'parentElement': '#correlation',
            'containerHeight': 500,
            'containerWidth': 500
        }, data);

        distribution_1 = new Histogram({
            'parentElement': '#distribution_1',
            'containerHeight': 300,
            'containerWidth': 625
        }, data, "attr1");

        distribution_2 = new Histogram({
            'parentElement': '#distribution_2',
            'containerHeight': 300,
            'containerWidth': 625
        }, data, "attr2");

        map_1 = new MapView({
            'parentElement': '#distribution_2',
            'containerHeight': 450,
            'containerWidth': 600
        }, data, "attr1");

        map_2 = new MapView({
            'parentElement': '#distribution_2',
            'containerHeight': 450,
            'containerWidth': 600
        }, data, "attr2");

    }
    )
    .catch(error =>{
        console.log(error);
    });

    */