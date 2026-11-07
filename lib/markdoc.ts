// Renders article bodies. Bodies are Markdown with Markdoc tags for the rich
// blocks, which is exactly what the Keystatic editor reads and writes.
//
//   {% pull %}Plain part. _Highlighted part._{% /pull %}
//   {% timeline %}{% timeline-item when="March 2026" %}What happened.{% /timeline-item %}{% /timeline %}
//   {% status %}{% status-item name="Name" pill="Live" style="live" %}Detail.{% /status-item %}{% /status %}
//   {% chart name="chart-key" /%}
import Markdoc, { Tag, type Config, type Node, type RenderableTreeNode, type Schema } from "@markdoc/markdoc";

export type Heading = { id: string; text: string };

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&amp;|&/g, "and")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const textOf = (n: RenderableTreeNode): string =>
  typeof n === "string" ? n : Tag.isTag(n) ? n.children.map(textOf).join("") : "";

// Wrapper blocks hold paragraphs in the editor. On the page their text sits
// inline, so paragraph tags are dropped and their children kept.
function unwrapParagraphs(children: RenderableTreeNode[]): RenderableTreeNode[] {
  return children.flatMap((c) => (Tag.isTag(c) && c.name === "p" ? c.children : [c]));
}

const PILLS: Record<string, string> = { live: "pill live-pill", pilot: "pill pilot", plain: "pill" };

function config(file: string): Config {
  const tags: Record<string, Schema> = {
    pull: {
      transform(node, cfg) {
        return new Tag("p", { class: "pull" }, unwrapParagraphs(node.transformChildren(cfg)));
      },
    },
    timeline: {
      transform(node, cfg) {
        return new Tag("ul", { class: "timeline" }, node.transformChildren(cfg));
      },
    },
    "timeline-item": {
      attributes: { when: { type: String, required: true } },
      transform(node, cfg) {
        const { when } = node.transformAttributes(cfg);
        return new Tag("li", {}, [new Tag("span", { class: "when" }, [when]), new Tag("span", {}, unwrapParagraphs(node.transformChildren(cfg)))]);
      },
    },
    status: {
      transform(node, cfg) {
        return new Tag("ul", { class: "status" }, node.transformChildren(cfg));
      },
    },
    "status-item": {
      attributes: { name: { type: String, required: true }, pill: { type: String }, style: { type: String } },
      transform(node, cfg) {
        const { name, pill, style } = node.transformAttributes(cfg);
        const kids: RenderableTreeNode[] = [new Tag("b", {}, [name])];
        if (pill) kids.push(new Tag("span", { class: PILLS[style] ?? "pill" }, [pill]));
        kids.push(new Tag("p", {}, unwrapParagraphs(node.transformChildren(cfg))));
        return new Tag("li", {}, kids);
      },
    },
    chart: {
      selfClosing: true,
      attributes: { name: { type: String, required: true } },
      transform(node, cfg) {
        const { name } = node.transformAttributes(cfg);
        return new Tag("div", { "data-chart": name }, []);
      },
    },
  };

  const nodes: Record<string, Schema> = {
    document: {
      transform(node, cfg) {
        return node.transformChildren(cfg) as unknown as Tag;
      },
    },
    heading: {
      attributes: { level: { type: Number, required: true } },
      transform(node, cfg) {
        const children = node.transformChildren(cfg);
        // The page title is the only H1, so a stray "#" in a body becomes an H2.
        const level = Math.max(Number(node.attributes.level), 2);
        return new Tag(`h${level}`, { id: slugify(children.map(textOf).join("")) }, children);
      },
    },
    link: {
      attributes: { href: { type: String, required: true }, title: { type: String } },
      transform(node, cfg) {
        const { href, title } = node.transformAttributes(cfg);
        const external = /^https?:\/\//.test(href);
        return new Tag("a", { href, ...(title ? { title } : {}), ...(external ? { target: "_blank", rel: "noopener" } : {}) }, node.transformChildren(cfg));
      },
    },
    image: {
      attributes: { src: { type: String, required: true }, alt: { type: String }, title: { type: String } },
      transform(node, cfg) {
        const { src, alt, title } = node.transformAttributes(cfg);
        if (!alt || !String(alt).trim()) throw new Error(`${file}: image ${src} needs alt text`);
        const img = new Tag("img", { src, alt, loading: "lazy", decoding: "async" }, []);
        return title ? new Tag("figure", { class: "body-img" }, [img, new Tag("figcaption", {}, [title])]) : img;
      },
    },
  };

  return { tags, nodes };
}

export function renderBody(source: string, file: string): { html: string; headings: Heading[] } {
  const ast: Node = Markdoc.parse(source);
  const cfg = config(file);
  const errors = Markdoc.validate(ast, cfg).filter((e) => e.error.level === "error" || e.error.level === "critical");
  if (errors.length) throw new Error(`${file}: ${errors.map((e) => `line ${e.lines[0] + 1}: ${e.error.message}`).join("; ")}`);
  const tree = Markdoc.transform(ast, cfg);
  const html = Markdoc.renderers.html(tree);
  const headings: Heading[] = [];
  for (const m of html.matchAll(/<h2 id="([^"]*)">([\s\S]*?)<\/h2>/g)) headings.push({ id: m[1], text: m[2].replace(/<[^>]+>/g, "") });
  return { html, headings };
}
