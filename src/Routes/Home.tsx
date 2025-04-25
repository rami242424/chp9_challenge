import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../utils";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";


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
    top: -100px;
`;

const Row = styled(motion.div)`
    display:grid;
    gap: 5px ;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;

`;

const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color:  white;
    height: 200px;
    background-image: url(${(props) => props.bgPhoto});
    background-size: cover;
    background-position: center center;
    font-size: 66px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Info = styled(motion.div)`
    padding : 10px;
    background-color: ${(props) => props.theme.black.lighter};
    position: absolute;
    width: 100%;
    bottom: 0;
    opacity: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
    
`;

const rowVars = {
    hidden: {
        x: window.outerWidth - 5,
    },
    visible : {
        x: 0,
    },
    exit : {
        x: -window.outerWidth + 5,
    }
};

const boxVars = {
    normal: {
        scale : 1,
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
            delay: 0.5,
            duration: 0.3,
            transition: {
                type: "tween"
            }
        },
    },
}

const InfoVars = {
    hover : {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.3,
            transition: {
                type: "tween"
            }
        },
    }
}

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity:0;
`;



const offset = 6;

function Home(){
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
    const {scrollY} = useViewportScroll();
    const { data , isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    //console.log(data, isLoading);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const onBoxClicked = (movieId:number) => {
        history.push(`/movies/${movieId}`);
    }

    const onOverlayClick = () => {
        history.push("/");
    }

    const increasingIdx = () => {
        if( data ){
            if (leaving) return; // slider가 돌아가는 중이면 동작x
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
        }
    }
    const toggleLeaving = () => setLeaving((prev) => !prev);

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
                        <AnimatePresence 
                            initial={false} // 처음 mount될때 오른쪽에서 슬라이딩 되는 것 방지
                            onExitComplete={toggleLeaving}>
                            <Row 
                                key={index} 
                                variants={rowVars} initial="hidden" animate="visible" 
                                exit="exit"
                                transition={{ type: "tween", duration : 1 }}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(offset*index, offset*index+offset)
                                    .map((movie) => (
                                        <Box 
                                            layoutId={movie.id + ""}
                                            onClick={() => onBoxClicked(movie.id)}
                                            key={movie.id}
                                            variants = {boxVars}
                                            whileHover="hover"
                                            initial = "normal"
                                            transition={{ type: "tween"}}
                                            bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                                        >
                                            <Info variants={InfoVars}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay onClick={onOverlayClick} animate={{opacity: 1}} exit={{opacity: 0}}/>
                                <motion.div
                                    layoutId={bigMovieMatch.params.movieId}
                                    style={{
                                        position: "absolute",
                                        width: "40vw",
                                        height: "80vh",
                                        backgroundColor: "red",
                                        top: scrollY,
                                        left: 0,
                                        right: 0,
                                        margin: "0 auto",
                                    }}
                                />
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
}

export default Home;