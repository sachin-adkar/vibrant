/**
 * Schema for user collection
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    number: { type: String },
    password: { type: String, require: true },
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

module.exports = mongoose.model('Users', userSchema);

