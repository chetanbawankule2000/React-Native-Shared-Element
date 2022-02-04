import axios from "axios";

const TRENDING_MOVIES = "https://api.themoviedb.org/3/trending/movie/week";
const MOVIE_BY_ID = "https://api.themoviedb.org/3/movie";
const MOVIE_DB_API = "";

export const trending = async () => {
  try {
    let response = await axios.get(TRENDING_MOVIES, {
      params: {
        api_key: MOVIE_DB_API,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const movie_detail_by_id = async (movie_id) => {
  try {
    let response = await axios.get(`${MOVIE_BY_ID}/${movie_id}`, {
      params: {
        api_key: MOVIE_DB_API,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {}
};

export const movie_cast = async (movie_id) => {
  try {
    let response = await axios.get(`${MOVIE_BY_ID}/${movie_id}/credits`, {
      params: {
        api_key: MOVIE_DB_API,
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {}
};
