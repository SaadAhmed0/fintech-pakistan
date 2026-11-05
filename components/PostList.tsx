import PostCard from "./PostCard";
import type { Post } from "@/lib/content";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className="block band paper" aria-label="All articles">
      <div className="wrap">
        <div className="posts">{posts.map((p) => <PostCard key={p.path} post={p} headingLevel={2} />)}</div>
      </div>
    </section>
  );
}
