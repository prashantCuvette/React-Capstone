import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskCard from "./components/TaskCard";
import { TaskContext } from "./contexts/TaskContext";

const App = () => {
  const auth = useContext(AuthContext);

  const [search, setSearch] = useState("");

  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // store task being edited

  const taskContext = useContext(TaskContext);
  const { tasks, deleteTask } = taskContext;

  const handleCreateClick = () => {
    setSelectedTask(null); // new task, so no pre-filled data
    setIsTaskOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskOpen(true);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id); // assumes deleteTask is in TaskContext
  };

  // Filter tasks based on search input
  const filteredTasks = useCallback(() => {
    const filterTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log("filter function ran", Date.now());
    return filterTasks;
  }, [tasks, search]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "10%" }}>
        <Header />
      </div>

      <div
        className="body"
        style={{
          display: "flex",
          gap: "1rem",
          height: "90%",
          width: "100%",
        }}
      >
        {/* Left side - Task List */}
        <div
          className="left"
          style={{
            width: "65%",
            height: "95%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
            overflow: "auto",
            paddingInline: "1rem",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            margin: "0.5rem",
            backgroundColor: "#f8f9fa",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
          }}
        >
          {tasks.length > 0 ? (
            filteredTasks().map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                color={task.color}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>

        {/* Right side - Create Task Button */}
        <div
          className="right"
          style={{
            width: "28%",
            height: "95%",
            margin: "0.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            paddingInline: "1rem",
            backgroundColor: "#f8f9fa",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
            boxSizing: "border-box",
          }}
        >
          <button
            style={{
              backgroundColor: "#4CAF50",
              width: "100%",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBlock: "1rem",
              fontSize: "1.2rem",
            }}
            onClick={handleCreateClick}
          >
            Create a Task
          </button>

          {isTaskOpen && (
            <AddTask setIsTaskOpen={setIsTaskOpen} task={selectedTask} />
          )}

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
