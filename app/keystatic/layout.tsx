import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

// The admin. Only people with access to the GitHub repo can sign in.
export const metadata: Metadata = { title: { absolute: "Admin | Fintech Pakistan" }, robots: { index: false, follow: false } };

export default function KeystaticLayout() {
  return <KeystaticApp />;
}
