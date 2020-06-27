const apiConfig = require('../../../apiKeys');
const request = require('postman-request');
const log = console.log;

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + apiConfig.weather_api_key + '&query=' + lat + ',' + lng + '&units=m';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('error in connection', undefined);
        }
        else if (body.error) {
            callback('unable to find location', undefined);
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + ' % chance of rain.');
        }
    });
};

module.exports = forecast;