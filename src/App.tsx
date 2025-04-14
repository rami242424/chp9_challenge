import styled from "styled-components";
import Circle from "./Circle";


function App() {
  return (
    <div>
      <Circle bgColor="teal" borderColor="red" text="abc"/>
      <Circle bgColor="blue"/>
      <Circle bgColor="purple"/>
    </div>
  );
}

export default App;