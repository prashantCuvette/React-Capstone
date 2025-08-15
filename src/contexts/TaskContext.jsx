import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create Task Context
export const TaskContext = createContext();

// Task Provider
export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount or when user changes
  useEffect(() => {
    if (!user) return;
    const storedTasks = localStorage.getItem(`tasks-${user.id}`);
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage", error);
        localStorage.removeItem(`tasks-${user.id}`);
      }
    } else {
      // Optionally, fetch from API if no tasks in localStorage
      fetchTasks();
    }
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks-${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  // Fetch tasks from json-server
  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/tasks?userId=${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Create task
  const createTask = async (task) => {
    if (!user) return { success: false, error: "User not logged in" };
    try {
      const newTask = { ...task, userId: user.id };
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Failed to create task");
      const data = await res.json();
      setTasks((prev) => [...prev, data]);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to create task" };
    }
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const data = await res.json();
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to update task" };
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to delete task" };
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
