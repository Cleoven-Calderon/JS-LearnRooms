const App = {
    init() {
        StudentManager.init();
        RoomManager.init();
        UI.init();
        this.bindEvents();
        UI.refresh();
    },

    bindEvents() {
        document.getElementById('create-room-btn').addEventListener('click', () => this.showCreateRoomModal());
        document.getElementById('manage-students-btn').addEventListener('click', () => this.showManageStudentsModal());
    },

    showCreateRoomModal() {
        const students = StudentManager.getAllStudents();
        const studentCheckboxes = students.length === 0 ? 
            '<p>No students available. Create students first.</p>' :
            students.map(s => `
                <div class="checkbox-item">
                    <input type="checkbox" id="student-${s.id}" value="${s.id}">
                    <label for="student-${s.id}">${s.name}</label>
                </div>
            `).join('');

        const html = `
            <h2>Create Room</h2>
            <form id="create-room-form">
                <div class="form-group">
                    <label for="subject">Subject Name</label>
                    <input type="text" id="subject" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="schedule">Schedule</label>
                    <input type="text" id="schedule" placeholder="e.g., Mon/Wed 10:00 AM" required>
                </div>
                <div class="form-group">
                    <label>Select Students</label>
                    <div class="checkbox-group">
                        ${studentCheckboxes}
                    </div>
                </div>
                <button type="submit">Create Room</button>
                <button type="button" class="secondary" onclick="UI.closeModal()">Cancel</button>
            </form>
        `;

        UI.showModal(html);

        document.getElementById('create-room-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createRoom();
        });
    },

    createRoom() {
        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;
        const schedule = document.getElementById('schedule').value;
        
        const selectedStudents = [];
        document.querySelectorAll('.checkbox-group input:checked').forEach(cb => {
            selectedStudents.push(cb.value);
        });

        RoomManager.createRoom({
            subject,
            description,
            schedule,
            studentIds: selectedStudents
        });

        UI.closeModal();
        UI.refresh();
    },

    showManageStudentsModal() {
        const students = StudentManager.getAllStudents();
        const studentList = students.length === 0 ?
            '<p>No students yet</p>' :
            students.map(s => `
                <div class="student-item">
                    <span>${s.name}</span>
                    <button class="secondary" onclick="App.deleteStudent('${s.id}')">Delete</button>
                </div>
            `).join('');

        const html = `
            <h2>Manage Students</h2>
            <form id="add-student-form">
                <div class="form-group">
                    <label for="student-name">Add New Student</label>
                    <input type="text" id="student-name" required>
                </div>
                <button type="submit">Add Student</button>
            </form>
            <div style="margin-top: 1.5rem;">
                <h3>All Students</h3>
                <div style="margin-top: 0.5rem;">
                    ${studentList}
                </div>
            </div>
        `;

        UI.showModal(html);

        document.getElementById('add-student-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addStudent();
        });
    },

    addStudent() {
        const name = document.getElementById('student-name').value;
        StudentManager.addStudent(name);
        this.showManageStudentsModal();
    },

    deleteStudent(id) {
        if (confirm('Delete this student? They will be removed from all rooms.')) {
            RoomManager.getAllRooms().forEach(room => {
                RoomManager.removeStudentFromRoom(room.id, id);
            });
            StudentManager.deleteStudent(id);
            this.showManageStudentsModal();
            UI.refresh();
        }
    },

    showAddStudentsModal(roomId) {
        const room = RoomManager.getRoom(roomId);
        const allStudents = StudentManager.getAllStudents();
        const availableStudents = allStudents.filter(s => !room.studentIds.includes(s.id));

        if (availableStudents.length === 0) {
            alert('All students are already in this room');
            return;
        }

        const html = `
            <h2>Add Students to ${room.subject}</h2>
            <form id="add-students-form">
                <div class="form-group">
                    <label>Select Students</label>
                    <div class="checkbox-group">
                        ${availableStudents.map(s => `
                            <div class="checkbox-item">
                                <input type="checkbox" id="add-student-${s.id}" value="${s.id}">
                                <label for="add-student-${s.id}">${s.name}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button type="submit">Add Selected</button>
                <button type="button" class="secondary" onclick="UI.closeModal()">Cancel</button>
            </form>
        `;

        UI.showModal(html);

        document.getElementById('add-students-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.checkbox-group input:checked').forEach(cb => {
                RoomManager.addStudentToRoom(roomId, cb.value);
            });

            UI.closeModal();
            UI.refresh();
        });
    },

    removeStudentFromRoom(roomId, studentId) {
        if (confirm('Remove this student from the room?')) {
            RoomManager.removeStudentFromRoom(roomId, studentId);
            UI.refresh();
        }
    },

    deleteRoom(roomId) {
        if (confirm('Delete this room?')) {
            RoomManager.deleteRoom(roomId);
            UI.refresh();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());