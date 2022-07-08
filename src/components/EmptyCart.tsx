import React from 'react';
import { Link } from 'react-router-dom';
import emptyCart from '../assets/img/shopping-cart.png';

const EmptyCart: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Your cart is empty</h2>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default EmptyCart;
