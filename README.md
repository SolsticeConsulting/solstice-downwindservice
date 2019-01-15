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

# Payload format
There is an **example.json** that shows the format of input json.
It includes

- origin - point where source originates
- target - point you want to check if downwind

as geojson points

# Command Line Usage
For testing, or quick checks, the script can be run from command line like this
```
npm run-script local example.json
```

# API Usage
To use the api, you have to post json as in **example.json** to the /geojson endpoint

To run the express server locally, you can do this:

```
npm start
```

# Docker Server Image
We have the express server wrapped into a docker image as well

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