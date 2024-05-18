"use client";
import { UploadDropzone } from "@/utils/uploadthings";

function UploadPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<UploadDropzone endpoint="trackUploader" className="cursor-pointer" />
		</div>
	);
}

export default UploadPage;
