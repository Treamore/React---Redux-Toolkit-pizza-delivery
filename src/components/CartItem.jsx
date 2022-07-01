import React from 'react';
import { useDispatch } from 'react-redux';
import { plusPizza, minusPizza, removePizza } from '../redux/slices/cartSlice';
import MinusSvg from '../svgs/MinusSvg';
import PlusSvg from '../svgs/PlusSvg';
import RemoveCartItemSvg from '../svgs/RemoveCartItemSvg';

const CartItem = ({ finder, title, price, count, imageUrl, type, size }) => {
  const dispatch = useDispatch();
  const plusOne = () => {
    dispatch(plusPizza({ finder }));
  };
  const minusOne = () => {
    dispatch(minusPizza({ finder }));
  };
  const removeItem = () => {
    dispatch(removePizza({ finder }));
  };
  return (
    <div className="cart__item">
      <div className="cart__item-media">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{title}</h3>
          <p>
            {type}, {size} sm.
          </p>
        </div>
      </div>
      <div className="cart__item-media">
        <div className="cart__item-count">
          <div
            onClick={minusOne}
            className="button button--outline button--circle cart__item-count-minus">
            <MinusSvg />
          </div>
          <b>{count}</b>
          <div
            onClick={plusOne}
            className="button button--outline button--circle cart__item-count-plus">
            <PlusSvg />
          </div>
        </div>
        <div className="cart__item-price">
          <b>{price * count} $</b>
        </div>
        <div className="cart__item-remove">
          <div onClick={removeItem} className="button button--outline button--circle">
            <RemoveCartItemSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
