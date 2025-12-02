import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/lib/Providers";
import SearchFilterPanel from "@/components/search-filter-panel";
import { Toaster } from "sonner";
// import localFont from "next/font/local";
import Newsletter from "@/components/newsletters";

// const neueMontreal = localFont({
//   src: [
//     {
//       path: "./fonts/NeueMontreal-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/NeueMontreal-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/NeueMontreal-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

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
      <body className="font-serif">
        <Providers>
          <div className="bg-noise relative mx-auto min-h-screen flex flex-col w-full bg-white text-[#171717] transition dark:bg-[#171717] dark:text-white">
            <Header />

            <div className="mt-[88px]">
              <SearchFilterPanel />
            </div>

            <main className="mx-auto max-w-[1500px] pb-[40px] lg:pb-[80px] flex-1 w-full px-4 lg:px-[120px] overflow-x-hidden">
              {children}
            </main>

            <div className="mb-8">
              <Newsletter />
            </div>

            <Footer />
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
