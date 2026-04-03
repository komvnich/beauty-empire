import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Preloader } from "@/components/ui/Preloader";
import { defaultMetadataBase, STATIC_FALLBACK_DESC, STATIC_FALLBACK_TITLE } from "@/lib/seo-metadata";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: defaultMetadataBase(),
  title: STATIC_FALLBACK_TITLE,
  description: STATIC_FALLBACK_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${lato.variable} antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

