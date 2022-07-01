import React from 'react';
import sad_picture from '../images/sad-face.png';
import styles from '../components/NotFoundBlock/NotFoundBlock.module.scss';

const NotFound = () => {
  return (
    <div className={styles.main}>
      <img src={sad_picture}></img>
      <h1> We found nothing :(</h1>
      <p>Page does not exist</p>
    </div>
  );
};

export default NotFound;
