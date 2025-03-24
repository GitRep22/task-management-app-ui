import React, { useEffect, useState } from "react";
import TListing from "./components/TListing";
import ToPages from "./components/ToPages";
import Search from "./components/Search";
import { getItems } from "./services/taskApi";

const ITEMS_PER_PAGE = 9;

const App = () => {
  const [items, setItems] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getItems();
      setAllTasks(tasks);
      setItems(tasks);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="p-6 rounded-lg w-full max-w-[900px] bg-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Tasks</h2>
        <Search setItems={setItems} allTasks={allTasks} fetchTasks={fetchTasks} />
        <TListing items={displayedItems} fetchTasks={fetchTasks} />
        <ToPages
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={items.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages} 
        />
      </div>
    </div>
  );
};

export default App;
