import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiWarningCircleLight } from "react-icons/pi";
import { GrInProgress } from "react-icons/gr";
import { deleteItem, updateItem } from "../services/taskApi";

const TItem = ({ item, fetchTasks }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...item });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteItem(item.id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateItem(updatedTask.id, updatedTask);
      await fetchTasks();
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-200 p-4 shadow-md flex flex-col justify-between w-full min-h-48 rounded-lg">
      <div>
        <h2 className="font-bold">Task ID: {item.id}</h2>
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-sm bg-gray-300 rounded-md inline px-1">{item.status}</p>
        {item.status === "To Do" && <PiWarningCircleLight className="text-red-500 inline ml-1" />}
        {item.status === "Done" && <IoMdCheckmarkCircleOutline className="text-green-500 inline ml-1" />}
        {item.status === "In Progress" && <GrInProgress className="text-blue-500 inline ml-1" />}
      </div>

      <div>
        <p>{showFullDescription ? item.description : item.description.substring(0, 60) + "..."}</p>
        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="text-green-600 hover:text-gray-400"
        >
          {showFullDescription ? "Less" : "More"}
        </button>
      </div>

      <div className="flex justify-between mt-auto">
        <button onClick={() => setShowModal(true)} className="bg-green-500 text-white p-1 rounded-md">
          Update
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded-md" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>

            <input
              type="text"
              placeholder="Task Title"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
              value={updatedTask.title}
              onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            />

            <textarea
              placeholder="Task Description"
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
              value={updatedTask.description}
              onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            />

            <select
              className="border border-gray-300 p-2 rounded-md w-full mb-4"
              value={updatedTask.status}
              onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleUpdate} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TItem;
