import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// create a context for task
export const TaskContext = createContext();

// create a provider for task
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const { user } = useContext(AuthContext);

  // create task
  const createTask = async (task) => {
    try {

      const newTask = { ...task, taskId: 142, userId: user.userId };

      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();

      setTasks((prev) => {
        return [...prev, data];
      });


    } catch (error) {
      console.log(error.message); // install a hot-toast
    }
  };

  // read task
  const getTask = () => {};

  // update task
  const updateTask = (id, task) => {};

  // delete task
  const deleteTask = (id) => {};

  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
};
