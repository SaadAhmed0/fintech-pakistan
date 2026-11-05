import Link from "next/link";
import PostCard from "./PostCard";
import { getTopics, type Post } from "@/lib/content";

// Topic links are real, crawlable pages, not client-side filters.
export default function PostList({ posts, feature = true }: { posts: Post[]; feature?: boolean }) {
  const featured = feature ? posts[0] : undefined;
  return (
    <section className="block band paper" aria-label="All articles">
      <div className="wrap">
        <nav aria-label="Browse by topic">
          <div className="filters">
            {getTopics().map((t) => <Link key={t.slug} className="filter" href={`/topics/${t.slug}`}>{t.name}</Link>)}
          </div>
        </nav>
        <div className="posts">
          {posts.map((p) => <PostCard key={p.path} post={p} featured={p === featured} headingLevel={2} />)}
        </div>
      </div>
    </section>
  );
}
