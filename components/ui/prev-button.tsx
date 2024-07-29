import { Button } from "./button";
import { OPTIONS } from "../../constants/dropdown";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  platform: string;
  url?: string;
};

export function PrevButton({ platform, url = "", ...props }: ButtonProps) {
  const findPlatform = OPTIONS.find((option: any) => option.value === platform);
  if (!findPlatform) return null;

  const colorClass = findPlatform.color ? findPlatform.color : "";

  return (
    <Link href={url} className="w-full">
      <Button
        {...props}
        className={
          " text-white hover:scale-105 hover:shadow-md transition duration-150 flex flex-row gap-2 w-full"
        }
        style={{
          backgroundColor: colorClass,
        }}
      >
        <div className="svg-fill-white">{findPlatform.icon}</div>
        <h3>{findPlatform.label}</h3>
        <ArrowRight />
      </Button>
    </Link>
  );
}
