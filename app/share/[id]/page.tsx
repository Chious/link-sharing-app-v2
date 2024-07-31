"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/app/icon.png";
import { PrevButton } from "@/components/ui/prev-button";
import { useQuery, gql } from "@urql/next";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    userProfile(userId: $userId) {
      id
      userId
      firstName
      lastName
      email
      image
      links
    }
  }
`;

export default function SharePage({ params }: { params: { id: string } }) {
  const [{ data, error }, getUserFromId] = useQuery({
    query: GET_USER_PROFILE,
    variables: { userId: params.id },
  });

  const router = useRouter();

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      }).then((ok) => {
        if (ok) {
          router.push("/");
        }
      });
    }
  }, [error]);

  return (
    <section className="absolute left-0 top-0 flex flex-col gap-16 items-center justify-center h-screen w-screen bg-black/50 ">
      <Card className=" bg-white flex flex-col items-center justify-center gap-4 w-96 p-8 shadow-2xl rounded-2xl h-[600px]">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <Image
            src={data ? data.userProfile.image : logo}
            alt="illusion"
            className="border border-solid border-dark-purple rounded-full"
            width={100}
            height={100}
          />
          <h1 className="text-center">
            {data
              ? `${data.userProfile.firstName} ${data.userProfile.lastName}`
              : "Loading..."}
          </h1>
          <h3 className="text-center text-dark-gray">
            {data ? data.userProfile.email : "Loading..."}
          </h3>
          <div className="flex flex-col gap-4 w-full">
            {data &&
              data.userProfile.links.map((link: any, index: any) => (
                <PrevButton
                  key={index}
                  platform={link.platform}
                  url={link.url}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
