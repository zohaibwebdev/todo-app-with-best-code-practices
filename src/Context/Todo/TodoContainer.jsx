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

  useEffect(() => {
    try {
      load();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createTodo = async (newTodoValue, callback) => {
    function getId() {
      let arr = state.todoList;
      const lastObject = arr[arr.length - 1];
      const requiredId = lastObject.id + 1;
      return requiredId;
    }
    try {
      const newTodoId = getId();
      await addTodo(newTodoId, newTodoValue);
      setState((prevState) => {
        return {
          ...prevState,
          todoList: [
            ...prevState.todoList,
            { id: newTodoId, todo: newTodoValue },
          ],
        };
      });
    } catch (err) {
      console.error(err);
    } finally {
      callback();
    }
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
