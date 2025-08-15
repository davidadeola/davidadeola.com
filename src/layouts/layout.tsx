"use client";

import React from "react";
import type { ReactNode } from "react";
import ThemeContext from "Stores/themeContext";
import useTheme from "Hooks/useTheme";
import { siteMetadata } from "Utils/siteMetadata";
import NavBar from "Components/navBar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { theme, themeToggler } = useTheme();
  const { title, author } = siteMetadata;
  const copyrightStr = `Copyright © ${new Date().getFullYear()} ${author}.`;

  return (
    <ThemeContext.Provider value={theme}>
      <div className="w-full h-full min-h-[calc(100vh-var(--footer-height))] bg-color-post-background">
        <NavBar title={title} themeToggler={themeToggler} />
        {children}
      </div>
      <footer
        role="contentinfo"
        className="flex text-center justify-center items-center h-footer-height bg-color-gray-1"
      >
        <span
          aria-label="Copyright"
          className="text-text-sm font-font-weight-bold text-color-gray-6"
        >
          {copyrightStr}
        </span>
      </footer>
    </ThemeContext.Provider>
  );
};

export default Layout;
