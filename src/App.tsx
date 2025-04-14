import { useState } from "react";
import styled from "styled-components";


function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    const {currentTarget: {value}} = event;
    setValue(value); // setValue(event.currentTarget.value)
  };

  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
        onChange={onChange}
        value={value} type="text" placeholder="userName" />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;