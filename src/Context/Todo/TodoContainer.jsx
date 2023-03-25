import React, { useEffect, useState } from "react";
import { uuid } from "../../helpers/uuid";
import { TodoProvider } from "./TodoContext";
import { todoStoreDefaults } from "./TodoDefaults";
import { addTodo, deleteTodos, getTodos } from "./TodoServices";

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
    add(newTodoValue);
    callback();
  };

  const deleteTodo = async (todoId, callback) => {
    try {
      await deleteTodos(todoId);
      setState((prev) => {
        const filterTodo = prev.todoList.filter((todo) => todo.id !== todoId);
        return {
          ...prev,
          todoList: [...filterTodo],
        };
      });
    } catch (err) {
      console.error(err);
    } finally {
      callback();
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
