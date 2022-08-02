import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortID } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';
import SortSvg from '../assets/img/SortSvg';

const Sort: React.FC = React.memo(() => {
  const sortArr: string[] = [
    'popularity',
    'price (high to low)',
    'price (low to high)',
    'alphabet',
  ];

  const dispatch = useDispatch();
  const sortID = useSelector((state: RootState) => state.filter.sortID);
  const [sortVisibility, setSortVisibility] = React.useState<boolean>(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const nonSortClick = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setSortVisibility(false);
      }
    };
    document.body.addEventListener('click', nonSortClick);
    return () => document.body.removeEventListener('click', nonSortClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setSortVisibility(!sortVisibility)} className="sort__label">
        <SortSvg />
        <b>Sort by:</b>
        <span>{sortArr[sortID]}</span>
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
});

export default Sort;
