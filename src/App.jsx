import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(()=> {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    let numbers = "0123456789";
    let characters = "!@#$%^&*()";

    console.log('Generate password called with number = ' + number + ' and char = ', character);



    while(pass.length != length) {
      const choice = Math.floor(Math.random() * 3);
      console.log(choice);
      
      if (choice == 0) {
        const ind = Math.floor(Math.random() * str.length);
        pass += str[ind];
      }
      if (choice == 1 && number) {
        const ind = Math.floor(Math.random() * numbers.length);
        pass += numbers[ind];
      }
      if (choice == 2 && character) {
        const ind = Math.floor(Math.random() * characters.length);
        pass += characters[ind];
      }
    }

    setPassword(pass);
  },[length,number,character]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  function toggleNumber(ev) {
    const newState = ev.target.checked;
    console.log(newState);
    setNumber(newState);
  }
  function toggleChar(ev) {
    const newState = ev.target.checked;
    console.log(newState);
    setCharacter(newState);
  }

  useEffect(() => {
    generatePassword();
  }, [length, number, character]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Genrator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={number}
            onChange={toggleNumber}
          />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={character}
            onChange={toggleChar}
          
          />
          <label htmlFor="charInput">Charaters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
