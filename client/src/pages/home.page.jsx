import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Routes from "../routes";
import { AuthHooks, TodoHooks } from "../hooks";
import {
  SignOut,
  Auth,
  GetTodos,
  AddTodo,
  DeleteTodo,
  UpdateTodo,
} from "../services/redux";

import { Inputs, Filters, TodoItem, Pagination } from "../components";

const Home = () => {
  const { todos } = useSelector((state) => state.TodoSlice);
  const { user, setUser } =
    AuthHooks();
  const {
    todoInputs,
    setTodoInputs,
    todoHandleChange,
    filteredTodos,
    setFilteredTodos,
    statusFilter,
    setStatusFilter,
  } = TodoHooks();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paginationFilteredTodos, setPaginationFilteredTodos] = useState([]);
  const [currentButton, setCurrentButton] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentButton(1);
    setCurrentPage(1);
    if (todoInputs.searchTodo === "") {
      setStatusFilter("all");
    } else {
      let searchFiltered = todos.filter((item) =>
        item.todo.toLowerCase().includes(todoInputs.searchTodo.toLowerCase())
      );
      setStatusFilter("");
      setFilteredTodos(searchFiltered);
    }
  }, [todoInputs.searchTodo]);

  useEffect(() => {
    setCurrentButton(1);
    setCurrentPage(1);
    if (statusFilter === "all") {
      setFilteredTodos(todos);
    } else if (statusFilter === "active") {
      let filtered = todos && todos.filter((item) => item.status === "active");
      setFilteredTodos(filtered);
    } else if (statusFilter === "completed") {
      let filtered =
        todos && todos.filter((item) => item.status === "completed");
      setFilteredTodos(filtered);
    }
  }, [todos, statusFilter]);

  const authControl = () => {
    dispatch(Auth());
    if (localStorage.getItem("session")) {
      setUser(JSON.parse(localStorage.getItem("session")).user);
    } else {
      setUser(null);
      navigate(Routes.LogIn);
    }
  };

  useEffect(() => {
    authControl();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(GetTodos(user.id));
    }
  }, [user]);

  const signOut = async () => {
    await dispatch(SignOut(user?.id));
    authControl();
  };

  const addTodo = (event) => {
    event.preventDefault();
    dispatch(
      AddTodo({ user_id: user.id, todo: todoInputs.addTodo, status: "active" })
    );
    setTodoInputs({ ...todoInputs, addTodo: "" });
  };

  const deleteTodo = (id) => {
    dispatch(DeleteTodo(id));
  };

  const changeStatus = (id, status) => {
    let newStatus = status === "active" ? "completed" : "active";
    dispatch(UpdateTodo({ id: id, status: newStatus }));
  };

  return (
    <>
      <Helmet>
        <title>Todo App</title>
        <meta name="description" content="Todo App" />
      </Helmet>

      <main className="page-content">
        <div className="d-flex align-items-center position-absolute top-0 end-0 mt-1 me-1">
          <span className="text-muted me-2">Welcome {user?.first_name}!</span>
          <button className="btn btn-sm btn-danger" onClick={signOut}>
            Log Out
          </button>
        </div>
        <div className="container">
          <div className="row min-vh-100 d-flex justify-content-center">
            <div className="col-lg-6 col-md-9 col-sm-12">
              <h3 className="text-center mt-5 mb-4">Todo App</h3>
              <Inputs state={{ addTodo, todoInputs, todoHandleChange }} />
              <div className="card p-3 shadow-lg">
                <Filters
                  state={{
                    todoInputs,
                    statusFilter,
                    setStatusFilter,
                    filteredTodos,
                  }}
                />
                <div className="mt-3">
                  <ul className="list-unstyled">
                    {paginationFilteredTodos &&
                    paginationFilteredTodos.length ? (
                      paginationFilteredTodos.map((item) => (
                        <TodoItem
                          key={item.id}
                          state={{ item, user, changeStatus, deleteTodo }}
                        />
                      ))
                    ) : (
                      <li>
                        <span className="d-flex align-items-center justify-content-center">
                          Todo Not Found
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <Pagination
                  state={{
                    filteredTodos,
                    setPaginationFilteredTodos,
                    currentButton,
                    setCurrentButton,
                    currentPage,
                    setCurrentPage,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
