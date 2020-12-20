const BlogsModel = require('./schema');
const UserModel = require('../user/schema');
const queries = require('./queries');

class Blog {

    /**
     * Creates entry for a new blog in blogs collection
     *
     * @static
     * @param {*} data
     * @returns
     * @memberof Blog
     */
    static async insertBlog(data) {
        try {
            const blogData = new BlogsModel(data);
            return new Promise((resolve, reject) => {
                blogData.save((error, result) => {
                    if (error) {
                        if (error.kind == 'ObjectId') {
                            reject({ status: 400, message: 'Invalid userId' });
                        }
                        reject(error);
                    } else {
                        resolve(result._id);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the blog using blogId
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async getBlogById(params) {
        try {
            const data = await BlogsModel.findById(params.blogId).exec();
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches all the blogs of a user
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async getBlogs(params) {
        try {
            const query = await queries.getBlogs(params);
            const data = await UserModel.aggregate(query).exec();
            if (!data) {
                throw { status: 400, message: 'Data not found' };
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Used for editing the blog title and description
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async updateBlog(params) {
        try {
            const query = await queries.updateBlog(params);
            const result = await BlogsModel.updateOne(query.query, query.update).exec();
            if (!result.nModified) {
                throw { status: 500, message: 'Update failed' };
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sets isActive flag to false 
     * 
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async softDelete(params) {
        try {
            const result = await BlogsModel.updateOne({ _id: params.blogId }, { $set: { isActive: false } }).exec();
            if (!result.nModified) {
                throw { status: 500, message: 'Soft delete failed' };
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a blog from database
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async hardDelete(params) {
        try {
            const result = await BlogsModel.deleteOne({ _id: params.blogId }).exec();
            if (!result.deletedCount) {
                throw { status: 500, message: 'Delete failed' };
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * adds a comment of a blog to comments array in blogs collection
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async addComment(params) {
        try {
            const query = await queries.addComment(params);
            const result = await BlogsModel.updateOne(query.query, query.update).exec();
            if (!result.nModified) {
                throw { status: 500, message: 'Failed to update comment' };
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches all the comments on a blog using blogId
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof Blog
     */
    static async getComments(params) {
        try {
            const query = await queries.getComments(params);
            return await BlogsModel.aggregate(query).exec();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Blog;