"use client";

import ControlBar_1 from "@/components/ControlBar/control-bar-1";
import { LinksForm } from "@/components/Form/links-form/links-form";
import { ProflieForm } from "@/components/Form/proflie-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import icon from "@/app/icon.png";
import Logo_S from "@/public/images/illustration-phone-mockup.svg";
import { useUser } from "@/contexts/provider";
import { PrevButton } from "@/components/ui/prev-button";

export default function EditPage() {
  const [form, setForm] = useState("links");
  const { userInfo, userLinks } = useUser();

  return (
    <section className="flex flex-col gap-4">
      <ControlBar_1 form={form} setForm={setForm} />

      <div className="flex justify-center gap-3">
        <Card className="bg-white hidden md:block lg:block">
          <CardHeader>
            <CardContent className="relative flex items-center justify-center">
              <div className="absolute p-4 w-[75%] h-[80%] bg-white z-10 flex flex-col gap-4 items-center justify-start overflow-scroll">
                <Image
                  src={userInfo.image || icon}
                  alt="icon"
                  width={100}
                  height={100}
                  className="border border-solid border-dark-purple rounded-full"
                />
                <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
                <p>{userInfo.email}</p>
                {userLinks.map((link, index) => (
                  <PrevButton key={index} platform={link.platform} />
                ))}
              </div>
              <Logo_S />
            </CardContent>
          </CardHeader>
        </Card>
        {form === "links" ? <LinksForm /> : <ProflieForm />}
      </div>
    </section>
  );
}
