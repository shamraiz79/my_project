import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onAddSubTask, onUpdate, onDelete }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onAddSubTask={onAddSubTask}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
