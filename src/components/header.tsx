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
      <header className="flex h-[88px] items-center justify-between px-4 lg:px-[120px]">
        <div className="flex items-center lg:gap-20">
          <Logo />

          <nav className="lg:flex gap-4 hidden">
            {NAV_LINKS.map(({ href, title }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 h-10 flex w-max items-center hover:bg-[#161616]/80 transition-colors ease-in-out bg-[#161616] text-white dark:bg-white hover:dark:bg-white/80 dark:text-[#292929] text-base font-bold"
              >
                {title}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2.5 lg:gap-4">
          <button className="cursor-pointer border border-[#353535]/30 lg:border-none dark:border-[#353535] h-10 w-10 flex items-center justify-center dark:text-white">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <Button className="px-1.5 lg:px-2.5 hidden lg:flex text-xs cursor-pointer lg:text-base font-bold h-[40px] text-white border border-[#974BFA] bg-[#974BFA] hover:bg-[#974BFA]/80 hover:dark:bg-[#974BFA]/50">
            Subscribe
          </Button>

          <Button
            onClick={() => setShowNav(true)}
            className="text-base lg:hidden h-10 w-10 flex items-center justify-center font-bold text-white border border-[#974BFA] bg-[#974BFA]"
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
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 h-10 flex w-max items-center bg-[#161616] text-white dark:bg-white dark:text-[#292929] text-base font-bold"
                >
                  {title}
                </a>
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
