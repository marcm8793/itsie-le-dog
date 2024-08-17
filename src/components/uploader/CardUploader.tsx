"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { EmptyCard } from "./empty-card";
import Image from "next/image";
import { UploadedFile, UwConfig } from "@/types";
import UploadWidget from "./CloudinaryUploader";

const CardUploader = () => {
  const [publicId, setPublicId] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const uwConfig: UwConfig = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  };

  const handleNewUpload = (url: string) => {
    const fileType = url.includes("/video/") ? "video" : "image";
    setUploadedFiles((prev) => [...prev, { url, fileType }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Documents Uploader</h1>
      <UploadWidget
        uwConfig={uwConfig}
        setPublicId={setPublicId}
        onUpload={handleNewUpload}
      />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Uploaded files</CardTitle>
          <CardDescription>View the uploaded files here</CardDescription>
        </CardHeader>
        <CardContent>
          {uploadedFiles.length > 0 ? (
            <ScrollArea className="pb-4">
              <div className="flex w-max space-x-2.5">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative aspect-video w-64">
                    {file.fileType === "image" ? (
                      <Image
                        src={file.url}
                        alt={`Uploaded ${index}`}
                        fill
                        sizes="(min-width: 640px) 640px, 100vw"
                        loading="lazy"
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <video
                        src={file.url}
                        controls
                        className="w-full h-full rounded-md object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <EmptyCard
              title="No files uploaded"
              description="Upload some files to see them here"
              className="w-full"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CardUploader;
