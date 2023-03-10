import React, { useState } from "react";

export default function TodoRow({ id, todo, deleteTodo }) {
  const [deleting, setDeleting] = useState(false);
  const deleteTodoAction = () => {
    // more operations
    setDeleting(true);
    deleteTodo(id, () => {
      setDeleting(false);
    });
  };

  return (
    <div>
      <p>
        {id} - {todo}
      </p>
      <button disabled={deleting} onClick={deleteTodoAction}>
        {deleting ? "deleting..." : "delete"}
      </button>
    </div>
  );
}
