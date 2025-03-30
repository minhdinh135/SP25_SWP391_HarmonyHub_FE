import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useState } from "react";

const ItemList = ({
  data,
  itemsPerPage = 4,
  initialPage = 1,
  renderItem,
  emptyMessage = "No items found.",
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
    calculateTotalPages();
  }, [data, itemsPerPage]);

  // Calculate total pages based on data length and items per page
  const calculateTotalPages = () => {
    const pages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(pages || 1); // Ensure at least 1 page even with empty data
  };

  // Get current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate array of page numbers to display
  const generatePageNumbers = () => {
    const delta = 1; // Number of pages to show before and after current page
    const range = [];

    // Always include first page
    range.push(1);

    // Calculate start and end based on current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      range.push("start-ellipsis");
    }

    // Add all pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      range.push("end-ellipsis");
    }

    // Always include last page if it's not the first page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <>
      {data.length > 0 ? (
        <div className={className}>
          {getCurrentPageData().map((item, index) => renderItem(item, index))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">{emptyMessage}</div>
      )}

      {totalPages > 1 && (
        <Pagination className="my-4">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}

            {generatePageNumbers().map((page, index) => {
              if (page === "start-ellipsis" || page === "end-ellipsis") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default ItemList;
