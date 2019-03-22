const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

var androidAssetlinks = fs.readFileSync(__dirname + '/dist/static/json/assetlinks.json');
app.get('/.well-known/assetlinks.json', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.status(200).send(androidAssetlinks);
});

var iosAssetlinks = fs.readFileSync(__dirname + '/dist/static/json/apple-site-association.json');
app.get('/.well-known/apple-site-association', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  res.status(200).send(iosAssetlinks);
});

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
