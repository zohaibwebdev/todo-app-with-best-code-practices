import { createContext, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = TodoContext.Provider;
// export const TodoConsumer = TodoContext.Consumer

export const useTodoContext = () => useContext(TodoContext);
