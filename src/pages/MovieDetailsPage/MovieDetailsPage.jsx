import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const prevLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError('Failed to load movie details.');
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(prevLocationRef.current);
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p className={styles.loading}>Loading...</p>;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className={styles.movieDetails}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        &#8592; Go Back
      </button>
      <div className={styles.detailsContainer}>
        <img src={imageUrl} alt={movie.title} className={styles.poster} />
        <div className={styles.movieInfo}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.userScore}>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3 className={styles.sectionTitle}>Overview</h3>
          <p className={styles.overview}>{movie.overview}</p>
          <h3 className={styles.sectionTitle}>Genres</h3>
          <p className={styles.genres}>{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3 className={styles.sectionTitle}>Additional Information</h3>
        <ul className={styles.infoList}>
          <li>
            <Link to="cast" className={styles.link} state={{ from: prevLocationRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" className={styles.link} state={{ from: prevLocationRef.current }}>
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
