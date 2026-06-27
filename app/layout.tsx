import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Prime Eye Research — Global Market Research & Consumer Insights",
  description: "Turning consumer data into business growth. AI-accelerated market research, brand tracking, customer experience measurement, and consumer intelligence for businesses worldwide.",
  metadataBase: new URL("https://primeeyeresearch.com"),
  openGraph: {
    title: "Prime Eye Research — Global Market Research & Consumer Insights",
    description: "Turning consumer data into business growth. AI-accelerated market research, brand tracking, customer experience measurement, and consumer intelligence for businesses worldwide.",
    url: "https://primeeyeresearch.com",
    siteName: "Prime Eye Research",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Eye Research — Global Market Research & Consumer Insights",
    description: "Turning consumer data into business growth. AI-accelerated market research, brand tracking, customer experience measurement, and consumer intelligence for businesses worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "Prime Eye Research",
              url: "https://primeeyeresearch.com",
              logo: "https://primeeyeresearch.com/images/logo.jpeg",
              image: "https://primeeyeresearch.com/images/logo.jpeg",
              description: "Global Market Research & Consumer Insights",
              telephone: "+91-84334-68560",
              address: {
                "@type": "PostalAddress",
                streetAddress: "41B Navada NH-2",
                addressLocality: "Mathura",
                addressRegion: "Uttar Pradesh",
                postalCode: "281006",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
