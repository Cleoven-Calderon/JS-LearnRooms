# JS-LearnRooms

A JavaScript-based classroom management application demonstrating local storage usage and CRUD operations for managing students and learning rooms.

## Screenshot
<img width="1917" height="1079" alt="Screenshot 2026-02-16 140613" src="https://github.com/user-attachments/assets/4c788379-c105-4605-b53a-e7f910076dac" />


## Overview

This project was developed as a school project to practice fundamental JavaScript concepts including local storage management and basic CRUD (Create, Read, Update, Delete) operations in a classroom management context.

## Project Structure

```
JS-LearnRooms/
├── index.html        # Main application page
├── css/
│   └── styles.css    # Application styling
└── js/
    ├── app.js        # Main application logic
    ├── room.js       # Room management functionality
    ├── storage.js    # Local storage operations
    ├── student.js    # Student entity and operations
    └── ui.js         # User interface controls
```

## Features

- Create, read, update, and delete learning rooms
- Manage student records
- Persistent data storage using browser's local storage
- Interactive user interface
- Modular JavaScript architecture

## Technology Stack

- JavaScript (74.7%)
- CSS (18.6%)
- HTML (6.7%)

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Cleoven-Calderon/JS-LearnRooms.git
cd JS-LearnRooms
```

2. Open the application:
```bash
# Simply open index.html in your web browser
```

## Usage

1. Open `index.html` in your web browser

2. Create new learning rooms using the interface

3. Add students to rooms

4. Perform CRUD operations on rooms and students

5. Data persists across browser sessions using local storage

## Code Architecture

### app.js
Main application initialization and event handling

### room.js
Room class definition and room-specific operations

### storage.js
Handles all interactions with browser's local storage API

### student.js
Student class definition and student-specific operations

### ui.js
User interface rendering and DOM manipulation

## Learning Objectives

This project demonstrates:

- Object-oriented JavaScript programming
- Local storage API usage
- CRUD operation implementation
- Separation of concerns in code organization
- Event-driven programming
- DOM manipulation

## Development

To modify or extend the application:

- Edit `js/app.js` for main application logic
- Modify `js/storage.js` to change data persistence behavior
- Update `js/ui.js` for interface changes
- Extend `js/room.js` or `js/student.js` for additional entity features
- Style changes can be made in `css/styles.css`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

This is a school project created for educational purposes.
