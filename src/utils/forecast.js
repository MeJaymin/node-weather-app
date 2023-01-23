const request = require('postman-request');
const forecast = (lat,long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8882a99d51156c10cdb939f2a194157e&query=" + lat + ", " + long;
    request.get({url, json:true}, function (error, response, body) {
    if(body.error){
        callback("Unable to find location","");
    }
    else if(!error){
        const data = body.current;
        callback("",data['weather_descriptions'][0]+" throughout the day. Current Temperature is "+data.temperature+" but feels like "+ data.feelslike + ". There is "+data.cloudcover +" % chance of rain");
    }
    })
    .on('error', function(err) {
        callback("Error while connecting to weather api","");
    });
}


module.exports = forecast;