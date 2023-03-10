import React from "react";
import TodoRow from "./TodoRow";

export default function TodoList({ todoList, deleteTodo }) {
  return (
    <div>
      {todoList.map((todo) => {
        return <TodoRow {...todo} deleteTodo={deleteTodo} key={todo.id} />;
      })}
    </div>
  );
}
// {...todo} === todo={todo.todo} id={todo.id}
