import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmM2UxN2Y4ZDg0ZDVkMGVmMmMxYWI4MmJlYWFjNTlmZCIsIm5iZiI6MTcyODc2NTIwOS41NDQ2ODcsInN1YiI6IjY3MGFkYjdjYmJiMWE5ZTgxYzYxYjBhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WeLcKplkll38HiTJUD0bzG-lGkoAgRBkyXo4Ky4Kv18';

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};
