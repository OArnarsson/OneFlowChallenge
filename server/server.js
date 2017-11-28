const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(bodyParser.json());

app.use(cors());

app.use('/api', apiRoutes);
app.use('/docs', express.static(__dirname + '/static/docs'));
app.use('/', express.static(__dirname + '/static/dist'));

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

module.exports = {app};