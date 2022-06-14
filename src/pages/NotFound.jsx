import React from 'react';
import sad_picture from '../images/sad-face.png';
import styles from '../components/NotFoundBlock/NotFoundBlock.module.scss';

const NotFound = () => {
  return (
    <div className={styles.main}>
      <img src={sad_picture}></img>
      <h1> Ничего не найдено :(</h1>
      <p>Данная страница не существует</p>
    </div>
  );
};

export default NotFound;
