const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./configs');

/**
 * Utility functions for authentication
 *
 * @class Auth
 */
class Auth {

    static async getToken(params) {
        try {
            return jwt.sign(params, config.secret, { expiresIn: '1h' });
        } catch (error) {
            throw error;
        }
    }

    static async hashPassword(params) {
        try {
            return await bcrypt.hash(params.password, 10);
        } catch (error) {
            throw error;
        }
    }

    static async validatePassword(password, hash) {
        try {
            const isUserExists = await bcrypt.compare(password, hash);
            if (!isUserExists) {
                throw { status: 401, message: 'Unauthorized' };
            }
        } catch (error) {
            throw error;
        }
    }

    static async authenticate(req, res, next) {
        try {
            jwt.verify(req.headers.token, config.secret);
            next();
        } catch (error) {
            res.status(403).send('Forbidden');
        }
    };

}

module.exports = Auth;
