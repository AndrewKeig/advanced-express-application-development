Advanced Express Web Application Development, Chapter 1
========

This repository contains examples created as part of my book published by Packt Publishing; Advanced Express Web Application Development.

#setup


Install node modules:

```
npm install
```

#running integration tests vision-web

Update the following login file with your GitHub details

```
test/login.js

module.exports = {
  user : '#USER#',
  token : '#TOKEN#'
}
```

Run the tests

```
grunt test
```

#running integration tests vision-api
Update the following login file with your GitHub details

```
test/login.js

module.exports = {
  user : '#USER#',
  token : '#TOKEN#'
}
```

Run the tests

```
grunt test
```

#running cucumber tests

You need to be logged out of GitHub for these to run.
You will also need to have setup a GitHub application via the step - create GitHub application

Install cucumber

```
npm install -g cucumber
```

Run tests

```
grunt cucumberjs
```

#code coverage

```
grunt coverage

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
http://127.0.0.1:3000/heartbeat
```