const port    = process.env.PORT || 4000;
const env     = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/team-sausage-${env}`;
const secret = process.env.SECRET || 'O hai there, supriz';

module.exports = { port, env, dbURI, secret };
