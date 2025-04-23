import styled from "styled-components";
import { motion,  } from "framer-motion";

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

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },

};

function App() {
  // x : 드래그 할때마다 새로 설정되는 값값
  const x = useMotionValue(0);

  //const potato = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  
  useEffect(() => {
    //x.onChange(() => console.log(x.get()));
    //potato.onChange(() => console.log(potato.get()));
    scale.onChanege(()=> console.log(scale.get()));
  }, [x]);

  return (
    <Wrapper>
      <Box style={{x , scale: potato, }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;