import React, { useState } from "react";

function TaskForm({ onSubmit, parentId = null }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, parentId);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
