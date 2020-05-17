const request = require('postman-request') 

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9206623202fd9a5c4aaaa49815e77653&query=' + lat + ',' + long + '&units=f'

    request({ url, json: true }, (err, { body }) => {
        const { name, region, country } = body.location
        const { temperature, feelslike, weather_descriptions: weatherDesc } = body.current
        if (err) {
            callback("Unable to process request.", undefined)
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                location: `${name} ${region} ${country}`,
                currentTemp: temperature,
                feelslike: feelslike,
                weatherDesc: weatherDesc[0]               
            })
        }
    })
}

module.exports = forecast