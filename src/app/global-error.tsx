"use client";

import { Button } from "@/components/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col border min-h-screen items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">
            We couldn’t complete your request. You can try again or return home.
          </p>

          <div className="flex gap-4">
            <Button onClick={() => reset()} className="px-4 !py-2">
              Try Again
            </Button>

            <Link href="/" className="px-4 py-1 border">
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
