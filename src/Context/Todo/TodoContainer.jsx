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

  useEffect(() => {
    try {
      load();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createTodo = async (newTodoValue, callback) => {
    try {
      await addTodo(newTodoValue);
    } catch (err) {
      console.error(err);
    } finally {
      callback();
    }
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
