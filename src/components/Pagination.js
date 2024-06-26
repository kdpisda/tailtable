import React from 'react';
import {ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/24/outline';
import PageNumbers from '@/components/PageNumbers';
import PropTypes from 'prop-types';

/**
 * Pagination component for navigating through pages.
 *
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The current page.
 * @param {number} props.totalCount - The total number of items.
 * @param {number} props.pageSize - The number of items per page.
 * @param {Function} props.onPageChange - Function to call when the page changes.
 * @param {Array} props.pageSizes - Array of page sizes to choose from.
 * @param {Function} props.setPageSize - Function to call when the page size changes.
 * @param {Function} props.handleNextButtonClick - Function to call when the next button is clicked.
 * @param {Function} props.handlePreviousButtonClick - Function to call when the previous button is clicked.
 * @return {Object} The Pagination component.
 */
export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  pageSizes,
  setPageSize,
  handleNextButtonClick,
  handlePreviousButtonClick,
}) {
  const numPages = Math.ceil(totalCount / pageSize);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 pb-4">
      <div className="-mt-px flex w-0 flex-1 pl-4">
        <button
          disabled={currentPage <= 1}
          onClick={handlePreviousButtonClick}
          className={`
            inline - flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm 
            font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700
          `}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
          Previous
        </button>
      </div>
      <div className="pr-4 pt-2">
        <select
          className={`
            mt - 2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 
            ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 
            sm:text-sm sm:leading-6
          `}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {pageSizes.map((size, index) => (
            <option key={index} value={size}>
              {size} Results Per Page
            </option>
          ))}
        </select>
      </div>
      <div className="pr-4 pt-2">
        <PageNumbers
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end pr-4">
        <button
          disabled={currentPage >= numPages - 1}
          onClick={handleNextButtonClick}
          className={`
            inline - flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm 
            font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700
          `}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
        </button>
      </div>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  setPageSize: PropTypes.func.isRequired,
  handleNextButtonClick: PropTypes.func.isRequired,
  handlePreviousButtonClick: PropTypes.func.isRequired,
};
