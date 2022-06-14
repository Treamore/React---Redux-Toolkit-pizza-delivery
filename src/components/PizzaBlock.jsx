import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPizza } from '../redux/slices/cartSlice';

const PizzaBlock = ({ id, title, price, imageUrl, sizes, types, description }) => {
  const dispatch = useDispatch();
  const pizzaTypes = ['Thin', 'Traditional'];
  const [pizzaSize, setPizzaSize] = useState(0);
  const [pizzaType, setPizzaType] = useState(0);
  const [priceChanger, setPriceChanger] = useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price: price[priceChanger],
      imageUrl,
      type: pizzaTypes[pizzaType],
      size: sizes[pizzaSize],
      finder: id + pizzaTypes[pizzaType] + sizes[pizzaSize],
    };
    dispatch(addPizza(item));
  };

  return (
    <div className="pizza-block__center">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__description">{description}</div>
        <div className="pizza-block__selector">
          <ul>
            {types.map((elem, typeIndex) => {
              return (
                <li
                  key={typeIndex}
                  onClick={() => setPizzaType(typeIndex)}
                  className={pizzaType === typeIndex ? 'active' : ''}>
                  {pizzaTypes[elem]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((element, sizeIndex) => {
              return (
                <li
                  key={sizeIndex}
                  onClick={() => {
                    setPizzaSize(sizeIndex);
                    setPriceChanger(sizeIndex);
                  }}
                  className={pizzaSize === sizeIndex ? 'active' : ''}>
                  {element} sm.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price[priceChanger]} $</div>
          <div className="button button--outline button--add" onClick={onClickAdd}>
            <span>Add to cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
