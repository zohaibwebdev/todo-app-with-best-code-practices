import React, { useEffect, useState } from "react";
import { uuid } from "../../helpers/uuid";
import { TodoProvider } from "./TodoContext";
import { todoStoreDefaults } from "./TodoDefaults";
import { getTodos } from "./TodoServices";

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

  const createTodo = (newTodoValue, callback) => {
    setTimeout(() => {
      setState((prevState) => {
        return {
          ...prevState,
          todoList: [...prevState.todoList, { name: newTodoValue, id: uuid() }],
        };
      });
      callback();
    }, 1000);
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
