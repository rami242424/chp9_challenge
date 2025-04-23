import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  div:first-child,
  div:last-child {
    grid-column: span 2
  }
  gap: 10px;

`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [click, setClick] = useState(false);
  const toggle = () => {
    setClick((prev)=> !prev);
  }
  return (
    <Wrapper onClick={toggle}>
      <Grid>
        <Box layoutId="hello"/>
        <Box/>
        <Box/>
        <Box/>
      </Grid>
      <AnimatePresence>{ click ? (
        <Overlay 
          initial={{opacity: 0}} 
          animate={{opacity: 1}} 
          exit={{opacity: 0}}
        >
          <Box layoutId="hello" style={{ width: 400, height: 200}}/>
        </Overlay>
      ) : null }
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;