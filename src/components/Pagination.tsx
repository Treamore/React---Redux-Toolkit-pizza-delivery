import React from 'react';

type PaginationProps = {
  page: number;
  setPage: (elem: number) => void;
  pizzasLength: number;
};

const Pagination: React.FC<PaginationProps> = React.memo(({ page, setPage, pizzasLength }) => {
  const pagesArray: number[] = [1, 2, 3];
  return (
    <div className={pizzasLength < 12 && page < 3 ? 'pagination__none' : 'pagination'}>
      {pagesArray.map((elem, id) => (
        <div
          key={id}
          onClick={() => setPage(elem)}
          className={
            page === elem ? 'pagination__button pagination__button-active' : 'pagination__button '
          }>
          {elem}
        </div>
      ))}
    </div>
  );
});

export default Pagination;
