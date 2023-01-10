import { DOTS, usePagination } from './usePaginate';
import clsx from 'clsx';

interface Props {
  totalCount: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export const CustomPagination = ({ currentPage, totalCount, siblingCount = 1, pageSize = 10, onPageChange }: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return (
    <div className="text-center">
      <div className="lt-pagination">
        <ul className="pagination ">
          <li>
            <button
              type={'button'}
              className="btn btn-outline page-numbers"
              onClick={onPrevious}
              disabled={currentPage === 1}
            >
              <i className="fa fa-chevron-left" />
            </button>
          </li>
          {paginationRange &&
            paginationRange.map((pageNumber, index) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return (
                  <button type={'button'} key={`dot.${index}`} className={clsx('pagination-item', 'dots')}>
                    &#8230;
                  </button>
                );
              }

              // Render our Page Pills
              return (
                <li key={`page.${index}`}>
                  <span
                    style={{ cursor: 'pointer' }}
                    role={'button'}
                    tabIndex={0}
                    onKeyDown={() => null}
                    className={clsx('pagination-item', {
                      current: pageNumber === currentPage,
                    })}
                    onClick={() => onPageChange(+pageNumber)}
                  >
                    {pageNumber}
                  </span>
                </li>
              );
            })}
          <li>
            <button
              type={'button'}
              className="btn btn-outline page-numbers"
              onClick={onNext}
              disabled={currentPage === lastPage}
            >
              <i className="fa fa-chevron-right" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
