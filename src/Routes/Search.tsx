import { useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { searchMovies, searchTv, IGetMoviesResult, IGetTvResult, makeImgPath } from "../api";
import styled from "styled-components";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";

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

const Title = styled.h2`
  font-size: 36px;
  margin: 0 20px 40px;
`;

const Section = styled.div`
  margin-bottom: 150px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
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

const BigItem = styled(motion.div)`
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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const history = useHistory();
  const bigSearchMatch = useRouteMatch<{ id: string }>("/search/:id");
  const { scrollY } = useViewportScroll();

  const { data: movieData, isLoading: movieLoading } = useQuery<IGetMoviesResult>(
    ["search", "movies", keyword],
    () => searchMovies(keyword || "")
  );
  const { data: tvData, isLoading: tvLoading } = useQuery<IGetTvResult>(
    ["search", "tv", keyword],
    () => searchTv(keyword || "")
  );

  const onBoxClicked = (id: number) => {
    history.push(`/search/${id}`);
  };

  const onOverlayClick = () => {
    history.goBack();
  };

  const allResults = [
    ...(movieData?.results || []),
    ...(tvData?.results || []),
  ];

  const clickedItem =
    bigSearchMatch?.params.id &&
    allResults.find((item) => item.id === +bigSearchMatch.params.id);

  return (
    <Wrapper>
      {movieLoading && tvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>Search Results for "{keyword}"</Title>

          <Section>
            <SectionTitle>Movies</SectionTitle>
            <Slider>
              {movieData?.results.slice(0, 6).map((movie) => (
                <Box
                  key={movie.id}
                  bgPhoto={makeImgPath(movie.backdrop_path || "", "w500")}
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
            <SectionTitle>TV Shows</SectionTitle>
            <Slider>
              {tvData?.results.slice(0, 6).map((tv) => (
                <Box
                  key={tv.id}
                  bgPhoto={makeImgPath(tv.backdrop_path || "", "w500")}
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
            {bigSearchMatch ? (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                <BigItem layoutId={bigSearchMatch.params.id} style={{ top: scrollY.get() + 100 }}>
                  {clickedItem && (
                    <>
                      <BigCover style={{ backgroundImage: `url(${makeImgPath(clickedItem.backdrop_path || "", "w500")})` }} />
                      <BigTitle>{"title" in clickedItem ? clickedItem.title : clickedItem.name}</BigTitle>
                      <BigOverview>{clickedItem.overview}</BigOverview>
                    </>
                  )}
                </BigItem>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
