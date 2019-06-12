const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/80acf25640ae2d728095d5055a51e992/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    // request({ url: url, json: true }, (error, response) => {
        request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' + ' The tempertaure for the day will range from ' + body.daily.data[0].temperatureMin + ' minimum to ' + body.daily.data[0].temperatureMax + ' at its peak.')
        }
    })
}

module.exports = forecast