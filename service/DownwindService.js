/**
 * Downwind Service class
 *
 * Created by jcooley on 1/15/19.
 */

const turf = require('@turf/turf');
const DarkSkyWeather = require('./lib/DarkSkyWeather');
const HttpError = require('./lib/HttpError');
const HttpStatus = require('http-status-codes');

class DownwindService {

    // given incoming json, parse it (make sure everything is in right place)
    // and derive lng and lat
    static deriveCoords(topKey, obj) {
        if (topKey in obj) {
            if ('geometry' in obj[topKey]) {
                if ('coordinates' in obj[topKey]['geometry']) {
                    if (obj[topKey]['geometry']['coordinates'].length === 2) {
                        if (isNaN(obj[topKey]['geometry']['coordinates'][0])) {
                            return null;
                        }
                        else if (isNaN(obj[topKey]['geometry']['coordinates'][1])) {
                            return null;
                        }
                        return obj[topKey]['geometry']['coordinates'];
                    }
                }
            }
        }
        return null;
    }

    static async getdownwind(geojsonobj) {
        let origin_coords = null;
        let target_coords = null;

        return Promise.resolve()

            // derive origin coords from input
            .then( () => {
                origin_coords = DownwindService.deriveCoords('origin', geojsonobj);
                if (!origin_coords) {
                    return Promise.reject(new HttpError(HttpStatus.BAD_REQUEST, 'invalid origin section in body'));
                }
            })

            // derive target coords from input
            .then(() => {
                target_coords = DownwindService.deriveCoords('target', geojsonobj);
                if (!target_coords) {
                    return Promise.reject(new HttpError(HttpStatus.BAD_REQUEST, 'invalid target section in body'));
                }
            })

            // ask darksky for weather at origin coordinates
            .then(() => DarkSkyWeather.getWind(origin_coords))

            // given wind results, create a arc shape "sector" pointing downwind 2 miles.
            // for future, obviously, this could be improved.
            // match if target coord falls within this sector or not.
            .then((wind) => {
                // do the rest of the calculations
                let origin_point = turf.point(origin_coords);
                let target_point = turf.point(target_coords);
                let radius = 2; // two miles out
                let bearing = wind.windBearing;

                // create sector +/- 5 degrees of wind bearing
                let bearing1 = bearing - 5;
                let bearing2 = bearing + 5;
                let sector = turf.sector(origin_point, radius, bearing1, bearing2, {'options.units': 'miles'});
                let r = turf.booleanContains(sector, target_point);

                return {
                    'origin': turf.getCoord(origin_point),
                    'target': turf.getCoord(target_point),
                    'origin_windBearing':
                    bearing,
                    'origin_windSpeed': wind.windSpeed,
                    'downwind': r,
                    'downwind_polygon': turf.coordAll(sector)
                };
            });
    }
}

module.exports = DownwindService;