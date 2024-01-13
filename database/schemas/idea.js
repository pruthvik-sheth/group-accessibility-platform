const { Schema, model } = require('mongoose');

const ideaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    description: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    group: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    }
}, {
    timestamps: true,
    versionKey: false
});

const Idea = new model('Idea', ideaSchema);

module.exports = Idea;