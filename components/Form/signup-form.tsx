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
import { SignupMutation } from "@/gql/authMutation";
import { useState } from "react";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { validateEmail, validatePW } from "@/lib/form";

export function SignupForm({ setIsLogin }: { setIsLogin: any }) {
  const router = useRouter();
  const [signupResult, signup] = useMutation(SignupMutation);
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const validate = () => {
    let isValid = true;

    if (!validateEmail(state.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
      isValid = false;
    }

    if (!state.email) {
      setErrors((prev) => ({ ...prev, email: "Can't be empty" }));
      isValid = false;
    }
    if (!state.password) {
      setErrors((prev) => ({ ...prev, password: "Can't be empty" }));
      isValid = false;
    }
    if (!state.passwordConfirm) {
      setErrors((prev) => ({ ...prev, passwordConfirm: "Can't be empty" }));
      isValid = false;
    }
    if (state.password !== state.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "Passwords don't match",
      }));
      isValid = false;
    }
    if (!validatePW(state.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Must be at least 8 characters",
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const res = await signup({
      input: {
        email: state.email,
        password: state.password,
      },
    });

    if (res.data.signup) {
      setToken(res.data.signup.token);
      router.push("/user");
    }
  };

  return (
    <div className="w-4/5 flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Create Account</CardTitle>
          <CardDescription className="text-dark-gray">
            {`Let's get you started sharing your links!`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Email Address</Label>
            <Input
              id="username"
              placeholder="e.g. alex@gmail.com"
              errorMsg={errors.email}
              value={state.email}
              onChange={(e) => {
                setState({ ...state, email: e.target.value });
                setErrors({ ...errors, email: "" });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Create password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              errorMsg={errors.password}
              value={state.password}
              onChange={(e) => {
                setState({ ...state, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              errorMsg={errors.passwordConfirm}
              value={state.passwordConfirm}
              onChange={(e) => {
                setState({ ...state, passwordConfirm: e.target.value });
                setErrors({ ...errors, passwordConfirm: "" });
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="bg-dark-purple w-full text-white p-2 text-center rounded-md"
            onClick={handleLogin}
          >
            Create New Account
          </Button>
          <h3 className="text-dark-gray">
            {`Already have an account?`}
            <span
              className="text-dark-purple pl-1 cursor-pointer"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Login
            </span>
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
}
