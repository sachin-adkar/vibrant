const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
class Queries {


    static async getBlogs(params) {
        try {
            return [{
                $match: {
                    _id: ObjectId(params.userId)
                }
            },
            {
                $project: {
                    userId: {
                        "$toString": "$_id"
                    },
                    _id: 0,
                    author: '$name'
                }
            },
            {
                $lookup: {
                    from: "blogs",
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'blogs'
                }
            }
            ];
        } catch (error) {
            throw error;
        }
    }

    static async updateBlog(params) {
        try {
            const update = {
                $set: {}
            };
            if (params.title.trim()) {
                update.$set.title = params.title;
            }
            if (params.description.trim()) {
                update.$set.description = params.description;
            }
            return { query: { _id: params.blogId }, update };
        } catch (error) {
            throw error;
        }
    }

    static async addComment(params) {
        try {
            return {
                query: { _id: params.blogId }, update: {
                    $push: {
                        comments: {
                            commenterId: params.userId,
                            comment: params.comment
                        }
                    }
                }
            };
        } catch (error) {
            throw error;
        }
    }

    static async getComments(params) {
        try {
            return [
                {
                    $match: {
                        _id: ObjectId(params.blogId)
                    }
                },
                {
                    $unwind: '$comments'
                },
                //Converting commenterId to ObjectId
                {
                    "$project": {
                        title: 1,
                        "userId": { "$toObjectId": "$comments.commenterId" },
                        comments: 1
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                //Add name to comment
                {
                    $project: {
                        'title': 1,
                        user: 1,
                        'comments.name': '$user.name',
                        'comments.comment': 1,
                        'comments.commenterId': 1
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        comments: { $push: '$comments' }
                    }
                }
            ];
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Queries;