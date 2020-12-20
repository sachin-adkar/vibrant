require('dotenv').config({
    path: `${__dirname}/.env`
});

exports = module.exports = require('./src/server');