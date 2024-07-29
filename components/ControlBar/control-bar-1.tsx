"use client";

import React from "react";
import { Card } from "../ui/card";
import Logo_L from "@/public/images/logo-devlinks-large.svg";
import Logo_S from "@/public/images/logo-devlinks-small.svg";
import Icon_link from "@/public/images/icon-link.svg";
import Icon_profolio from "@/public/images/icon-profile-details-header.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";

export default function ControlBar_1({
  form,
  setForm,
}: {
  form: string;
  setForm: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Card className="rounded-none md:rounded-md lg:rounded-md flex flex-row justify-between items-center p-4 bg-white border-transparent">
      <Logo_L className="hidden md:block lg:block" />
      <Logo_S className="block md:hidden lg:hidden" />
      <div className="btn-group flex">
        <Button
          className={`flex gap-3 transition duration-100 ${
            form === "links" && "bg-purple text-dark-purple"
          }`}
          onClick={() => setForm("links")}
        >
          <Icon_link
            className={`${form === "links" ? "svg-fill-purple" : ""}`}
          />
          <h3 className="hidden md:block lg:block">Links</h3>
        </Button>
        <Button
          className={`flex gap-3 transition duration-100 ${
            form === "profile" && "bg-purple text-dark-purple"
          }
          
          `}
          onClick={() => {
            setForm("profile");
          }}
        >
          <Icon_profolio
            className={`${form === "profile" ? "svg-fill-purple" : ""}`}
          />
          <h3 className="hidden md:block lg:block">Profile Detail</h3>
        </Button>
      </div>
      <Link
        href="/preview"
        className="border border-dark-purple border-solid flex justify-center items-center p-1 px-4 rounded-md text-dark-purple"
      >
        Preview
      </Link>
    </Card>
  );
}
