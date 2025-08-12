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
        backgroundColor: "",
        height: "100vh",
      }}
    >
      {/* Header */}
      <div>
        <Header />
      </div>

      <div
        className="body"
        style={{
          display: "flex",
          border: "10px solid red",
          gap: "1rem",
          margin: "1rem",
        }}
      >
        <div
          className="left"
          style={{
            width: "70%",
            height: "100vh",
            border: "1px solid #030a1eff",
            margin: "1rem",
          }}
        >
          <TaskCard />
        </div>

        <div
          className="right"
          style={{
            width: "30%",
            height: "100vh",
            border: "1px solid #030a1eff",
            margin: "1rem",
          }}
        >
          <h2>Right Sidebar</h2>

          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Create a Task
          </button>
          {
            isTaskOpen && <AddTask setIsTaskOpen={setIsTaskOpen} />
          }
        </div>
      </div>
    </div>
  );
};

export default App;
