"use client";

import React from "react";
import Link from "next/link";

interface LinkItem {
  name: string;
  link: string;
}

interface LinkListProps {
  links: readonly LinkItem[];
  setToggle: (toggle: boolean) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, setToggle }) => {
  return (
    <>
      {links.map(({ name, link }) => (
        <li
          key={name}
          className="flex justify-center items-center ml-8 first:ml-0 last:ml-0 md:block md:ml-0 md:text-text-md md:py-2"
        >
          <Link
            href={link}
            onClick={() => setToggle(false)}
            className="font-font-weight-semi-bold hover:text-color-blue focus:text-color-blue md:block md:h-full md:py-2 md:font-font-weight-medium"
          >
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};
export default LinkList;
