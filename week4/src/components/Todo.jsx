import { useState, useRef, useEffect } from "react";
import WebcamCapture from "./WebcamCapture";   // ⭐ NEW IMPORT
import { GetPhotoSrc } from "./db";
import Popup from "reactjs-popup";


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Todo({  id,
  name,
  completed,
  latitude,
  longitude,
  mapURL,
  smsURL,
  toggleTaskCompleted,
  deleteTask,
  editTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  // Step 2.1–2.3
  const [showCamera, setShowCamera] = useState(false);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(null);

  useEffect(() => {
  if (showPhoto) {
    GetPhotoSrc(id).then((src) => setPhotoSrc(src));
  }
}, [showPhoto, id]);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

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
        ref={editFieldRef}
      />
      <button type="submit" className="btn btn__primary">Save</button>
      <button type="button" className="btn" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => toggleTaskCompleted(id)}
        />
        <label htmlFor={id}>
        {name}{" "}
        <a
        href={mapURL}
        target="_blank"
        rel="noopener noreferrer"
        className="task-link"
        >
          (map)
        </a>{" "}
          |{" "}
        <a
           href={smsURL}
          className="task-link"
        >
         (sms)
         </a>
      </label>

      </div>

      <div className="todo-buttons">
        <button type="button" className="btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button type="button" className="btn" onClick={() => setShowCamera(true)}>
          Take Photo
        </button>

        <button
        type="button"className="btn"
        onClick={() => setShowPhoto(true)}
        >View Photo</button>


        <button type="button" className="btn btn__danger" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo">
      {isEditing ? editingTemplate : viewTemplate}

      {/* ⭐ Step 2.3 — Show webcam when Take Photo is clicked */}
      {showCamera && (
        <WebcamCapture
          id={id}
          closeCamera={() => setShowCamera(false)}
        />
      )}
      {showPhoto && (
  <Popup open={showPhoto} onClose={() => setShowPhoto(false)}>
    <div className="photo-popup">
      {photoSrc ? (
        <img src={photoSrc} alt="Task" />
      ) : (
        <p>No photo saved for this task.</p>
      )}
      <button className="btn" onClick={() => setShowPhoto(false)}>
        Close
      </button>
    </div>
  </Popup>
)}

    </li>
  );
}

export default Todo;
