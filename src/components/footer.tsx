"use client";

import { siteMetadata } from "@/utils/siteMetadata";
import { useTheme } from "next-themes";

const Footer = () => {
  const { author } = siteMetadata;
  const copyrightYr = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer
      role="contentinfo"
      className={`flex flex-col md:flex-row py-8 md:py-0 gap-5 md:gap-0 left-0 bottom-0 w-full text-center px-4 md:px-[120px] text-sm text-white/70 font-normal md:justify-between items-center h-full md:h-[95px] bg-[#292929] dark:bg-transparent ${theme === "light" ? "bg-noise" : ""}`}
    >
      <p aria-label="Copyright" className="text-sm">
        <span className="text-white font-bold">{author}</span> © {copyrightYr}
      </p>

      <div className="flex gap-2 text-center items-center">
        <p>Personal Portfolio</p>
        <span className="bg-white rounded-full w-1 h-1"></span>{" "}
        <p>X (Formerly Twitter)</p>
      </div>

      <p>Made with Love</p>
    </footer>
  );
};

export default Footer;
