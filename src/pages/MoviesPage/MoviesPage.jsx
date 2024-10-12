import React, { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { searchMovies } from '../../services/tmdbApi';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('query') || '';
    if (searchQuery) {
      setQuery(searchQuery);
      fetchSearchedMovies(searchQuery);
    }
  }, [searchParams]);

  const fetchSearchedMovies = async (searchQuery) => {
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
      setError('Failed to find movies for your query');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query: query.trim() });
  };

  return (
    <div className={styles.movies}>
      <h1>Search</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Write the name of movie"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
