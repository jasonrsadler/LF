# Lightfeather Code Challenge

Make sure a currently supported version of Node is installed

## #1 API Endpoint
[![CircleCI](https://circleci.com/gh/jasonrsadler/LF.svg?style=shield)](https://circleci.com/gh/jasonrsadler/LF)

To run API endpoint portion:
```
cd server
npm install
npm start
```
Then use Postman or similar to run POST to `/api/encode` with `Shift(integer)` and `Message(string)` parameters. 

Ensure `Content-Type` is set to `application/json` and supply body like the following:
```
{
    "Shift": 3,
    "Message": "A test message"
}
```
Tests can be run for common and edge cases by:
```
npm test
```

## #2 Frontend

To run frontend:

```
cd client
npm install
npm start
```
Browser should open with frontend rendered.

Rudimentary tests for small things like label rendering can be run with:
```
npm test
```