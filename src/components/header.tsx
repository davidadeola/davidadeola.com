"use client";

import { Button } from "./button";
import Logo from "./logo";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import ThemeToggleButton from "./theme-toggle-button";
import { useState } from "react";
import { NAV_LINKS } from "@/constants";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="relative">
      <header className="flex h-[88px] items-center justify-between px-4 md:px-[120px]">
        <div className="flex items-center md:gap-20">
          <Logo />

          <nav className="md:flex gap-4 hidden">
            {NAV_LINKS.map(({ href, title }) => (
              <Link
                key={title}
                className="px-2 h-8 flex items-center bg-[#161616] text-white dark:bg-white dark:text-[#292929] text-base font-bold"
                href={href}
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 md:gap-4">
          <button className="cursor-pointer border md:border-none dark:border-[#353535] h-[32px] w-8 flex items-center justify-center dark:text-white">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Button className="text-base hidden md:flex font-bold text-white border border-[#974BFA] bg-[#974BFA]">
            Subscribe
          </Button>

          <Button
            onClick={() => setShowNav(true)}
            className="text-base md:hidden !px-2 h-[32px] flex items-center justify-center w-max font-bold text-white border border-[#974BFA] bg-[#974BFA]"
          >
            <Menu />
          </Button>

          <ThemeToggleButton />
        </div>
      </header>

      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed  flex items-center justify-center backdrop-blur-md bg-black/40 w-full h-screen z-10 top-0 left-0"
        >
          <div className="flex items-center justify-center z-20 w-full h-full">
            <nav className="flex flex-col items-center gap-4">
              {NAV_LINKS.map(({ href, title }) => (
                <Link
                  key={title}
                  className="px-2 h-10 flex w-max items-center bg-[#161616] text-white dark:bg-white dark:text-[#292929] text-base font-bold"
                  href={href}
                >
                  {title}
                </Link>
              ))}

              <Link
                href={"#subscribe"}
                className="text-base px-3 h-10 mt-3 flex items-center font-bold text-white border border-[#974BFA] bg-[#974BFA]"
              >
                Subscribe
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
