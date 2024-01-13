const moment = require('moment');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const ChatSuite = require('../utils/chatFeature');
const User = require('../database/schemas/user');

const chatSuite = new ChatSuite();

const generateMessage = ({ meta, text, ...rest }) => {
    return {
        id: uuid(),
        meta,
        ...rest,
        text,
        createdAt: moment().format('hh:mm a')
    };
};

const getSocketUser = async (token) => {
    try {
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
            throw new Error('User not found');
        }

        return { userId: user._id.toString(), userName: user.userName };
    } catch (err) {
        throw new Error(err.message || 'Something went wrong');
    }
};

const socketMiddleware = async (socket, next) => {
    try {
        const { token } = cookie.parse(socket.handshake.headers.cookie);
        socket.user = await getSocketUser(token);
        socket.roomId = socket.handshake.query.roomId;
        delete socket.handshake.query.roomId;

        next();
    } catch (err) {
        socket.disconnect();
    }
};

const socketFunctions = (io) => {
    return (socket) => {
        console.log(`Chat Client:${socket.id} Connected`);

        socket.on('join', (callback) => {
            try {
                chatSuite.addMemberToRoom(socket.roomId, {
                    userId: socket.user.userId,
                    socketId: socket.id,
                    userName: socket.user.userName
                });

                socket.join(socket.roomId);
                socket.emit('system', generateMessage({
                    meta: 'SYSTEM',
                    text: `Welcome ${socket.user.userName}`
                }));
                socket.broadcast.to(socket.roomId).emit('system', generateMessage({
                    meta: 'SYSTEM',
                    text: `${socket.user.userName} has joined.`
                }));
                io.to(socket.roomId).emit('roomStatus', {
                    roomName: 'Room',
                    members: chatSuite.getAllMembersFromRoom(socket.roomId)
                });

                callback();
            } catch (err) {
                callback({ status: 500, message: err.message });
            }
        });

        socket.on('send', (text, callback) => {
            try {
                socket.broadcast.to(socket.roomId).emit('receive', generateMessage({
                    meta: 'RECEIVER',
                    from: socket.user.userName,
                    text: text
                }));
            } catch (err) {
                callback({ status: 500, message: err.message });
            }
        });

        socket.on('disconnect', () => {
            let member;
            try {
                member = chatSuite.removeMemberFromRoom({ roomId: socket.roomId, socketId: socket.id });
            } catch (err) {
                console.error(err.message);
            }
            if (member) {
                io.to(socket.roomId).emit('system', generateMessage({
                    meta: 'SYSTEM',
                    text: `${socket.user.userName} has left.`
                }));

                io.to(socket.roomId).emit('roomStatus', {
                    roomName: 'Room',
                    members: chatSuite.getAllMembersFromRoom(socket.roomId)
                });
            }
            console.log(`Chat Client:${socket.id} Disconnected`);
        });
    };
};

module.exports = { socketMiddleware, socketFunctions };