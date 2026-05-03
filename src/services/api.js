import axios from "axios";

const API = axios.create({
  baseURL: "https://eduplanner-backend-1.onrender.com/api"
});

// GET all tasks
export const getTasks = () => API.get("/tasks");

// CREATE task
export const createTask = (task) => API.post("/tasks", task);

// UPDATE task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

// DELETE task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);