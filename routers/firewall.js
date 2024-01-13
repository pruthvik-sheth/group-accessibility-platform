const jwt = require('jsonwebtoken');
const User = require('../database/schemas/user');
const { clearCookies } = require('../utils/cookies');

const firewall = async (req, res, next) => {
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
        console.log(decode);

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

        req.token = token;
        req.user = user;

        next();
    } catch (err) {
        console.error(err);
        clearCookies(res);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
};

module.exports = firewall;