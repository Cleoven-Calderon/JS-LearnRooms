const StudentManager = {
    students: [],

    init() {
        this.students = Storage.getStudents();
    },

    addStudent(name) {
        const student = {
            id: Date.now().toString(),
            name: name
        };
        this.students.push(student);
        Storage.saveStudents(this.students);
        return student;
    },

    getStudent(id) {
        return this.students.find(s => s.id === id);
    },

    getAllStudents() {
        return this.students;
    },

    deleteStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        Storage.saveStudents(this.students);
    }
};