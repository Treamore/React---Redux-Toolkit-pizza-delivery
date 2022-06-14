import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

const Categories = () => {
  const arrOfCategories = ['All', 'Meat', 'Vegeterian', 'Season', 'Hot', 'Cheese'];
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filter.category);

  return (
    <div className="categories">
      <ul>
        {arrOfCategories.map((name, arrayIndex) => {
          return (
            <li
              key={arrayIndex}
              onClick={() => {
                dispatch(setCategory(arrayIndex));
              }}
              className={category === arrayIndex ? 'active' : ''}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
