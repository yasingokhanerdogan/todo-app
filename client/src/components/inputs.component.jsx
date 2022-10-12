import React from "react";

const Inputs = ({ state }) => {
  const { addTodo, todoInputs, todoHandleChange } = state;
  
  return (
    <div className="card p-3 shadow-lg mb-3">
      <div className="col-md-12 d-flex">
        <div className="form-group col-md-6 me-1">
          <form onSubmit={addTodo}>
            <input
              type="text"
              className="form-control"
              id="todoInput"
              name="addTodo"
              value={todoInputs.addTodo}
              onChange={todoHandleChange}
              placeholder="Press Enter to Add..."
              autoComplete="off"
            />
          </form>
        </div>
        <div className="form-group col-md-6 me-2">
          <input
            type="text"
            className="form-control"
            id="searchTodoInput"
            name="searchTodo"
            value={todoInputs.searchTodo}
            onChange={todoHandleChange}
            placeholder="Search Todo..."
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Inputs;
