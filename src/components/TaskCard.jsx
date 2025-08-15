import React from "react";

const TaskCard = React.memo(
  ({ id, title, description, priority, color, onEdit, onDelete }) => {
    return (
      <div
        style={{
          width: "280px",
          minHeight: "160px",
          border: `2px solid ${color || "#ddd"}`, // colored border
          borderRadius: "10px",
          padding: "1rem",
          backgroundColor: "#fff", // always white background
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0" }}>{title}</h3>
          <p style={{ fontSize: "0.9rem", color: "#555" }}>{description}</p>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: "bold",
              color:
                priority === "High"
                  ? "red"
                  : priority === "Medium"
                  ? "orange"
                  : "green",
            }}
          >
            Priority: {priority}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "6px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            style={{
              flex: 1,
              backgroundColor: "#d32f2f",
              color: "#fff",
              padding: "6px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
);

export default TaskCard;
