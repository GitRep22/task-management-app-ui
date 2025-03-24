import React from "react";

const ToPages = ({ itemsPerPage, totalItems, currentPage, setCurrentPage, totalPages }) => {
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 mx-1 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"}`}
      >
        Previous
      </button>
      <span className="px-4 py-2 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className={`p-2 mx-1 rounded ${currentPage >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 text-white hover:bg-gray-600"}`}
      >
        Next
      </button>
    </div>
  );
};

export default ToPages;
