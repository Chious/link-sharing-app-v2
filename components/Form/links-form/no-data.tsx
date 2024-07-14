import React from "react";
import Image from "next/image";
import logo_S from "@/public/images/illustration-empty.svg";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function NoData() {
  return (
    <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-center justify-center">
      <CardTitle className="text-2xl font-bold ">
        <Image src={logo_S} alt="illusion" />
        {`Let's get you started`}
      </CardTitle>
      <CardDescription className="text-dark-gray text-center">
        {`Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!`}
      </CardDescription>
    </Card>
  );
}
