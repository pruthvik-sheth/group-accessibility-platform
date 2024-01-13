const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        member: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, {
    versionKey: false,
    timestamps: true
})

groupSchema.virtual('Members', {
    ref: 'User',
    localField: 'members.member',
    foreignField: '_id'
})

groupSchema.virtual('Ideas', {
    ref: 'Idea',
    localField: '_id',
    foreignField: 'group'
})

const Group = new model('Group', groupSchema)

module.exports = Group