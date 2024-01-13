const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../database/schemas/user');
const { clearCookies, setCookies } = require('../../utils/cookies');
const firewall = require('../firewall');

router.post('/authenticate', async (req, res) => {
    try {
        if (!req.cookies.token) {
            clearCookies(res);
            res.status(401).send({ message: 'Failed to find Token in Cookies' });
            return;
        }

        const token = req.cookies.token;

        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error(err);
            throw new Error('Failed to verify Token');
        }

        let user;
        try {
            user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find User');
        }

        if (!user) {
            clearCookies(res);
            res.status(404).send({ message: 'User not found' });
            return;
        }

        setCookies(res, { token: token, email: user.email, id: user._id.toString() });
        res.setHeader('Content-Tye', 'application/json');
        res.status(202).send({
            message: 'Authenticated',
            body: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        console.error(err);
        clearCookies(res);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        let user;
        try {
            user = new User(req.body);
        } catch (err) {
            console.error(err);
            res.status(422).send({ message: 'Invalid input data' });
            return;
        }

        try {
            await user.save();
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Failed to save User');
        }

        let token;

        try {
            token = await user.generateAuthToken();
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Failed to Generate Token');
        }

        setCookies(res, { token: token, email: user.email, id: user._id.toString() });
        res.status(201).send({
            message: 'Signed up',
            body: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    try {
        let user;
        try {
            user = await User.findByCredentials(req.body.email, req.body.password);
        } catch (err) {
            console.error(err);
            res.status(422).send({ message: err.message || 'Invalid input data' });
            return;
        }

        let token;
        try {
            token = await user.generateAuthToken();
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Failed to Generate Token');
        }

        setCookies(res, { token: token, email: user.email, id: user._id.toString() });
        res.status(202).send({
            message: 'Logged in',
            body: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/logout', firewall, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });

        try {
            await req.user.save();
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Failed to save User');
        }

        clearCookies(res);
        res.status(200).send({ message: 'Logged out' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

module.exports = router;