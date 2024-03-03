export default function PageNumbers({currentPage, totalCount, pageSize, onPageChange}) {
  const numPages = Math.ceil(totalCount / pageSize);

  const pageNumbers = () => {
    // If there's only one page, return just that page
    if (numPages === 1) {
      return [1];
    }

    const pages = [];
    const pageRangeDisplayed = 2; // Number of pages to display around the current page

    // Always add the first page
    pages.push(1);

    let rangeStart = Math.max(2, currentPage - pageRangeDisplayed);
    let rangeEnd = Math.min(numPages - 1, currentPage + pageRangeDisplayed);

    // Adjust the range if near the start or end
    if (currentPage < 4) {
      rangeEnd = Math.min(1 + pageRangeDisplayed * 2, numPages - 1);
    }
    if (currentPage > numPages - 4) {
      rangeStart = Math.max(numPages - pageRangeDisplayed * 2, 2);
    }

    // Add ellipsis if necessary
    if (rangeStart > 2) {
      pages.push('...');
    }

    // Add range of pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis if necessary
    if (rangeEnd < numPages - 1) {
      pages.push('...');
    }

    // Always add the last page if it's not the first one
    if (numPages !== 1) {
      pages.push(numPages);
    }

    return pages;
  };

  return pageNumbers().map((page, index) => (
    page === '...' ?
      <span key={index} className="px-2">...</span> :
      <button
        key={index}
        className={`px-2 ${page === currentPage + 1 ? 'font-bold' : ''}`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === currentPage + 1}
      >
        {page}
      </button>
  ));
}
