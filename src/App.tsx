import styled from "styled-components";
import { animate, AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(135deg, rgb(238,0,153), rgb(221,0,238));
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width:400px;
  height: 200px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.1), 0 10px 20px rgb(0, 0, 0, 0.06);
`;


const boxVars = {
  initial:{
    opacity:0,
    scale: 0,
  },
  visible:{
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving:{
    opacity: 0,
    y: 20,
  }
}
function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>Click me</button>
      <AnimatePresence>{showing ? <Box variants={boxVars} initial="initial" animate="visible" exit="leaving"/>  : null}</AnimatePresence>
    </Wrapper>
  );
}

export default App;