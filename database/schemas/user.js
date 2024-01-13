const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const { compare, hash } = require('bcryptjs')
const validator = require('validator')
const Idea = require('./idea')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email!')
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password'))
                throw new Error('Password must not contain \'password\' keyword.')
        }
    },
    profilePicture: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    groups: [{
        group: {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.virtual('Ideas', {
    ref: 'Idea',
    localField: '_id',
    foreignField: 'author'
})

userSchema.virtual('Groups', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'members.member'
})

userSchema.virtual('AdminOf', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'admin'
})

userSchema.methods.generateAuthToken = async function () {
    let token
    try {
        try {
            token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
        } catch (err) {
            console.error(err)
            throw new Error('Failed to Generate Token')
        }

        this.tokens = this.tokens.concat({ token })

        try {
            await this.save()

        } catch (err) {
            console.error(err)
            throw new Error(err.message || 'Failed to save User')
        }

        return token
    } catch (err) {
        console.error(err)
        throw new Error(err.message || 'Something went wrong')
    }
}

userSchema.methods.toJSON = function () {
    const user = this.toObject()

    delete user.password
    delete user.tokens
    delete user.groups
    delete user.createdAt
    delete user.updatedAt

    return user
}

userSchema.statics.findByCredentials = async (email, password) => {
    try {
        let user
        try {
            user = await User.findOne({ email })
        } catch (err) {
            console.error(err)
            throw new Error('Failed to find User')
        }

        if (!user)
            throw new Error('User not found')

        let result
        try {
            result = await compare(password, user.password)
        } catch (err) {
            console.error(err)
            throw new Error('Failed to verify Password')
        }

        if (!result)
            throw new Error('Invalid Password')

        return user

    } catch (err) {
        console.error(err)
        throw new Error(err.message || 'Something went wrong')
    }
}

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password'))
            this.password = await hash(this.password, 8)

        next()
    } catch (err) {
        console.error(err)
        throw new Error('Failed to Encrypt Password')
    }
})

userSchema.pre('remove', async function (next) {
    try {
        await Idea.deleteMany({ author: this._id })
        next()
    } catch (err) {
        console.error(err)
        throw new Error('Failed to Remove Ideas of User')
    }
})

const User = new model('User', userSchema)

module.exports = User