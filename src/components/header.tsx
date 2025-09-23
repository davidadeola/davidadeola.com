import { Button } from "./button";
import Logo from "./logo";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import ThemeToggleButton from "./themeToggleButton";

const NAV_LINKS = [
  {
    title: "/WEBSITE",
    href: "",
  },
  {
    title: "/TWITTER",
    href: "",
  },
  {
    title: "/DISCORD",
    href: "",
  },
  {
    title: "/TELEGRAM",
    href: "",
  },
];

const Header = () => {
  return (
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

      <div className="flex items-center gap-4">
        <button className="cursor-pointer border md:border-none dark:border-[#353535] h-[32px] w-8 flex items-center justify-center dark:text-white">
          <Search size={20} strokeWidth={1.5} />
        </button>

        <Button className="text-base hidden md:block font-bold text-white border border-[#974BFA] bg-[#974BFA]">
          Subscribe
        </Button>

        <Button className="text-base md:hidden !px-2 h-[32px] flex items-center justify-center w-max font-bold text-white border border-[#974BFA] bg-[#974BFA]">
          <Menu />
        </Button>

        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
