import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { fetchMovieDetails } from '../../services/tmdbApi';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        setError('Failed to fetch movie details');
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/movies');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={styles.details}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Go back
      </button>
      <div className={styles.movie}>
        <img src={imageUrl} alt={movie.title} className={styles.poster} />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>Rating: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Summary</h2>
          <p>{movie.overview}</p>
          <h3>Genre</h3>
          <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.additional}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" className={styles.link}>
            Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={styles.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
