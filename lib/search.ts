// Shared by the search popup and the /search page. Runs in the browser.
export type SearchItem = { title: string; path: string; type: string; text: string; body: string };

export function searchItems(items: SearchItem[], query: string, limit = 30) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const summary = item.text.toLowerCase();
      const body = item.body.toLowerCase();
      if (!terms.every((t) => title.includes(t) || summary.includes(t) || body.includes(t))) return { item, score: 0 };
      const score = terms.reduce((n, t) => n + (title.includes(t) ? 10 : 0) + (summary.includes(t) ? 3 : 0) + (body.includes(t) ? 1 : 0), 0);
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item);
}
