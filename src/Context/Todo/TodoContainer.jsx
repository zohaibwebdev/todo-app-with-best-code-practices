import React, { useEffect, useState } from "react";
import { generateIncrementalIdsFromListOfObj } from "../../helpers";
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
    try {
      const newTodoId = generateIncrementalIdsFromListOfObj(state.todoList);
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
      }}
    >
      {children}
    </TodoProvider>
  );
}
