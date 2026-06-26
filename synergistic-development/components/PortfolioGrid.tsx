"use client";

import { useState, useMemo } from "react";
import {
  PORTFOLIO,
  type NeighborhoodId,
  type PortfolioProject,
  type ProjectSize,
} from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import NeighborhoodFilterBar from "./NeighborhoodFilterBar";

/* ------------------------------------------------------------------
   Compute filtered projects in correct order
   ------------------------------------------------------------------ */
function projectsForFilter(id: NeighborhoodId): PortfolioProject[] {
  if (id === "all") {
    const order = PORTFOLIO.defaultOrder;
    const byId = new Map(PORTFOLIO.projects.map((p) => [p.id, p] as const));
    const result = order
      .map((id) => byId.get(id))
      .filter(Boolean);
    return result as unknown as PortfolioProject[];
  }
  const result = PORTFOLIO.projects.filter((p) => p.neighborhood === id);
  return result as unknown as PortfolioProject[];
}

/* ------------------------------------------------------------------
   Grid layout per project (12-col on desktop ALL view).
   Tailwind must see these class strings statically, so we map them.
   ------------------------------------------------------------------ */
type Layout = {
  /** lg col-span class — used both in the 12-col "all" grid AND in the 2-col filtered grid */
  colSpanLg: string;
  size: ProjectSize;
};

const ALL_LAYOUT: Record<string, Layout> = {
  "cherry-creek-custom-home": { colSpanLg: "lg:col-span-12", size: "feature" },
  "cherry-creek-334-steele":   { colSpanLg: "lg:col-span-7",  size: "large" },
  "cherry-hills-custom-home":  { colSpanLg: "lg:col-span-5",  size: "standard" },
  "wash-park-918-emerson":     { colSpanLg: "lg:col-span-7",  size: "large" },
  "wash-park-925-emerson":     { colSpanLg: "lg:col-span-5",  size: "standard" },
  "highlands-mariposa":        { colSpanLg: "lg:col-span-7",  size: "large" },
  "wash-park-578-washington":  { colSpanLg: "lg:col-span-5",  size: "standard" },
  "highlands-alcott":          { colSpanLg: "lg:col-span-6",  size: "standard" },
  "lakewood-cc-interior":      { colSpanLg: "lg:col-span-6",  size: "large" },
  "wash-park-982-south-penn":  { colSpanLg: "lg:col-span-5",  size: "standard" },
  "bow-mar-custom":            { colSpanLg: "lg:col-span-7",  size: "large" },
  "highlands-sunnyside":       { colSpanLg: "lg:col-span-12", size: "standard" },
};

const DEFAULT_FILTERED_LAYOUT: Layout = {
  colSpanLg: "lg:col-span-6",
  size: "standard",
};

export default function PortfolioGrid() {
  const [active, setActive] = useState<NeighborhoodId>("all");

  const visible = useMemo(() => projectsForFilter(active), [active]);
  const isAll = active === "all";

  return (
    <>
      <NeighborhoodFilterBar active={active} onChange={setActive} />

      <div className="mt-10 lg:mt-14">
        {visible.length === 0 ? (
          <p
            className="text-center italic"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--color-slate)",
              padding: "60px 0",
            }}
          >
            No projects in this neighborhood yet.
          </p>
        ) : (
          <div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 portfolio-fade-in"
          >
            {visible.map((project, i) => {
              const layout = isAll
                ? ALL_LAYOUT[project.id] ?? DEFAULT_FILTERED_LAYOUT
                : DEFAULT_FILTERED_LAYOUT;
              const isPriority = i < 3;

              return (
                <div key={project.id} className={layout.colSpanLg}>
                  <ProjectCard
                    project={project}
                    size={layout.size}
                    priority={isPriority}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
