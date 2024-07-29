"use client";

import { LoginForm } from "@/components/Form/login-form";
import { SignupForm } from "@/components/Form/signup-form";
import LogoM from "@/public/images/logo-devlinks-large.svg";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <LogoM />
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <SignupForm setIsLogin={setIsLogin} />
      )}
    </section>
  );
}
