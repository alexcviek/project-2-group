const express     = require('express');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.Promise  = require('bluebird');

const app         = express();
const { port, dbURI, env }    = require('./config/environment');


mongoose.connect(dbURI);
if (env !== 'test') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
// app.use(customResponses);



app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
