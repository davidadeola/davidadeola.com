import useTheme from "@/hooks/useTheme";
import { Button } from "./button";
import Logo from "./logo";
import ThemeToggleButton from "./themeToggleButton";
import Link from "next/link";
import { Search } from "lucide-react";

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
  const { theme, themeToggler } = useTheme();

  return (
    <header className="flex h-[88px] items-center justify-between px-[120px]">
      <div className="flex items-center gap-20">
        <Logo />

        <nav className="flex gap-4">
          {NAV_LINKS.map(({ href, title }) => (
            <Link
              key={title}
              className="px-2 py-[6px] text-base font-bold bg-color-button-background text-color-button-text"
              href={href}
            >
              {title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button className="">
          <Search size={20} strokeWidth={1.5} />
        </Button>

        <Button className="text-base font-bold text-white bg-[#974BFA]">
          Subscribe
        </Button>

        <ThemeToggleButton theme={theme} themeToggler={themeToggler} />
      </div>
    </header>
  );
};

export default Header;
