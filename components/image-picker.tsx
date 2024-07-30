import React, { useState } from "react";
import Image from "next/image";
import Icon_upload from "@/public/images/icon-upload-image.svg";

export default function ImagePicker({
  image,
  setImage,
  originalImage,
}: {
  image: File | null;
  setImage: (image: File | null) => void;
  originalImage: string | null;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    originalImage || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewImage(null);
      setImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string;
      setPreviewImage(result);
      setImage(file);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="relative text-dark-purple flex flex-col gap-4 bg-light-purple rounded-lg aspect-square p-4 w-40 items-center justify-center hover:shadow-md transition duration-100">
      <input
        type="file"
        className="absolute z-30 w-full h-full opacity-0"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        required
      />
      {previewImage && (
        <>
          <div className="svg-fill-white flex flex-col items-center justify-center text-white absolute z-20 w-full h-full rounded-md bg-black/50">
            <Icon_upload />
            <p>Change Image</p>
          </div>
          <Image
            src={previewImage}
            alt="preview icon"
            className="absolute z-10 w-full h-full rounded-md"
            width={40}
            height={40}
            objectFit="contain"
          />
        </>
      )}
      <Icon_upload />
      <h3>+ Upload Image</h3>
    </div>
  );
}
