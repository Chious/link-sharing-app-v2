"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import DragCollection from "../Drag/drag-collection";
import { useUser } from "@/contexts/provider";
import NoData from "./no-data";
import { useEffect, useState } from "react";
import { useMutation } from "@urql/next";
import { editLinksMutation } from "@/gql/userMutation";
import Swal from "sweetalert2";
import { getToken } from "@/lib/token";
import { cn } from "@/lib/utils";

type Link = {
  id: string;
  platform: string;
  url: string;
  [key: string]: string;
};

export function LinksForm() {
  const { userLinks, setUserLinks } = useUser();
  const [editing, setEditing] = useState(false);
  const [{ error }, editLinks] = useMutation(editLinksMutation);

  const addLink = () => {
    const newLink: Link = {
      id: Math.random().toString(36).substr(2, 9),
      platform: "",
      url: "",
    };
    setUserLinks([...userLinks, newLink]);
    setEditing(true);
  };

  const validate = (links: Link[]) => {
    for (const link of links) {
      if (link.platform === "" || link.url === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
        return false;
      }
    }

    return true;
  };

  const save = async () => {
    if (!validate(userLinks)) {
      return;
    }

    const result = await editLinks(
      {
        input: JSON.stringify(userLinks),
      },
      {
        fetchOptions: {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      }
    );

    setUserLinks(result.data.editLinks.links);

    if (result.data.editLinks) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Links updated successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
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
    <Card className=" flex-1 p-6 sm:p-8 bg-white border-transparent w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold ">
          Customize your links
        </CardTitle>
        <CardDescription className="text-dark-gray">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 overflow-scroll h-[450px]">
        <div className="space-y-2">
          <Button
            onClick={addLink}
            className=" w-full text-dark-purple border-dark-purple border-solid border"
          >
            + Add new link
          </Button>
        </div>
        {userLinks.length === 0 ? (
          <NoData />
        ) : (
          <DragCollection setEditing={setEditing} />
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className={cn(" px-4 text-white w-full md:w-fit lg:w-fit", {
            "bg-dark-purple": editing,
            "bg-dark-purple/50": !editing,
            "cursor-default": !editing,
          })}
          onClick={() => {
            if (!editing) return;
            save();
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
