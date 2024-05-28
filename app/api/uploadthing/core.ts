import { insertTrack } from "@/prisma/queries";
import { auth, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  trackUploader: f({ audio: {} })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      return { userId };
    })
    .onUploadError(async (err) => {
      throw new UploadThingError(`Error uploading track: ${err.error.message}`);
    })
    .onUploadComplete(async ({ file, metadata: { userId } }) => {
      if (!userId) throw new Error("cannot retrieve clerk id for this user");
      insertTrack({
        title: file.name,
        url: file.url,
        submissionDate: new Date().toUTCString(),
        Artist: { connect: { clerkId: userId } },
      });
      console.log("Track uploaded successfully: ", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
