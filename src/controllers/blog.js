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

router.post('/createBlog', validateCreateBlog(), validate, async (req, res) => {
    try {
        await validateObjectId(req.body.userId);
        const result = await BlogsModel.insertBlog(req.body);
        res.json({ id: result._id });
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

router.get('/getBlogs', validateGetBlogs(), validate, async (req, res) => {
    try {
        await validateObjectId(req.query.userId);
        const result = await BlogsModel.getBlogs(req.query);
        res.json(result);
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

router.get('/getBlogById', validateGetBlogById(), validate, async (req, res) => {
    try {
        await validateObjectId(req.query.blogId);
        const result = await BlogsModel.getBlogById(req.query);
        res.json(result);
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

router.patch('/updateBlog', validateUpdateBlog, async (req, res) => {
    try {
        await validateObjectId(req.body.blogId);
        await BlogsModel.updateBlog(req.body);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

router.delete('/softDelete', validateGetBlogById(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.query.blogId);
        await BlogsModel.softDelete(req.query);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

router.delete('/delete', validateGetBlogById(), validate, async (req, res, next) => {
    try {
        await validateObjectId(req.query.blogId);
        await BlogsModel.hardDelete(req.query);
        res.status(204).send();
    } catch (error) {
        return errorHandler(error, req, res);
    }
});

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