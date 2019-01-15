# Overview
This service, written in nodejs, will query current wind conditions at a user-specified point
and return a result indicating if a user-supplied target point is downwind.

It's currently configured to use the [DARK SKI API](https://darksky.net/dev) and use depends
on the user supplying an environment variable DARK_SKY_KEY that contains an API key.

# Installation
```
cd service
npm install
```

# Command Line Usage
There is a fix




# API Usage
To use the api, you have to post json that includes origin and target
geojson points to the /geojson endpoint, like this
```
{
    "origin": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-87.624422, 41.897172]
        },
        "properties": {
            "name": "Chicago Water Tower"
        }
    },
    "target": {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-87.624861, 41.889707]
        },
        "properties": {
            "name": "Wrigley Building"
        }
    }
}
```




# Docker Server Image

```
# build docker image
docker build -t solstice/downwindservice .

# set DARKSKY key as env variable
export DARK_SKY_KEY=1234

# Run the container (via docker-compose)
docker-compose up

# (ctrl-c to stop)
```

You can now access the api via 
```
http://localhost:8000/geojson
```