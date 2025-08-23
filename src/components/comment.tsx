"use client";
import React, { useRef, useContext, useEffect, useState } from "react";

import ThemeContext from "Stores/themeContext";
import { siteMetadata } from "Utils/siteMetadata";
import { DARK } from "Constants/theme";

const src = "https://utteranc.es";
const LIGHT_THEME = "github-light";
const DARK_THEME = "dark-blue";

const Comment = () => {
  const { utterances } = siteMetadata;
  const { repo } = utterances ?? { repo: undefined };
  const theme = useContext(ThemeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // 1. Handle component mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Handle initial script creation
  useEffect(() => {
    if (!mounted || !repo || !containerRef.current) return;

    // Check if the script is already there to prevent re-creation
    if (containerRef.current.querySelector('script[src*="utteranc.es"]')) {
      return;
    }

    const themeMode = theme === DARK ? DARK_THEME : LIGHT_THEME;

    const comment = document.createElement("script");
    const attributes = {
      src: `${src}/client.js`,
      repo,
      "issue-term": "pathname",
      label: "comment",
      theme: themeMode,
      crossOrigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      comment.setAttribute(key, value);
    });

    comment.onerror = () => {
      console.warn("Failed to load Utterances script");
    };

    containerRef.current.appendChild(comment);
  }, [mounted, repo]); // Depend on mounted and repo only

  // 3. Handle theme changes
  useEffect(() => {
    if (!mounted || !repo || !containerRef.current) return;

    const themeMode = theme === DARK ? DARK_THEME : LIGHT_THEME;
    const utterancesEl = containerRef.current.querySelector(
      "iframe.utterances-frame"
    ) as HTMLIFrameElement;

    if (utterancesEl?.contentWindow) {
      const message = {
        type: "set-theme",
        theme: themeMode,
      };

      try {
        utterancesEl.contentWindow.postMessage(message, src);
      } catch (error) {
        console.debug("Theme message failed:", error);
      }
    }
  }, [mounted, repo, theme]); // Depend on theme to run this effect

  if (!mounted || !repo) {
    return null;
  }

  return (
    <div ref={containerRef} className="utterances-container min-h-[200px]" />
  );
};

export default Comment;
