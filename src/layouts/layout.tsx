"use client";

import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import ThemeContext from "Stores/themeContext";
import useTheme from "Hooks/useTheme";
import { siteMetadata } from "Utils/siteMetadata";
import NavBar from "Components/navBar";
import Footer from "@/components/footer";
import Header from "@/components/header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, themeToggler } = useTheme();
  const { title, author } = siteMetadata;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="bg-noise w-full h-full min-h-screen bg-color-post-background">
        <Header />
        <main style={{ minHeight: "calc(100vh - 60px)" }}>{children}</main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
