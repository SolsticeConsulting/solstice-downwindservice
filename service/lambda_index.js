const logger = require('./lib/Logging');
const service = require('./DownwindService');

module.exports.isdownwind = (event, context, callback) => {
    let geojsonobj = JSON.parse(event["body"]);
    service.downwindservice(geojsonobj, (err, response) => {
        if(err) {
            const responseObj = {
                statusCode: err.statusCode,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(err.body)
            };
            callback(responseObj, null);
        }
        else {
            const responseObj = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(response.body)
            };
            callback(responseObj, null);
        }
    });
};