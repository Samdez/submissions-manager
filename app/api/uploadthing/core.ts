import { insertTrack } from "@/db/queries";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  trackUploader: f({ audio: {} })
    .middleware(async ({ req }) => {
      const user = auth(req);

      return { userId: user.id };
    })
    .onUploadError(async (err) => {
      throw new UploadThingError(`Error uploading track: ${err.error.message}`);
    })
    .onUploadComplete(async ({ file }) => {
      insertTrack({ title: file.name, url: file.url });
      console.log("Track uploaded successfully: ", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
