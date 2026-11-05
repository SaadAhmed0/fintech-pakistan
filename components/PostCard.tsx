import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export default function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link className="card post" href={post.path}>
      <span className="label">{post.tags[0]}{post.label && ` · ${post.label}`}</span>
      <H>{post.title}</H>
      <p>{post.description}</p>
      <span className="meta">
        <time dateTime={post.date}>{formatDate(post.updated || post.date)}</time>{post.readingTime >= 3 && ` · ${post.readingTime} min read`}
      </span>
    </Link>
  );
}
