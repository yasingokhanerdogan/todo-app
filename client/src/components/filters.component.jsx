import React, { useEffect } from "react";

const Filters = ({ state }) => {
  const { todoInputs, statusFilter, setStatusFilter, filteredTodos } = state;

  return (
    <div className="d-flex align-items-center justify-content-between">
      {todoInputs.searchTodo === "" ? (
        <>
          <div>
            <button
              className={`btn btn-transparent me-1 ${
                statusFilter === "all" && "active"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`btn btn-transparent me-1 ${
                statusFilter === "active" && "active"
              }`}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </button>
            <button
              className={`btn btn-transparent ${
                statusFilter === "completed" && "active"
              }`}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </button>
          </div>
          <span className="text-muted d-none d-lg-inline">
            {filteredTodos?.length} todos {statusFilter}.
          </span>
        </>
      ) : (
        <span className="d-none d-lg-inline">Search Results</span>
      )}
    </div>
  );
};

export default Filters;
