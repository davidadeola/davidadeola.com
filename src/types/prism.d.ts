// types/prism.d.ts
declare module "prismjs" {
  const Prism: {
    highlightAll(): void;
    highlightElement(
      element: Element,
      async?: boolean,
      callback?: () => void
    ): void;
    highlight(text: string, grammar: any, language: string): string;
    languages: { [key: string]: any };
  };
  export default Prism;
}

declare module "prismjs/themes/prism-tomorrow.css";
declare module "prismjs/themes/prism-dark.css";
declare module "prismjs/themes/prism-okaidia.css";

declare module "prismjs/components/prism-javascript";
declare module "prismjs/components/prism-typescript";
declare module "prismjs/components/prism-jsx";
declare module "prismjs/components/prism-tsx";
declare module "prismjs/components/prism-css";
declare module "prismjs/components/prism-json";
declare module "prismjs/components/prism-python";
declare module "prismjs/components/prism-bash";
declare module "prismjs/components/prism-markdown";
declare module "prismjs/components/prism-php";
declare module "prismjs/components/prism-java";
declare module "prismjs/components/prism-sql";
