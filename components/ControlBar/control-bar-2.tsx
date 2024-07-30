"use client";

import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function ControlBar_2() {
  const [showToast, setShowToast] = useState(false);
  const copyLink = () => {
    setShowToast(true);
    navigator.clipboard.writeText(
      process.env.NEXT_PUBLIC_APP_URL + "/share/123"
    );
  };
  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [showToast]);
  return (
    <Card className="relative rounded-none md:rounded-md lg:rounded-md w-full flex flex-row gap-4 justify-between p-4 bg-white border-transparent">
      <Button
        className={`flex-1 md:flex-none lg:flex-none flex gap-3 text-dark-purple bg-white border-dark-purple border-solid border`}
      >
        <Link href="/user">Back to Editor</Link>
      </Button>
      <Button
        className="transition-all flex-1 md:flex-none lg:flex-none flex gap-3 bg-dark-purple text-white"
        onClick={copyLink}
      >
        Share Link
      </Button>
      <div
        className={cn(
          `fixed inset-0 flex items-end justify-center pointer-events-none pb-8`,
          showToast ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="text-sm text-white bg-black p-2 rounded shadow">
          The link has been copied to the clipboard!
        </p>
      </div>
    </Card>
  );
}
