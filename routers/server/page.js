const router = require('express').Router();
const Group = require('../../database/schemas/group');
const User = require('../../database/schemas/user');
const firewall = require('../firewall');

router.get('/page/dashboard', firewall, async (req, res) => {
    const data = await User.aggregate([
        {
            $match: { _id: req.user._id }
        },
        {
            $lookup: {
                from: 'groups',
                localField: 'groups.group',
                foreignField: '_id',
                as: 'groups'
            }
        },
        {
            $unwind: '$groups'
        },
        {
            $lookup: {
                from: 'ideas',
                localField: 'groups._id',
                foreignField: 'group',
                as: 'groups.ideas'
            }
        },
        {
            $addFields: {
                'groups.ideas': {
                    $size: '$groups.ideas'
                },
                'groups.members': {
                    $size: '$groups.members'
                },
                ideas: {
                    $map: {
                        input: '$groups.ideas',
                        as: 'idea',
                        in: {
                            _id: '$$idea._id',
                            title: '$$idea.title',
                            image: '$$idea.image',
                            description: '$$idea.description',
                            author: '$$idea.author'
                        }
                    }
                }
            },
        },
        {
            $group: {
                _id: "$_id",
                groups: { $push: "$groups" },
                ideas: { $push: '$ideas' }
            },
        },
        {
            $project: {
                groups: {
                    _id: 1,
                    name: 1,
                    members: 1,
                    ideas: 1
                },
                ideas: {
                    $reduce: {
                        input: '$ideas',
                        initialValue: [],
                        in: { $concatArrays: ['$$value', '$$this'] }
                    }
                }
            }
        },
        {
            $unwind: '$ideas'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'ideas.author',
                foreignField: '_id',
                as: 'ideas.author'
            }
        },
        {
            $group: {
                _id: '$_id',
                groups: { $first: '$groups' },
                ideas: { $push: '$ideas' }
            }
        },
        {
            $addFields: {
                ideas: {
                    $map: {
                        input: '$ideas',
                        as: 'idea',
                        in: {
                            $mergeObjects: [
                                '$$idea',
                                {
                                    author: {
                                        $arrayElemAt: ['$$idea.author', 0]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                id: '$_id',
                groups: {
                    $map: {
                        input: '$groups',
                        as: 'group',
                        in: {
                            id: '$$group._id',
                            name: '$$group.name',
                            members: '$$group.members',
                            ideas: '$$group.ideas'
                        }
                    }
                },
                ideas: {
                    $map: {
                        input: '$ideas',
                        as: 'idea',
                        in: {
                            id: '$$idea._id',
                            title: '$$idea.title',
                            image: '$$idea.image',
                            description: '$$idea.description',
                            author: {
                                id: '$$idea.author._id',
                                firstName: '$$idea.author.firstName',
                                lastName: '$$idea.author.lastName',
                                profilePicture: '$$idea.author.profilePicture'
                            },
                            createdAt: '$$idea.createdAt'
                        }
                    }
                }
            }
        }
    ]);

    res.status(200).send({ message: 'Success', body: { ...data[0] } });
});

router.get('/page/explore', firewall, async (req, res) => {
    const groups = await Group.aggregate([
        {
            $lookup: {
                from: 'ideas',
                localField: '_id',
                foreignField: 'group',
                as: 'ideas'
            }
        },
        {
            $set: {
                ideas: {
                    $size: '$ideas'
                }
            }
        },
        {
            $project: {
                id: '$_id',
                name: true,
                ideas: true,
                members: {
                    $size: '$members'
                }
            }
        }
    ]);

    res.status(200).send({ message: 'Success', body: { groups } });
});

module.exports = router;