import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post, featured = false, headingLevel = 3 }: { post: Post; featured?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link className={featured ? "card card-dark post featured" : "card card-light post"} href={`/insights/${post.slug}`}>
      {featured && <span className="big-block" aria-hidden="true"></span>}
      <span className="label">{post.tag}</span>
      <H>{post.title}</H>
      <p>{post.description}</p>
      <span className="meta">
        <time dateTime={post.date}>{formatDate(post.date).toUpperCase()}</time> · {post.readingTime} MIN READ
      </span>
    </Link>
  );
}
