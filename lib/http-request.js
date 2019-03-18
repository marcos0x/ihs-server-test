const http = require('http');
const https = require('https');
const querystring = require('querystring');

function processResponse(res, resolve, reject) {
  let body = '';
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      reject(new Error(error.message));
    }
  });
}

function makeRequest(params) {
  return new Promise((resolve, reject) => {
    const { options = {}, dataString, secure = false } = params;
    let req;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    if (secure) {
      options.strictSSL = true;
      options.protocol = 'https:';
      req = https.request(options, res => processResponse(res, resolve, reject));
    } else {
      req = http.request(options, res => processResponse(res, resolve, reject));
    }

    req.on('error', error => reject(error));

    if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
      req.write(dataString);
    }

    req.end();
  });
}

function request(params) {
  const {
    host,
    port,
    version = '',
    method = 'GET',
    data,
    token = '',
    secure = false
  } = params;

  let { endpoint } = params;

  const headers = {};
  let dataString = '';

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (method === 'GET') {
    dataString = querystring.stringify(data);
    if (dataString) {
      endpoint += `?${dataString}`;
    }
  } else {
    dataString = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(dataString);
  }

  console.info(`${secure ? 'Secure' : 'Insecure'} request to:
    [${method.toUpperCase()}] ${host}:${port}${version}${endpoint}`);

  const options = { host, port, path: version + endpoint, method, headers };

  return makeRequest({ options, dataString, secure });
}

module.exports = {
  request,
};
