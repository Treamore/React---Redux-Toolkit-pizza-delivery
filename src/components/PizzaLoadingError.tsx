import React from 'react';
import sad_picture from '../assets/img/sad-face.png';

const PizzaLoadingError: React.FC = () => {
  return (
    <div className="pizzasLoadingError">
      <img src={sad_picture}></img>
      <h2>Failed to load pizzas!</h2>
    </div>
  );
};

export default PizzaLoadingError;
