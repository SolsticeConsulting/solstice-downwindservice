const logger = require('./lib/Logging');
const downwindservice = require('./DownwindService');
const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

app.options('*', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
});

app.post('/geojson', (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    return downwindservice.getdownwind(req.body)
        .then((response) => {
            logger.verbose(JSON.stringify(response));
            res.send(response);
        })
        .catch((err) => {
            logger.verbose(err);
            res.status(err.code);
            res.send(err);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));