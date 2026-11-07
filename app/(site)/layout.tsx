import SiteFrame from "@/components/SiteFrame";
import "../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
