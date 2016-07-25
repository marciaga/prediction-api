### This is the JSON API that supports the prediction results front-end.

Install the dependencies:

```
> $ npm install
```

Run your local MongoDB server:

Run the Hapi server:
```
> $ npm run start
```
 ```
/api/v1/predictions // returns most recent result from all sources
/api/v1/predictions?limit=n // returns n results from all sources
/api/v1/predictions?limit=n&source=five-thirty-eight // returns n results from one source

 ```
