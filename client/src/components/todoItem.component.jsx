import React from "react";

import { FiTrash } from "react-icons/fi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const TodoItem = ({ state }) => {
  const { item, user, changeStatus, deleteTodo } = state;

  return (
    <li
      className="py-3 border-bottom d-flex align-items-center justify-content-between"
    >
      {item.status === "active" ? (
        <span>{item.todo}</span>
      ) : (
        <del className="text-muted">{item.todo}</del>
      )}
      {item.user_id == user.id && (
        <div className="d-flex align-items-center">
          {item.status === "active" ? (
            <button
              className="btn btn-sm btn-warning me-1"
              onClick={() => changeStatus(item.id, item.status)}
            >
              <MdVisibilityOff size={18} />
            </button>
          ) : (
            <button
              className="btn btn-sm btn-secondary me-1"
              onClick={() => changeStatus(item.id, item.status)}
            >
              <MdVisibility size={18} />
            </button>
          )}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteTodo(item.id)}
          >
            <FiTrash size={18} />
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
