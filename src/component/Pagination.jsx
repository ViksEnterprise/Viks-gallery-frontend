import React, { useMemo } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export const Pagination = ({ meta, onPageChange }) => {
  const visiblePages = useMemo(() => {
    const current = meta?.current_page;
    const last = meta?.total_pages;
    const delta = 2;
    const range = [];

    if (last <= 1) return [1];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(last - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) range.unshift("...");
    if (current + delta < last - 1) range.push("...");

    range.unshift(1);
    if (last !== 1) range.push(last);

    return range;
  }, [meta]);

  return (
    <div className="flex md:flex-row flex-col lg:items-center items-start justify-between mt-4 gap-3">
      <p className="text-sm text-gray-700">
        Showing page {meta?.current_page} of {meta?.total_pages}
      </p>

      <div className="flex gap-2 items-center md:w-fit w-full justify-end">
        <button
          onClick={() => onPageChange(meta?.current_page - 1)}
          disabled={!meta?.previous}
          className="flex items-center gap-1 text-sm disabled:opacity-50"
        >
          <BiChevronLeft size={17} />
          Previous
        </button>

        {visiblePages.map((page, index) => (
          <button
            key={`${page}-${index}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={[
              "px-3 py-1 rounded-lg",
              meta?.current_page === page
                ? "text-white bg-blue-700"
                : "hover:bg-blue-100",
              page === "..." && "cursor-default",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(meta?.current_page + 1)}
          disabled={!meta?.next}
          className="flex items-center gap-1 text-sm disabled:opacity-50"
        >
          Next
          <BiChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};
