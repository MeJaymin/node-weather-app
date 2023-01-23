const request = require('postman-request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoicmlob3Y5OTk5NiIsImEiOiJjbGQxOWxlam4wYWszM29wOTZkYW9qbGlnIn0.d_jDOq8559tJ1WUDvzGBIg";
    request.get({url, json:true}, function (error, response, body) {
        if(!error)
        {
          if(body.features.length === 0)
          {
            callback("Error while fetching coordinates","");
          }
          else {
            const data = body.features[0].center
            const lat = data[1];
            const long = data[0];
            const placeName = body.features[0].place_name;
            const geoData = { lat, long, placeName };
            callback("",geoData);
          }
        }
      })
      .on('error', function(err) {
          callback("Error while connecting to Mapbox Api +"+err,"");
      });
}
module.exports = geocode;