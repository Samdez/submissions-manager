"use client";
import { UploadDropzone } from "@/utils/uploadthings";

function UploadPage() {
  return (
    <div className="flex items-center justify-center p-24">
      <UploadDropzone
        endpoint="trackUploader"
        className="cursor-pointer"
        appearance={{
          container: "border-indigo-700",
          label: "text-indigo-700",
          button: "bg-indigo-700",
        }}
      />
    </div>
  );
}

export default UploadPage;
