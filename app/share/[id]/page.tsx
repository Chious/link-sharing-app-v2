"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/app/icon.png";
import { PrevButton } from "@/components/ui/prev-button";
import { useUser } from "@/contexts/provider";
import { useMutation } from "@urql/next";

export default function SharePage() {
  return (
    <section className="relative flex flex-col gap-16 items-center">
      <Card className=" bg-white flex flex-col items-center justify-center gap-4 w-96 h-full p-8 shadow-2xl rounded-2xl">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Image
            src={logo}
            alt="illusion"
            className="border border-solid border-dark-purple rounded-full"
            width={100}
            height={100}
          />
          <h1 className="text-center">John Doe</h1>
          <h3 className="text-center text-dark-gray">john.doe@gmail.com</h3>
          <div className="flex flex-col gap-4 w-full">
            <PrevButton platform="Facebook" url="https://www.facebook.com" />
            <PrevButton platform="Instagram" url="https://www.instagram.com" />
            <PrevButton platform="LinkedIn" url="https://www.linkedin.com" />
            <PrevButton platform="Twitter" url="https://www.twitter.com" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
