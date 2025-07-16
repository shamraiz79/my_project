export const loadTasks = () => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};
