import React, { useEffect, useState } from "react";

const Pagination = ({ state }) => {
  const {
    filteredTodos,
    setPaginationFilteredTodos,
    currentButton,
    setCurrentButton,
    currentPage,
    setCurrentPage,
  } = state;

  const [perPage] = useState(5);
  const [totalPagesNum, setTotalPagesNum] = useState("");
  const pages = totalPagesNum;
  const numOfPages = [];
  for (let i = 1; i <= pages; i++) numOfPages.push(i);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  useEffect(() => {
    if (filteredTodos && filteredTodos.length) {
      setTotalPagesNum(Math.ceil(filteredTodos.length / perPage));
      setPaginationFilteredTodos(
        filteredTodos.slice(indexOfFirst, indexOfLast)
      );
    } else {
      setPaginationFilteredTodos(filteredTodos);
    }
  }, [filteredTodos, currentPage]);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, currentPage]);

  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className="pagination">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <a
            className="page-link"
            href="#!"
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Previous
          </a>
        </li>

        {numOfPages.map((page, index) => (
          <li
            key={index}
            className={`${
              currentButton === page ? "page-item active" : "page-item"
            }`}
          >
            <a
              className="page-link"
              href="#!"
              onClick={() => setCurrentButton(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <a
            className="page-link"
            href="#!"
            onClick={() =>
              setCurrentButton((prev) =>
                prev === numOfPages.length ? prev : prev + 1
              )
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
