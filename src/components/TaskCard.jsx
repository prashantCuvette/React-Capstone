import React, { useState } from "react";

const TaskCard = ({
  task = {
    id: 1,
    title: "Sample Task Title That Might Be Very Long",
    description:
      "This is a sample task description that might be very long and needs to be truncated to fit within the card layout properly without breaking the design.",
    priority: "high",
    color: "#4caf50",
    createdBy: "john.doe@example.com",
    createdAt: new Date().toISOString(),
  },
  onEdit,
  onDelete,
  onPriorityChange,
}) => {
  const [showFullView, setShowFullView] = useState(false);
  const [currentPriority, setCurrentPriority] = useState(task.priority);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#f44336";
      case "medium":
        return "#ff9800";
      case "low":
        return "#4caf50";
      default:
        return "#757575";
    }
  };

  const handlePriorityChange = (newPriority) => {
    setCurrentPriority(newPriority);
    if (onPriorityChange) {
      onPriorityChange(task.id, newPriority);
    }
  };

  const cardStyle = {
    height: "300px",
    width: "25%",
    border: `3px solid ${task.color || "#4caf50"}`,
    margin: "0.5rem",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const titleStyle = {
    margin: "0 0 8px 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#333",
    lineHeight: "1.3",
  };

  const descriptionStyle = {
    margin: "0 0 12px 0",
    fontSize: "0.9rem",
    color: "#666",
    lineHeight: "1.4",
    flex: 1,
  };

  const priorityBadgeStyle = {
    position: "absolute",
    top: "8px",
    right: "8px",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "white",
    backgroundColor: getPriorityColor(currentPriority),
    textTransform: "uppercase",
  };

  const metaInfoStyle = {
    fontSize: "0.75rem",
    color: "#888",
    marginBottom: "8px",
    lineHeight: "1.3",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "6px",
    marginTop: "auto",
  };

  const buttonStyle = {
    padding: "4px 8px",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.75rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    fontWeight: "500",
  };

  const readMoreButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2196f3",
    color: "white",
    flex: 1,
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ff9800",
    color: "white",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  const prioritySelectStyle = {
    fontSize: "0.75rem",
    padding: "2px 4px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
    cursor: "pointer",
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const enlargedCardStyle = {
    width: "600px",
    maxHeight: "80vh",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    border: `4px solid ${task.color || "#4caf50"}`,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#999",
    padding: "5px",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div
        style={cardStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
      >
        <div style={priorityBadgeStyle}>{currentPriority}</div>

        <h3 style={titleStyle}>{truncateText(task.title, 40)}</h3>

        <p style={descriptionStyle}>{truncateText(task.description, 120)}</p>

        <div style={metaInfoStyle}>
          <div>Created by: {task.createdBy}</div>
          <div>Created: {formatTimestamp(task.createdAt)}</div>
        </div>

        <div style={{ marginBottom: "8px", fontSize: "0.75rem" }}>
          <label style={{ marginRight: "8px", color: "#666" }}>Priority:</label>
          <select
            value={currentPriority}
            onChange={(e) => handlePriorityChange(e.target.value)}
            style={prioritySelectStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={buttonContainerStyle}>
          <button
            style={readMoreButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              setShowFullView(true);
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1976d2")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2196f3")}
          >
            Read More
          </button>
          <button
            style={editButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              if (onEdit) onEdit(task.id);
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f57c00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
          >
            Edit
          </button>
          <button
            style={deleteButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              if (onDelete) onDelete(task.id);
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Enlarged View Modal */}
      {showFullView && (
        <div style={modalStyle} onClick={() => setShowFullView(false)}>
          <div style={enlargedCardStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={closeButtonStyle}
              onClick={() => setShowFullView(false)}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              ×
            </button>

            <div
              style={{
                ...priorityBadgeStyle,
                position: "static",
                marginBottom: "1rem",
                display: "inline-block",
              }}
            >
              {currentPriority}
            </div>

            <h2
              style={{
                ...titleStyle,
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {task.title}
            </h2>

            <div
              style={{
                ...descriptionStyle,
                fontSize: "1rem",
                marginBottom: "1.5rem",
                flex: "none",
              }}
            >
              {task.description}
            </div>

            <div
              style={{
                ...metaInfoStyle,
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                Created by: {task.createdBy}
              </div>
              <div>Created: {formatTimestamp(task.createdAt)}</div>
            </div>

            <div style={buttonContainerStyle}>
              <button
                style={editButtonStyle}
                onClick={() => {
                  setShowFullView(false);
                  if (onEdit) onEdit(task.id);
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#f57c00")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
              >
                Edit Task
              </button>
              <button
                style={deleteButtonStyle}
                onClick={() => {
                  setShowFullView(false);
                  if (onDelete) onDelete(task.id);
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#d32f2f")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
