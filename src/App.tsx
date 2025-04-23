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
  height: 200px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.1), 0 10px 20px rgb(0, 0, 0, 0.06);
`;
const boxVars = {
  entry : (isBack:boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity:1,
    scale: 1,
    transition:{
      duration: 1,
    }
  },
  exit: (isBack:boolean) => ({
    x: isBack? 500 : -500,
    opacity: 0,
    scale: 0,
    transition:{
      duration: 0.5,
    },
    rotateX: 180
  })

}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlz = () => {
    setBack(false);
    setVisible( (prev) => prev === 10 ? 10 : prev+1 )
  }
  const prevPlz = () => { 
    setBack(true);
    setVisible( (prev) => prev === 1 ? 1 : prev-1 )
  }
  
  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box 
          custom={back}
          variants={boxVars} 
          initial="entry" 
          animate="center" 
          exit="exit" 
          key={visible}
        > 
          {visible} 
        </Box>
      </AnimatePresence> 
      <button onClick={nextPlz}>Next</button>
      <button onClick={prevPlz}>Prev</button>
    </Wrapper>
  );
}

export default App;