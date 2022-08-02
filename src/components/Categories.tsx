import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const arrOfCategories: string[] = ['All', 'Meat', 'Vegeterian', 'Season', 'Hot', 'Cheese'];

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filter.category);
  const changeCategory = React.useCallback((i: number) => {
    dispatch(setCategory(i));
  }, []);

  return (
    <div className="categories">
      <ul>
        {arrOfCategories.map((name, arrayIndex) => {
          return (
            <li
              key={arrayIndex}
              onClick={() => changeCategory(arrayIndex)}
              className={category === arrayIndex ? 'active' : ''}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
