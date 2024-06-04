import { insertTrack } from "@/prisma/queries/track";
import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  trackUploader: f({ audio: {} })
    .input(z.object({ labelId: z.string() }))
    .middleware(async ({ req, input }) => {
      const { userId } = getAuth(req);
      const { labelId } = input;
      return { userId, labelId };
    })
    .onUploadError(async (err) => {
      throw new UploadThingError(`Error uploading track: ${err.error.message}`);
    })
    .onUploadComplete(async ({ file, metadata: { userId, labelId } }) => {
      if (!userId) throw new Error("cannot retrieve clerk id for this user");
      insertTrack({
        title: file.name,
        url: file.url,
        submissionDate: new Date().toUTCString(),
        Artist: { connect: { clerkId: userId } },
        Labels: { connect: { id: +labelId } },
      });
      console.log("Track uploaded successfully: ", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
