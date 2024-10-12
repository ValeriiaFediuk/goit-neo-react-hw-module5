import React, { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import { fetchTrendingMovies } from '../../services/tmdbApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setMovies(trending);
      } catch (err) {
        setError('Не вдалося завантажити популярні фільми.');
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>
      {error && <p className={styles.error}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
