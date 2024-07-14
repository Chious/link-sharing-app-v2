"use client";

import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";

export default function ControlBar_2() {
  return (
    <Card className=" rounded-none md:rounded-md lg:rounded-md w-full flex flex-row gap-4 justify-between p-4 bg-white border-transparent">
      <Button
        className={`flex-1 md:flex-none lg:flex-none flex gap-3 text-dark-purple bg-white border-dark-purple border-solid border`}
      >
        <Link href="/user">Back to Editor</Link>
      </Button>
      <Button className="flex-1 md:flex-none lg:flex-none flex gap-3 bg-dark-purple text-white">
        Share Link
      </Button>
    </Card>
  );
}
