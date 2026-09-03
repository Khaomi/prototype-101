"use client";
 
import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import FilterableLayout from "../../components/FilterableLayout";
import { ANNOUNCEMENTS } from "../../../lib/announcements";
 
type Props = {
  // In current Next.js, params is a Promise, not a plain object —
  // must be unwrapped with use() before reading .id
  params: Promise<{ id: string }>;
};
 
export default function AnnouncementDetailPage({ params }: Props): JSX.Element {
  const { id } = use(params);
  const router = useRouter();
  const announcement = ANNOUNCEMENTS.find((a) => a.id === id);
 
  const handleApplyFilter = (selectedTags: string[]): void => {
    console.log("Applying filter:", selectedTags);
  };
 
  if (!announcement) {
    return (
      <FilterableLayout onApplyFilter={handleApplyFilter}>
        <p className="text-sm text-stone-500">Announcement not found.</p>
      </FilterableLayout>
    );
  }
 
  return (
    <FilterableLayout onApplyFilter={handleApplyFilter}>
      <article>
        {/* router.back() uses real browser history — if you arrived from Main,
            this returns to Main; if you arrived from the /announcements list,
            this returns to the list. No guessing needed. */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium text-stone-900">{announcement.title}</span>
        </button>
 
        <div className="flex flex-wrap gap-1.5 mb-2">
          {announcement.tags.map((tag) => (
            <span key={tag.label} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tag.color}`}>
              {tag.label}
            </span>
          ))}
        </div>
 
        <p className="text-xs text-stone-400 mb-4">
          Posted on {announcement.publishedDate} by {announcement.author}
        </p>
 
        <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line mb-4">{announcement.body}</p>
 
        {announcement.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={announcement.imageUrl}
            alt=""
            className="w-full rounded-lg border border-stone-200"
          />
        )}
      </article>
    </FilterableLayout>
  );
}