import { useState } from "react";
import "./styles.css"; // Importing the CSS file

export default function ColourPicker() {

  // State to store the selected color
  const [color,setColor ] = useState("");

  //Handler to update the colour when a radio button is selected
  const handleColorChange =(event)=> {
    setColor(event.target.value);
  }
  
  return (
    <div className="color-picker-container">
      {/* Display the selected color name in a paragraph. The color of the text should match the selected color */}
      <p className="selected-color">
        The selected color is: {}
        <span style={{ color: color  || "black"}}>  </span>
      </p>

      <div className="radio-buttons">
        {/* Create radio buttons for at least three different colors */}
        {/* Each radio button should update the state when clicked */}
        {/* Example for the red radio button. Do the same for blue and green */}
        
        <label>
            <input
            type="radio"
            value="red"
            checked={color === "red"}    // You will need your variable to be named 'color'
            onChange={handleColorChange} // You will need your handler function to be named 'handleColorChange'
            />
            Red
        </label> 
        <label>
            <input
            type="radio"
            value="blue"
            checked={color === "blue"}    // You will need your variable to be named 'color'
            onChange={handleColorChange} // You will need your handler function to be named 'handleColorChange'
            />
            Blue
        </label> 
        <label>
            <input
            type="radio"
            value="green"
            checked={color === "green"}    // You will need your variable to be named 'color'
            onChange={handleColorChange} // You will need your handler function to be named 'handleColorChange'
            />
            Green
        </label>
      </div>
    </div>
  );
}