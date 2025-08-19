import { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import "./App.css";

const FormBuild = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (e) => setTask(e.target.value);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (editIndex >= 0) {
      const updated = [...taskList];
      updated[editIndex].text = task;
      setTaskList(updated);
      setEditIndex(-1);
    } else {
      setTaskList([...taskList, { text: task, completed: false }]);
    }
    setTask("");
  };

  const handleDeleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTaskList(taskList.filter((_, i) => i !== index));
    }
  };

  const toggleCompleteTask = (index) => {
    const updatedTasks = taskList.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTaskList(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTask(taskList[index].text);
    setEditIndex(index);
  };

  const clearCompletedTasks = () => {
    setTaskList(taskList.filter((t) => !t.completed));
  };

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((t) => t.completed).length;

  return (
    <div className="full">
      <div className="form-container">
        <h2 className="headname">Professional To-Do List</h2>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={handleInputChange}
            className="task-input"
            autoFocus
          />
          <button type="submit" className="add">
            <FaPlus style={{ marginRight: "5px" }} />
            {editIndex >= 0 ? "Save Task" : "Add Task"}
          </button>
        </form>

        {totalTasks > 0 && (
          <p className="task-summary">
            Total: {totalTasks} | Completed: {completedTasks}
            {completedTasks > 0 && (
              <button className="clear-button" onClick={clearCompletedTasks}>
                Clear Completed
              </button>
            )}
          </p>
        )}
      </div>

      <div className="list">
        {taskList.length === 0 ? (
          <p className="empty-message">No tasks yet!</p>
        ) : (
          <ul>
            {taskList.map((taskItem, index) => (
              <li key={index} className="list-item">
                <input
                  type="checkbox"
                  checked={taskItem.completed}
                  onChange={() => toggleCompleteTask(index)}
                  className="task-checkbox"
                />
                <span
                  className={`task-text ${
                    taskItem.completed ? "completed-task" : ""
                  }`}
                >
                  {taskItem.text}
                </span>
                <div className="task-buttons">
                  <button
                    onClick={() => handleEditTask(index)}
                    className="edit-button"
                  >
                    <FaEdit style={{ marginRight: "5px" }} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="delete-button"
                  >
                    <FaTrash style={{ marginRight: "5px" }} />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormBuild;
