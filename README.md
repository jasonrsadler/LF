# Lightfeather Code Challenge

## #1 API Endpoint
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
npm run test
```

## #2 Frontend