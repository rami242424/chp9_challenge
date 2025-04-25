const API_KEY = "ae39336185873212a3317f6c4e235bbf";
const BASE_PATH = "https://api.themoviedb.org/3";


interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview : string;
}
export interface IGetMoviesResult {
    dates: {
        maximum: string,
        minimum:string,
    };
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: [],
}

export function getMovies(){
    return (
        fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json()));
}


//이미지 주소
//https://image.tmdb.org/t/p/w500/

