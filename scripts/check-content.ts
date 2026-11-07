// Reads every entry through Keystatic's own reader, which applies the same
// field validation as the admin. Run with: npm run check:content
import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

const reader = createReader(process.cwd(), config);

async function main() {
  const problems: string[] = [];
  let count = 0;
  for (const [name, collection] of Object.entries(reader.collections)) {
    const slugs = await collection.list();
    for (const slug of slugs) {
      try {
        const entry = await collection.read(slug, { resolveLinkedFiles: true });
        if (!entry) problems.push(`${name}/${slug}: could not be read`);
        count++;
      } catch (e) {
        problems.push(`${name}/${slug}: ${(e as Error).message}`);
      }
    }
  }
  for (const [name, singleton] of Object.entries(reader.singletons)) {
    try {
      const entry = await singleton.read({ resolveLinkedFiles: true });
      if (!entry) problems.push(`singleton ${name}: file missing`);
      count++;
    } catch (e) {
      problems.push(`singleton ${name}: ${(e as Error).message}`);
    }
  }
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log(`All ${count} entries match the admin schema.`);
}

main();
