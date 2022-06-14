import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import GoBackSvg from '../svgs/GoBackSvg';
import ClearCartSvg from '../svgs/ClearCartSvg';
import CartSvg from '../svgs/CartSvg';
import EmptyCart from '../components/EmptyCart';

const Cart = () => {
  const dispatch = useDispatch();
  const emptyCart = () => {
    dispatch(clearCart());
  };
  const { totalPrice, totalPizzas } = useSelector((state) => state.cart);
  const pizzas = useSelector((state) => state.cart.pizzas);
  if (!totalPizzas) {
    return <EmptyCart />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartSvg />
            Cart
          </h2>
          <div onClick={emptyCart} className="cart__clear">
            <ClearCartSvg />
            <span>Empty Cart</span>
          </div>
        </div>
        <div className="content__items">
          {pizzas.map((item) => (
            <CartItem key={item.id + item.type + item.size} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Total pizzas: <b>{totalPizzas} pcs.</b>{' '}
            </span>
            <span>
              {' '}
              Total price: <b>{totalPrice} $</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <GoBackSvg />
              <span> Go back</span>
            </Link>
            <div className="button pay-btn">
              <span>Pay now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
