"use client";

import { NEIGHBORHOOD_FILTERS, type NeighborhoodId } from "@/lib/constants";

type NeighborhoodFilterBarProps = {
  active: NeighborhoodId;
  onChange: (id: NeighborhoodId) => void;
};

/**
 * Sticky horizontal filter bar for the portfolio page.
 * Pure CSS hover; only the active state needs JS.
 */
export default function NeighborhoodFilterBar({
  active,
  onChange,
}: NeighborhoodFilterBarProps) {
  return (
    <div
      className="sticky z-40 bg-white border-b border-[#e0d8cc]"
      style={{ top: 72 }}
      role="tablist"
      aria-label="Filter projects by neighborhood"
    >
      <div
        className="overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex items-center justify-center min-w-max">
          {NEIGHBORHOOD_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-pressed={active === filter.id}
              className="filter-tab"
              onClick={() => onChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
