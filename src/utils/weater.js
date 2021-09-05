const request = require("request")

const weater = (lat, long, callback) => {
    const wurl = "http://api.weatherstack.com/current?access_key=7a955e4a438b0be9a7e9094034e9415b&query="+lat+","+long+"&units=f"

    request({url : wurl, json : true }, (error, {body} ) => {
        if(error){
            callback("unable to connect")
        }else if(body.error){
            callback("unable to find location")
        }else{
            callback(undefined, {
                temp : "It's " + body.current.weather_descriptions + ". Current temperature is: " + body.current.temperature + " F"+ ". Feels like: " + body.current.feelslike + " F. Chance of raining: " + body.current.precip +"%"
            })
        }
    })
}

module.exports = weater