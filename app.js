const request = require('request');
const chalk = require('chalk');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
/*
const url = 'http://api.weatherstack.com/current?access_key=031b59ec049136f1a0b4f58c175ecd03&query=50.8556,1.2672';
request({ url: url, json: true }, (error, response) => {
    //const data = JSON.parse(response.body);
    console.log('It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
});
*/

/*
const query_place = 'locks heath';
const place = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + query_place + '.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoid29vZHNleSIsImEiOiJjbGE0YmprdmgwejBqM3Fwa2VlZGV2ZXU4In0.Gbm6qRN0g6tBtcslU26W_g&limit=1'

request({ url: place, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to the API');
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location');
    } else {
        const latitude = response.body.features[0].center[1];
        const longitude = response.body.features[0].center[0];
        console.log(latitude + ' ' + longitude);
    }
});
*/

let location;
if (process.argv[2]) {
    location = process.argv[2];
} else {
    location = 'London';
}


geocode(location, (error, geoData) => {
    if (error) {
        return console.log('Error: ' + error);
    }

    forecast(geoData.latitude + ',' + geoData.longitude, (error, forecastData) => {
        if (error) {
            return console.log('Error: ' + error);
        }
        console.log(chalk.yellow('Location: ' + geoData.location + ' = Lat: ' + geoData.latitude + ' - Long: ' + geoData.longitude));
        console.log(chalk.blue(forecastData));
    });
});


