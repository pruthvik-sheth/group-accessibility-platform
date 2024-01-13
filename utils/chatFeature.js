const _name = new WeakMap()
const _id = new WeakMap()

class ChatSuite {

    addMemberToRoom(roomId, memberDetails) {
        if (this.isRoomAvailable(roomId)) {
            this[roomId].addMember(memberDetails)
        } else {
            this[roomId] = new Room(memberDetails)
        }
    }

    isRoomAvailable(roomId) {
        return !!this[roomId]
    }

    getAllMembersFromRoom(roomId) {
        if (roomId && this.isRoomAvailable(roomId)) {
            const room = this[roomId]
            return Object.keys(room).map(key => {
                return {
                    socketId: key,
                    userId: room[key].id,
                    userName: room[key].name
                }
            })
        } else
            throw new Error('Room does not exist')
    }

    getMemberFromRoom({ roomId, socketId }) {
        if (roomId && this.isRoomAvailable(roomId))
            if (socketId && this[roomId].isSocketAvailable(socketId))
                return this[roomId][socketId]
            else
                throw new Error('Socket does not exist')
        else
            throw new Error('Room does not exist')
    }

    removeMemberFromRoom({ roomId, socketId }) {
        if (roomId && this.isRoomAvailable(roomId))
            if (socketId && this[roomId].isSocketAvailable(socketId)) {
                const member = this[roomId][socketId]
                delete this[roomId][socketId]
                return member
            }
            else
                throw new Error('Socket does not exist')
        else
            throw new Error('Room does not exist')
    }
}

class Room {
    constructor({ socketId, userId, userName }) {
        if (!this.isSocketAvailable(socketId)) {
            this[socketId] = new Member(userId, userName)
        } else {
            throw new Error('Socket already exists')
        }
    }

    isSocketAvailable(socketId) {
        return !!this[socketId]
    }

    addMember({ socketId, userId, userName }) {
        if (!this.isSocketAvailable(socketId)) {
            this.deleteDuplicateMembers(userId)
            this[socketId] = new Member(userId, userName)
        } else {
            throw new Error('Socket already Exists')
        }
    }

    deleteDuplicateMembers(userId) {
        const keys = Object.keys(this)
        if (keys.length > 0) {
            for (let key of keys) {
                if (this[key].id === userId) {
                    delete this[key]
                }
            }
        }
        return
    }
}

class Member {
    constructor(id, name) {
        _name.set(this, name)
        _id.set(this, id)
    }

    get name() {
        return _name.get(this)
    }

    get id() {
        return _id.get(this)
    }
}

module.exports = ChatSuite