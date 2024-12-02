import React from 'react';
import { PaginationProps } from '@/app/models/transactionUtils';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, onNextPage, onPrevPage }) => {
    return (
        <div className="flex items-center justify-center mt-6 flex-wrap gap-2">
            <button
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="py-1 px-3 bg-blue-500 text-white text-sm rounded-md disabled:bg-gray-300"
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`py-1 px-3 text-sm rounded-md ${currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="py-1 px-3 bg-blue-500 text-white text-sm rounded-md disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;