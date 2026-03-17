import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import Form from "./components/Form";

// --- usePrevious hook ---
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// --- FILTER LOGIC ---
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {

  function geoFindMe() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);
    console.log(`Latitude: ${latitude}°, Longitude: ${longitude}°`);
    console.log(`Try here: https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);

    locateTask(lastInsertedId, {
      latitude,
      longitude,
      error: "",
    });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  // -----------------------------
  //  PERSISTED STATE
  // -----------------------------
  function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
  }

  const [tasks, setTasks] = usePersistedState("tasks", []);
  const [filter, setFilter] = useState("All");
  const [lastInsertedId, setLastInsertId] = useState("");

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  // Focus heading after deleting a task
  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  // -----------------------------
  //  ADD TASK
  // -----------------------------
  function addTask(name) {
    const id = "todo-" + nanoid();

    const newTask = {
      id: id,
      name: name,
      completed: false,
      location: { latitude: "##", longitude: "##", error: "##" },
    };

    setLastInsertId(id);
    setTasks([...tasks, newTask]);
  }

  // -----------------------------
  //  TOGGLE COMPLETED
  // -----------------------------
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) =>
      id === task.id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // -----------------------------
  //  DELETE TASK
  // -----------------------------
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // -----------------------------
  //  EDIT TASK
  // -----------------------------
  function editTask(id, newName) {
    const editedTasks = tasks.map((task) =>
      id === task.id ? { ...task, name: newName } : task
    );
    setTasks(editedTasks);
  }

 
  function locateTask(id, location) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, location: location };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

 
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={filter === name}
      setFilter={setFilter}
    />
  ));

  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        latitude={task.location.latitude}
        longitude={task.location.longitude}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

 
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // -----------------------------
  //  RENDER
  // -----------------------------
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} geoFindMe={geoFindMe} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}
