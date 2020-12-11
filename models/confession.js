const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: String,
    dateAdded: {
        type: Date,
        default: Date.now
    }
})

const confessionSchema = new mongoose.Schema({
    confession: String,
    comments: [commentSchema],
    views: Number,
    dateAdded: {
        type: Date,
        default: Date.now
    }
}, { collection: 'confessions' })


module.exports = {
    Confession: mongoose.model('Confession', confessionSchema),
    Comment: mongoose.model('Comment', commentSchema)
}