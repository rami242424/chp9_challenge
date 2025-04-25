import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))  , url(${(props) => props.bgPhoto});
    /* background-image:url(${(props) => props.bgPhoto}); */
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 40px;
    margin-bottom: 15px;
`;

const Overview = styled.p`
    font-size: 20px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
`;

const Row = styled(motion.div)`
    display:grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;

`;

const Box = styled(motion.div)`
    background-color:  white;
    height: 200px;
`;

const rowVars = {
    hidden: {
        x: 1000,
    },
    visible : {
        x: 0,
    },
    exit : {
        x: -1000,
    }
}

function Home(){
    const { data , isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    //console.log(data, isLoading);
    const [index, setIndex] = useState(0);
    const increasingIdx = () => {
        setIndex((prev) => prev + 1);
    }
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading..</Loader>
            ) : (
                <>
                    <Banner onClick={increasingIdx} bgPhoto={makeImgPath(data?.results[0].backdrop_path || "")}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence>
                            <Row key={index} variants={rowVars} initial="hidden" animate="visible" exit="exit">
                                <Box/>
                                <Box/>
                                <Box/>
                                <Box/>
                                <Box/>
                                <Box/>
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    );
}

export default Home;