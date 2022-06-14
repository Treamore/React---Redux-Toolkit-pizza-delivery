import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortID } from '../redux/slices/filterSlice';
import SortSvg from '../svgs/SortSvg';

const Sort = () => {
  const sortArr = ['popularity', 'price (high to low)', 'price (low to high)', 'alphabet'];

  const dispatch = useDispatch();
  const sortID = useSelector((state) => state.filter.sortID);
  const [sortVisibility, setSortVisibility] = React.useState(false);
  const sortRef = React.useRef();

  React.useEffect(() => {
    const nonSortClick = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setSortVisibility(false);
      }
    };
    document.body.addEventListener('click', nonSortClick);
    return () => document.body.removeEventListener('click', nonSortClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SortSvg />
        <b>Sort by:</b>
        <span onClick={() => setSortVisibility(!sortVisibility)}>{sortArr[sortID]}</span>
      </div>
      {sortVisibility && (
        <div className="sort__popup">
          <ul>
            {sortArr.map((type, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(setSortID(index));
                  setSortVisibility(false);
                }}
                className={sortID === index ? 'active' : ''}>
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
