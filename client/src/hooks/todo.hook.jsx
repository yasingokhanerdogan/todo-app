import React, { useState } from "react";

const TodoHooks = () => {
  const [todoInputs, setTodoInputs] = useState({
    addTodo: "",
    searchTodo: ""
  });

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const todoHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTodoInputs({ ...todoInputs, [name]: value });
  };

  return { todoInputs, setTodoInputs, todoHandleChange, filteredTodos, setFilteredTodos, statusFilter, setStatusFilter  };
};

export default TodoHooks;
