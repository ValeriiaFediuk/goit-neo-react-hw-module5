import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { fetchMovieCredits } from '../../services/tmdbApi';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (err) {
        setError('Failed to fetch cast details');
      }
    };

    getMovieCast();
  }, [movieId]);

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      {error && <p className={styles.error}>{error}</p>}
      {cast.length === 0 ? (
        <p>No information about cast.</p>
      ) : (
        <ul>
          {cast.map((member) => (
            <li key={member.cast_id || member.credit_id} className={styles.member}>
              <p>
                <strong>{member.name}</strong> as {member.character}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
