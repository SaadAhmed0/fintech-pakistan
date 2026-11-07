import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DataStrip from "./DataStrip";
import Closing from "./Closing";
import JoinDialog from "./JoinDialog";
import SearchDialog from "./SearchDialog";
import JsonLd from "./JsonLd";
import { MarkDefs } from "./Mark";
import { organizationLd, websiteLd } from "@/lib/seo";
import { getNav, site } from "@/lib/site";
import { navigation, settings } from "@/lib/cms";

// Everything around a public page: top bar, menu, footer and the dialogs.
// The admin at /keystatic has its own layout and never renders this.
export default function SiteFrame({ children }: { children: ReactNode }) {
  const s = settings();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <MarkDefs />
      <JsonLd data={[organizationLd(), websiteLd()]} />
      <DataStrip />
      <Header nav={getNav()} joinLabel={navigation().joinButtonLabel || "Join free"} />
      <main id="main">
        {children}
        <Closing />
      </main>
      <Footer />
      <JoinDialog content={s.joinDialog} whatsappInvite={site.whatsappInvite} />
      <SearchDialog />
    </>
  );
}
