import React, { useEffect, useState } from "react";
import { uuid } from "../../helpers/uuid";
import { TodoProvider } from "./TodoContext";
import { todoStoreDefaults } from "./TodoDefaults";
import { addTodo, getTodos } from "./TodoServices";

export default function TodoContainer({ children }) {
  const [state, setState] = useState(todoStoreDefaults);

  async function load() {
    const data = await getTodos();
    setState((prev) => ({
      ...prev,
      todoList: [...data],
    }));
  }

  async function add(newTodo) {
    const data = await addTodo(newTodo);
  }

  useEffect(() => {
    try {
      load();
    } catch (err) {
      console.log(err);
    }
  }, [add]);

  const createTodo = (newTodoValue, callback) => {
    console.log(newTodoValue);
    add(newTodoValue);
    callback();
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
