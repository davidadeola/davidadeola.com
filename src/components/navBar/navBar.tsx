"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { siteMetadata } from "Utils/siteMetadata";
import type { UseThemeReturnType } from "Hooks/useTheme";
import ThemeToggleButton from "Components/themeToggleButton";
import MenuIcon from "./menuIcon";
import LinkList from "Components/navBar/linkList";

interface NavBarProps {
  title?: string | null;
  themeToggler: UseThemeReturnType["themeToggler"];
  theme: UseThemeReturnType["theme"];
}

const NavBar: React.FC<NavBarProps> = ({ title, theme, themeToggler }) => {
  const { menuLinks } = siteMetadata;
  const navRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <nav
      ref={navRef}
      aria-label="Global Navigation"
      className="min-w-min-width sticky top-0 left-0 w-full h-nav-height z-10"
    >
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[20px] bg-color-nav-bar border-b border-color-nav-border" />
      <div className="relative mx-auto max-w-width px-padding-lg h-full z-2 flex justify-between items-center md:px-padding-sm">
        <h1
          onClick={() => setToggle(false)}
          className="z-9999 p-0 border-none text-text-title font-font-weight-semi-bold text-color-text md:text-text-md"
        >
          <Link href="/" className="text-inherit">
            {title}
          </Link>
        </h1>

        <div className="flex md:relative  md:w-auto md:h-auto">
          {/* Mobile curtain overlay */}
          <div
            ref={curtainRef}
            className={`fixed top-[calc(var(--nav-height)-1px)] left-0 w-full h-[calc(100%-var(--nav-height)+1px)] bg-color-post-background transition-opacity duration-300 md:hidden ${
              toggle
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />

          <div className="md:w-auto md:z-200">
            {/* Hamburger menu - only visible on mobile */}
            <MenuIcon toggle={toggle} handleClick={handleClick} />

            {/* Navigation list */}
            <ul
              ref={listRef}
              className={`
                flex-col px-sizing-lg absolute top-full gap-4 left-0 w-full bg-color-post-background border-b border-color-nav-border transition-all duration-300 ease-in-out pointer-events-none
                ${
                  toggle
                    ? "flex translate-y-0 opacity-100 pointer-events-auto"
                    : "hidden -translate-y-full opacity-0"
                }
                md:flex md:flex-row md:static md:w-auto md:bg-transparent md:border-none md:translate-y-0 md:opacity-100 md:pointer-events-auto md:px-0
              `}
            >
              <LinkList links={menuLinks} setToggle={setToggle} />
              <li className="flex justify-center items-center py-2 md:ml-4 md:py-0">
                <ThemeToggleButton theme={theme} themeToggler={themeToggler} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
