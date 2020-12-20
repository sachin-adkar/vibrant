const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * Validation rules for /signup
 * @returns
 */
const validationSignUp = () => {
    return [
        check('email', 'Email cannot be empty').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('number', 'Mobile number is invalid').isLength({ min: 10 }).isNumeric(),
        check('number', 'Mobile number cannot be empty').notEmpty(),
        check('name').notEmpty(),
        check('password', 'Password must contain minimum 6 letter').isLength({ min: 6 })
    ]
};

/**
 * Validation rules for /login
 * @returns
 */
const validationLogin = () => {
    return [
        check('email', 'Enter name').notEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Enter password').notEmpty({ min: 6 })
    ]
};

/**
 * Validation rules for /createBlog
 * @returns
 */
const validateCreateBlog = () => {
    return [
        check('userId', 'Enter user Id').notEmpty(),
        check('title', 'Enter title').notEmpty(),
        check('description', 'Enter description').notEmpty()
    ];
};

/**
 * Validation rules for /getBlogs
 * @returns
 */
const validateGetBlogs = () => {
    return [
        check('userId', 'Enter user Id').notEmpty()
    ]
}

/**
 * Validation rules for /getBlogById
 * @returns
 */
const validateGetBlogById = () => {
    return [
        check('blogId', 'Enter Id').notEmpty()
    ]
}

/**
 *  Generic method for validation results
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    return res.status(400).send({
        errors: extractedErrors,
    });
};

/**
 * Validation rules for /updateBlog
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateUpdateBlog = (req, res, next) => {
    if ((!req.body.title && !req.body.description)
        || (!req.body.title.trim() && !req.body.description.trim())
    ) {
        return res.status(400).send({ message: 'Empty fields, update failed!' })
    }
    next();
}

/**
 *Validation rules for add comments
 *
 * @returns
 */
const validateComments = () => {
    return [check('userId', 'Enter user Id').notEmpty(),
    check('blogId', 'Enter user Id').notEmpty(),
    check('comment', 'Enter title').notEmpty(),
    ]
};

/**
 * Generic method for validating the Object ids 
 *
 * @param {*} id
 */
const validateObjectId = async (id) => {
    try {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw { status: 400, message: 'Invalid ID' };
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    validate,
    validationSignUp,
    validationLogin,
    validateCreateBlog,
    validateGetBlogById,
    validateGetBlogs,
    validateUpdateBlog,
    validateComments,
    validateObjectId
};