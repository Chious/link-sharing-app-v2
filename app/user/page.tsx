"use client";

import ControlBar_1 from "@/components/ControlBar/control-bar-1";
import { LinksForm } from "@/components/Form/links-form/links-form";
import { ProflieForm } from "@/components/Form/proflie-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import icon from "@/app/icon.png";
import Mockup_Image from "@/public/images/illustration-phone-mockup.svg";
import { useUser } from "@/contexts/provider";
import { PrevButton } from "@/components/ui/prev-button";

export default function EditPage() {
  const [form, setForm] = useState("links");
  const { userInfo, userLinks } = useUser();

  return (
    <section className="flex flex-col gap-4 h-full w-full">
      <ControlBar_1 form={form} setForm={setForm} />

      <div className="flex justify-center gap-3 h-full">
        <Card className="bg-white hidden md:block lg:block">
          <CardHeader>
            <CardContent className="relative flex items-center justify-center">
              <div className="absolute p-4 w-[75%] h-[80%] bg-white z-10 flex flex-col gap-4 items-center justify-start overflow-scroll">
                {userInfo.image ? (
                  <img
                    src={userInfo.image}
                    alt="icon"
                    width={100}
                    height={100}
                    className="border border-solid border-dark-purple rounded-full"
                  />
                ) : (
                  <Image
                    src={icon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="border border-solid border-dark-purple rounded-full"
                  />
                )}
                <h2>{`${userInfo.firstName} ${userInfo.lastName}`}</h2>
                <p>{userInfo.email}</p>
                {userLinks.map((link, index) => (
                  <PrevButton key={index} platform={link.platform} />
                ))}
              </div>
              <Mockup_Image />
            </CardContent>
          </CardHeader>
        </Card>
        {form === "links" ? <LinksForm /> : <ProflieForm />}
      </div>
    </section>
  );
}
