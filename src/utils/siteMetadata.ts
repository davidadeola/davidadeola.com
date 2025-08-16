import { link } from "fs";

export const siteMetadata = {
  title: "David Adeola",
  description: `David's Blog`,
  author: "David Adeola",
  siteUrl: "https://davidadeola.com",
  lang: "en",
  utterances: {
    repo: "davidadeola/davidadeola-blog-comment",
  },
  postTitle: "All",
  menuLinks: [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/about",
      name: "About",
    },
    {
      link: "/github",
      name: "GitHub",
    },
    {
      link: "https://github.com/davidadeola",
      name: "Github",
    },
  ],
} as const;
