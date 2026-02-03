import React, { useState, useEffect } from "react";
import "./EnrollmentCounter.css";

export default function EnrollmentCounter() {
  const [students, setStudents] = useState(0);
  const [modules, setModules] = useState(0);
  const studentsPerModule = 10; // Adjust this number based on the module size

  function handleClick() {
    setStudents((current) => current + 1);
  }

 function handleClick(){
  setStudents((current) => current + 1);
 }

 useEffect(() => {
  setModules(Math.floor(students / studentsPerModule));
 }, [students]);



  return (
    <div className="EnrollmentCounter">
      {" "}
      {/* Added class for styling */}
      <p>
        Enrolled Students: <span>{students}</span>
      </p>
      <button onClick={handleClick}>Enroll a New Student</button>
      <p>
        Complete Modules: <span>{modules}</span>
      </p>
    </div>
  );
}
