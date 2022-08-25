import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./styles.scss";

TodoList.propTypes = {
  todoList: PropTypes.array,
  onTodoClick: PropTypes.func,
};

function TodoList({ todoList = [], onTodoClick }) {
  const handleClick = (todo, index) => {
    if (!onTodoClick) return;
    onTodoClick(todo, index);
  };
  return (
    <ul>
      {todoList.map((todo, index) => (
        <li
          key={index}
          className={classnames({
            "todo-item": true,
            completed: todo.status === "completed",
          })}
          onClick={() => handleClick(todo, index)}
        >
          {todo.name}{" "}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
