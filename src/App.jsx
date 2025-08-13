import { useContext, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskCard from "./components/TaskCard";


const App = () => {
  const auth = useContext(AuthContext);

  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const handleClick = () => {
    setIsTaskOpen(true);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "10%",
        }}
      >
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
            border: "1px solid #e0e0e0", // softer border
            borderRadius: "10px",
            margin: "0.5rem",
            backgroundColor: "#f8f9fa", // very light gray-blue for contrast
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)", // soft shadow
          }}
        >
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>

        <div
          className="right"
          style={{
            width: "28%",
            height: "95%",
            margin: "0.5rem",
            border: "1px solid #e0e0e0", // soft border
            borderRadius: "10px",
            paddingInline: "1rem",
            backgroundColor: "#f8f9fa", // light background for contrast against white
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)", // subtle shadow
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
            onClick={handleClick}
          >
            Create a Task
          </button>
          {isTaskOpen && <AddTask setIsTaskOpen={setIsTaskOpen} />}
        </div>
      </div>
    </div>
  );
};

export default App;
