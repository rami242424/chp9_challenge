import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [800,0,-800], [2,1,0]);
  //console.log(x)
  // useEffect(() => {
  //   // x.onChange(() => {
  //   //   console.log(x.get());
  //   // });
  //   scale.onChange(() => {
  //     console.log(scale.get());
  //   });
  // })
  return (
    <Wrapper>
        <Box
          drag="x"
          style={{ x, scale}}
        />
  
    </Wrapper>
  );
}

export default App;