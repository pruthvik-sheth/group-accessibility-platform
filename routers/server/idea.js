const router = require('express').Router();
const mongoose = require('mongoose');
const firewall = require('../firewall');
const Idea = require('../../database/schemas/idea');

router.get('/me/ideas', firewall, async (req, res) => {
    try {
        try {
            await req.user.populate({
                path: 'Ideas'
            });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Ideas from User');
        }

        const ideas = [];

        for (const idea of req.user.Ideas) {
            ideas.push({
                id: idea._id,
                title: idea.title,
                upvotes: idea.upvotes,
                downvotes: idea.downvotes
            });
        }

        res.status(200).send({ message: 'Success', body: { ideas } });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/get/idea', firewall, async (req, res) => {
    try {
        let idea;

        try {
            idea = await Idea.findOne({ _id: mongoose.Types.ObjectId(req.body.id) });

            if (!idea) {
                res.status(404).send({ message: 'Unable to find Idea' });
                return;
            }
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find Idea');
        }

        try {
            await idea.populate('author');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Author from Idea');
        }

        try {
            await idea.populate('group');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Group from Idea');
        }

        const newIdea = {
            id: idea._id,
            title: idea.title,
            description: idea.description,
            upvotes: idea.upvotes,
            downvotes: idea.downvotes,
            author: {
                id: idea.author._id,
                userName: idea.author.userName
            },
            group: {
                id: idea.group._id,
                name: idea.group.name
            }
        };
        res.status(200).send({ message: 'Success', body: { idea: newIdea } });
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.post('/idea/create', firewall, async (req, res) => {
    try {
        const { title, description, group } = req.body;
        const idea = new Idea({
            title,
            description,
            author: req.user._id,
            group: mongoose.Types.ObjectId(group)
        });

        try {
            await idea.save();
        } catch (err) {
            console.error(err);
            throw new Error('Failed to save Idea');
        }

        res.status(201).send({ message: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

module.exports = router;