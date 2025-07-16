import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title, parentId = null) => {
    const newTask = {
      id: Date.now(),
      title,
      subTasks: [],
    };

    if (parentId === null) {
      setTasks([...tasks, newTask]);
    } else {
      const updated = tasks.map(task =>
        task.id === parentId
          ? { ...task, subTasks: [...task.subTasks, newTask] }
          : task
      );
      setTasks(updated);
    }
  };

  const updateTask = (id, newTitle, parentId = null) => {
    const updateList = (taskList) =>
      taskList.map(task => {
        if (task.id === id) return { ...task, title: newTitle };
        if (task.subTasks.length > 0)
          return { ...task, subTasks: updateList(task.subTasks) };
        return task;
      });

    setTasks(updateList(tasks));
  };

  const deleteTask = (id) => {
    const deleteRecursive = (list) =>
      list.filter(task => {
        if (task.subTasks.length > 0) {
          task.subTasks = deleteRecursive(task.subTasks);
        }
        return task.id !== id;
      });

    setTasks(deleteRecursive(tasks));
  };

  return (
    <div className="App">
      <h1>📝 Task App with Sub-Tasks</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        onAddSubTask={addTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
