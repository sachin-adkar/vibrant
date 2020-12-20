const BlogsModel = require('./schema');
const UserModel = require('../user/schema');
const queries = require('./queries');

class Blog {

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

    static async getBlogById(params) {
        try {
            const data = await BlogsModel.findById(params.blogId).exec();
            // if (!data) {
            //     throw { status: 400, message: 'Data not found' };
            // }
            return data;
        } catch (error) {
            throw error;
        }
    }

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