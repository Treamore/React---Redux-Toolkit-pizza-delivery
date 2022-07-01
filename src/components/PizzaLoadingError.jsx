import React from 'react';
import sad_picture from '../images/sad-face.png';

const PizzaLoadingError = () => {
  return (
    <div className="pizzasLoadingError">
      <img src={sad_picture}></img>
      <h2>Failed to load pizzas!</h2>
    </div>
  );
};

export default PizzaLoadingError;
