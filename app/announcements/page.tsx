"use client";

import Link from "next/link";
import FilterableLayout from "../components/FilterableLayout";
import { ANNOUNCEMENTS, summarize } from "../../lib/announcements";

export default function AnnouncementsPage(): JSX.Element {
  const handleApplyFilter = (selectedTags: string[]): void => {
    // TODO: call the Search Controller (SRS-10, SRS-14), e.g.
    // fetch(`/api/content/announcement?tags=${selectedTags.join(",")}`)
    console.log("Applying filter:", selectedTags);
  };

  return (
    <FilterableLayout onApplyFilter={handleApplyFilter}>
      <h1 className="text-2xl font-bold mb-4">Latest News</h1>

      {ANNOUNCEMENTS.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-300 p-8 text-center text-stone-500 text-sm">
          No announcements match your filters right now.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ANNOUNCEMENTS.map((a) => (
            <li key={a.id}>
              <Link
                href={`/announcements/${a.id}`}
                className="block h-full text-left rounded-lg border border-stone-200 bg-white p-4 hover:border-stone-300 transition-colors flex flex-col"
              >
                <h2 className="font-semibold text-base leading-snug">{a.title}</h2>
                <span className="text-xs text-stone-400 mt-1">
                  Posted on {a.publishedDate} by {a.author}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {a.tags.map((tag) => (
                    <span key={tag.label} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tag.color}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">{summarize(a.body)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </FilterableLayout>
  );
}
