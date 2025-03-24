const BASE_URL = "https://te6tj7edk6.execute-api.ap-northeast-1.amazonaws.com/tasks";

export const getItems = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getItemById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Task not found");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    return null; 
  }
};

export const addItem = async (task) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to add task");
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const updateItem = async (id, task) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
