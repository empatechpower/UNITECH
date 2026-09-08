import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

/**
 * Sitewide defaults only. Every route builds its own title, description,
 * canonical and hreflang through `buildMetadata` in `@/lib/seo`; nothing
 * should be inheriting from here except `metadataBase` and the robots policy.
 *
 * `metadataBase` is what lets the per-route metadata express canonicals and
 * hreflang as root-relative paths and have Next resolve them to absolute URLs.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Sourcing Gateway to Taiwanese Manufacturing`,
    template: "%s",
  },
  description:
    "Integrated manufacturing lines, part supply and manufacturing partnerships from Taiwan. Press lines, CNC machining, BLDC and EV traction motors, precision parts and green manufacturing, 100% made in Taiwan.",
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
