const request = require('postman-request') 

const geoCode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoicm9zYm9ybjkyIiwiYSI6ImNrYTc0OG5lbjAxOTIyem5mczM1MmxkMHoifQ.pQNdEekHyTTTJHY6DzdsRA&limit=1'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try again.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode