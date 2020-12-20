const user = require('./controllers/user');
const blog = require('./controllers/blog');
const jwt = require('jsonwebtoken');
const config = require('./utils/configs');
const authUtils = require('./utils/auth');

module.exports = (app) => {
    //User routes
    app.use('/v1.0', user);
    //Blog routes
    app.use('/v1.0', authUtils.authenticate, blog);
};