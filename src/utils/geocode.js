const request = require("request")

const geo = (address, callback) => {
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidmlrZTIyIiwiYSI6ImNrczR5NW9lMzBibDczMXMzcXBsZHQxNmUifQ.dx3v1-YlhLNdfytFJl9-KQ&limit=1"

    request({ url : geourl, json : true }, (error, {body} = {}) => {
        if(error){
            callback("ynable to connect")
        }else if(!body.features.length){
            callback("ynable to find location")
        }else{
            callback(undefined, {
                langtitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports =  geo

