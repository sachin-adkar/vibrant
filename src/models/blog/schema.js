/**
 * Schema for blogs collection
 */

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const UserModel = require('../user/index');

const BlogModel = new schema({
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: String },//Author
    comments: [
        {
            commenterId: String,
            comment: String
        }
    ],
    isActive: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
});

BlogModel.pre('save', async function (next) {
    await UserModel.getUserById(this.userId);
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

BlogModel.pre('updateOne', function (next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('Blogs', BlogModel);