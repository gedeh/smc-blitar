import logger from "@utils/create-logger"

var get_weather = function() {
    const request = require("request")
    const fs = require("fs")
    
    var options = {
        url: "https://api.openweathermap.org/data/2.5/weather?q=Belfast,uk&appid=1903f50538160b53500365f276e8f045&units=metric",
        method: "GET",
        accept: "application/json",
    }
    var path = "src/components/static/weather.json"
    var ws = fs.createWriteStream(path)
    
    request(options).on("error", function (error) {
        logger.debug(error)
    }).on("close", function () {
        logger.debug("Done download openweather json")
    }).pipe(ws)
}

var interval_get_weather = function(hour) {
    setInterval(get_weather, hour * 1000 * 60 * 60)
}


module.exports = {
    interval_get_weather
}
