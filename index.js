const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.listen(8080, () => console.log('Listening on port 8080'));
