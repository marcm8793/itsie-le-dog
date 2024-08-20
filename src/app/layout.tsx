import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navbar/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.itsie.dog"),
  title: {
    default: "Itsie le dog",
    template: `%s - Itsie le dog`,
  },
  description: "To always remember Itsie le dog",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS", "Itsie", "Dog"],
  authors: [
    {
      name: "marcm8793",
      url: "https://www.marcmansour.dev",
    },
  ],
  creator: "marcm8793",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.itsie.dog",
    title: "Itsie le dog",
    description: "To always remember Itsie le dog",
    siteName: "Itsie le dog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Itsie le dog",
    description: "To always remember Itsie le dog",
    images: ["./og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
