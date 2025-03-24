import React, { useState } from "react";
import { getItemById, addItem } from "../services/taskApi";

const Search = ({ setItems, allTasks, fetchTasks }) => {
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleSearch = async () => {
    if (!searchId) return;
    try {
      const task = await getItemById(searchId);
      setItems(task ? [task] : []);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);

    const filteredTasks =
      selectedStatus === "" ? allTasks : allTasks.filter((task) => task.status === selectedStatus);

    setItems(filteredTasks);
  };

  const handleCreateTask = async () => {
    try {
      await addItem(newTask);
      await fetchTasks();
      setShowModal(false);
      setNewTask({ title: "", description: "", status: "To Do" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white shadow-md p-4 rounded-lg w-full">

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          placeholder="Search by ID"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-60"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow w-full sm:w-32"
        >
          Search
        </button>
      </div>


      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow w-full sm:w-40"
        >
          Create Task
        </button>

        <select
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-48"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

            <input
              type="text"
              placeholder="Task Title"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />

            <textarea
              placeholder="Task Description"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />

            <select
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
