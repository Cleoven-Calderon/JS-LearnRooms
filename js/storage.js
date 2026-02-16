const Storage = {
    ROOMS_KEY: 'learnrooms_rooms',
    STUDENTS_KEY: 'learnrooms_students',

    getRooms() {
        const data = localStorage.getItem(this.ROOMS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveRooms(rooms) {
        localStorage.setItem(this.ROOMS_KEY, JSON.stringify(rooms));
    },

    getStudents() {
        const data = localStorage.getItem(this.STUDENTS_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveStudents(students) {
        localStorage.setItem(this.STUDENTS_KEY, JSON.stringify(students));
    }
};