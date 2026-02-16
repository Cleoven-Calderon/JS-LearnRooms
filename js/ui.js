const UI = {
    modal: null,
    modalBody: null,
    scheduleList: null,
    roomsContainer: null,

    init() {
        this.modal = document.getElementById('modal');
        this.modalBody = document.getElementById('modal-body');
        this.scheduleList = document.getElementById('schedule-list');
        this.roomsContainer = document.getElementById('rooms-container');

        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    },

    showModal(content) {
        this.modalBody.innerHTML = content;
        this.modal.classList.remove('hidden');
    },

    closeModal() {
        this.modal.classList.add('hidden');
        this.modalBody.innerHTML = '';
    },

    renderSchedule() {
        const rooms = RoomManager.getAllRooms();
        
        if (rooms.length === 0) {
            this.scheduleList.innerHTML = '<p class="empty-state">No rooms yet</p>';
            return;
        }

        const html = rooms.map(room => `
            <div class="schedule-item" data-room-id="${room.id}">
                <h3>${room.subject}</h3>
                <p>${room.schedule}</p>
            </div>
        `).join('');

        this.scheduleList.innerHTML = html;

        document.querySelectorAll('.schedule-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const roomId = e.currentTarget.dataset.roomId;
                this.scrollToRoom(roomId);
            });
        });
    },

    renderRooms() {
        const rooms = RoomManager.getAllRooms();
        
        if (rooms.length === 0) {
            this.roomsContainer.innerHTML = '<div class="empty-state">No rooms created. Click "Create Room" to get started.</div>';
            return;
        }

        const html = rooms.map(room => {
            const students = room.studentIds.map(id => StudentManager.getStudent(id)).filter(s => s);
            
            return `
                <div class="room-card" id="room-${room.id}">
                    <h2>${room.subject}</h2>
                    <div class="room-info">
                        <p><strong>Description:</strong> ${room.description}</p>
                        <p><strong>Schedule:</strong> ${room.schedule}</p>
                    </div>
                    <div class="student-list">
                        <h3>Students (${students.length})</h3>
                        ${students.length === 0 ? '<p>No students enrolled</p>' : 
                            students.map(s => `
                                <div class="student-item">
                                    <span>${s.name}</span>
                                    <button class="secondary" onclick="App.removeStudentFromRoom('${room.id}', '${s.id}')">Remove</button>
                                </div>
                            `).join('')
                        }
                    </div>
                    <div style="margin-top: 1rem;">
                        <button onclick="App.showAddStudentsModal('${room.id}')">Add Students</button>
                        <button class="secondary" onclick="App.deleteRoom('${room.id}')">Delete Room</button>
                    </div>
                </div>
            `;
        }).join('');

        this.roomsContainer.innerHTML = html;
    },

    scrollToRoom(roomId) {
        const element = document.getElementById(`room-${roomId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    refresh() {
        this.renderSchedule();
        this.renderRooms();
    }
};