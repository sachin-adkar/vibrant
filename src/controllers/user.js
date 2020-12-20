const router = require('express').Router();
const { validationSignUp, validate, validationLogin } = require('../utils/validator');
const UserModel = require('../models/user');
const authUtils = require('../utils/auth');
const errorHandler = require('../utils/errorHandler');

router.post('/signUp', validationSignUp(), validate, async (req, res, next) => {
    try {
        req.body.password = await authUtils.hashPassword(req.body);
        const result = await UserModel.saveUser(req.body);
        token = await authUtils.getToken({ email: result.email, name: result.name });
        res.json({ id: result._id, email: result.email, token });
    } catch (error) {
        return errorHandler(error, req, res);
    }
});


router.post('/login', validationLogin(), validate, async (req, res, next) => {
    try {
        const result = await UserModel.getUser(req.body);
        await authUtils.validatePassword(req.body.password, result.password);
        token = await authUtils.getToken({ email: result.email, name: result.name });
        res.json({ id: result._id, email: result.email, token });
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

module.exports = router;