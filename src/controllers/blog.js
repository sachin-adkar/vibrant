const router = require('express').Router();
const BlogsModel = require('../models/blog');
const errorHandler = require('../utils/errorHandler');
const {
    validateCreateBlog,
    validateGetBlogs,
    validateGetBlogById,
    validate,
    validateUpdateBlog,
    validateComments,
    validateObjectId
} = require('../utils/validator');

/**
 * Route for creating a new blog
 * @param : userId, title, description
 */
router.post('/createBlog', validateCreateBlog(), validate, async (req, res) => {
    try {
        await validateObjectId(req.body.userId);
        const result = await BlogsModel.insertBlog(req.body);
        res.json({ id: result._id });
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * Route for fetching the blogs of a user
 * @param : userId
 */
router.get('/getBlogs', validateGetBlogs(), validate, async (req, res) => {
    try {
        await validateObjectId(req.query.userId);
        const result = await BlogsModel.getBlogs(req.query);
        res.json(result);
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * Fetches the blog using blogId
 * @params : blogId
 */
router.get('/getBlogById', validateGetBlogById(), validate, async (req, res) => {
    try {
        await validateObjectId(req.query.blogId);
        const result = await BlogsModel.getBlogById(req.query);
        res.json(result);
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * For editing the title or description
 * @params : blogId, title, description
 */
router.patch('/updateBlog', validateUpdateBlog, async (req, res) => {
    try {
        await validateObjectId(req.body.blogId);
        await BlogsModel.updateBlog(req.body);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * Soft delete operation for blogs 
 * @params : blogId
 */
router.delete('/softDelete', validateGetBlogById(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.query.blogId);
        await BlogsModel.softDelete(req.query);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * Delete a blog from database
 * @params : blogId
 */
router.delete('/delete', validateGetBlogById(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.query.blogId);
        await BlogsModel.hardDelete(req.query);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/** 
* Used for adding the comments on a blog 
*/
router.post('/addComment', validateComments(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.body.blogId);
        await validateObjectId(req.body.userId);
        await BlogsModel.addComment(req.body);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

/**
 * Fetches the comments using blogId
 */
router.get('/getComments', validateGetBlogById(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.query.blogId);
        const result = await BlogsModel.getComments(req.query);
        res.send(result);
    } catch (error) {
        return errorHandler(error, req, res);
    }
});


module.exports = router;