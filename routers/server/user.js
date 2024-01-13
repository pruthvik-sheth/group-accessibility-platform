const router = require('express').Router()
const mongoose = require('mongoose')
const firewall = require('../firewall')
const User = require('../../database/schemas/user')

router.post('/me', firewall, async (req, res) => {
    try {
        res.status(200).send({ message: 'Success', body: { user: req.user } })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message || 'Something went wrong' })
    }
})

router.post('/get/user', firewall, async (req, res) => {
    try {
        let user

        try {
            user = await User.findOne({ _id: mongoose.Types.ObjectId(req.body.id) })
        } catch (err) {
            console.error(err)
            throw new Error('Failed to find User')
        }

        const newUser = {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email
        }

        res.status(200).send({ message: 'Success', body: { user: newUser } })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message || 'Something went wrong' })
    }
})

module.exports = router