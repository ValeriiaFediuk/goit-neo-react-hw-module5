import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className={styles.link}>
      Go to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
