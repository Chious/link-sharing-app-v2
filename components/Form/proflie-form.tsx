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
import { userMutation, uploadFileMutation } from "@/gql/userMutation";
import { useMutation } from "@urql/next";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/token";
import Swal from "sweetalert2";
import { cn } from "@/lib/utils";

type Profile = {
  image: File | null;
  firstName: string;
  lastName: string;
  email: string;
};

export function ProflieForm() {
  const { userInfo, setUserInfo } = useUser();
  const { image, userId, ...rest } = userInfo;

  const [editing, setEditing] = useState(false);
  const [state, setState] = useState<Profile>({ ...rest, image: null });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });
  const [{ error }, editProfile] = useMutation(userMutation);

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

    const { image, ...rest } = state;
    const token = getToken();
    const res = await editProfile(
      { input: rest },
      {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const res2 = await fetch(`/api/presigned-url`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).catch((err) => {
        console.log("err: ", err);
      });
    }

    if (res.data.editProfile) {
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to update profile",
        icon: "error",
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
    <Card className="flex-1 p-6 sm:p-8 bg-white border-transparent w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">Profile Details</CardTitle>
        <CardDescription className="text-dark-gray">
          Add your details to create a personal touch to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-y-scroll h-[450px]">
        <Card className="border-transparent bg-light-gray p-4 flex flex-col gap-4 items-r justify-center">
          <CardDescription className="text-dark-gray text-start w-full">
            Profile picture
          </CardDescription>
          <ImagePicker
            image={state.image}
            setImage={(v) => {
              setState({ ...state, image: v });
              setEditing(true);
            }}
            originalImage={image}
          />
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
                  setEditing(true);
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
                  setEditing(true);
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
                  setEditing(true);
                }}
                errorMsg={errors.email}
              />
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() => {
            if (!editing) return;
            save();
          }}
          className={cn(
            "flex-1 md:flex-none lg:flex-none bg-dark-purple px-4 text-white w-full md:w-fit lg:w-fit",
            {
              "cursor-default": !editing,
              "bg-dark-purple/50": !editing,
            }
          )}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
