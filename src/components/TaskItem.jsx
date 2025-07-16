import React, { useState } from "react";
import TaskForm from "./TaskForm";

function TaskItem({ task, onAddSubTask, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [showSubForm, setShowSubForm] = useState(false);

  const handleEdit = () => {
    if (editing && newTitle !== task.title) {
      onUpdate(task.id, newTitle);
    }
    setEditing(!editing);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      {editing ? (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <strong>{task.title}</strong>
      )}
      <button onClick={handleEdit}>{editing ? "Save" : "Edit"}</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => setShowSubForm(!showSubForm)}>
        {showSubForm ? "Cancel Sub" : "Add Sub-Task"}
      </button>
      {showSubForm && (
        <TaskForm onSubmit={onAddSubTask} parentId={task.id} />
      )}
      {task.subTasks && task.subTasks.map((sub) => (
        <TaskItem
          key={sub.id}
          task={sub}
          onAddSubTask={onAddSubTask}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskItem;
