import React, { useState } from "react";

export default function TodoCreate({ createTodo }) {
  const [todo, setTodo] = useState("");
  const [adding, setAdding] = useState(false);
  const addTodo = () => {
    setAdding(true);
    createTodo(todo, () => {
      setTodo("");
      setAdding(false);
    });
  };
  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button disabled={adding} onClick={addTodo}>
        {adding ? "adding..." : "add"}
      </button>
      <br />
      <hr />
    </div>
  );
}

{
  /*
    - setAddin
  */
}
