import React from "react";
import TodoRow from "./TodoRow";

export default function TodoList({ todoList, deleteTodo, text }) {
  return (
    <div>
      {todoList.map((el, i) => {
        return <TodoRow {...el} deleteTodo={deleteTodo} key={i} text={text} />;
      })}
    </div>
  );
}
