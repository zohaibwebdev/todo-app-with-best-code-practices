import React, { useState } from "react";
import { uuid } from "../../helpers/uuid";
import { TodoProvider } from "./TodoContext";
import { todoStoreDefaults } from "./TodoDefaults";

export default function TodoContainer({ children }) {
  const [state, setState] = useState(todoStoreDefaults);

  const createTodo = (newTodoValue) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoList: [...prevState.todoList, { name: newTodoValue, id: uuid() }],
      };
    });
  };

  const deleteTodo = (todoId, callback) => {
    // async operation if BE
    try {
      setTimeout(() => {
        setState((prev) => {
          const filterTodo = prev.todoList.filter((todo) => todo.id !== todoId);
          return {
            ...prev,
            todoList: [...filterTodo],
          };
        });
        callback();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodoProvider
      value={{
        todoList: state.todoList,
        createTodo: createTodo,
        deleteTodo: deleteTodo,
        text: state.text,
      }}
    >
      {children}
    </TodoProvider>
  );
}
