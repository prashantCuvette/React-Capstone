import React, { useState } from "react";
import toast from "react-hot-toast";

const AddTask = ({ setIsTaskOpen }) => {
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    priority: "",
    color: "",
  });

  // const notify = () => toast("Here is your toast.");

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const colorOptions = [
    { value: "#ffeb3b", label: "Yellow", name: "Yellow" },
    { value: "#4caf50", label: "Green", name: "Green" },
    { value: "#2196f3", label: "Blue", name: "Blue" },
    { value: "#ff9800", label: "Orange", name: "Orange" },
    { value: "#9c27b0", label: "Purple", name: "Purple" },
    { value: "#f44336", label: "Red", name: "Red" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task data:", addTask);
    // Handle form submission logic here
    setIsTaskOpen(false);
    toast.success("Task created successfully");
  };

  const handleCancel = () => {
    setIsTaskOpen(false);
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

  const popupStyle = {
    width: "450px",
    maxHeight: "90vh",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflowY: "auto",
  };

  const headerStyle = {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.5rem",
    fontWeight: "600",
    textAlign: "center",
  };

  const formGroupStyle = {
    marginBottom: "1.2rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    color: "#555",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e1e1e1",
    borderRadius: "6px",
    fontSize: "0.9rem",
    transition: "border-color 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
    appearance: "none",
    backgroundImage:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%23999" d="M6 9L1.5 4.5h9z"/></svg>\')',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: "40px",
  };

  const colorGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const colorOptionStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "3px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.8rem",
    justifyContent: "flex-end",
    marginTop: "2rem",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const submitButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4caf50",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f5f5f5",
    color: "#666",
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
    <div style={modalStyle} onClick={handleCancel}>
      <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
        <button
          style={closeButtonStyle}
          onClick={handleCancel}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          ×
        </button>

        <h2 style={headerStyle}>Add New Task</h2>

        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="title" style={labelStyle}>
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={addTask.title}
              onChange={handleInputChange}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e1e1")}
              required
              placeholder="Enter task title..."
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="description" style={labelStyle}>
              Task Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={addTask.description}
              onChange={handleInputChange}
              style={textareaStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e1e1")}
              required
              placeholder="Describe your task..."
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="priority" style={labelStyle}>
              Priority Level *
            </label>
            <select
              id="priority"
              name="priority"
              value={addTask.priority}
              onChange={handleInputChange}
              style={selectStyle}
              onFocus={(e) => (e.target.style.borderColor = "#4caf50")}
              onBlur={(e) => (e.target.style.borderColor = "#e1e1e1")}
              required
            >
              <option value="">Select priority level</option>
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Choose Color *</label>
            <div style={colorGridStyle}>
              {colorOptions.map((color) => (
                <div
                  key={color.value}
                  style={{
                    ...colorOptionStyle,
                    backgroundColor: color.value,
                    border:
                      addTask.color === color.value
                        ? "3px solid #333"
                        : "3px solid #e1e1e1",
                    transform:
                      addTask.color === color.value ? "scale(1.1)" : "scale(1)",
                  }}
                  onClick={() =>
                    setAddTask((prev) => ({ ...prev, color: color.value }))
                  }
                  title={color.name}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.transform =
                      addTask.color === color.value ? "scale(1.1)" : "scale(1)")
                  }
                />
              ))}
            </div>
          </div>

          <div style={buttonContainerStyle}>
            <button
              type="button"
              style={cancelButtonStyle}
              onClick={handleCancel}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={submitButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
