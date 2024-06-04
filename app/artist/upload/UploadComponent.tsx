"use client";
import { UploadDropzone } from "@/utils/uploadthings";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectLabelComponent from "./SelectLabel";

function UploadComponent({
  labels,
}: {
  labels: {
    id: number;
    name: string;
    artistId: number | null;
  }[];
}) {
  const router = useRouter();
  const [labelId, setLabelId] = useState<string | null>(null);
  return (
    <div>
      <SelectLabelComponent setLabelId={setLabelId} labels={labels} />
      {labelId && (
        <UploadDropzone
          input={{ labelId }}
          endpoint="trackUploader"
          className="cursor-pointer"
          appearance={{
            container: "border-indigo-700",
            label: "text-indigo-700",
            button: "bg-indigo-700",
          }}
          onClientUploadComplete={(res) => {
            router.push("tracks");
          }}
        />
      )}
    </div>
  );
}

export default UploadComponent;
