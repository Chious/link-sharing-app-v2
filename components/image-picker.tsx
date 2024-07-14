import React, { useState } from "react";
import Image from "next/image";
import icon_upload from "@/public/images/icon-upload-image.svg";

export default function ImagePicker() {
  const [pickedImage, setPickedImage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage("");
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string;
      setPickedImage(result);
    };

    fileReader.readAsDataURL(file);
  };

  console.log("pickedImage:", pickedImage);

  return (
    <div className="relative text-dark-purple flex flex-col gap-4 bg-light-purple rounded-lg aspect-square p-4 w-40 items-center justify-center">
      <input
        type="file"
        className="absolute z-20 w-full h-full opacity-0"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        required
      />
      {pickedImage && (
        <Image
          src={pickedImage}
          alt="preview icon"
          className="absolute z-10 w-full h-full rounded-md"
          width={40}
          height={40}
        />
      )}
      <Image src={icon_upload} alt="image icon" />
      <h3>+ Upload Image</h3>
    </div>
  );
}
