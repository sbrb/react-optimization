// src/pages/Home.js
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Home Page</h1>
      <p className={styles.paragraph}>This is the content of the home page.</p>
    </div>
  );
};

export default Home;
