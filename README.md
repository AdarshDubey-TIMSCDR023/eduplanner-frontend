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

![Image](https://images.openai.com/static-rsc-4/nQGpJ2aqIDYU269ajwp2uzS9ihVxIOI1_MimJeTFd9aNkcGrmbQ72hHKtjoMNyDHfybTuY-Zqlh-5N8yJdch7r9lkTWzk9X7uRj7F7My4XcS_WErhzaN0difP7bHgdRjE2dhnKcS0M0T1VbSVQDzR6BwYngsAbuwmKjkcn8w44UhQVIpbMf8j8Quw03AOE2B?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/ooiClv7uUcU3JkeYkQWibDBpvpHF3rWPUL0Avb9wPDw5EKdqUZvTsOeZZKr6Ow4ZzYKbJwjRnNnI4STySVLENOjlF1CzXPf0NxyTL1zt2TFB75O2MRJWVaht0176pGjFXdLl16sHY_E-bpOQcEfhZEM7p4fJl5ttLcXywbPXy0gnVcLgONpDfY9eKJU2mUMi?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/EEHZA4J6_Kqwd-53GcLXMOTlfUI2Rg3rvLWvkW-DO_6XdSymQTaSAtJdzU-zAH4zhVldA6NP34EzxsnIQrBp_ZJ023aXqXUzjCAr_DIiiF-mLau6CsnsRfzyKaMuTM_otw6CRUc0PBwPu36D74CnDyxTXp9w1qCBgpOsFK8P39XLtAnNl_JSE3CSv8f79zla?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/AiPsM6FaU0tUDYf5x4uL0lRPJ-lcmHqcV5iC5Su73PYlfbv64rTVrV6njeYVkD2JBXCHETGmOlvsBwzpAOrR3ty5itFMA-lSSkXqTwthOl8GWq7egriTPkaS5S8R1ivuqbn5olmpzTejfzUCMze2JxXcp6z6DxJsJwg-e7_9luTIyDVIcJyh1lQHWmRL41fx?purpose=fullsize)

![Image](https://images.openai.com/static-rsc-4/zMEDAL-BqwsmiU495ucRYOXT1Ws7_L185BrlaFJ3kG4iinO4jUC4nosXtub_uxly5G4FcOM-jXGI6gSeDQ0sTreNoJ9tILDKW2mDkvoCroT8uQ40jp31jsiqvM5zSwSSGT7DNbhk5xKEtNWvn48Py68XVR5b7HSLPLkNpaWzFALJLjAnCy8Bj-qENkSZ8--m?purpose=fullsize)

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
Master of Computer Application (MCA)
TIMSCDR|University of Mumbai

---

## License

This project is licensed under the ISC License.
