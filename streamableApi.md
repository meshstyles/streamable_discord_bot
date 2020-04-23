# Streamable submission response

API: https://streamable.com/documentation
For your reference.

## Response object
``` JSON
{
  status: 200,
  statusText: 'OK',
  headers: {[Object]},
  config: {[Object]},
  request: ClientRequest {[Object]},
  data: { shortcode: 'code', status: int }
}
```

The data we need it the short code if we want to get the link to the imported video.
