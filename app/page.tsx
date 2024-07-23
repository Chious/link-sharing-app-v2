"use client";

import Image from "next/image";
import { LoginForm } from "@/components/Form/login-form";
import { SignupForm } from "@/components/Form/signup-form";
import logo_M from "@/public/images/logo-devlinks-large.svg";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <Image src={logo_M} alt="devlinks logo" />
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <SignupForm setIsLogin={setIsLogin} />
      )}
    </section>
  );
}
