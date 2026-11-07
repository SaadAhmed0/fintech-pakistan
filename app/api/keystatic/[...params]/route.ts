import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// GitHub sign-in needs three secrets from the Keystatic GitHub App (see
// README, "The admin"). Until they are set, the site still builds and the
// admin explains what is missing instead of crashing the deploy.
const ready =
  config.storage.kind === "local" ||
  // Development runs the one-time GitHub App setup, which works before the secrets exist.
  process.env.NODE_ENV === "development" ||
  Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET);

const handler = ready ? makeRouteHandler({ config }) : null;

const notSetUp = () =>
  new Response(
    "The admin is not connected to GitHub yet. Open /keystatic/setup in a local dev server, or set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET in Vercel.",
    { status: 503 },
  );

export const GET = (req: Request) => (handler ? handler.GET(req) : notSetUp());
export const POST = (req: Request) => (handler ? handler.POST(req) : notSetUp());
