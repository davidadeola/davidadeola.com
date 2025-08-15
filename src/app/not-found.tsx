"use client";

import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-color-background px-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-8xl font-font-weight-extra-bold text-color-text mb-4 md:text-6xl">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-color-blue/20 to-color-accent/20 blur-3xl -z-10" />
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-color-blue to-color-accent mx-auto rounded-full mb-6" />
        </div>
        <h2 className="text-2xl font-font-weight-bold text-color-text mb-4 md:text-xl">
          Page Not Found
        </h2>
        <p className="text-color-text-2 mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved to a
          different location.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-color-blue text-white font-font-weight-semi-bold rounded-lg hover:bg-color-blue-icon focus:outline-none focus:ring-2 focus:ring-color-blue focus:ring-offset-2 transition-all duration-200 shadow-shadow-md hover:shadow-shadow-lg transform hover:-translate-y-0.5"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
