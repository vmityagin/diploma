const allowedCors = [
  'https://diplomamv.nomoredomains.icu/',
  'http://diplomamv.nomoredomains.icu/',
  'http://localhost:3000/',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports.cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    return res.header('Access-Control-Allow-Origin', origin);
  }
  return next();
};