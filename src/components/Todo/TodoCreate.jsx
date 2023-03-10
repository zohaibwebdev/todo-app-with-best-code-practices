import React, { useState } from "react";

export default function TodoCreate({ createTodo }) {
  const [todo, setTodo] = useState("");
  const addTodo = () => {
    createTodo(todo);
    setTodo("");
  };
  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <br />
      <hr />
    </div>
  );
}
