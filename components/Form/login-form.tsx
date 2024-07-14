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
import { useState } from "react";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [loginResult, login] = useMutation(LoginMutation);
  const [state, setState] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async () => {
    const res = await login({ input: state });

    if (res.data.login) {
      console.log(res.data.login);
      setToken(res.data.login.token);
      router.push("/user");
    }
  };

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
              }}
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
              }}
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
            <span className="text-dark-purple pl-1 cursor-pointer">
              Create account
            </span>
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
}
