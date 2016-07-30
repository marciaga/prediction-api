### This is the JSON API that supports the prediction results front-end.
For local development, you'll need MongoDB 3.2 installed.

Install the dependencies:
```
> $ npm install
```
Run your local MongoDB server:
```
> $ mongod
```

Run the Hapi server in dev mode with Nodemon:
```
> $ npm run dev
```

Run tests using Ava
```
> $ npm run test
```
##### API Endpoint examples
 ```
/api/v1/predictions // returns most recent result from all sources
/api/v1/predictions?limit=n // returns n results from all sources
/api/v1/predictions?limit=n&source=five-thirty-eight // returns n results from one source
 ```
