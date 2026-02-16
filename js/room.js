const RoomManager = {
    rooms: [],

    init() {
        this.rooms = Storage.getRooms();
    },

    createRoom(data) {
        const room = {
            id: Date.now().toString(),
            subject: data.subject,
            description: data.description,
            schedule: data.schedule,
            studentIds: data.studentIds || []
        };
        this.rooms.push(room);
        Storage.saveRooms(this.rooms);
        return room;
    },

    getRoom(id) {
        return this.rooms.find(r => r.id === id);
    },

    getAllRooms() {
        return this.rooms;
    },

    updateRoom(id, data) {
        const index = this.rooms.findIndex(r => r.id === id);
        if (index !== -1) {
            this.rooms[index] = { ...this.rooms[index], ...data };
            Storage.saveRooms(this.rooms);
        }
    },

    deleteRoom(id) {
        this.rooms = this.rooms.filter(r => r.id !== id);
        Storage.saveRooms(this.rooms);
    },

    addStudentToRoom(roomId, studentId) {
        const room = this.getRoom(roomId);
        if (room && !room.studentIds.includes(studentId)) {
            room.studentIds.push(studentId);
            Storage.saveRooms(this.rooms);
        }
    },

    removeStudentFromRoom(roomId, studentId) {
        const room = this.getRoom(roomId);
        if (room) {
            room.studentIds = room.studentIds.filter(id => id !== studentId);
            Storage.saveRooms(this.rooms);
        }
    }
};