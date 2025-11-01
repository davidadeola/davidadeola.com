/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface MdxProps {
  content: string;
  className?: string;
}

const Mdx: React.FC<MdxProps> = ({ content, className = "" }) => {
  const [isClient, setIsClient] = useState(false);
  const [prismLoaded, setPrismLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      const loadPrism = async () => {
        try {
          const Prism = (await import("prismjs")).default;

          await import("prismjs/themes/prism-tomorrow.css");

          await Promise.all([
            import("prismjs/components/prism-javascript"),
            import("prismjs/components/prism-typescript"),
            import("prismjs/components/prism-jsx"),
            import("prismjs/components/prism-tsx"),
            import("prismjs/components/prism-bash"),
            import("prismjs/components/prism-json"),
            import("prismjs/components/prism-css"),
          ]);

          setPrismLoaded(true);

          setTimeout(() => {
            Prism.highlightAll();
          }, 50);
        } catch (error) {
          console.error("Failed to load Prism:", error);
          setPrismLoaded(true);
        }
      };

      loadPrism();
    }
  }, [isClient]);

  useEffect(() => {
    if (prismLoaded && typeof window !== "undefined" && window.Prism) {
      const timer = setTimeout(() => {
        window.Prism.highlightAll();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [prismLoaded, content]);

  const preprocessMarkdown = (text: string): string => {
    let processed = text;

    // Remove frontmatter (content between --- at the beginning)
    processed = processed.replace(/^---[\s\S]*?---\n*/m, "");

    // Fix headers - add space after hashtags if missing
    processed = processed.replace(/^(#{1,6})([^\s#])/gm, "$1 $2");

    // Remove duplicate hashtags and clean up headers
    processed = processed.replace(/^(#{1,6})\s*(#{1,})\s*/gm, "$1 ");

    // Clean up specific problematic patterns from your markdown
    processed = processed.replace(/^##([A-Z])/gm, "## $1");
    processed = processed.replace(/^###([A-Z])/gm, "### $1");
    processed = processed.replace(/^####([A-Z])/gm, "#### $1");

    // Handle the Table of Contents issue specifically
    processed = processed.replace(
      /^### Table of Contents\s*\na\s*$/gm,
      "### Table of Contents"
    );

    // Clean up standalone 'a' characters that appear after headers
    processed = processed.replace(/^([#]{1,6}\s+.+)\n\s*a\s*$/gm, "$1");

    // Fix code blocks - ensure proper language specification
    processed = processed.replace(/```(\w+)?\s*\n/g, (match, lang) => {
      if (!lang) return "```\n";
      return `\`\`\`${lang}\n`;
    });

    // Handle npm/bash commands properly
    processed = processed.replace(/```npm install/g, "```bash\nnpm install");
    processed = processed.replace(
      /```npx create-react-app/g,
      "```bash\nnpx create-react-app"
    );

    // Fix JavaScript code blocks that might be missing language tags
    processed = processed.replace(/```JavaScript/g, "```javascript");

    // Ensure proper spacing around headers
    processed = processed.replace(/^(#{1,6}\s+.+)$/gm, "\n$1\n");

    // Clean up excessive whitespace but preserve intentional breaks
    processed = processed.replace(/\n{5,}/g, "\n\n\n");

    // Remove trailing spaces
    processed = processed.replace(/[ \t]+$/gm, "");

    // Handle horizontal rules properly
    processed = processed.replace(/^-{3,}$/gm, "\n---\n");

    return processed.trim();
  };

  const processedContent = preprocessMarkdown(content);

  if (!isClient) {
    return (
      <div
        className={`${className} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-sm w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mt-12 mb-4 text-gray-900 dark:text-gray-100">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mt-12 mb-4 text-gray-800 dark:text-gray-200">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-extrabold leading-tight mt-10 mb-4 text-gray-700 dark:text-gray-300">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="text-lg sm:text-xl font-semibold leading-tight mt-6 mb-3 text-gray-700 dark:text-gray-300">
              {children}
            </h4>
          ),

          p: ({ children }) => (
            <p className="leading-relaxed text-base mb-6 text-gray-700 dark:text-gray-300 break-words font-light">
              {children}
            </p>
          ),

          i: ({ children }) => (
            <i className="text-gray-600 dark:text-gray-400 mb-2 italic">
              {children}
            </i>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-outside my-4 space-y-2 ml-6 text-gray-600 dark:text-gray-400 mb-4">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-outside my-6 space-y-2 ml-6 text-gray-600 dark:text-gray-400">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-relaxed text-gray-600 dark:text-gray-400 mb-2">
              {children}
            </li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {children}
            </a>
          ),

          code: ({ children, className: codeClassName, ...props }) => {
            const match = /language-(\w+)/.exec(codeClassName || "");
            const language = match ? match[1] : "";
            const inline = !match;

            if (inline) {
              return (
                <code
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-sm text-sm font-mono border"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // Use standard classes instead of custom CSS properties
            const sortedClassName = `language-${language} font-mono text-sm`;

            return (
              <code className={sortedClassName} {...props}>
                {children}
              </code>
            );
          },

          pre: ({ children, ...props }) => {
            const codeElement = React.Children.toArray(children).find(
              (child): child is React.ReactElement<any> =>
                React.isValidElement(child) && child.type === "code"
            );

            const className = codeElement?.props?.className || "";
            const match = /language-(\w+)/.exec(className);
            const language = match ? match[1] : "text";

            return (
              <div className="my-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-medium flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-4"></span>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </div>
                <pre
                  className="bg-gray-900 text-gray-100 p-4 sm:p-6 overflow-x-auto font-mono text-sm leading-relaxed"
                  {...props}
                >
                  {children}
                </pre>
              </div>
            );
          },

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <div className="overflow-x-auto my-8">
              <table className="w-full text-sm border-collapse border border-gray-200 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-gray-200 dark:border-gray-700 py-3 px-4 text-left font-semibold bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-gray-200 dark:border-gray-700 py-3 px-4 text-gray-600 dark:text-gray-400">
              {children}
            </td>
          ),

          img: ({ src, alt }: { src?: string | Blob; alt?: string }) => {
            if (!src) return null;

            if (typeof src === "string") {
              // ✅ Use Next.js <Image /> for regular string paths/URLs
              return (
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-lg object-cover my-8 max-w-full"
                  loading="lazy"
                />
              );
            }

            if (src instanceof Blob) {
              // Convert Blob into a temporary object URL for <img>
              const blobUrl = URL.createObjectURL(src);
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blobUrl}
                  alt={alt || ""}
                  className="w-full h-auto rounded-lg shadow-lg object-cover my-8 max-w-full"
                  loading="lazy"
                />
              );
            }

            return null;
          },

          hr: () => (
            <hr className="border-gray-300 dark:border-gray-600 my-12" />
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-gray-800 dark:text-gray-200">
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em className="italic text-gray-600 dark:text-gray-400">
              {children}
            </em>
          ),

          u: ({ children }) => (
            <u className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">
              {children}
            </u>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default Mdx;
export type { MdxProps };
