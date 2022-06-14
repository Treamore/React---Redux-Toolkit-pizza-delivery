import React from 'react';

function Pagination({ pagesArray, page, setPage, filteredPizzas }) {
  return (
    <div className={filteredPizzas.length < 12 && page < 3 ? 'pagination__none' : 'pagination'}>
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
}

export default Pagination;
