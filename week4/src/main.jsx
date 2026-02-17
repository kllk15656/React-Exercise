import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initial task data passed into the App component as props.
// This is the "starting state" before the user adds or edits anything.
//const DATA=[
 // {id:"todo-0", name:"Eat", completed:true},
  //{id:"todo-1", name:"Sleep", completed:false},
  //{id:"todo-2", name:"Repeat", completed:false},
//];

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
    .register("./service-worker.jsx")
    .then((registration) => {
      console.log("Service Worker registered! Scope: ", registration.scope);
    })
    .catch((err) => {
      console.log("Service Worker registration failed: ", err);
    });
});
}


const DATA =JSON.parse(localStorage.getItem('tasks')) || [];
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)


