# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Data

The Marvel Comics API’s base endpoint is `http(s)://gateway.marvel.com/`

HTTP Verbs
All endpoints currently accept only HTTP GET requests.

ETags
Most successful results will contain an “etag” attribute and ETag HTTP header with a digest of the returned content. In order to save bandwidth and make your application more performant, you may optionally pass an “if-none-match” HTTP header with that digest for subsequent requests to the same URL. If the content has not changed since the last request, the response code will return with an empty body and a 304/Not Modified HTTP header and you can use a previously-stored value for the content.

Note: Most browsers will do this automatically, but you may need to manually add this logic to server-side applications.

For example:
Initial request:

Request Url: http://gateway.marvel.com/v1/public/comics
Request Method: GET
Params: {
  "apikey": "your api key",
  "ts": "a timestamp",
  "hash": "your hash"
}
Headers: {
  Accept: */*
}
Initial response:

Status Code: 200
Access-Control-Allow-Origin: *
Date: Wed, 18 Dec 2013 22:00:55 GMT
Connection: keep-alive
ETag: f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3
Content-Length: 54943
Content-Type: application/json
Subsequent request:

Request Url: http://gateway.marvel.com/v1/public/comics
Request Method: GET
Params: {
  "apikey": "your api key",
  "ts": "a timestamp",
  "hash": "your hash"
}
Headers: {
  Accept: */*
  If-None-Match: f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3
}
Subsequent response:

Status Code: 304
Access-Control-Allow-Origin: *
Date: Wed, 18 Dec 2013 22:03:20 GMT
Connection: keep-alive
ETag: f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3
Cross-origin requests and JSONP
Responses returned by the Marvel Comics API are compliant with the W3C CORS specification, which allows any properly-authorized requests to be made from any origin domain. This means that you should not need to wrap calls in JSONP callbacks in order to make calls from browser-based applications. If you do prefer to use JSONP, however, all endpoints will accept a callback parameter to all endpoints that will wrap results in a JSONP wrapper.

Examples
Without a callback:

Request: GET http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY
Response:
{
  "code": 200,
  "status": "Ok",
  "etag": "f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3",
  "data": {
  … [other data points]
}
With a callback

Request: GET http://gateway.marvel.com/v1/public/comics?apikey=yourAPIKEY&callback=callback_param
Response:
callback_param({
  "code": 200,
  "status": "Ok",
  "etag": "f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3",
  "data": {
  … [other data points]
})
GZIP Compression
In order to save bandwidth and make your application more performant, the Marvel Comics API can compress responses with GZIP. You may request a GZIP-ed response by passing an Accept-Encoding header to any endpoint.

Example:
Request:

Request Url: http://gateway.marvel.com/v1/public/comics
Request Method: GET
Params: {
  "apikey": "your api key",
  "ts": "a timestamp",
  "hash": "your hash"
}
Headers: {
  Accept-Encoding:gzip
}
Response:

Status Code: 200
Access-Control-Allow-Origin: *
Date: Wed, 18 Dec 2013 22:03:20 GMT
Connection: keep-alive
ETag: f0fbae65eb2f8f28bdeea0a29be8749a4e67acb3
Content-Encoding: gzip

My API keys:
public: ead78c33f14525acb6ca6d117a15e2842d2386b3
private: 6f1be41d0ffe30b97a1ddc8d0138a6ed