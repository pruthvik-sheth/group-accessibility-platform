const router = require('express').Router();
const mongoose = require('mongoose');
const firewall = require('../firewall');
const Group = require('../../database/schemas/group');
const User = require('../../database/schemas/user');

router.get('/me/groups', firewall, async (req, res) => {
    try {
        const groups = [];
        try {
            await req.user.populate({
                path: 'Groups'
            });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Groups from User');
        }

        for (const group of req.user.Groups) {
            try {
                await group.populate({
                    path: 'Ideas'
                });

                groups.push({
                    id: group._id,
                    name: group.name,
                    members: group.members.length,
                    ideas: group.Ideas.length
                });
            } catch (err) {
                console.error(err);
                throw new Error('Failed to Populate Ideas from Group');
            }
        }

        res.status(200).send({ message: 'Success', body: { groups } });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/group/create', firewall, async (req, res) => {
    try {
        const { name, description } = req.body;
        members = [{ member: req.user._id }];

        let group = new Group({
            name,
            description,
            admin: req.user._id,
            members
        });

        try {
            group = await group.save();

        } catch (err) {
            console.error(err);
            throw new Error('Failed to save Group');
        }

        req.user.groups = req.user.groups.concat({ group: group._id });

        try {
            await req.user.save();
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Failed to save User');
        }

        res.status(201).send({ message: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/get/group', firewall, async (req, res) => {
    try {

        let group;
        try {
            group = await Group.findOne({ _id: mongoose.Types.ObjectId(req.body.id) });

            if (!group) {
                res.status(404).send({ message: 'Unable to find Group' });
                return;
            }
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find Group');
        }

        const members = [];
        try {
            await group.populate('admin');
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Admin from Group');
        }

        try {
            await group.populate({ path: 'Members' });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Members from Group');
        }

        for (const member of group.Members) {
            members.push({
                id: member._id,
                userName: member.userName
            });
        }

        const ideas = [];
        try {
            await group.populate({ path: 'Ideas' });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to Populate Ideas from Group');
        }

        for (const idea of group.Ideas) {
            await idea.populate('author');
            ideas.push({
                id: idea._id,
                title: idea.title,
                author: {
                    id: idea.author._id.toString(),
                    userName: idea.author.userName
                },
                upvotes: idea.upvotes,
                downvotes: idea.downvotes
            });
        }

        const newGroup = {
            id: group._id,
            name: group.name,
            description: group.description,
            admin: {
                id: group.admin._id,
                userName: group.admin.userName
            },
            members,
            ideas
        };

        res.status(200).send({ message: 'Success', body: { group: newGroup } });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/join/group', firewall, async (req, res) => {
    try {
        const userID = mongoose.Types.ObjectId(req.body.userID);
        const groupID = mongoose.Types.ObjectId(req.body.groupID);

        let user, group;

        try {
            user = await User.findOne({ _id: userID });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find User');
        }

        try {
            group = await Group.findOne({ _id: groupID });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find Group');
        }

        let isUserIn = false;
        let isGroupHas = false;

        for (const { group } of user.groups) {
            if (group.toString() === req.body.groupID) {
                isUserIn = true;
                break;
            }
        }

        for (const { member } of group.members) {
            if (member.toString() === req.body.userID) {
                isGroupHas = true;
                break;
            }
        }

        if (!isUserIn && !isGroupHas) {
            group.members = group.members.concat({ member: userID });
            user.groups = user.groups.concat({ group: groupID });

            try {
                await group.save();
            } catch (err) {
                console.error(err);
                throw new Error(err.message || 'Failed to save Group');
            }

            try {
                await user.save();
            } catch (err) {
                console.error(err);
                throw new Error(err.message || 'Failed to save User');
            }

        } else if (isUserIn && !isGroupHas) {
            group.members = groups.members.concat({ member: userID });

            try {
                await group.save();
            } catch (err) {
                console.error(err);
                throw new Error(err.message || 'Failed to save Group');
            }
        } else if (!isUserIn && isGroupHas) {
            user.groups = user.groups.concat({ group: groupID });

            try {
                await user.save();
            } catch (err) {
                console.error(err);
                throw new Error(err.message || 'Failed to save User');
            }
        }

        res.status(200).send({ message: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

router.post('/leave/group', firewall, async (req, res) => {
    try {
        const { groupID, userID } = req.body;
        let user, group;

        try {
            user = await User.findOne({ _id: mongoose.Types.ObjectId(userID) });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find User');
        }

        try {
            group = await Group.findOne({ _id: mongoose.Types.ObjectId(groupID) });
        } catch (err) {
            console.error(err);
            throw new Error('Failed to find Group');
        }


        let isUserIn = false;
        let isGroupHas = false;

        for (const { group } of user.groups) {
            if (group.toString() === req.body.groupID) {
                isUserIn = true;
                break;
            }
        }

        for (const { member } of group.members) {
            if (member.toString() === req.body.userID) {
                isGroupHas = true;
                break;
            }
        }

        if (isUserIn && isGroupHas) {
            group.members = group.members.filter(({ member }) => {
                return member.toString() !== userID;
            });
            user.groups = user.groups.filter(({ group }) => {
                return group.toString() !== groupID;
            });

            try {
                await group.save();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to save Group');
            }

            try {
                await user.save();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to save User');
            }
        } else if (!isUserIn && isGroupHas) {
            group.members = groups.members.filter(({ member }) => {
                return member.toString() !== userID;
            });
            try {
                await group.save();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to save Group');
            }
        } else if (isUserIn && !isGroupHas) {
            user.groups = user.groups.filter(({ group }) => {
                return group.toString() !== groupID;
            });
            try {
                await user.save();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to save User');
            }
        }

        res.status(200).send({ message: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || 'Something went wrong' });
    }
});

module.exports = router;