import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import { text } from "stream/consumers";

interface MdxProps {
  content: string;
  className?: string;
}

const Mdx: React.FC<MdxProps> = ({ content, className = "" }) => {
  const preprocessMarkdown = (text: string): string => {
    let processed = text;

    processed = processed.replace(/^---[\s\S]*?---\n*/m, "");

    // Fix headers that are missing spaces after hashtags
    processed = processed.replace(/^(#{1,6})([^#\s])/gm, "$1 $2");

    // Clean up multiple hashtags and ensure proper header formatting
    processed = processed.replace(
      /^(#{2,})(#{1,})\s*(.*?)$/gm,
      (match, firstHashes, extraHashes, title) => {
        const totalHashes = firstHashes.length + extraHashes.length;
        const clampedHashes = Math.min(totalHashes, 6);
        return "#".repeat(clampedHashes) + " " + title.trim();
      }
    );

    // Fix lines that start with just hashtags (like "###Table of Contents")
    processed = processed.replace(
      /^(#{1,6})\s*(.*?)$/gm,
      (match, hashes, title) => {
        if (!title.trim()) return "";
        return hashes + " " + title.trim();
      }
    );

    // Handle the "a" character that appears after "###Table of Contents"
    processed = processed.replace(
      /^### Table of Contents\s*\na\s*$/gm,
      "### Table of Contents"
    );

    // Fix bold text formatting
    processed = processed.replace(/\*\*([^*]+)\*\*/g, "**$1**");
    processed = processed.replace(/__([^_]+)__/g, "**$1**");

    // Fix code blocks - ensure they have proper spacing
    processed = processed.replace(/```(\w+)?\n/g, "\n```$1\n");
    processed = processed.replace(/\n```\s*$/gm, "\n```\n");

    // Fix inline code formatting
    processed = processed.replace(/`([^`]+)`/g, "`$1`");

    // Ensure proper list formatting
    processed = processed.replace(/^-\s+/gm, "- ");
    processed = processed.replace(/^\*\s+/gm, "- ");
    processed = processed.replace(/^\+\s+/gm, "- ");

    // Add spacing around headers
    processed = processed.replace(/^(#{1,6}\s+.*?)$/gm, "\n$1\n");

    // Add spacing around horizontal rules
    processed = processed.replace(/^---$/gm, "\n---\n");

    // Clean up excessive newlines
    processed = processed.replace(/\n{4,}/g, "\n\n\n");
    processed = processed.replace(/\n{2,}(#{1,6})/g, "\n\n$1");

    // Ensure paragraphs are properly separated
    const lines = processed.split("\n");
    const cleanedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const nextLine = i < lines.length - 1 ? lines[i + 1]?.trim() : "";

      if (line) {
        cleanedLines.push(line);

        if (line.match(/^#{1,6}\s/) || line === "---" || line === "```") {
          cleanedLines.push("");
        }
        // Add spacing before headers (except if previous line was empty)
        else if (nextLine && nextLine.match(/^#{1,6}\s/) && line !== "") {
          cleanedLines.push("");
        }
      } else {
        // Only add empty line if the last added line wasn't empty
        if (cleanedLines[cleanedLines.length - 1] !== "") {
          cleanedLines.push("");
        }
      }
    }

    return cleanedLines.join("\n").trim();
  };

  const processedContent = preprocessMarkdown(content);

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // custom component to render styling

          h1: ({ children }) => (
            <h1 className="text-text-xl font-font-weight-bold leading-tight border-b-2 border-blue-500 md:text-text-lg sm:text-text-md pb-5">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-text-lg font-font-weight-bold leading-tight text-color-text md:text-text-md sm:text-text-sm">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-text-md font-font-weight-bold leading-tight text-color-text md:text-text-sm sm:text-text-base">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="leading-loose tracking-wide text-color-text-2 line-clamp-2 break-words overflow-hidden">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-inside my-8 space-y-3 ml-6 text-color-text-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal list-inside my-8 space-y-3 ml-6  text-color-text-2">
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li className="leading-relaxed text-color-text-2">{children}</li>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-color-blue hover:text-color-blue-icon"
            >
              {children}
            </a>
          ),

          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const inline = !match;

            if (inline) {
              return (
                <code
                  className="bg-color-code-background text-color-text-2 px-2 py-1 rounded text-sm border"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          pre: ({ children }) => (
            <pre className="bg-color-code-background text-color-text-2 p-4 rounded overflow-x-auto">
              <code className="text-sm">{children}</code>
            </pre>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-color-blue pl-4 italic text-color-text-2">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <table className="w-full text-color-text-2 text-sm">
              {children}
            </table>
          ),

          th: ({ children }) => (
            <th className="border border-color-gray-3 py-2 px-4 text-left text-color-text-2">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-color-gray-3 py-2 px-4">{children}</td>
          ),

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-border-radius-base object-cover"
            />
          ),

          hr: ({ children }) => <hr className="border-color-gray-3 my-12" />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default Mdx;
export type { MdxProps };
