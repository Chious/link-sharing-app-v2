"use client";

import ControlBar_2 from "@/components/ControlBar/control-bar-2";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/app/icon.png";
import { PrevButton } from "@/components/ui/prev-button";
import { useUser } from "@/contexts/provider";

export default function PreviewPage() {
  const { userLinks, userInfo } = useUser();

  return (
    <section className="relative flex flex-col gap-16 items-center">
      <div className="w-screen h-80 -top-10 absolute bg-dark-purple rounded-b-lg -z-10" />
      <ControlBar_2 />
      <Card className=" bg-white flex flex-col items-center justify-center gap-4 w-96 h-full p-8 shadow-2xl rounded-2xl">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Image
            src={logo}
            alt="illusion"
            className="border border-solid border-dark-purple rounded-full"
            width={80}
            height={80}
          />
          <h1 className="text-center">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
          <h3 className="text-center text-dark-gray">{userInfo.email}</h3>
          <div className="flex flex-col gap-4 w-full">
            {userLinks.map((link, i) => (
              <PrevButton key={i} platform={link.platform} url={link.url} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
