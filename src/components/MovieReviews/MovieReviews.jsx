import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';
import { fetchMovieReviews } from '../../services/tmdbApi';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to fetch reviews.');
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      <h2>Reviews</h2>
      {error && <p className={styles.error}>{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews available for this movie.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={styles.review}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
