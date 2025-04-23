import styled from "styled-components";
import { animate, AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(135deg, rgb(238,0,153), rgb(221,0,238));
`;

const Box = styled(motion.div)`
  width:400px;
  height: 400px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  /* justify-content: flex-start;
  align-items: flex-start; */
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.1), 0 10px 20px rgb(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.1), 0 10px 20px rgb(0, 0, 0, 0.06);
`;


function App() {
  const [click, setClicked] = useState(false);
  const toggleClick = () => {
    setClicked((prev) => !prev);
  }
  return (
    <Wrapper onClick={toggleClick}>
      <Box style={{ 
          justifyContent: click ? "center" : "flex-start",
          alignItems: click? "center" : "flex-start"
        }}>
        <Circle layout/>
      </Box>
    </Wrapper>
  );
}

export default App;