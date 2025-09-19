import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/lib/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "David Adeola",
  description: "David's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="bg-noise relative mx-auto min-h-screen w-full gap-16 bg-white text-[#171717] transition dark:bg-[#171717] dark:text-white">
            <Header />

            <main className="mx-auto w-full px-[120px]">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
