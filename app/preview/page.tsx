import ControlBar_2 from "@/components/ControlBar/control-bar-2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/app/icon.png";

export default function PreviewPage() {
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
          <h1 className="text-center">Ben Wright</h1>
          <h3 className="text-center text-dark-gray">ben@example.com</h3>
          <div className="flex flex-col gap-4 w-full">
            <Button className=" w-full text-dark-purple border-dark-purple border-solid border">
              Github
            </Button>
            <Button className=" w-full text-dark-purple border-dark-purple border-solid border">
              Github
            </Button>
            <Button className=" w-full text-dark-purple border-dark-purple border-solid border">
              Github
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
