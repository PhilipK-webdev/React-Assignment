import type { ProductType } from "../types/ProductType";

type PaginationProps = {
  products: ProductType[];
  itemsPerPage: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  currentPage: number;
  goToSpecificPage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  products,
  itemsPerPage,
  goToNextPage,
  goToPrevPage,
  currentPage,
  goToSpecificPage,
}) => {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  return (
    <div className="pagination-container">
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className="btn-prev"
      >
        {"<"} Prev Page
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          onClick={() => goToSpecificPage(i + 1)}
          className="page"
          style={{
            backgroundColor: currentPage === i + 1 ? "green" : "",
            color: currentPage === i + 1 ? "white" : "",
          }}
        >
          {i + 1}
        </span>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="btn-next"
      >
        Next Page {">"}
      </button>
    </div>
  );
};
