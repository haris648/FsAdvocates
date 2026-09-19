import type { Metadata } from "next";
import { Playfair_Display, Courier_Prime } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Client-supplied files, self-hosted — body copy only, per the client's own
// instruction (headings stay Playfair Display for now). See the note in the
// conversation about the "cufonfonts" source before this goes to production.
const bodyFont = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../fonts/MyriadPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/MyriadPro-SemiBold.otf", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "FS Advocates & Legal Consultants — UAE counsel with a commercial perspective",
  description:
    "FS Advocates & Legal Consultants advises businesses, investors and individuals across the UAE on disputes, transactions and complex legal matters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${courier.variable} ${bodyFont.variable} h-full`}>
      <body className="min-h-full bg-ivory text-navy">{children}</body>
    </html>
  );
}
