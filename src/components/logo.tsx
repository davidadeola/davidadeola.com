import Link from "next/link";

const Logo = () => {
  return (
    <Link className="flex items-center gap-3" href={"/"}>
      <p className="text-2xl font-medium">
        <span className="font-bold">David</span> Adeola
      </p>
    </Link>
  );
};

export default Logo;
