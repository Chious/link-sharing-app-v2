import Image from "next/image";
import { Dropdown } from "@/components/dropdown";
import { LoginForm } from "@/components/Form/login-form";
import logo_M from "@/public/images/logo-devlinks-large.svg";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <Image src={logo_M} alt="devlinks logo" />
      <LoginForm />
    </section>
  );
}
