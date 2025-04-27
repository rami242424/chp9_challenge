// src/api.ts

const API_KEY = "ae39336185873212a3317f6c4e235bbf"; // 사용자님의 기존 API KEY 사용
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

interface ITV {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

// 🔹 영화 관련 API
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((r) => r.json());
}

export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then((r) => r.json());
}

export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((r) => r.json());
}

export function getLatestMovie() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then((r) => r.json());
}

// 🔹 TV 관련 API
export function getLatestTv() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((r) => r.json());
}

export function getAiringTodayTv() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((r) => r.json());
}

export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((r) => r.json());
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((r) => r.json());
}

// 🔹 검색 관련 API
export function searchMovies(keyword: string) {
  return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`).then((r) => r.json());
}

export function searchTv(keyword: string) {
  return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`).then((r) => r.json());
}

// 🔹 이미지 URL 만들기
export function makeImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
