const downwindservice = require('./DownwindService.js');

let geosource = {
    "origin": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-87.64344012, 41.88919476]
        },
        "properties": {
            "name": "Blommer Chocolate"
        }
    },
    "target": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-87.63977033, 41.88383873]
        },
        "properties": {
            "name": "Solstice"
        }
    }
};

function testQuery() {
    downwindservice.getdownwind(geosource)
        .then((response) => {
            console.log(JSON.stringify(response,null,4));
        })
        .catch((err) => {
            console.log(err);
        });
}

testQuery();