const apiConfig = require('../../../apiKeys');
const request = require('postman-request');
const log = console.log;

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + apiConfig.mapbox_api_key + '&limit=1';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('error in connection', undefined);
        }
        else if (body.features.length === 0) {
            callback('unable to find location', undefined);
        }
        else {
            //log(body.features[0].place_name);
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;