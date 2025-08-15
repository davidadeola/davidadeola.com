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
}

const NavBar: React.FC<NavBarProps> = ({ title, themeToggler }) => {
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
        <div className="flex md:relative md:w-full md:h-nav-height">
          <div
            ref={curtainRef}
            className={`hidden md:block md:fixed md:top-[calc(var(--nav-height)-1px)] md:left-0 md:w-full md:h-[calc(100%-var(--nav-height)+1px)] md:bg-color-post-background md:transition-opacity md:duration-300 ${
              toggle
                ? "md:opacity-100 md:pointer-events-auto"
                : "md:opacity-0 md:pointer-events-none"
            }`}
          />
          <div className="md:w-full md:z-200">
            <MenuIcon toggle={toggle} handleClick={handleClick} />
            <ul
              ref={listRef}
              className={`flex md:pointer-events-none md:flex-col md:px-sizing-lg md:absolute md:top-full md:left-0 md:w-full md:bg-color-post-background md:border-b md:border-color-nav-border md:transition-all md:duration-300 md:ease-in-out ${
                toggle
                  ? "md:translate-y-0 md:opacity-100 md:pointer-events-auto"
                  : "md:-translate-y-full md:opacity-0"
              }`}
            >
              <LinkList links={menuLinks} setToggle={setToggle} />
              <li className="flex justify-center items-center ml-8 first:ml-0 last:ml-0 md:block md:ml-0 md:text-text-md md:py-2">
                <ThemeToggleButton themeToggler={themeToggler} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
