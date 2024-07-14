"use client";

import ControlBar_1 from "@/components/ControlBar/control-bar-1";
import { LinksForm } from "@/components/Form/links-form/links-form";
import { ProflieForm } from "@/components/Form/proflie-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import logo_S from "@/public/images/illustration-phone-mockup.svg";

export default function EditPage() {
  const [form, setForm] = useState("links");

  return (
    <section className="flex flex-col gap-4">
      <ControlBar_1 form={form} setForm={setForm} />

      <div className="flex justify-center gap-3">
        <Card className="bg-white hidden md:block lg:block">
          <CardHeader>
            <CardContent>
              <Image src={logo_S} alt="illusion" width={250} />
            </CardContent>
          </CardHeader>
        </Card>
        {form === "links" ? <LinksForm /> : <ProflieForm />}
      </div>
    </section>
  );
}
