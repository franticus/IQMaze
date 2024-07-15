import React from 'react';
import s from './Pagination.module.scss';
import cn from 'classnames';

const Pagination = ({ currentStep, totalSteps, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 10;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(currentStep - halfPagesToShow, 0);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalSteps - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(endPage - maxPagesToShow + 1, 0);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={s.pagination}>
      <button
        className={cn(s.page_button, { [s.disabled]: currentStep === 0 })}
        onClick={() => onPageChange(currentStep - 1)}
        disabled={currentStep === 0}
      >
        Prev
      </button>
      {startPage > 0 && (
        <>
          <button className={s.page_button} onClick={() => onPageChange(0)}>
            1
          </button>
          {startPage > 1 && <span className={s.ellipsis}>...</span>}
        </>
      )}
      {pages.map(page => (
        <button
          key={page}
          className={cn(s.page_button, { [s.active]: page === currentStep })}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      {endPage < totalSteps - 1 && (
        <>
          {endPage < totalSteps - 2 && <span className={s.ellipsis}>...</span>}
          <button
            className={s.page_button}
            onClick={() => onPageChange(totalSteps - 1)}
          >
            {totalSteps}
          </button>
        </>
      )}
      <button
        className={cn(s.page_button, {
          [s.disabled]: currentStep === totalSteps - 1,
        })}
        onClick={() => onPageChange(currentStep + 1)}
        disabled={currentStep === totalSteps - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
