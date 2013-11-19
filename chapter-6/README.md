Advanced Express Web Application Development, Chapter 6
=======

This repository contains examples created as part of my book published by Packt Publishing; Advanced Express Web Application Development.

#setup


Install node modules:

```
npm install
```

Install bower components:

```
npm install
```

#minify javascript

```
grunt uglify
```

#minify css
```
grunt cssmin
```

#compile handlebar templates
```
grunt handlebars
```

#mongo

run mongo

```
mongod
```

#run vision with hipache terminating ssl
```
hipache --config ./config/server.json
hipache --config ./config/server.json

rpush frontend:web.vision.net web.vision
rpush frontend:web.vision.net http://127.0.0.1:3003
lrange frontend:web.vision.net 0 -1

rpush frontend:api.vision.net api.vision
rpush frontend:api.vision.net http://127.0.0.1:3005
lrange frontend:api.vision.net 0 -1

/vision-web/NODE_ENV=production PORT=3003 npm start
/vision-api/NODE_ENV=production PORT=3005 npm start
/vision-worker/npm start
```

#tests

In order to run the tests

```
grunt test

```

#code coverage

In order to run code coverage

```
grunt coverage

```

#run application

In order to start the application

```
npm start
```

#view application

Now visit:

```
https://127.0.0.1:8443/heartbeat
```