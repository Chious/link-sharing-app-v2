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
import { useUser } from "@/contexts/provider";
import ImagePicker from "../image-picker";
import { userMutation } from "@/gql/userMutation";
import { useMutation } from "@urql/next";
import { useState } from "react";
import { getToken } from "@/lib/token";
import Swal from "sweetalert2";

export function ProflieForm() {
  const { userInfo, setUserInfo } = useUser();
  const [state, setState] = useState(userInfo);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [editResult, editProfile] = useMutation(userMutation);

  const validate = () => {
    if (!state.firstName) {
      setErrors({ ...errors, firstName: "First name is required" });
      return false;
    }
    if (!state.lastName) {
      setErrors({ ...errors, lastName: "Last name is required" });
      return false;
    }
    if (!state.email) {
      setErrors({ ...errors, email: "Email is required" });
      return false;
    }

    if (!state.email.includes("@")) {
      setErrors({ ...errors, email: "Email is invalid" });
      return false;
    }

    return true;
  };

  const save = async () => {
    if (!validate()) {
      return;
    }

    const token = getToken();
    const res = await editProfile(
      { input: state },
      {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    if (res.data.editProfile) {
      setUserInfo(res.data.editProfile);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.error?.message,
      });
    }
  };

  return (
    <Card className=" flex-1 p-6 sm:p-8 bg-white border-transparent w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">Profile Details</CardTitle>
        <CardDescription className="text-dark-gray">
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-r justify-center">
          <CardDescription className="text-dark-gray text-start w-full">
            Profile picture
          </CardDescription>
          <ImagePicker />
          <CardDescription className="text-dark-gray text-start">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </CardDescription>
        </Card>
        <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-center justify-center">
          <CardContent className="space-y-4 w-full">
            <div className="space-y-2 w-full">
              <Label htmlFor="username">First name*</Label>
              <Input
                id="firstName"
                placeholder="e.g. Ben"
                value={state.firstName}
                onChange={(e) => {
                  setState({ ...state, firstName: e.target.value });
                }}
                errorMsg={errors.firstName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Last name*</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="e.g. Wright"
                value={state.lastName}
                onChange={(e) => {
                  setState({ ...state, lastName: e.target.value });
                }}
                errorMsg={errors.lastName}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. ben@example.com"
                value={state.email}
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                errorMsg={errors.email}
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={save}
          className="flex-1 md:flex-none lg:flex-none bg-dark-purple px-4 text-white w-full md:w-fit lg:w-fit"
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
