const downwindservice = require('./DownwindService.js');
const fs = require('fs');

function testQuery(geosource) {
    downwindservice.getdownwind(geosource)
        .then((response) => {
            console.log(JSON.stringify(response,null,4));
        })
        .catch((err) => {
            console.log(err);
        });
}

if(process.argv.length != 3) {
    console.log('Provide a json file as the last argument');
    return;
}

const content = fs.readFileSync(process.argv[2]);
testQuery(JSON.parse(content));