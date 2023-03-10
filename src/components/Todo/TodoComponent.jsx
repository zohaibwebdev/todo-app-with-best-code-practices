import React from "react";
import { useTodoContext } from "../../Context/Todo/TodoContext";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";

export default function TodoComponent() {
  const { todoList, createTodo, deleteTodo, text } = useTodoContext();
  return (
    <div>
      <TodoCreate createTodo={createTodo} />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} text={text} />
    </div>
  );
}
