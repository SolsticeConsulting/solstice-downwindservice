/**
 * DarkSkyWeather wrapper class
 *
 * Created by jcooley on 1/15/19.
 */

const HttpError = require('./HttpError');
const requestpromise = require('request-promise');
const DARK_SKY_KEY = process.env.DARK_SKY_KEY;

//
// Wrap DarkSky API
//
class DarkSkyWeather {

    static async getWind(lnglatpoint) {
        let lng = lnglatpoint[0];
        let lat = lnglatpoint[1];

        let options = {
            uri: `https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}`,
            method: 'GET',
            json: true
        };

        return requestpromise(options)
            .then((parsedBody) => {
                return {
                    "windSpeed":parsedBody.currently.windSpeed,
                    "windBearing":parsedBody.currently.windBearing
                };
            })
            .catch((err) => {
                // map the verbose error code into our much simpler error code!
                return Promise.reject(new HttpError(err.statusCode, err.message));
            });
    }
}

module.exports = DarkSkyWeather;