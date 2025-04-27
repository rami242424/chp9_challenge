import { useQuery } from "react-query";
import { getMovies, getTopRatedMovies, getUpcomingMovies, IGetMoviesResult, makeImgPath } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  background: black;
  padding-top: 100px;
  padding-bottom: 200px;
  min-height: 100vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,1)), url(${(props) => props.bgPhoto});
  background-size: cover;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const Section = styled.div`
  margin-bottom: 150px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const Slider = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  padding: 0 20px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 10px;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 36px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();

  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: topRatedData } = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );
  const { data: upcomingData } = useQuery<IGetMoviesResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    history.push("/");
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    nowPlayingData?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {nowPlayingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImgPath(nowPlayingData?.results[0].backdrop_path || "")}>
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>

          <Section>
            <SectionTitle>Now Playing</SectionTitle>
            <Slider>
              {nowPlayingData?.results.slice(1, 7).map((movie) => (
                <Box
                  key={movie.id}
                  bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(movie.id)}
                  layoutId={movie.id + ""}
                >
                  <Info>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <Section>
            <SectionTitle>Top Rated Movies</SectionTitle>
            <Slider>
              {topRatedData?.results.slice(0, 6).map((movie) => (
                <Box
                  key={movie.id}
                  bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <Section>
            <SectionTitle>Upcoming Movies</SectionTitle>
            <Slider>
              {upcomingData?.results.slice(0, 6).map((movie) => (
                <Box
                  key={movie.id}
                  bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <Info>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BigMovie layoutId={bigMovieMatch.params.movieId} style={{ top: scrollY.get() + 100 }}>
                  {clickedMovie && (
                    <>
                      <BigCover style={{ backgroundImage: `url(${makeImgPath(clickedMovie.backdrop_path, "w500")})` }} />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
