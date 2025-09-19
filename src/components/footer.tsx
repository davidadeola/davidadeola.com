import { siteMetadata } from "@/utils/siteMetadata";

const Footer = () => {
  const { author } = siteMetadata;
  const copyrightYr = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="flex text-center px-[120px] text-sm text-white/70 font-normal justify-between items-center h-[95px] bg-[#292929]"
    >
      <p aria-label="Copyright" className="text-sm font-bold">
        <span className="!text-white font-bold">{author}</span> © {copyrightYr}
      </p>

      <div className="flex gap-2 items-center">
        <p>Personal Portfolio</p>
        <span className="bg-white rounded-full w-1 h-1"></span>{" "}
        <p>X (Formerly Twitter)</p>
      </div>

      <p>Made with Love</p>
    </footer>
  );
};

export default Footer;
