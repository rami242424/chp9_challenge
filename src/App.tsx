import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
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
  width: 200px;
  height: 200px;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgb(0, 0, 0, 0.1), 0 10px 20px rgb(0, 0, 0, 0.06);
`;


function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(x, [-800, 800], [
    "linear-gradient(135deg, rgb(124, 236, 19), rgb(248, 255, 32)",
    "linear-gradient(135deg, rgb(207, 18, 163), rgb(237, 21, 46)"
  ]);
  const {scrollYProgress} = useViewportScroll();
  // useEffect(() => {
  //   scrollY.onChange(() => console.log(scrollY.get(),scrollYProgress.get()));
  // }, [scrollY, scrollYProgress])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  return (
    <Wrapper style={{ background: gradient}}>
        <Box
          drag="x"
          style={{ x, rotateZ, scale }}
        />
  
    </Wrapper>
  );
}

export default App;