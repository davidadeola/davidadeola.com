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
          className="flex justify-center items-center py-2 md:ml-8 md:py-0 md:first:ml-0"
        >
          <Link
            href={link}
            onClick={() => setToggle(false)}
            className="font-font-weight-semi-bold hover:text-color-blue focus:text-color-blue md:font-font-weight-medium md:py-2"
          >
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default LinkList;
