import { useQuery } from "react-query";
import { getAiringTodayTv, getPopularTv, getTopRatedTv, IGetTvResult, makeImgPath } from "../api";
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

const BigTv = styled(motion.div)`
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

function Tv() {
  const history = useHistory();
  const bigTvMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { scrollY } = useViewportScroll();

  const { data: airingTodayData, isLoading: airingTodayLoading } = useQuery<IGetTvResult>(
    ["tv", "airingToday"],
    getAiringTodayTv
  );
  const { data: popularData } = useQuery<IGetTvResult>(
    ["tv", "popular"],
    getPopularTv
  );
  const { data: topRatedData } = useQuery<IGetTvResult>(
    ["tv", "topRated"],
    getTopRatedTv
  );

  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };

  const onOverlayClick = () => {
    history.push("/tv");
  };

  const clickedTv =
    bigTvMatch?.params.tvId &&
    airingTodayData?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);

  return (
    <Wrapper>
      {airingTodayLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImgPath(airingTodayData?.results[0].backdrop_path || "")}>
            <Title>{airingTodayData?.results[0].name}</Title>
            <Overview>{airingTodayData?.results[0].overview}</Overview>
          </Banner>

          <Section>
            <SectionTitle>Airing Today</SectionTitle>
            <Slider>
              {airingTodayData?.results.slice(1, 7).map((tv) => (
                <Box
                  key={tv.id}
                  bgPhoto={makeImgPath(tv.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(tv.id)}
                  layoutId={tv.id + ""}
                >
                  <Info>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <Section>
            <SectionTitle>Popular Shows</SectionTitle>
            <Slider>
              {popularData?.results.slice(0, 6).map((tv) => (
                <Box
                  key={tv.id}
                  bgPhoto={makeImgPath(tv.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(tv.id)}
                >
                  <Info>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <Section>
            <SectionTitle>Top Rated Shows</SectionTitle>
            <Slider>
              {topRatedData?.results.slice(0, 6).map((tv) => (
                <Box
                  key={tv.id}
                  bgPhoto={makeImgPath(tv.backdrop_path, "w500")}
                  whileHover={{ scale: 1.3, y: -50 }}
                  onClick={() => onBoxClicked(tv.id)}
                >
                  <Info>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
            </Slider>
          </Section>

          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BigTv layoutId={bigTvMatch.params.tvId} style={{ top: scrollY.get() + 100 }}>
                  {clickedTv && (
                    <>
                      <BigCover style={{ backgroundImage: `url(${makeImgPath(clickedTv.backdrop_path, "w500")})` }} />
                      <BigTitle>{clickedTv.name}</BigTitle>
                      <BigOverview>{clickedTv.overview}</BigOverview>
                    </>
                  )}
                </BigTv>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
