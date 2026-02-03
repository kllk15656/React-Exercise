import { useState, useEffect } from "react";
import characters from "./data/charactersData";
import CharacterSelector from "./components/CharacterSelector";
import "./styles.css";
 
export default function App() {
// how many are being selected
const [selectionCount, setSelectionCount] =useState(0);

//function increment the count
const incrementSelectionCount = () => {
  setSelectionCount((prev) =>  prev + 1);
};

// Effects work when count changes
useEffect (() => {
  if (selectionCount === 3 ){
    alert ("You have selected 3 characters!");
    setSelectionCount(0); // To reset
  }
} ,
[selectionCount]);

  return (
    <>
      <div className="app-container">
        <CharacterSelector
          characters={characters.groupA}
          onCharacterSelect={incrementSelectionCount}
        />
        <CharacterSelector
          characters={characters.groupB}
          onCharacterSelect={incrementSelectionCount}
        />
        <CharacterSelector
          characters={characters.groupC}
          onCharacterSelect={incrementSelectionCount}
        />
      </div>
    </>
  );
}
