// Matches the Announcement fields from the data model / Prisma schema
export type Announcement = {
  id: string;
  title: string;
  body: string;
  publishedDate: string;
  author: string;
  tags: { label: string; color: string }[];
  imageUrl?: string; // optional — only some announcements have an attached image
};

// Placeholder data — replace with a real fetch, e.g.:
// const announcements = await fetch("/api/content/announcement").then(r => r.json());
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "IUP Orientation 2026",
    body: "The Orientation on Saturday, 18 July 2026 at Building 17 Room 201 and start at 8.30 am. For Software & Knowledge Engineering Students, Please attend this orientation.",
    publishedDate: "17 July 2026",
    author: "Piya",
    tags: [
      { label: "Year 1", color: "bg-yellow-200 text-yellow-900" },
      { label: "Meeting", color: "bg-teal-200 text-teal-900" },
    ],
  },
];

// Truncates the body for the summary card — the abbreviated ("ฉบับย่อ") view
export function summarize(text: string, maxLength: number = 90): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
