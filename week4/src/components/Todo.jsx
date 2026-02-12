import { useState, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Todo({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      // switched from view → edit
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      // switched from edit → view
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  // 4️⃣ Editing template
  const editingTemplate = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        editTask(id, newName);
        setIsEditing(false);
      }}
    >
      <input
        id={id}
        className="todo-text"
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        ref={editFieldRef}   // ⭐ important
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );

  // 5️⃣ View template
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" onClick={() => deleteTask(id)}>
        Delete
      </button>
    </div>
  );

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
