import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeImgPath } from "../api";
import styled from "styled-components";

const Wrapper = styled.div`
  background: black;
  min-height: 100vh;
  padding: 60px 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.div<{ bgPhoto: string }>`
  width: 300px;
  height: 450px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 60%;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
`;

interface IMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface Params {
  movieId: string;
}

function MovieDetail() {
  const { movieId } = useParams<Params>();
  const { data, isLoading } = useQuery<IMovieDetail>(["movie", movieId], () =>
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ae39336185873212a3317f6c4e235bbf`).then((r) => r.json())
  );

  return (
    <Wrapper>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <Poster bgPhoto={makeImgPath(data?.poster_path || "", "w500")} />
          <Title>{data?.title}</Title>
          <Overview>{data?.overview}</Overview>
        </>
      )}
    </Wrapper>
  );
}

export default MovieDetail;
