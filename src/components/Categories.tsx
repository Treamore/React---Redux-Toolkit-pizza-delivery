import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const Categories: React.FC = () => {
  const arrOfCategories: string[] = ['All', 'Meat', 'Vegeterian', 'Season', 'Hot', 'Cheese'];
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filter.category);

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
