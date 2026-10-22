import Link from "next/link";
import PostCard from "./PostCard";
import { getTags, slugify, type Post } from "@/lib/posts";

// Topic filters are real links to crawlable topic pages, not client-side state.
export default function InsightsList({ posts, current }: { posts: Post[]; current?: string }) {
  const tags = getTags();
  const featured = !current ? posts.find((p) => p.featured) ?? posts[0] : undefined;
  const rest = featured ? [featured, ...posts.filter((p) => p !== featured)] : posts;
  return (
    <section className="block band paper" aria-label="All articles">
      <div className="wrap">
        <nav aria-label="Filter by topic">
          <div className="filters">
            <Link className="filter" href="/insights" aria-current={!current ? "page" : undefined}>All</Link>
            {tags.map((t) => (
              <Link key={t} className="filter" href={`/insights/topic/${slugify(t)}`} aria-current={current === slugify(t) ? "page" : undefined}>{t}</Link>
            ))}
          </div>
        </nav>
        <div className="posts">
          {rest.map((p) => <PostCard key={p.slug} post={p} featured={p === featured} headingLevel={2} />)}
        </div>
      </div>
    </section>
  );
}
