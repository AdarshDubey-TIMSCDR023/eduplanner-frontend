# EduPlanner – Full Stack Task Management System

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-purple)

---

## Overview

EduPlanner is a full-stack academic task management system that helps students organize, track, and manage assignments efficiently.

The system enables real-time task operations including creation, updating, deletion, filtering, and searching with a clean and responsive interface.

---

## System Architecture
<p align="center">
  <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOF-Bh8h49WsREUx5sfUsz1_hIyZPCXBGOIWkB1xyiocHCZjrcrtvCccINxe6VCOkJ6dk2YwBn9VlF0gWHl63xFee-6qlcNVnZ9pmVbg1i3rTPYe_7YOGSR10HyZhrb_vjxzVfKCEHKk8xEEguP4caj3TM7VIt9CPnzeV-6wPHFREPLDUDGpAAu-nfHdY/w640-h426/ChatGPT%20Image%20May%203,%202026,%2009_00_15%20PM.png" width="900"/>
</p>

The application follows a **three-tier architecture**:

* **Frontend (Vercel)** – Handles UI and user interaction
* **Backend (Render)** – Processes API requests
* **Database (MongoDB Atlas)** – Stores task data

---

## Live Demo

Frontend:
https://eduplanner-frontend.vercel.app

Backend API:
https://eduplanner-backend-1.onrender.com/api/tasks

---

## Features

* Create, update, and delete tasks
* Multiple task statuses:

  * Yet to Start
  * Partially Completed
  * Not Completed
  * Completed
* Edit task functionality
* Search tasks by title or description
* Filter tasks (All / Active / Completed)
* Dashboard statistics
* Responsive UI

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render

---

## API Endpoints

Base URL:
https://eduplanner-backend-1.onrender.com/api

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /tasks     | Get all tasks   |
| POST   | /tasks     | Create new task |
| PUT    | /tasks/:id | Update task     |
| DELETE | /tasks/:id | Delete task     |

---

## Project Structure

src/
├── components/
│    ├── TaskForm.jsx
│    └── TaskList.jsx
│
├── services/
│    └── api.js
│
├── App.jsx
└── main.jsx

---

## Environment Variables

Create `.env` file:

VITE_API_URL=https://eduplanner-backend-1.onrender.com/api

---

## Local Setup

### Clone Repository

git clone https://github.com/YOUR_USERNAME/eduplanner-frontend.git
cd eduplanner-frontend

### Install Dependencies

npm install

### Run Development Server

npm run dev

---

## Build for Production

npm run build

---

## Deployment

### Vercel Deployment

* Import GitHub repository
* Select framework: Vite
* Build command: npm run build
* Output directory: dist
* Add environment variable
* Deploy

---

## Screenshots

Add screenshots here for better presentation:

* Dashboard UI
* Task creation
* Task status update
* Search and filter

---

## How It Works

1. User interacts with frontend UI
2. React sends API request via Axios
3. Backend processes request using Express
4. MongoDB stores/retrieves data
5. Response returned to frontend
6. UI updates dynamically

---

## Future Enhancements

* Authentication (JWT)
* User-specific task management
* Deadline alerts
* Task priority system
* Dark mode
* Analytics dashboard
* Mobile optimization

---

## Author

Adarsh Dubey
Master of Computer Application (MCA) |
TIMSCDR | University of Mumbai

---

## License

This project is licensed under the ISC License.
