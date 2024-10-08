"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useMutation } from "urql";
import { LoginMutation } from "@/gql/authMutation";
import { useEffect, useState } from "react";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { validateEmail, validatePW } from "@/lib/form";
import { useUser } from "@/contexts/provider";
import Swal from "sweetalert2";

export function LoginForm({ setIsLogin }: { setIsLogin: any }) {
  const [{ error }, login] = useMutation(LoginMutation);
  const { setUserInfo, setUserLinks } = useUser();
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const validate = () => {
    let isValid = true;

    if (!validateEmail(state.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
      isValid = false;
    }
    if (!validatePW(state.password)) {
      setErrors((prev) => ({ ...prev, password: "Invalid password" }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    const res = await login({ input: state });
    if (res.data && res.data.login) {
      setToken(res.data.login.token);
      setUserInfo(res.data.login.user);
      setUserLinks(res.data.login.links);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully logged in",
      }).then(() => {
        router.push("/user");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Login</CardTitle>
          <CardDescription className="text-dark-gray">
            Add your details below to get back into the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Email Address</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={state.email}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              errorMsg={errors.email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={state.password}
              onChange={(e) => {
                setState({ ...state, password: e.target.value });
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              errorMsg={errors.password}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="bg-black w-full text-white p-2 text-center rounded-md"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <h3 className="text-dark-gray">
            {`Don't have an account?`}
            <span
              className="text-dark-purple pl-1 cursor-pointer"
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Create account
            </span>
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
}
